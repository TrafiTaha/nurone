"use client";

import { useEffect, useRef } from "react";

const POOL = "#%&@$/<>*+=~ABCDEFGHKMNPRSTUVWXYZ0123456789";

/**
 * Technical labels resolve from scrambled glyphs the first time they scroll
 * into view. Screen readers always get the real text; reduced motion skips it.
 * Technique adapted from ThreeUI Community "Article Headings" decode (MIT, © 2026 Meng To).
 */
export function DecodeText({ text, duration = 900 }: { text: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - progress) ** 2;
        const revealed = Math.floor(eased * text.length);
        let out = text.slice(0, revealed);
        for (let i = revealed; i < text.length; i++) {
          const ch = text[i];
          out += ch === " " || i > revealed + 6 ? (i > revealed + 6 ? " " : ch) : POOL[(Math.random() * POOL.length) | 0];
        }
        el.textContent = out;
        if (progress < 1) frame = requestAnimationFrame(tick);
        else el.textContent = text;
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.8 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = text;
    };
  }, [text, duration]);

  return (
    <>
      <span ref={ref} aria-hidden="true" className="whitespace-pre">
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
}
