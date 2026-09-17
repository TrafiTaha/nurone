"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * A product "screen" you can inspect: on mouse hover a crosshair with live
 * coordinates follows the pointer, like measuring a schematic.
 */
export function InspectFrame({ children, label, className }: { children: ReactNode; label?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ix", `${(x * 100).toFixed(2)}%`);
    el.style.setProperty("--iy", `${(y * 100).toFixed(2)}%`);
    if (readout.current) readout.current.textContent = `x ${x.toFixed(2)} · y ${y.toFixed(2)}`;
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn("group/inspect relative overflow-hidden border border-ink-800 bg-ink-950 text-bone", className)}
    >
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative">{children}</div>

      {/* Crosshair (mouse only) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover/inspect:opacity-100">
        <span className="absolute inset-y-0 w-px bg-signal-hi/40" style={{ left: "var(--ix, 50%)" }} />
        <span className="absolute inset-x-0 h-px bg-signal-hi/40" style={{ top: "var(--iy, 50%)" }} />
        <span className="absolute size-2 -translate-1/2 border border-signal-hi" style={{ left: "var(--ix, 50%)", top: "var(--iy, 50%)" }} />
        <span ref={readout} className="type-label absolute right-3 bottom-3 bg-ink-950/90 px-2 py-1 text-signal-hi tabular">
          x 0.50 · y 0.50
        </span>
      </div>

      {label && (
        <span aria-hidden="true" className="type-label absolute top-3 right-3 text-dim">
          {label}
        </span>
      )}
    </div>
  );
}
