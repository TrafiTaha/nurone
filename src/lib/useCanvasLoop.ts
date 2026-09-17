"use client";

import { useEffect, useRef, type RefObject } from "react";

export type CanvasFrame = (time: number, dt: number) => void;
export type CanvasSetup = (ctx: CanvasRenderingContext2D, size: { width: number; height: number }, reducedMotion: boolean) => CanvasFrame;

/**
 * Shared lifecycle for decorative 2D canvases:
 * - DPR-aware sizing (capped at 2) via ResizeObserver
 * - runs only while on screen and the tab is visible
 * - reduced motion: draws a single still frame, no loop
 * `setup` is re-run on every resize and returns the per-frame draw function.
 */
export function useCanvasLoop(canvasRef: RefObject<HTMLCanvasElement | null>, setup: CanvasSetup) {
  const setupRef = useRef(setup);
  useEffect(() => {
    setupRef.current = setup;
  }, [setup]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let draw: CanvasFrame = () => {};
    let frame = 0;
    let visible = false;
    let last = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw = setupRef.current(ctx, { width: rect.width, height: rect.height }, reduced);
      if (reduced) draw(0, 0);
    };

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      draw(now, dt);
      frame = visible && !document.hidden ? requestAnimationFrame(tick) : 0;
    };

    const start = () => {
      if (reduced || frame || !visible || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      if (visible) start();
      else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    const onVisibility = () => start();

    resizeObserver.observe(canvas);
    intersection.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    resize();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [canvasRef]);
}
