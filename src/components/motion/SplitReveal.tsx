"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { SplitText } from "gsap/SplitText";
import { cn } from "@/lib/cn";
import { gsap, MOTION_OK } from "@/lib/gsap";

if (typeof window !== "undefined") gsap.registerPlugin(SplitText);

/**
 * A headline whose words rise out of masked lines with a short blur as it enters the
 * viewport, driven by GSAP SplitText + ScrollTrigger. The text is split only in the
 * browser, reverted on unmount (restoring the original nodes for assistive tech), and
 * left untouched under reduced motion.
 */
export function SplitReveal({ as: Tag = "h2", id, className, children }: { as?: ElementType; id?: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      let split: SplitText | null = null;
      // Wait for the web font so lines are measured with real metrics.
      const run = () => {
        split = SplitText.create(el, { type: "lines,words", mask: "lines", aria: "auto" });
        gsap.from(split.words, {
          yPercent: 110,
          filter: "blur(6px)",
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.045,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      };
      let cancelled = false;
      document.fonts.ready.then(() => !cancelled && run());
      return () => {
        cancelled = true;
        split?.revert();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <Tag ref={ref} id={id} className={cn(className)}>
      {children}
    </Tag>
  );
}
