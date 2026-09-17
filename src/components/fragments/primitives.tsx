import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/* Shared building blocks for the illustrative product fragments. */

export function Window({ title, tabs, children, className }: { title: string; tabs?: string[]; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="flex items-center gap-4 border-b border-ink-800 px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1">
          <span className="size-1.5 bg-dim" />
          <span className="size-1.5 bg-dim" />
          <span className="size-1.5 bg-dim" />
        </span>
        <span className="type-label truncate text-mute">{title}</span>
        {tabs && (
          <span className="ml-auto hidden gap-3 @sm:flex">
            {tabs.map((t, i) => (
              <span key={t} className={cn("type-label", i === 0 ? "text-bone" : "text-dim")}>
                {t}
              </span>
            ))}
          </span>
        )}
      </div>
      <div className="flex-1 p-4 @sm:p-5">{children}</div>
    </div>
  );
}

export function Pill({ children, tone = "line" }: { children: ReactNode; tone?: "line" | "signal" | "live" | "bone" }) {
  const tones = {
    line: "border border-line-strong text-mute",
    signal: "bg-signal text-white",
    live: "border border-live/40 text-live",
    bone: "bg-bone text-ink-950",
  };
  return <span className={cn("type-label inline-flex items-center gap-1.5 px-1.5 py-0.5 !tracking-[0.06em] whitespace-nowrap", tones[tone])}>{children}</span>;
}

export function Meter({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("relative block h-1 bg-ink-800", className)}>
      <span className="draw-x absolute inset-y-0 left-0 bg-signal-hi" style={{ width: `${value}%` }} />
    </span>
  );
}
