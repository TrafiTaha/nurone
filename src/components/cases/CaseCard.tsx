"use client";

import { useState } from "react";
import type { CaseStudy } from "@/content/cases";
import { capabilityById } from "@/content/system";
import { cn } from "@/lib/cn";
import { fragments } from "@/components/fragments";
import { CapabilityIcon } from "@/components/ui/CapabilityIcon";
import { FitScale } from "@/components/ui/FitScale";

/** One product transformation. The product visual dominates; hover reveals before → after. */
export function CaseCard({ study, total, highlighted }: { study: CaseStudy; total: number; highlighted: boolean }) {
  const [open, setOpen] = useState(false);
  const Visual = fragments[study.id];
  const lead = study.stats[0];
  const storyId = `case-story-${study.id}`;

  return (
    <article
      aria-labelledby={`case-title-${study.id}`}
      className={cn(
        "group/card border-sheen relative flex h-full flex-col overflow-hidden rounded-[3px] border bg-ink-950/70 transition-[border-color,box-shadow,translate] duration-500 ease-expo hover:-translate-y-1",
        highlighted ? "border-signal-hi shadow-[0_0_0_3px_rgb(59_140_255/0.2)]" : "border-line hover:border-signal/45 hover:shadow-[0_24px_60px_-30px_rgb(59_140_255/0.45)]",
      )}
    >
      {/* Visual */}
      <div className="relative m-2 aspect-[4/3] overflow-hidden rounded-[2px] border border-ink-800 bg-ink-950">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-50" />
        <div className="relative transition-transform duration-700 ease-expo group-hover/card:scale-[1.04]">
          <FitScale width={420}>
            <Visual />
          </FitScale>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(5_11_18/0.95),transparent_45%),radial-gradient(ellipse_at_70%_0%,rgb(59_140_255/0.14),transparent_60%)]" />

        {study.status && (
          <p className="type-label absolute top-2.5 right-2.5 flex items-center gap-1.5 rounded-full bg-ink-950/85 px-2 py-1 text-live">
            <span className="pulse size-1.5 rounded-full bg-live" /> {study.status}
          </p>
        )}

        {/* Before → after */}
        <div
          id={storyId}
          className={cn(
            "absolute inset-0 flex flex-col justify-end gap-3 bg-ink-950/93 p-4 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "pointer-events-none opacity-0 [@media(hover:hover)]:group-hover/card:opacity-100",
          )}
        >
          {(
            [
              ["Before", study.before, "text-mute"],
              ["Built", study.transformation, "text-bone/90"],
              ["Result", study.result, "text-bone"],
            ] as const
          ).map(([label, text, tone]) => (
            <div key={label}>
              <p className="type-label text-signal-hi">{label}</p>
              <p className={cn("mt-0.5 line-clamp-3 text-[0.8125rem] leading-snug", tone)}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-4 pt-2 pb-4">
        <div className="flex items-start justify-between gap-3">
          <h3 id={`case-title-${study.id}`} className="text-[1.0625rem] leading-snug font-medium tracking-[-0.01em] text-bone">
            {study.client}
          </h3>
          <p aria-hidden="true" className="flex shrink-0 items-baseline gap-1 pt-0.5 font-mono tabular">
            <span className="text-sm text-dim transition-[color,translate] duration-500 ease-expo group-hover/card:-translate-y-0.5 group-hover/card:text-signal-hi">{study.id.slice(1)}</span>
            <span className="text-[0.6875rem] text-dim">/{String(total).padStart(2, "0")}</span>
          </p>
        </div>
        <p className="mt-0.5 text-[0.8125rem] text-mute">{study.sector} · {study.engagement}</p>

        <div className="mt-4 flex items-end justify-between gap-3">
          <p>
            <span className="block text-xl tracking-[-0.01em] text-signal-hi">{lead.value}</span>
            <span className="block text-[0.8125rem] text-mute">{lead.label}</span>
          </p>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={storyId}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-bone transition-colors hover:border-signal-hi hover:text-signal-hi aria-expanded:border-signal-hi aria-expanded:text-signal-hi"
          >
            <span className="sr-only">{open ? `Hide the ${study.client} story` : `Show ${study.client} before and after`}</span>
            <svg aria-hidden="true" viewBox="0 0 16 16" className={cn("size-3.5 transition-transform duration-500 ease-expo", open ? "rotate-45" : "group-hover/card:-rotate-45")} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {open ? <path d="M8 3v10M3 8h10" /> : <path d="M3 8h10M9 4l4 4-4 4" />}
            </svg>
          </button>
        </div>

        {/* Capabilities: technical metadata that sharpens on hover */}
        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 border-t border-line pt-3 transition-opacity duration-300 lg:opacity-60 lg:group-hover/card:opacity-100" aria-label="Capabilities">
          {study.capabilities.map((id) => (
            <li key={id} className="flex items-center gap-1.5 text-[0.75rem] text-mute">
              <CapabilityIcon id={id} className="size-3.5 text-signal-hi" />
              {capabilityById[id].name}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
