"use client";

import { useEffect } from "react";
import { cases } from "@/content/cases";
import { capabilityById } from "@/content/system";
import { cn } from "@/lib/cn";
import { CASE_EVENT } from "@/lib/motion";
import { fragments } from "@/components/fragments";
import { ScrollScene, useScene } from "@/components/motion/ScrollScene";
import { CapabilityIcon } from "@/components/ui/CapabilityIcon";
import { ChapterMark } from "@/components/ui/ChapterMark";
import { Container } from "@/components/ui/Container";
import { FitScale } from "@/components/ui/FitScale";

const pad3 = (n: number) => String(n).padStart(3, "0");

/**
 * Desktop case studies as a sequence of stories. Each case enters, its challenge
 * gives way to what was built, the product assembles, and the outcome lands before
 * the next case takes the stage.
 */
export function CaseScene({ className }: { className?: string }) {
  return (
    <ScrollScene as="div" count={cases.length} pin="desktop" length={100} className={className} stageClassName="isolate flex flex-col">
      <div aria-hidden="true" className="absolute top-[18%] right-[-10%] -z-10 aspect-square w-[55%] rounded-full bg-[radial-gradient(closest-side,rgb(59_140_255/0.1),transparent)]" />
      <Container className="relative flex w-full flex-1 flex-col pt-24 pb-8">
        <SceneHeader />
        <div className="frames grid flex-1 content-center">
          {cases.map((c) => (
            <CaseFrame key={c.id} id={c.id} />
          ))}
        </div>
      </Container>
    </ScrollScene>
  );
}

function SceneHeader() {
  const { step, goTo } = useScene();

  // Proof links elsewhere on the page ("see Trucking88") land on that story.
  useEffect(() => {
    const onSelect = (e: Event) => {
      const i = cases.findIndex((c) => c.id === (e as CustomEvent<string>).detail);
      if (i >= 0) requestAnimationFrame(() => goTo(i));
    };
    window.addEventListener(CASE_EVENT, onSelect);
    return () => window.removeEventListener(CASE_EVENT, onSelect);
  }, [goTo]);

  return (
    <div className="flex items-end justify-between gap-8">
      <div>
        <ChapterMark index="07" name="Proof" />
        <p className="type-heading mt-4 text-[clamp(1.5rem,1.1rem+1vw,2rem)] leading-tight">
          Real products. <span className="text-mute">Real results.</span>
        </p>
      </div>
      <ol className="flex gap-1" aria-label="Case studies">
        {cases.map((c, i) => {
          const on = i === step;
          return (
            <li key={c.id}>
              <button type="button" onClick={() => goTo(i)} aria-current={on ? "step" : undefined} className="group flex flex-col gap-2 px-1 py-2 text-left">
                <span className={cn("block h-px w-12 transition-colors duration-500 xl:w-16", on ? "bg-signal-hi" : i < step ? "bg-signal/50" : "bg-line-strong group-hover:bg-mute")} />
                <span className={cn("type-label tabular transition-colors", on ? "text-signal-hi" : "text-dim group-hover:text-mute")}>
                  {c.id}
                  <span className="sr-only"> {c.client}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function CaseFrame({ id }: { id: string }) {
  const study = cases.find((c) => c.id === id)!;
  const Visual = fragments[study.id];
  const story = [
    ["Challenge", study.before],
    ["Build", study.transformation],
    ["Outcome", study.result],
  ] as const;

  return (
    <article data-frame aria-labelledby={`case-scene-${study.id}`} className="grid items-center gap-10 lg:grid-cols-12 xl:gap-14">
      <div className="lg:col-span-5">
        <p className="type-label flex items-center gap-3 text-dim">
          <span className="text-signal-hi">Case {study.id}</span>
          <span className="h-px w-6 bg-line-strong" />
          {study.sector}
          {study.status && (
            <span className="flex items-center gap-1.5 text-live">
              <span className="pulse size-1.5 rounded-full bg-live" /> {study.status}
            </span>
          )}
        </p>
        <h3 id={`case-scene-${study.id}`} className={cn("type-display mt-4 leading-[0.98]", study.client.length > 24 ? "text-[clamp(1.875rem,1.2rem+1.6vw,2.75rem)]" : "text-[clamp(2.75rem,1.6rem+2.8vw,4.5rem)]")}>
          {study.client}
        </h3>
        <p className="mt-2 text-[0.9375rem] text-mute">{study.engagement}</p>

        <ol className="mt-7 grid gap-0 border-t border-line">
          {story.map(([label, text], k) => (
            <li key={label} className="seq-lit grid grid-cols-[6rem_1fr] gap-4 border-b border-line py-3.5" style={{ ["--k" as string]: k, ["--of" as string]: 3 }}>
              <span className="type-label pt-0.5 text-signal-hi">{label}</span>
              <p className={cn("text-[0.9375rem] leading-snug", k === 2 ? "text-bone" : "text-bone/80")}>{text}</p>
            </li>
          ))}
        </ol>

        <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5" aria-label="Capabilities">
          {study.capabilities.map((c) => (
            <li key={c} className="flex items-center gap-1.5 text-[0.8125rem] text-mute">
              <CapabilityIcon id={c} className="size-3.5 text-signal-hi" />
              {capabilityById[c].name}
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-7">
        <div className="spotlight relative aspect-[16/10] max-h-[calc(100svh-17rem)] overflow-hidden rounded-[3px] border border-line-strong bg-ink-950">
          <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-50" />
          {/* The product assembles as the story moves from challenge to outcome. */}
          <div
            aria-hidden="true"
            className="relative"
            style={{
              opacity: "calc(0.3 + var(--t, 1) * 0.7)",
              transform: "scale(calc(0.9 + var(--t, 1) * 0.1)) translateY(calc((1 - var(--t, 1)) * 24px))",
              transformOrigin: "50% 30%",
              transition: "opacity 0.3s linear, transform 0.3s linear",
            }}
          >
            <FitScale width={560}>
              <Visual />
            </FitScale>
          </div>
          {/* fracture lines of the "before" state */}
          <svg aria-hidden="true" viewBox="0 0 160 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full" style={{ opacity: "calc(1 - var(--t, 1) * 1.4)" }}>
            <path d="M0 34 L52 30 L70 44 L160 38" fill="none" stroke="#93a3bb" strokeOpacity="0.5" strokeWidth="0.3" strokeDasharray="1.5 1.5" vectorEffect="non-scaling-stroke" />
            <path d="M0 71 L90 64 L104 76 L160 69" fill="none" stroke="#93a3bb" strokeOpacity="0.5" strokeWidth="0.3" strokeDasharray="1.5 1.5" vectorEffect="non-scaling-stroke" />
          </svg>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(5_11_18/0.95),transparent_50%)]" />

          <dl className="absolute inset-x-0 bottom-0 grid grid-cols-3 border-t border-line bg-ink-950/70 backdrop-blur-sm">
            {study.stats.map((s, k) => (
              <div key={s.label} className="seq-lit flex flex-col px-5 py-4 not-first:border-l not-first:border-line" style={{ ["--k" as string]: 2 + k * 0.2, ["--of" as string]: 3 }}>
                <dt className="type-label order-2 mt-1 text-dim">{s.label}</dt>
                <dd className="order-1 text-[clamp(1.25rem,0.9rem+1vw,1.875rem)] leading-none tracking-[-0.02em] text-signal-hi">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="type-label mt-3 text-dim">Illustrative product view · {pad3(Number(study.id))} / {pad3(cases.length)}</p>
      </div>
    </article>
  );
}
