"use client";

import { useRef } from "react";
import { useCanvasLoop } from "@/lib/useCanvasLoop";

/**
 * A wide arc of data pixels, bright at its core and breaking into loose pixels at the
 * edges, rippling slowly: the curve under NURONE's proof figures.
 * Adapted from ThreeUI Community "Data Pixel Arc" (MIT, © 2026 Meng To), recoloured to
 * signal blue and drawn on a transparent canvas.
 */
export function PixelArc({ className, center = 0.55, drop = 0.75, thickness = 0.3 }: { className?: string; center?: number; drop?: number; thickness?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useCanvasLoop(ref, (ctx, { width, height }, reduced) => {
    const px = width < 640 ? 7 : 9;
    const cols = Math.ceil(width / px);
    const rows = Math.ceil(height / px);
    const arcY = height * center;
    const arcDrop = height * drop;
    const thick = height * thickness;
    let t = 0;

    return (_time, dt) => {
      ctx.clearRect(0, 0, width, height);
      for (let x = 0; x < cols; x++) {
        const nx = ((x * px) / width) * 2 - 1;
        const curve = arcY - Math.pow(Math.abs(nx), 1.8) * -arcDrop;
        const edge = Math.max(0, 1 - Math.pow(Math.abs(nx), 2.5));
        const wave1 = Math.sin(nx * 4 - t * 1.5) * 0.1;
        // Only rows within reach of the curve can light up.
        const y0 = Math.max(0, Math.floor((curve - thick) / px));
        const y1 = Math.min(rows, Math.ceil((curve + thick) / px));
        for (let y = y0; y < y1; y++) {
          const py = y * px;
          let i = Math.max(0, 1 - Math.abs(py - curve) / thick);
          if (i <= 0.01) continue;
          i = Math.max(0, Math.min(1, i + wave1 + Math.cos(py * 0.01 + t) * 0.1)) * edge;
          if (i <= 0.03) continue;
          const core = i ** 3;
          const mid = i ** 1.5;
          ctx.globalAlpha = i * 0.85;
          ctx.fillStyle = `rgb(${Math.floor(25 * i + 150 * core)},${Math.floor(110 * mid + 120 * core)},${Math.floor(210 * mid + 45 * core)})`;
          ctx.fillRect(x * px, py, px - 1, px - 1);
        }
      }
      ctx.globalAlpha = 1;
      if (!reduced) t += 0.02 * (dt / 16.67);
    };
  });

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
