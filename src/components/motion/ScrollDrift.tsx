"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";

/**
 * Scrubbed exit for a block as its section scrolls away: travel, scale and fade.
 * Used sparingly (the hero hands off to the manifesto). Nothing moves under reduced motion.
 */
export function ScrollDrift({ children, className, y = 0, scale = 1, fade = 1 }: { children: ReactNode; className?: string; y?: number; scale?: number; fade?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const section = el?.closest("section");
    if (!el || !section) return;
    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
      gsap.to(el, { y, scale, opacity: fade, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true } });
    });
    return () => mm.revert();
  }, [y, scale, fade]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
