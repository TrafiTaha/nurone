"use client";

import { useEffect } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";

/**
 * "Entering NURONE": the page background deepens as the visitor scrolls, from the
 * open navy of the opening scene to the near-black of the final decision.
 * Scrubbed with the scroll position; static (the mid tone) under reduced motion.
 */
export function DepthTone() {
  useEffect(() => {
    const root = document.documentElement;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });
      tl.fromTo(root, { "--page-bg": "#0a1829" }, { "--page-bg": "#07101c", duration: 0.35 })
        .to(root, { "--page-bg": "#050b14", duration: 0.35 })
        .to(root, { "--page-bg": "#03070d", duration: 0.3 });
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        root.style.removeProperty("--page-bg");
      };
    });
    return () => mm.revert();
  }, []);

  return null;
}
