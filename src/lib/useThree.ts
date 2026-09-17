"use client";

import { useEffect, useRef, type RefObject } from "react";

type Three = typeof import("three");

export type ThreeApp = {
  resize: (width: number, height: number) => void;
  render: (time: number, dt: number) => void;
  dispose: () => void;
};

export type ThreeFactory = (three: Three, canvas: HTMLCanvasElement, env: { reduced: boolean; mobile: boolean }) => ThreeApp;

/**
 * Shared lifecycle for the Three.js scenes:
 * - Three.js is code-split and only fetched when the canvas comes within 600px of the viewport
 *   (and after the browser is idle, so it never competes with first paint)
 * - renders only while visible and the tab is active; a single still frame under reduced motion
 * - DPR capped at 1.5, sized with ResizeObserver
 * - geometry, materials and the renderer are disposed on unmount
 */
export function useThree(canvasRef: RefObject<HTMLCanvasElement | null>, factory: ThreeFactory) {
  const factoryRef = useRef(factory);
  useEffect(() => {
    factoryRef.current = factory;
  }, [factory]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    let app: ThreeApp | null = null;
    let disposed = false;
    let frame = 0;
    let visible = false;
    let last = performance.now();
    let idle = 0;

    const size = () => {
      const r = canvas.getBoundingClientRect();
      app?.resize(Math.max(1, r.width), Math.max(1, r.height));
      if (reduced) app?.render(0, 0);
    };

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      app?.render(now, dt);
      frame = visible && !document.hidden ? requestAnimationFrame(tick) : 0;
    };
    const start = () => {
      if (!app || reduced || frame || !visible || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const load = () => {
      if (app || disposed) return;
      import("three").then((three) => {
        if (disposed) return;
        try {
          app = factoryRef.current(three, canvas, { reduced, mobile });
        } catch {
          return; // No WebGL: the section keeps its static design.
        }
        size();
        canvas.dataset.ready = "";
        start();
      });
    };

    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        near.disconnect();
        const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
        if (ric) idle = ric(load, { timeout: 1500 });
        else idle = window.setTimeout(load, 200);
      },
      { rootMargin: "600px 0px" },
    );
    const onScreen = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      if (visible) start();
      else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    const resizer = new ResizeObserver(size);
    const onVisibility = () => start();

    near.observe(canvas);
    onScreen.observe(canvas);
    resizer.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      clearTimeout(idle);
      (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(idle);
      near.disconnect();
      onScreen.disconnect();
      resizer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      app?.dispose();
    };
  }, [canvasRef]);
}

/** Canvas class that fades a Three.js scene in once it has rendered. */
export const threeCanvasClass = "opacity-0 transition-opacity duration-[1.6s] data-ready:opacity-100";
