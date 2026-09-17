"use client";

import { faqGroups } from "@/content/faq";
import { cn } from "@/lib/cn";
import { useRovingTabs } from "@/lib/useRovingTabs";

const flat = faqGroups.flatMap((g) => g.items.map((item) => ({ ...item, group: g.title })));
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Desktop FAQ: the questions as an index, the selected answer on a stage that stays
 * in view. Hover previews, click or arrow keys select (WAI-ARIA tabs).
 */
export function FaqIndex() {
  const { active, select, tabProps, panelProps } = useRovingTabs(flat.length);
  const current = flat[active];

  return (
    <div className="grid grid-cols-12 gap-10">
      <div role="tablist" aria-label="Questions" aria-orientation="vertical" className="col-span-6 xl:col-span-5">
        {faqGroups.map((group) => (
          <div key={group.title} className="mb-8 last:mb-0">
            <p className="mb-2 text-[0.8125rem] text-dim">{group.title}</p>
            {group.items.map((item) => {
              const i = flat.findIndex((f) => f.q === item.q);
              const on = i === active;
              return (
                <button
                  key={item.q}
                  {...tabProps(i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && select(i)}
                  className="group relative grid w-full grid-cols-[2.25rem_1fr] items-baseline border-t border-line py-3.5 text-left"
                >
                  <span aria-hidden="true" className={cn("absolute top-[-1px] left-0 h-px bg-signal-hi transition-[width] duration-700 ease-expo", on ? "w-full" : "w-0")} />
                  <span className={cn("font-mono text-[0.75rem] tabular transition-colors", on ? "text-signal-hi" : "text-dim")}>{pad(i + 1)}</span>
                  <span className={cn("text-[0.9375rem] leading-snug transition-[color,translate] duration-500 ease-expo", on ? "translate-x-1 text-bone" : "text-mute group-hover:text-bone")}>{item.q}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="col-span-6 xl:col-span-6 xl:col-start-7">
        <div {...panelProps} className="spotlight sticky top-28 rounded-[3px] border border-line bg-ink-900/40 p-10 backdrop-blur-[2px]">
          <div key={active}>
            <p className="voice-in font-mono text-[0.75rem] text-signal-hi">
              {pad(active + 1)} <span className="text-dim">/ {pad(flat.length)}</span>
            </p>
            <p className="voice-in type-heading mt-6 text-[clamp(1.5rem,1rem+1.1vw,2.125rem)] leading-tight text-bone" style={{ ["--i" as string]: 1 }}>
              {current.q}
            </p>
            <p className="voice-in mt-6 max-w-[58ch] text-[1.0625rem] leading-relaxed text-mute" style={{ ["--i" as string]: 2 }}>
              {current.a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
