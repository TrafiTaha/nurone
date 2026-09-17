"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { gsap, PIN_QUERY, ScrollTrigger } from "@/lib/gsap";

type Pin = keyof typeof PIN_QUERY;

type SceneState = {
  /** Current frame while pinned; -1 when the scene is laid out as a normal flow. */
  step: number;
  pinned: boolean;
  count: number;
  /** Scroll to the middle of a frame (pinned) — or to the frame itself (flow). */
  goTo: (index: number) => void;
};

const SceneContext = createContext<SceneState>({ step: -1, pinned: false, count: 0, goTo: () => {} });
export const useScene = () => useContext(SceneContext);

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * A pinned scroll scene. The section grows to `count × length` of scroll while its
 * stage stays in view; GSAP ScrollTrigger maps that distance to frames.
 *
 * Children mark frames with `data-frame`. Each frame receives
 *   data-state = past | current | future   and   --fp (0 → 1, progress inside the frame).
 * The section receives --p (0 → 1, whole scene), which CSS uses for rails and transformations.
 *
 * When motion is reduced, the viewport is short, or (pin="desktop") the screen is small,
 * nothing is pinned: frames flow as a normal document with every state fully resolved.
 */
export function ScrollScene({
  id,
  labelledBy,
  count,
  pin = "desktop",
  length = 90,
  as: Tag = "section",
  className,
  stageClassName,
  backdrop,
  children,
}: {
  id?: string;
  labelledBy?: string;
  count: number;
  pin?: Pin;
  /** Scroll distance per frame, in svh. */
  length?: number;
  as?: "section" | "div";
  className?: string;
  stageClassName?: string;
  /** Rendered inside the stage behind the content (stays with the pinned view). */
  backdrop?: ReactNode;
  children: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [step, setStep] = useState(-1);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const frames = Array.from(el.querySelectorAll<HTMLElement>("[data-frame]"));
    let last = -2;

    const resolveAll = () => {
      el.style.setProperty("--p", "1");
      frames.forEach((f) => {
        f.dataset.state = "current";
        f.style.setProperty("--fp", "1");
      });
      last = -1;
      setStep(-1);
    };

    const apply = (progress: number) => {
      const raw = progress * count;
      const current = Math.min(count - 1, Math.floor(raw));
      el.style.setProperty("--p", progress.toFixed(4));
      frames.forEach((f, i) => {
        f.dataset.state = i < current ? "past" : i > current ? "future" : "current";
        f.style.setProperty("--fp", clamp01(raw - i).toFixed(4));
      });
      if (current !== last) {
        last = current;
        el.dataset.step = String(current);
        setStep(current);
      }
    };

    const mm = gsap.matchMedia();
    mm.add({ pin: PIN_QUERY[pin], flow: `not all and ${PIN_QUERY[pin]}` }, (ctx) => {
      if (!ctx.conditions?.pin) {
        setPinned(false);
        resolveAll();
        return;
      }
      setPinned(true);
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => apply(self.progress),
        onRefresh: (self) => apply(self.progress),
      });
      trigger.current = st;
      apply(st.progress);
      return () => {
        st.kill();
        trigger.current = null;
      };
    });

    return () => mm.revert();
  }, [count, pin]);

  const goTo = useCallback(
    (index: number) => {
      const el = root.current;
      const st = trigger.current;
      if (!el) return;
      if (!st) {
        el.querySelectorAll<HTMLElement>("[data-frame]")[index]?.scrollIntoView({ block: "start" });
        return;
      }
      window.scrollTo({ top: st.start + ((index + 0.5) / count) * (st.end - st.start), behavior: "smooth" });
    },
    [count],
  );

  // Keyboard users tabbing into a frame that isn't on screen: bring that frame into view.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const onFocus = (e: FocusEvent) => {
      const st = trigger.current;
      const frame = (e.target as HTMLElement).closest<HTMLElement>("[data-frame]");
      if (!st || !frame || frame.dataset.state === "current") return;
      const index = Array.from(el.querySelectorAll("[data-frame]")).indexOf(frame);
      window.scrollTo({ top: st.start + ((index + 0.5) / count) * (st.end - st.start), behavior: "instant" });
    };
    el.addEventListener("focusin", onFocus);
    return () => el.removeEventListener("focusin", onFocus);
  }, [count]);

  const value = useMemo(() => ({ step, pinned, count, goTo }), [step, pinned, count, goTo]);

  return (
    <SceneContext.Provider value={value}>
      <Tag
        ref={root as never}
        id={id}
        data-section={Tag === "section" ? "" : undefined}
        aria-labelledby={labelledBy}
        data-pin={pin}
        className={cn("scene", className)}
        style={{ "--count": count, "--len": `${length}svh` } as CSSProperties}
      >
        <div className={cn("scene-stage", stageClassName)}>
          {backdrop}
          {children}
        </div>
      </Tag>
    </SceneContext.Provider>
  );
}

/** A rail that fills with the scene's progress. */
export function ProgressRail({ className, vertical }: { className?: string; vertical?: boolean }) {
  return (
    <span aria-hidden="true" className={cn("relative block overflow-hidden bg-line-strong", vertical ? "w-px" : "h-px", className)}>
      <span
        className={cn("absolute inset-0 bg-gradient-to-r from-signal to-signal-hi", vertical ? "origin-top bg-gradient-to-b" : "origin-left")}
        style={{ transform: vertical ? "scaleY(var(--p, 1))" : "scaleX(var(--p, 1))" }}
      />
    </span>
  );
}
