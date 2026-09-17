"use client";

import { useRef } from "react";
import { useCanvasLoop } from "@/lib/useCanvasLoop";

/**
 * The NURONE wordmark as a field of signal dots, with slow bands of light drifting
 * across it: the page ends on the system itself.
 * Technique adapted from ThreeUI Community "Epilude Footer" particle wordmark (MIT, © 2026 Meng To):
 * a text mask sampled on a grid, particle alpha driven by a travelling noise field.
 */
export function DotWordmark({ text = "NURONE", className }: { text?: string; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useCanvasLoop(ref, (ctx, { width, height }, reduced) => {
    const gap = width < 640 ? 3.5 : 5;
    const TAU = Math.PI * 2;
    const palette = [
      [99, 197, 255],
      [191, 230, 255],
      [59, 140, 255],
    ];

    // Text mask on an offscreen canvas, in the page's display face.
    const off = document.createElement("canvas");
    off.width = Math.max(1, Math.round(width));
    off.height = Math.max(1, Math.round(height));
    const g = off.getContext("2d", { willReadFrequently: true });
    if (!g) return () => {};
    const family = getComputedStyle(document.body).fontFamily;
    let size = height * 1.3;
    g.font = `500 ${size}px ${family}`;
    const measured = g.measureText(text).width;
    size *= Math.min(1, (width * 0.98) / measured);
    g.font = `500 ${size}px ${family}`;
    g.textAlign = "center";
    g.textBaseline = "alphabetic";
    g.fillStyle = "#fff";
    const metrics = g.measureText(text);
    const ascent = metrics.actualBoundingBoxAscent;
    g.fillText(text, width / 2, (height + ascent) / 2);
    const data = g.getImageData(0, 0, off.width, off.height).data;
    const sample = (x: number, y: number) => {
      const ix = Math.min(off.width - 1, Math.max(0, Math.round(x)));
      const iy = Math.min(off.height - 1, Math.max(0, Math.round(y)));
      return data[(iy * off.width + ix) * 4 + 3] / 255;
    };

    // Deterministic particles, kept only where the letters are.
    let seed = 1337;
    const rand = () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 0xffffffff);
    const cols = Math.ceil(width / gap);
    const rows = Math.ceil(height / gap);
    const ox = (width - (cols - 1) * gap) / 2;
    const oy = (height - (rows - 1) * gap) / 2;
    type P = { x: number; y: number; nx: number; ny: number; r: number; square: boolean; offset: number; mask: number };
    const particles: P[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const px = ox + x * gap;
        const py = oy + y * gap;
        const mask = sample(px, py) ** 0.8;
        const square = rand() < 0.33;
        const big = rand() < 0.07;
        const r = ((big ? 3 + rand() * 1.2 : 1.2 + rand() * 1.4) * (gap / 6)) / 2;
        const offset = rand();
        if (mask < 0.05) continue;
        particles.push({ x: px, y: py, nx: x / Math.max(1, cols - 1), ny: y / Math.max(1, rows - 1), r, square, offset, mask });
      }
    }

    const noise = (x: number, y: number, t: number) => {
      const a = x + 0.7 * Math.sin(1.2 * y + t);
      const b = y + 0.7 * Math.cos(1.1 * x - t);
      return (Math.sin(1.3 * a + 0.6 * t) + Math.cos(1.5 * b - 0.5 * t) + Math.sin((a + b) * 0.9 + 0.3 * t)) / 3;
    };

    return (time) => {
      ctx.clearRect(0, 0, width, height);
      const t = reduced ? 1.4 : (time / 1000) * 0.9;
      for (const p of particles) {
        const band = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(3 * p.nx - 0.5 * t)) ** 2;
        const sway = 0.14 * Math.sin(0.8 * t + p.offset * TAU + 4 * p.ny) + 0.12 * noise(3 * p.nx, 3 * p.ny, 0.5 * t);
        const o = p.ny * 5 - t * 0.26 + p.offset * 5 + sway + 0.8 * p.nx;
        const s = o - Math.floor(o);
        const flake = s < 0.4 ? 1 - s / 0.4 : 0;
        const alpha = p.mask * (0.26 + 0.74 * (0.04 + 0.95 * band * flake ** 1.8));
        if (alpha < 0.02) continue;
        const c = palette[Math.floor(p.offset * palette.length)];
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha.toFixed(3)})`;
        if (p.square) ctx.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
        else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, TAU);
          ctx.fill();
        }
      }
    };
  });

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
