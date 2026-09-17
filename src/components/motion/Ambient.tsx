"use client";

import { useEffect } from "react";

/**
 * Page-wide ambient layer, mounted once:
 * - spotlight borders: any `.spotlight` element receives --mx/--my under the pointer
 * - a static film-grain overlay that breaks digital flatness
 */
export function Ambient() {
  useEffect(() => {
    let last: HTMLElement | null = null;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const spot = (e.target as Element | null)?.closest<HTMLElement>(".spotlight") ?? null;
      if (spot) {
        const b = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - b.left}px`);
        spot.style.setProperty("--my", `${e.clientY - b.top}px`);
      }
      if (last && last !== spot) last.style.removeProperty("--mx");
      last = spot;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-[70]" />;
}
