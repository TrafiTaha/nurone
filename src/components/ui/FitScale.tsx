"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Renders children at a fixed design width and scales them to fit the container,
 * so detailed product UI stays proportionally correct inside small cards.
 */
export function FitScale({ width, children }: { width: number; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const observer = new ResizeObserver(([entry]) => {
      i.style.transform = `scale(${entry.contentRect.width / width})`;
    });
    observer.observe(o);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={outer} className="relative w-full">
      <div ref={inner} className="origin-top-left" style={{ width }}>
        {children}
      </div>
    </div>
  );
}
