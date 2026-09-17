"use client";

import { useState, type ReactNode } from "react";
import { caseById } from "@/content/cases";
import { layers } from "@/content/system";
import { cn } from "@/lib/cn";
import { selectCase } from "@/lib/motion";
import { ArrowGlyph } from "@/components/ui/Button";

/* ── Isometric geometry on a 560 × 600 canvas ─────────────────────────────── */
type Pt = [number, number];
const r1 = (n: number) => Math.round(n * 10) / 10;
const CX = 250;
const HALF_W = 190;
const HALF_H = 95;
const THICK = 12;
/** Planes from top (Growth) to bottom (Technical backbone), matching the stacked order of the reference. */
const PLANE_Y = [140, 300, 460];

function plane(cy: number) {
  const top: Pt = [CX, cy - HALF_H];
  const right: Pt = [CX + HALF_W, cy];
  const bottom: Pt = [CX, cy + HALF_H];
  const left: Pt = [CX - HALF_W, cy];
  /** Point on the surface: s runs top→right, t runs top→left (0..1). */
  const at = (s: number, t: number): Pt => [r1(top[0] + s * (right[0] - top[0]) + t * (left[0] - top[0])), r1(top[1] + s * (right[1] - top[1]) + t * (left[1] - top[1]))];
  return { top, right, bottom, left, at };
}

const pts = (...p: Pt[]) => p.map((x) => x.join(",")).join(" ");
const up = (p: Pt, h: number): Pt => [p[0], r1(p[1] - h)];

/** A raised isometric block on a plane (for architecture / growth bars). */
function Block({ at, s, t, size, height, lit }: { at: (s: number, t: number) => Pt; s: number; t: number; size: number; height: number; lit: boolean }) {
  const a = at(s, t);
  const b = at(s + size, t);
  const c = at(s + size, t + size);
  const d = at(s, t + size);
  return (
    <g className="transition-opacity duration-500">
      <polygon points={pts(d, c, up(c, height), up(d, height))} fill={lit ? "#1c4d80" : "#10263f"} />
      <polygon points={pts(c, b, up(b, height), up(c, height))} fill={lit ? "#153b63" : "#0b1c2f"} />
      <polygon points={pts(up(a, height), up(b, height), up(c, height), up(d, height))} fill={lit ? "#5fb4ff" : "#1f4a75"} fillOpacity={lit ? 0.85 : 0.7} stroke={lit ? "#bfe6ff" : "#3b8cff"} strokeOpacity={lit ? 0.9 : 0.35} strokeWidth="0.8" />
    </g>
  );
}

/** Each layer draws the structure it represents on its surface. */
function Surface({ index, lit }: { index: number; lit: boolean }) {
  const p = plane(PLANE_Y[index]);
  // index 0 = Growth (top): ascending bars
  if (index === 0) {
    return (
      <>
        {[0, 1, 2, 3, 4].map((i) => (
          <Block key={i} at={p.at} s={0.2 + i * 0.13} t={0.45} size={0.09} height={10 + i * 9} lit={lit} />
        ))}
      </>
    );
  }
  // index 1 = Agentic operations: connected agent nodes
  if (index === 1) {
    const nodes: Pt[] = [p.at(0.3, 0.3), p.at(0.7, 0.3), p.at(0.5, 0.5), p.at(0.3, 0.7), p.at(0.7, 0.7)];
    const edges: [number, number][] = [[0, 2], [1, 2], [3, 2], [4, 2], [0, 1], [3, 4]];
    return (
      <>
        {edges.map(([a, b]) => (
          <line key={`${a}${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#63c5ff" strokeOpacity={lit ? 0.8 : 0.3} className={lit ? "dash-flow" : ""} />
        ))}
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <ellipse cx={x} cy={y} rx={i === 2 ? 14 : 9} ry={i === 2 ? 7 : 4.5} fill={lit ? "#3b8cff" : "#12304f"} fillOpacity={lit ? 0.55 : 0.9} stroke={lit ? "#bfe6ff" : "#3b8cff"} strokeOpacity={lit ? 0.9 : 0.5} />
            <ellipse cx={x} cy={r1(y - 1)} rx={i === 2 ? 4 : 2.5} ry={i === 2 ? 2 : 1.3} fill="#dff3ff" opacity={lit ? 1 : 0.5} />
          </g>
        ))}
      </>
    );
  }
  // index 2 = Technical backbone: a grid of foundation blocks
  return (
    <>
      {[0.18, 0.4, 0.62].flatMap((s) =>
        [0.18, 0.4, 0.62].map((t) => <Block key={`${s}-${t}`} at={p.at} s={s} t={t} size={0.17} height={s === 0.4 && t === 0.4 ? 16 : 8} lit={lit} />),
      )}
    </>
  );
}

function Plane({ index, lit, dim }: { index: number; lit: boolean; dim: boolean }) {
  const p = plane(PLANE_Y[index]);
  const drop = (q: Pt): Pt => [q[0], q[1] + THICK];
  const grid = [0.2, 0.4, 0.6, 0.8];
  return (
    <g className="transition-opacity duration-500" opacity={dim ? 0.62 : 1}>
      {/* halo */}
      <polygon points={pts(p.top, p.right, p.bottom, p.left)} fill="#3b8cff" opacity={lit ? 0.35 : 0.08} filter="url(#la-blur)" className="transition-opacity duration-500" />
      {/* thickness */}
      <polygon points={pts(p.left, p.bottom, drop(p.bottom), drop(p.left))} fill="#0a1d33" stroke="#3b8cff" strokeOpacity={lit ? 0.7 : 0.3} strokeWidth="0.8" />
      <polygon points={pts(p.bottom, p.right, drop(p.right), drop(p.bottom))} fill="#07152a" stroke="#3b8cff" strokeOpacity={lit ? 0.7 : 0.3} strokeWidth="0.8" />
      {/* surface */}
      <polygon points={pts(p.top, p.right, p.bottom, p.left)} fill="url(#la-surface)" stroke={lit ? "#9fd8ff" : "#3b8cff"} strokeOpacity={lit ? 1 : 0.55} strokeWidth={lit ? 1.4 : 1} className="transition-[stroke] duration-500" />
      {grid.map((g) => {
        const a = p.at(g, 0);
        const b = p.at(g, 1);
        const c = p.at(0, g);
        const d = p.at(1, g);
        return (
          <g key={g} stroke="#63c5ff" strokeOpacity={lit ? 0.22 : 0.09}>
            <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
            <line x1={c[0]} y1={c[1]} x2={d[0]} y2={d[1]} />
          </g>
        );
      })}
      {/* corner nodes */}
      {[p.top, p.right, p.bottom, p.left].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.4" fill={lit ? "#dff3ff" : "#63c5ff"} opacity={lit ? 1 : 0.6} />
      ))}
      <Surface index={index} lit={lit} />
    </g>
  );
}

/** Order on screen (top → bottom) vs. data order (L1 → L3). */
const visualOrder = [2, 1, 0];

/**
 * The NURONE difference as one operating architecture: Technical Backbone at
 * the base, Agentic Operations on top of it, Growth Infrastructure above.
 * Signal flows upward through all three. Hover, focus or tap a layer.
 */
export function LayerArchitecture({
  intro,
  driven,
  onSelect,
}: {
  intro?: ReactNode;
  /** When set (by a scroll scene), the scene decides the active layer; "all" lights the whole system. */
  driven?: number | "all";
  onSelect?: (index: number) => void;
}) {
  const [own, setOwn] = useState(0); // data index into `layers`
  const all = driven === "all";
  const active = driven === undefined ? own : all ? 0 : driven;
  const layer = layers[active];
  const activeVisual = visualOrder.indexOf(active);
  const setActive = (i: number) => (driven === undefined ? setOwn(i) : undefined);

  const select = (i: number) => ({
    onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && setActive(i),
    onFocus: () => setActive(i),
    onClick: () => (onSelect ? onSelect(i) : setActive(i)),
    "aria-pressed": all || active === i,
    "aria-controls": "layer-readout",
  });

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-6">
      {/* Visual + labels */}
      <div className="relative order-2 lg:col-span-8">
        <div className="relative mx-auto grid max-w-[46rem] grid-cols-1 items-center sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <svg viewBox="0 0 500 600" className="w-full overflow-visible lg:max-h-[calc(100svh-10rem)]" role="img" aria-label="Three stacked layers: growth infrastructure on top of agentic operations on top of technical backbone, connected by a vertical signal.">
            <defs>
              <linearGradient id="la-surface" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#123459" stopOpacity="0.95" />
                <stop offset="1" stopColor="#06101d" stopOpacity="0.95" />
              </linearGradient>
              <filter id="la-blur" x="-20%" y="-40%" width="140%" height="180%">
                <feGaussianBlur stdDeviation="14" />
              </filter>
              <linearGradient id="la-beam" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor="#63c5ff" stopOpacity="0" />
                <stop offset="0.5" stopColor="#63c5ff" stopOpacity="0.9" />
                <stop offset="1" stopColor="#dff3ff" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* vertical axis with ticks */}
            <g stroke="#63c5ff" strokeOpacity="0.18">
              <line x1="22" y1="40" x2="22" y2="570" />
              {Array.from({ length: 27 }, (_, i) => (
                <line key={i} x1="22" y1={40 + i * 20} x2={i % 5 === 0 ? 34 : 28} y2={40 + i * 20} />
              ))}
            </g>

            {/* connectors between planes (corner risers) */}
            {[0, 1].map((k) => {
              const a = plane(PLANE_Y[k]);
              const b = plane(PLANE_Y[k + 1]);
              return (
                <g key={k} stroke="#63c5ff" strokeDasharray="2 5" strokeOpacity="0.35">
                  <line x1={a.left[0]} y1={a.left[1] + THICK} x2={b.left[0]} y2={b.left[1]} />
                  <line x1={a.right[0]} y1={a.right[1] + THICK} x2={b.right[0]} y2={b.right[1]} />
                  <line x1={a.bottom[0]} y1={a.bottom[1] + THICK} x2={b.bottom[0]} y2={b.bottom[1] - HALF_H * 0} />
                </g>
              );
            })}

            {/* planes, bottom first so upper layers overlap */}
            {[2, 1, 0].map((v) => (
              <Plane key={v} index={v} lit={all || v === activeVisual} dim={!all && v !== activeVisual} />
            ))}

            {/* central signal rising through the stack */}
            <line x1={CX} y1={PLANE_Y[2] + 40} x2={CX} y2={PLANE_Y[0] - 70} stroke="url(#la-beam)" strokeWidth="1.5" />
            <g className="packet">
              {[0, 1, 2].map((k) => (
                <circle key={k} r="2.6" fill="#dff3ff">
                  <animateMotion dur="3.6s" begin={`-${k * 1.2}s`} repeatCount="indefinite" path={`M${CX} ${PLANE_Y[2] + 40} V${PLANE_Y[0] - 70}`} />
                </circle>
              ))}
            </g>
          </svg>

          {/* Labels aligned to planes (desktop); list on mobile */}
          <ul className="mt-6 grid gap-2 sm:absolute sm:inset-y-0 sm:right-0 sm:mt-0 sm:block sm:w-[46%]">
            {visualOrder.map((dataIndex, v) => {
              const l = layers[dataIndex];
              const on = all || active === dataIndex;
              return (
                <li key={l.id} className="sm:absolute sm:inset-x-0 sm:-translate-y-1/2" style={{ top: `${(PLANE_Y[v] / 600) * 100}%` }}>
                  <button
                    type="button"
                    {...select(dataIndex)}
                    className={cn(
                      "group relative w-full border-l py-2 pr-2 pl-4 text-left transition-[border-color,background-color] duration-300",
                      on ? "border-signal-hi bg-signal/[0.06]" : "border-line-strong hover:border-signal/60",
                    )}
                  >
                    <span aria-hidden="true" className={cn("absolute top-1/2 -left-10 hidden h-px w-9 transition-colors sm:block", on ? "bg-signal-hi" : "bg-line-strong")} />
                    <span className="flex items-baseline gap-2">
                      <span className={cn("type-label transition-colors", on ? "text-signal-hi" : "text-dim")}>{l.index}</span>
                      <span className={cn("text-[0.9375rem] font-medium transition-colors", on ? "text-bone" : "text-bone/80")}>{l.name}</span>
                    </span>
                    <span className="mt-1.5 grid gap-0.5">
                      {l.components.map((c) => (
                        <span key={c} className={cn("flex items-center gap-2 text-[0.8125rem] transition-colors", on ? "text-mute" : "text-dim")}>
                          <span aria-hidden="true" className={cn("size-1 rounded-full", on ? "bg-signal-hi" : "bg-dim")} />
                          {c}
                        </span>
                      ))}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Intro + readout */}
      <div className="order-1 lg:col-span-4">
        {intro}
        {all ? (
          <div id="layer-readout" aria-live="polite" key="all" className="mt-10 border-t border-line pt-5">
            <p className="type-label enter flex justify-between text-dim">
              <span>
                <span className="text-signal-hi">L1 + L2 + L3</span> / Connected
              </span>
              <span>03 / 03</span>
            </p>
            <p className="enter mt-3 text-lg text-bone" style={{ ["--i" as string]: 1 }}>
              One connected execution system
            </p>
            <p className="enter mt-2 text-[0.875rem] leading-relaxed text-mute" style={{ ["--i" as string]: 2 }}>
              Software without growth becomes unused infrastructure. Growth without strong systems becomes chaos. NURONE connects product, technology, AI, operations, and revenue execution so the business can scale as one system.
            </p>
          </div>
        ) : (
        <div id="layer-readout" aria-live="polite" key={layer.id} className="mt-10 border-t border-line pt-5">
          <p className="type-label enter flex justify-between text-dim">
            <span>
              <span className="text-signal-hi">{layer.index}</span> / Inspect layer
            </span>
            <span>0{active + 1} / 03</span>
          </p>
          <p className="enter mt-3 text-lg text-bone" style={{ ["--i" as string]: 1 }}>
            {layer.name}
          </p>
          <p className="enter mt-2 text-[0.875rem] leading-relaxed text-mute" style={{ ["--i" as string]: 2 }}>
            {layer.does}
          </p>
          <p className="enter mt-3 text-[0.875rem] leading-relaxed text-bone/85" style={{ ["--i" as string]: 3 }}>
            <span className="type-label mr-2 text-dim">Outcome</span>
            {layer.outcome}
          </p>
          {layer.proof.length > 0 && (
            <p className="enter type-label mt-3 flex flex-wrap items-center gap-x-3 text-dim" style={{ ["--i" as string]: 4 }}>
              Proof
              {layer.proof.map((id) => (
                <a key={id} href="#work" onClick={() => selectCase(id)} className="group inline-flex items-center gap-1 py-2 text-signal-hi hover:text-bone">
                  {caseById[id].client}
                  <ArrowGlyph className="size-3 transition-transform group-hover:translate-x-0.5" />
                </a>
              ))}
            </p>
          )}
        </div>
        )}
      </div>
    </div>
  );
}
