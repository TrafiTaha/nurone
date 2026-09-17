"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type CounterProps = { value: number; prefix?: string; suffix?: string; duration?: number };

/**
 * Server-renders the final number (so no-JS, crawlers and screen readers get
 * the truth) and counts up once when it scrolls into view.
 */
export function Counter({ value, prefix = "", suffix = "", duration = 1400 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const format = (n: number) => `${prefix}${Math.round(n)}${suffix}`;

    let frame = 0;
    let armed = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          // Only reset while fully off-screen, so a visible number never jumps back.
          if (!armed && entry.boundingClientRect.top > window.innerHeight) {
            el.textContent = format(0);
            armed = true;
          }
          return;
        }
        if (!armed) return observer.disconnect();
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          el.textContent = format(value * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = format(value);
    };
  }, [value, prefix, suffix, duration]);

  return (
    <>
      <span ref={ref} aria-hidden="true" className="tabular">
        {prefix}
        {value}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {value}
        {suffix}
      </span>
    </>
  );
}
