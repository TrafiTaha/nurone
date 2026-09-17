import type { CSSProperties, ReactNode } from "react";
import { labs } from "@/content/labs";
import { cn } from "@/lib/cn";

/*
 * One small, legible "situation" per step of How it works, scrubbed by the frame's --t / --fp.
 * Labels only: no invented figures.
 */

const seq = (k: number, of: number) => ({ ["--k" as string]: k, ["--of" as string]: of }) as CSSProperties;

function Panel({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("spotlight relative overflow-hidden rounded-[3px] border border-line-strong bg-ink-950/80", className)}>
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="type-label text-dim">{title}</span>
        <span className="flex gap-1">
          <span className="size-1.5 rounded-full bg-line-strong" />
          <span className="size-1.5 rounded-full bg-line-strong" />
          <span className="size-1.5 rounded-full bg-signal-hi/70" />
        </span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function FitCheck() {
  const inputs = ["Idea", "MVP", "Product", "Workflow", "Growth system"];
  const verdicts = ["What is real", "What is risky", "What is blocking progress", "Is NURONE the right team?"];
  return (
    <Panel title="Fit check / Diagnose">
      <div className="relative">
        <ul className="grid grid-cols-5 gap-1.5">
          {inputs.map((x) => (
            <li key={x} className="rounded-[2px] border border-line bg-ink-900 px-1 py-3 text-center text-[0.6875rem] text-mute">
              {x}
            </li>
          ))}
        </ul>
        <span className="absolute inset-y-0 w-px bg-signal-hi shadow-[0_0_12px_#63c5ff]" style={{ left: "calc(var(--t, 1) * 100%)", transition: "left 0.3s linear" }} />
      </div>
      <ul className="mt-5 grid gap-2">
        {verdicts.map((v, k) => (
          <li key={v} className="seq-lit flex items-center justify-between border-b border-line pb-2 text-[0.8125rem] text-bone/85" style={seq(k, verdicts.length)}>
            {v}
            <span className="type-label text-signal-hi">{k === verdicts.length - 1 ? "Verdict" : "Found"}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function ChooseLab() {
  return (
    <Panel title="Route / Your stage">
      <p className="text-center text-[0.8125rem] text-bone">Your current stage</p>
      <div className="mx-auto h-8 w-px origin-top bg-signal-hi" style={{ transform: "scaleY(var(--t, 1))" }} />
      <div className="mx-[10%] h-px origin-center bg-signal/60" style={{ transform: "scaleX(var(--t, 1))" }} />
      <ul className="mt-0 grid grid-cols-5 gap-1.5">
        {labs.map((lab, k) => (
          <li key={lab.id} className="seq-lit flex flex-col items-center" style={seq(k, labs.length)}>
            <span className="h-5 w-px bg-signal/60" />
            <span className="w-full rounded-[2px] border border-signal/40 bg-signal/[0.07] px-1 py-2.5 text-center text-[0.6875rem] text-bone/90">{lab.key}</span>
          </li>
        ))}
      </ul>
      <p className="type-label mt-5 text-center text-dim">No wrong team. No wasted motion.</p>
    </Panel>
  );
}

function BuildVisibly() {
  const rows = [
    ["Done", "w-[82%]", "bg-live/70"],
    ["Next", "w-[58%]", "bg-signal-hi/80"],
    ["Blocked", "w-[18%]", "bg-mute/60"],
    ["Who worked on what", "w-[70%]", "bg-signal/70"],
    ["How every hour was used", "w-full", "bg-signal-hi/60"],
  ] as const;
  return (
    <Panel title="Weekly log / This week">
      <ul className="grid gap-3.5">
        {rows.map(([label, width, color], k) => (
          <li key={label} className="grid grid-cols-[8.5rem_1fr] items-center gap-3 text-[0.8125rem] text-mute">
            <span>{label}</span>
            <span className="h-1.5">
              <span className={cn("block h-full origin-left rounded-full", width, color)} style={{ transform: `scaleX(clamp(0, calc(var(--t, 1) * 1.6 - ${k * 0.15}), 1))`, transition: "transform 0.3s linear" }} />
            </span>
          </li>
        ))}
      </ul>
      <p className="type-label mt-5 text-dim">
        No black box. No blind trust.
      </p>
    </Panel>
  );
}

function Accountable() {
  const owned = ["Code", "Assets", "Systems", "Progress"];
  return (
    <Panel title="Ownership / In your name">
      <ul className="grid grid-cols-2 gap-2.5">
        {owned.map((o, k) => (
          <li key={o} className="seq-lit flex items-center justify-between rounded-[2px] border border-line-strong bg-ink-900 px-3 py-3.5" style={seq(k, owned.length)}>
            <span className="text-[0.875rem] text-bone">{o}</span>
            <span className="type-label flex items-center gap-1.5 text-signal-hi">
              <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="m2.5 6.5 2.2 2.2 4.8-5" />
              </svg>
              Yours
            </span>
          </li>
        ))}
      </ul>
      <p className="type-label mt-5 text-dim">If a talent is not the right fit, we replace them fast.</p>
    </Panel>
  );
}

function ScaleOrExit() {
  const paths = ["Continue with the team", "Unlock growth", "Scale the system", "Leave with everything in hand"];
  return (
    <Panel title="Stage complete / Your call">
      <div className="grid grid-cols-[5.5rem_1fr] items-center gap-3">
        <span className="rounded-[2px] border border-signal-hi/70 bg-signal/15 px-2 py-3 text-center text-[0.75rem] text-bone">Stage complete</span>
        <ul className="relative grid gap-2 border-l border-signal/50 pl-4">
          {paths.map((p, k) => (
            <li key={p} className="seq-lit relative text-[0.8125rem] text-bone/90" style={seq(k, paths.length)}>
              <span className="absolute top-1/2 -left-4 h-px w-3 bg-signal/60" />
              <span className="block rounded-[2px] border border-line px-3 py-2">{p}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="type-label mt-5 text-dim">No dependency. No pressure. No messy handoff.</p>
    </Panel>
  );
}

const visuals = [FitCheck, ChooseLab, BuildVisibly, Accountable, ScaleOrExit];

export function MethodVisual({ index }: { index: number }) {
  const Visual = visuals[index];
  return <Visual />;
}
