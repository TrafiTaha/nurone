"use client";

import { useRef } from "react";
import { useCanvasLoop } from "@/lib/useCanvasLoop";

/**
 * Hairline streaks travelling toward the NURONE core in perspective: many
 * inputs converging on one system.
 * Technique adapted from ThreeUI Community "Particle Network" (MIT, © 2026 Meng To).
 */
export function WarpStreaks({ className, density = 1 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useCanvasLoop(ref, (ctx, { width, height }, reduced) => {
    const fov = 260;
    const depth = 1000;
    const count = Math.round((width < 500 ? 70 : 140) * density);
    const cx = width / 2;
    const cy = height / 2;
    const colors = ["191, 230, 255", "99, 197, 255", "59, 140, 255"];

    type P = { x: number; y: number; z: number; speed: number; color: string; tail: number };
    const spawn = (z = Math.random() * depth): P => {
      const angle = Math.random() * Math.PI * 2;
      // Keep the centre (where the core sits) clear.
      const radius = 180 + Math.random() * 520;
      return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius * 0.75, z, speed: 0.9 + Math.random() * 1.6, color: colors[(Math.random() * colors.length) | 0], tail: 6 + Math.random() * 14 };
    };
    const particles = Array.from({ length: count }, () => spawn());

    return (_time, dt) => {
      ctx.clearRect(0, 0, width, height);
      const step = dt / 16.67;
      for (const p of particles) {
        // Travel away from the viewer: streaks shrink toward the core.
        if (!reduced) p.z += p.speed * step;
        if (p.z >= depth) Object.assign(p, spawn(40));

        const scale = fov / p.z;
        const prev = fov / Math.max(1, p.z - p.tail);
        const x = cx + p.x * scale;
        const y = cy + p.y * scale;
        const px = cx + p.x * prev;
        const py = cy + p.y * prev;

        const near = 1 - p.z / depth;
        const alpha = Math.min(1, p.z / 120) * near * 0.7;
        if (alpha <= 0.01) continue;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(${p.color}, ${alpha.toFixed(3)})`;
        ctx.lineWidth = Math.max(0.35, near * 1.1);
        ctx.stroke();
      }
    };
  });

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
