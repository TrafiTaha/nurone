"use client";

import { cn } from "@/lib/cn";
import { useScene } from "./ScrollScene";

const pad = (n: number) => String(n).padStart(2, "0");

/** `02 / 04` readout of the pinned frame. Hidden when the scene flows normally. */
export function SceneCounter({ className, labels }: { className?: string; labels?: string[] }) {
  const { step, pinned, count } = useScene();
  if (!pinned) return null;
  const i = Math.max(0, step);
  return (
    <p aria-hidden="true" className={cn("type-label flex shrink-0 items-center gap-3 text-dim", className)}>
      {labels && (
        <span key={i} className="enter text-mute max-sm:hidden">
          {labels[i]}
        </span>
      )}
      <span className="tabular">
        <span className="text-signal-hi">{pad(i + 1)}</span> / {pad(count)}
      </span>
    </p>
  );
}

/** Numbered frame index that jumps the scene to a frame. */
export function SceneIndex({ items, className, vertical }: { items: string[]; className?: string; vertical?: boolean }) {
  const { step, pinned, goTo } = useScene();
  if (!pinned) return null;
  return (
    <ol className={cn(vertical ? "grid gap-1" : "flex flex-wrap gap-x-1", className)}>
      {items.map((label, i) => {
        const on = step === i;
        const past = step > i;
        return (
          <li key={label}>
            <button
              type="button"
              aria-current={on ? "step" : undefined}
              onClick={() => goTo(i)}
              className={cn(
                "group flex items-center gap-3 py-2 text-left transition-colors duration-500",
                vertical ? "w-full" : "px-2.5",
                on ? "text-bone" : past ? "text-mute hover:text-bone" : "text-dim hover:text-mute",
              )}
            >
              <span className={cn("type-label tabular transition-colors duration-500", on || past ? "text-signal-hi" : "text-dim")}>{pad(i + 1)}</span>
              {vertical && <span aria-hidden="true" className={cn("h-px transition-[width,background-color] duration-700 ease-expo", on ? "w-8 bg-signal-hi" : past ? "w-4 bg-signal/60" : "w-4 bg-line-strong")} />}
              <span className="text-[0.8125rem]">{label}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
