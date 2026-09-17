"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Pulls its child a few pixels toward a mouse pointer. Only for primary
 * calls to action: it signals "this is the thing to press".
 */
export function Magnetic({ children, strength = 0.22, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("inline-flex transition-transform duration-500 ease-expo will-change-transform", className)}
    >
      {children}
    </span>
  );
}
