"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { caseById } from "@/content/cases";
import { capabilityById, type CapabilityId } from "@/content/system";
import { cn } from "@/lib/cn";
import { hasFinePointer, prefersReducedMotion, selectCase } from "@/lib/motion";
import { WarpStreaks } from "@/components/scenes/WarpStreaks";
import { CapabilityIcon } from "@/components/ui/CapabilityIcon";
import { CX, CY, CORE_R, H, ORBIT_A, ORBIT_B, W, dataPoints, ellipsePath, nodes, pct, polar, r2 } from "./orbital-geometry";

/** Parallax depth per layer, driven by pointer position (CSS variables, no re-render). */
const depth = (px: number): CSSProperties => ({
  transform: `translate3d(calc(var(--mx, 0) * ${px}px), calc(var(--my, 0) * ${px}px), 0)`,
  transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
});

/**
 * The NURONE execution system: one core, six capabilities on two crossing orbits.
 * Hover, focus or tap a capability to trace its connection into the core.
 */
export function OrbitalSystem() {
  const [active, setActive] = useState<CapabilityId | null>(null);
  const root = useRef<HTMLDivElement>(null);
  // Touch: focus fires before click, so remember whether the node was active at pointer-down.
  const wasActive = useRef(false);
  const current = active ? capabilityById[active] : null;

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = root.current;
    if (!el || e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  const onPointerLeave = () => {
    if (hasFinePointer()) setActive(null);
    root.current?.style.setProperty("--mx", "0");
    root.current?.style.setProperty("--my", "0");
  };

  return (
    <div ref={root} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className="relative">
      <p className="sr-only">
        Diagram: the NURONE core connected to six capabilities on two orbits: product, engineering, AI, automation,
        operations and growth. Select a capability to see what it does.
      </p>

      <div className="relative mx-auto w-full max-w-[42rem]" style={{ aspectRatio: `${W} / ${H}` }}>
        {/* L1 — technical grid + polar dial */}
        <div aria-hidden="true" className="grid-in absolute inset-0" style={depth(-12)}>
          <div className="dot-grid absolute -inset-[8%] opacity-70 [mask-image:radial-gradient(closest-side,black_30%,transparent)]" />
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible">
            {[150, 205, 262].map((r) => (
              <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke="rgb(99 197 255 / 0.05)" />
            ))}
            {Array.from({ length: 72 }, (_, i) => {
              const from = polar(262, i * 5);
              const to = polar(i % 6 === 0 ? 274 : 268, i * 5);
              return <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="rgb(99 197 255 / 0.12)" />;
            })}
          </svg>
        </div>

        {/* L2 — atmospheric light behind the core */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={depth(-6)}>
          <div className="absolute top-1/2 left-1/2 aspect-square w-[85%] -translate-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(59_140_255/0.2),rgb(59_140_255/0.06)_45%,transparent)]" />
        </div>

        {/* L2b — data streaking into the core */}
        <div aria-hidden="true" className="pointer-events-none absolute -inset-[10%]" style={depth(-8)}>
          <WarpStreaks density={1.3} className="size-full [mask-image:radial-gradient(closest-side,transparent_22%,black_45%,transparent_95%)]" />
        </div>

        {/* L3–L6 — data points, orbits, inner ring, connections */}
        <svg aria-hidden="true" viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible" style={depth(-3)}>
          <defs>
            <linearGradient id="orbit-a" x1="0" y1="0.2" x2="1" y2="0.8">
              <stop offset="0" stopColor="#63c5ff" stopOpacity="0.9" />
              <stop offset="0.35" stopColor="#3b8cff" stopOpacity="0.25" />
              <stop offset="0.7" stopColor="#3b8cff" stopOpacity="0.2" />
              <stop offset="1" stopColor="#63c5ff" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="orbit-b" x1="0.2" y1="0" x2="0.8" y2="1">
              <stop offset="0" stopColor="#3b8cff" stopOpacity="0.15" />
              <stop offset="0.5" stopColor="#63c5ff" stopOpacity="0.55" />
              <stop offset="1" stopColor="#3b8cff" stopOpacity="0.12" />
            </linearGradient>
            <filter id="soft-glow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {dataPoints.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={p.size} fill="#9fd8ff" className="twinkle" style={{ animationDelay: `${p.delay}s` }} />
          ))}

          {/* Orbit B (steep) */}
          <g transform={`rotate(${ORBIT_B.tilt} ${CX} ${CY})`}>
            <path id="orbit-b-path" d={ellipsePath(ORBIT_B)} fill="none" stroke="url(#orbit-b)" strokeWidth="1" pathLength={1000} strokeDasharray="1000" className="draw-ring" style={{ ["--i" as string]: 1 }} />
            <g className="packet">
              <circle r="2" fill="#9fd8ff">
                <animateMotion dur="34s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                  <mpath href="#orbit-b-path" />
                </animateMotion>
              </circle>
            </g>
          </g>

          {/* Orbit A (wide) with a luminous under-stroke */}
          <g transform={`rotate(${ORBIT_A.tilt} ${CX} ${CY})`}>
            <path d={ellipsePath(ORBIT_A)} fill="none" stroke="url(#orbit-a)" strokeWidth="3" opacity="0.45" filter="url(#soft-glow)" className="grid-in" />
            <path id="orbit-a-path" d={ellipsePath(ORBIT_A)} fill="none" stroke="url(#orbit-a)" strokeWidth="1.2" pathLength={1000} strokeDasharray="1000" className="draw-ring" />
            <g className="packet">
              {[0, 1, 2].map((k) => (
                <circle key={k} r={k === 0 ? 2.8 : 1.8} fill={k === 0 ? "#dff3ff" : "#63c5ff"}>
                  <animateMotion dur="22s" begin={`-${k * 7.3}s`} repeatCount="indefinite">
                    <mpath href="#orbit-a-path" />
                  </animateMotion>
                </circle>
              ))}
            </g>
          </g>

          {/* Inner rotating ring */}
          <g className="spin-slow" style={{ transformOrigin: `${CX}px ${CY}px` }}>
            <circle cx={CX} cy={CY} r={CORE_R + 30} fill="none" stroke="rgb(99 197 255 / 0.22)" strokeDasharray="1 7" />
            {[0, 120, 240].map((deg) => {
              const p = polar(CORE_R + 30, deg);
              return <circle key={deg} cx={p.x} cy={p.y} r="2.2" fill="#63c5ff" />;
            })}
          </g>

          {/* Connections */}
          {nodes.map((n) => {
            const lit = active === n.id;
            return (
              <g key={n.id} className="transition-opacity duration-500" opacity={active && !lit ? 0.3 : 1}>
                <line x1={n.sx} y1={n.sy} x2={n.x} y2={n.y} stroke="rgb(99 197 255 / 0.16)" />
                <line x1={n.sx} y1={n.sy} x2={n.x} y2={n.y} stroke="#63c5ff" strokeWidth="3" filter="url(#soft-glow)" className={cn("transition-opacity duration-300", lit ? "opacity-70" : "opacity-0")} />
                <line x1={n.sx} y1={n.sy} x2={n.x} y2={n.y} stroke="#9fd8ff" strokeWidth="1.2" className={cn("dash-flow transition-opacity duration-300", lit ? "opacity-100" : "opacity-0")} />
                <circle cx={n.sx} cy={n.sy} r={lit ? 3 : 1.8} fill={lit ? "#9fd8ff" : "rgb(99 197 255 / 0.4)"} />
              </g>
            );
          })}
        </svg>

        {/* L7 — core */}
        <div aria-hidden="true" className="absolute" style={{ left: pct(CX - CORE_R, W), top: pct(CY - CORE_R, H), width: pct(CORE_R * 2, W), height: pct(CORE_R * 2, H), ...depth(3) }}>
          <div className={cn("core-in relative size-full transition-transform duration-700 ease-expo", active && "scale-[1.03]")}>
            <div className={cn("breathe absolute -inset-[45%] rounded-full bg-[radial-gradient(closest-side,rgb(59_140_255/0.32),transparent)] transition-opacity duration-500", active ? "opacity-100" : "opacity-75")} />
            <div
              className={cn(
                "absolute inset-0 rounded-full bg-[radial-gradient(circle_at_34%_28%,#2b5d97_0%,#123256_28%,#081a2e_58%,#040a12_100%)] transition-shadow duration-500",
                active
                  ? "shadow-[0_0_70px_rgb(59_140_255/0.45),inset_0_0_0_1px_rgb(159_216_255/0.75),inset_-14px_-18px_36px_rgb(59_140_255/0.5)]"
                  : "shadow-[0_0_50px_rgb(59_140_255/0.3),inset_0_0_0_1px_rgb(99_197_255/0.45),inset_-12px_-16px_32px_rgb(59_140_255/0.38)]",
              )}
            />
            <svg viewBox="0 0 160 160" className="absolute inset-0 size-full">
              <defs>
                <clipPath id="core-clip">
                  <circle cx="80" cy="80" r="79" />
                </clipPath>
              </defs>
              <g clipPath="url(#core-clip)" fill="none" stroke="rgb(159 216 255 / 0.12)">
                {[-44, -22, 0, 22, 44].map((dy) => (
                  <ellipse key={dy} cx="80" cy={80 + dy} rx={r2(Math.sqrt(79 * 79 - dy * dy))} ry={7} />
                ))}
                {[20, 42, 64].map((rx) => (
                  <ellipse key={rx} cx="80" cy="80" rx={rx} ry="79" />
                ))}
              </g>
              <path d="M28 58a56 56 0 0 1 58-38" fill="none" stroke="rgb(255 255 255 / 0.45)" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M130 108a56 56 0 0 1-40 38" fill="none" stroke="rgb(99 197 255 / 0.9)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <span className="block text-[clamp(0.75rem,2.1vw,1.1875rem)] font-medium tracking-[0.16em] text-bone">NURONE</span>
                <span key={active ?? "core"} className="type-label enter mt-1 hidden text-signal-hi sm:block">
                  {current ? `↳ ${current.name}` : "Core"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* L8 — capability nodes (above the core so hover cards never hide behind it) */}
        <ul className="absolute inset-0" style={depth(7)}>
          {nodes.map((n, i) => {
            const cap = capabilityById[n.id];
            const on = active === n.id;
            const xr = n.x / W;
            const side = xr > 0.78 ? "right" : xr < 0.22 ? "left" : "center";
            const above = n.y / H > 0.62;
            return (
              <li key={n.id} className="node-in absolute" style={{ left: pct(n.x, W), top: pct(n.y, H), transform: "translate(-50%, -50%)", ["--i" as string]: i }}>
                <button
                  type="button"
                  aria-pressed={on}
                  aria-describedby="orbital-readout"
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(n.id)}
                  onFocus={() => setActive(n.id)}
                  onPointerDown={() => {
                    wasActive.current = active === n.id;
                  }}
                  onClick={() => setActive(wasActive.current && !hasFinePointer() ? null : n.id)}
                  className={cn("group relative block rounded-full transition-[opacity,scale] duration-500 ease-expo", on ? "scale-110" : "scale-100", active && !on && "opacity-55")}
                >
                  <span aria-hidden="true" className={cn("absolute -inset-2 rounded-full border transition-[border-color,opacity] duration-500", on ? "border-signal-hi/50 opacity-100" : "border-signal/20 opacity-60 group-hover:opacity-100")} />
                  <span
                    className={cn(
                      "relative grid size-10 place-items-center rounded-full border bg-[radial-gradient(circle_at_35%_30%,#15314f,#07111c_70%)] transition-[border-color,color,box-shadow] duration-500 sm:size-[3.25rem]",
                      on
                        ? "border-signal-hi text-signal-hi shadow-[0_0_28px_rgb(59_140_255/0.55),inset_0_0_12px_rgb(99_197_255/0.25)]"
                        : "border-signal/60 text-[#bfe6ff] shadow-[0_0_18px_rgb(59_140_255/0.25)] group-hover:border-signal-hi/80",
                    )}
                  >
                    <CapabilityIcon id={n.id} className="size-[18px] sm:size-[22px]" />
                    <span aria-hidden="true" className={cn("absolute -top-0.5 -right-0.5 size-2 rounded-full border border-ink-950 transition-colors", on ? "bg-signal-hi" : "bg-signal/70")} />
                  </span>
                  <span
                    className={cn(
                      "absolute top-full mt-2.5 text-xs font-medium whitespace-nowrap transition-colors duration-300 sm:text-sm",
                      side === "center" && "left-1/2 -translate-x-1/2",
                      side === "right" && "right-0",
                      side === "left" && "left-0",
                      on ? "text-signal-hi" : "text-[#bfe6ff]/90",
                    )}
                  >
                    {cap.name}
                  </span>
                </button>

                {/* Contextual detail (desktop) */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute z-10 hidden w-52 rounded-sm border border-signal/35 bg-ink-950/90 px-3.5 py-3 text-left backdrop-blur-md transition-[opacity,translate] duration-300 ease-expo lg:block",
                    above ? "bottom-full mb-5" : "top-full mt-12",
                    side === "right" ? "right-0" : side === "left" ? "left-0" : "left-1/2 -translate-x-1/2",
                    on ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
                  )}
                >
                  <p className="type-label flex justify-between text-dim">
                    <span className="text-signal-hi">{cap.index}</span>
                    <span>Linked to core</span>
                  </p>
                  <p className="mt-1.5 text-[0.8125rem] leading-snug text-bone">{cap.tags}</p>
                </div>
              </li>
            );
          })}
        </ul>

      </div>

      {/* L10 — interactive readout */}
      <div id="orbital-readout" aria-live="polite" className="mt-6 grid gap-2 border-t border-line pt-5 sm:grid-cols-[9rem_1fr] sm:gap-6 lg:ml-auto lg:max-w-[34rem]">
        <p className="type-label flex items-center gap-2 text-signal-hi">
          {current ? `Trace / ${current.index}` : "6 capabilities"}
        </p>
        <div key={current?.id ?? "idle"} className="enter">
          <p className="text-[0.9375rem] leading-relaxed text-bone">
            {current ? (
              <>
                <span className="font-medium">{current.name}.</span> <span className="text-mute">{current.line}</span>
              </>
            ) : (
              <>
                One execution system.{" "}
                <span className="text-mute">
                  <span className="[@media(hover:none)]:hidden">Hover</span>
                  <span className="[@media(hover:hover)]:hidden">Tap</span> a capability to trace it.
                </span>
              </>
            )}
          </p>
          {current && current.proof.length > 0 && (
            <p className="type-label mt-1 flex flex-wrap items-center gap-x-2 text-dim">
              In production at
              {current.proof.map((cid) => (
                <a key={cid} href="#work" onClick={() => selectCase(cid)} className="inline-block px-1 py-3 text-signal-hi underline decoration-signal-hi/40 underline-offset-4 hover:decoration-signal-hi">
                  {caseById[cid].client.split(" ")[0]}
                </a>
              ))}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
