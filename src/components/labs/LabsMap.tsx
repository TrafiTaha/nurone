"use client";

import { labs } from "@/content/labs";
import { cn } from "@/lib/cn";
import { useScene } from "@/components/motion/ScrollScene";

const S = 420;
const C = S / 2;
const R = 150;
const r1 = (n: number) => Math.round(n * 10) / 10;
const stations = labs.map((lab, i) => {
  const a = -Math.PI / 2 + (i / labs.length) * Math.PI * 2;
  return { lab, x: r1(C + Math.cos(a) * R), y: r1(C + Math.sin(a) * R), lx: r1(C + Math.cos(a) * (R + 34)), ly: r1(C + Math.sin(a) * (R + 34)), a };
});

/**
 * The Labs as one operating system: each entrance joins the core as the scene advances,
 * and each one connects to the next. Clicking a station jumps to that Lab.
 */
export function LabsMap({ className }: { className?: string }) {
  const { step, goTo } = useScene();
  const reached = Math.max(0, step);
  const complete = step === labs.length - 1;

  return (
    <div className={cn("relative", className)}>
      <svg viewBox={`0 0 ${S} ${S}`} className="h-auto w-full overflow-visible" aria-hidden="true">
        <circle cx={C} cy={C} r={R} fill="none" stroke="#63c5ff" strokeOpacity="0.08" />
        <circle cx={C} cy={C} r={R - 60} fill="none" stroke="#63c5ff" strokeOpacity="0.06" strokeDasharray="2 6" />

        {stations.map((s, i) => {
          const next = stations[(i + 1) % stations.length];
          const linked = i < reached || (complete && i === stations.length - 1);
          return (
            <g key={s.lab.id}>
              <line x1={C} y1={C} x2={s.x} y2={s.y} stroke="#63c5ff" strokeOpacity={i <= reached ? 0.6 : 0.1} strokeDasharray={i <= reached ? "none" : "2 5"} className="transition-[stroke-opacity] duration-700" />
              <path
                d={`M${s.x} ${s.y} A ${R} ${R} 0 0 1 ${next.x} ${next.y}`}
                fill="none"
                stroke="#63c5ff"
                strokeWidth="1.4"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={linked ? 0 : 1}
                strokeOpacity="0.75"
                style={{ transition: "stroke-dashoffset 0.9s var(--ease-expo)" }}
              />
            </g>
          );
        })}

        {/* core */}
        <circle cx={C} cy={C} r="58" fill="url(#labs-core)" />
        <circle cx={C} cy={C} r="40" fill="#07111c" stroke="#63c5ff" strokeOpacity={0.4 + (reached / (labs.length - 1)) * 0.6} className="transition-[stroke-opacity] duration-700" />
        <text x={C} y={C - 2} textAnchor="middle" fill="#e8edf4" fontSize="11" letterSpacing="2.5" fontFamily="var(--font-geist-mono)">
          NURONE
        </text>
        <text x={C} y={C + 14} textAnchor="middle" fill="#63c5ff" fontSize="8.5" letterSpacing="1.5" fontFamily="var(--font-geist-mono)">
          {complete ? "ONE SYSTEM" : `${reached + 1} / ${labs.length}`}
        </text>
        <defs>
          <radialGradient id="labs-core">
            <stop offset="0" stopColor="#3b8cff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#3b8cff" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* stations are real buttons layered over the drawing */}
      <ol className="absolute inset-0">
        {stations.map((s, i) => {
          const on = i === step;
          const lit = i <= reached;
          const left = s.x < C - 10;
          const top = Math.abs(s.x - C) < 10;
          return (
            <li key={s.lab.id} className="absolute" style={{ left: `${(s.x / S) * 100}%`, top: `${(s.y / S) * 100}%` }}>
              <button type="button" onClick={() => goTo(i)} aria-current={on ? "step" : undefined} className="group relative -translate-1/2 rounded-full p-2">
                <span
                  className={cn(
                    "grid size-9 place-items-center rounded-full border font-mono text-[0.6875rem] tabular transition-[border-color,background-color,color,box-shadow] duration-500",
                    on ? "border-signal-hi bg-signal/20 text-bone shadow-[0_0_0_6px_rgb(59_140_255/0.12),0_0_28px_rgb(59_140_255/0.45)]" : lit ? "border-signal/70 bg-ink-900 text-signal-hi" : "border-line-strong bg-ink-950 text-dim group-hover:text-bone",
                  )}
                >
                  {s.lab.entrance}
                </span>
                <span
                  className={cn(
                    "type-label pointer-events-none absolute whitespace-nowrap transition-colors duration-500",
                    top ? "bottom-full left-1/2 -translate-x-1/2" : left ? "top-1/2 right-full mr-1 -translate-y-1/2" : "top-1/2 left-full ml-1 -translate-y-1/2",
                    on ? "text-bone" : lit ? "text-mute" : "text-dim",
                  )}
                >
                  {s.lab.key}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
