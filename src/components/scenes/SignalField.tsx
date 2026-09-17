"use client";

import { useRef } from "react";
import { useCanvasLoop } from "@/lib/useCanvasLoop";

/**
 * A quiet grid of data points where two slow waves surface and recede, with rare
 * points held in signal blue: infrastructure humming under the stack.
 * Technique adapted from ThreeUI Community "Signal Particles" (MIT, © 2026 Meng To).
 */
export function SignalField({ className, spacing = 18 }: { className?: string; spacing?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useCanvasLoop(ref, (ctx, { width, height }, reduced) => {
    const gap = width < 640 ? spacing + 4 : spacing;
    const cols = Math.floor(width / gap);
    const rows = Math.floor(height / gap);
    const ox = (width - cols * gap) / 2;
    const oy = (height - rows * gap) / 2;
    // Precompute which points are "held" highlights (deterministic, matches the original's hash).
    const held = new Uint8Array((cols + 1) * (rows + 1));
    for (let i = 0; i <= cols; i++) for (let j = 0; j <= rows; j++) held[i * (rows + 1) + j] = Math.sin(i * 12.34) * Math.cos(j * 56.78) > 0.97 ? 1 : 0;
    let t = 3;

    return (_time, dt) => {
      ctx.clearRect(0, 0, width, height);
      if (!reduced) t += 0.012 * (dt / 16.67);
      for (let i = 0; i <= cols; i++) {
        const nx = i * 0.1;
        for (let j = 0; j <= rows; j++) {
          const ny = j * 0.1;
          const value = Math.sin(nx + t * 0.5) * Math.cos(ny - t * 0.3) + Math.sin(nx * 0.5 - ny * 0.5 + t * 0.8);
          if (value <= 0.1) continue;
          const x = ox + i * gap;
          const y = oy + j * gap;
          if (held[i * (rows + 1) + j]) {
            ctx.fillStyle = "rgba(99, 197, 255, 0.9)";
            ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
          } else {
            ctx.fillStyle = `rgba(147, 163, 187, ${Math.min(0.55, (value - 0.1) * 0.6).toFixed(3)})`;
            ctx.fillRect(x - 0.9, y - 0.9, 1.8, 1.8);
          }
        }
      }
    };
  });

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
