"use client";

import { useEffect, useRef } from "react";
import { principles } from "@/content/philosophy";
import { gsap, MOTION_OK, ScrollTrigger } from "@/lib/gsap";

/**
 * A kinetic band of NURONE's four principles between chapters. It drifts on its own,
 * and scroll velocity pushes it faster and flips its direction; the words fill from
 * outline to signal as they cross the centre.
 * Decorative: the principles are read in full in chapter 03.
 */
export function PrincipleBand() {
  const track = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    const lit = fill.current;
    if (!el || !lit) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const loop = gsap.to([el, lit], { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
      let direction = 1;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          if (Math.abs(v) > 20) direction = v > 0 ? 1 : -1;
          const boost = 1 + Math.min(5, Math.abs(v) / 400);
          gsap.to(loop, { timeScale: direction * boost, duration: 0.25, overwrite: true, onComplete: () => void gsap.to(loop, { timeScale: direction, duration: 1.2, overwrite: true }) });
        },
      });
      return () => {
        st.kill();
        loop.kill();
      };
    });
    return () => mm.revert();
  }, []);

  const items = [...principles, ...principles];
  const row = (filled: boolean) =>
    items.map((p, i) => (
      <span key={i} className="flex items-center">
        <span className={filled ? "type-display px-6 text-[clamp(2.5rem,1.5rem+4vw,5.5rem)] leading-none text-bone sm:px-10" : "band-outline type-display px-6 text-[clamp(2.5rem,1.5rem+4vw,5.5rem)] leading-none sm:px-10"}>
          {p.over} <span className={filled ? "text-signal-hi" : ""}>&gt;</span> {p.under}
        </span>
        <span className={filled ? "text-2xl text-signal-hi" : "text-2xl text-signal-hi/40"}>✦</span>
      </span>
    ));

  return (
    <div aria-hidden="true" className="relative overflow-hidden border-b border-line py-7 sm:py-9">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--page-bg)] to-transparent sm:w-48" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--page-bg)] to-transparent sm:w-48" />
      <div ref={track} className="flex w-max whitespace-nowrap will-change-transform">
        {row(false)}
      </div>
      {/* The same row, filled, visible only through a window at the centre. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden py-7 [mask-image:linear-gradient(to_right,transparent_28%,black_44%,black_56%,transparent_72%)] sm:py-9">
        <div ref={fill} className="flex w-max whitespace-nowrap will-change-transform">
          {row(true)}
        </div>
      </div>
    </div>
  );
}