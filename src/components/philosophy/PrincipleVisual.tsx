import type { CSSProperties } from "react";
import type { Principle } from "@/content/philosophy";

/*
 * Each principle is drawn as a transformation from the lesser model to the NURONE model.
 * Everything is driven by --t (0 → 1) from the enclosing scroll frame, so the drawing is
 * scrubbed by scroll and fully resolved when the scene isn't pinned.
 */

const W = 420;
const H = 320;
const CX = W / 2;
const CY = H / 2;

const r1 = (n: number) => Math.round(n * 10) / 10;
/** Move from an offset back to the resting position as --t goes 0 → 1. */
const settle = (dx: number, dy: number): CSSProperties => ({
  translate: `calc(${r1(dx)}px * (1 - var(--t, 1))) calc(${r1(dy)}px * (1 - var(--t, 1)))`,
  transition: "translate 0.3s linear",
});
const fadeIn = (from = 0): CSSProperties => ({ opacity: `calc(${from} + (1 - ${from}) * var(--t, 1))`, transition: "opacity 0.3s linear" });
const fadeOut = (to = 0): CSSProperties => ({ opacity: `calc(1 - (1 - ${to}) * var(--t, 1))`, transition: "opacity 0.3s linear" });
const draw = (len: number): CSSProperties => ({
  strokeDasharray: len,
  strokeDashoffset: `calc(${len} * (1 - var(--t, 1)))`,
  transition: "stroke-dashoffset 0.3s linear",
});

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className="h-auto w-full overflow-visible">
      <g stroke="#63c5ff" strokeOpacity="0.08">
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`v${i}`} x1={(i + 1) * (W / 9)} y1="0" x2={(i + 1) * (W / 9)} y2={H} />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={(i + 1) * (H / 7)} x2={W} y2={(i + 1) * (H / 7)} />
        ))}
      </g>
      {children}
    </svg>
  );
}

/** Systems > Services: scattered tasks gather into one connected system. */
function Systems() {
  const ring = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    return [r1(CX + Math.cos(a) * 112), r1(CY + Math.sin(a) * 100)] as const;
  });
  const scatter = [
    [-120, -40],
    [150, -60],
    [170, 70],
    [-40, 110],
    [-170, 60],
    [-150, -110],
  ];
  return (
    <Frame label="Isolated tasks gather into a connected, coordinated system.">
      {ring.map(([x, y], i) => {
        const [nx, ny] = ring[(i + 1) % ring.length];
        return (
          <g key={`e${i}`} stroke="#63c5ff" strokeWidth="1" style={fadeIn()}>
            <line x1={x} y1={y} x2={nx} y2={ny} strokeOpacity="0.5" />
            <line x1={x} y1={y} x2={CX} y2={CY} strokeOpacity="0.28" strokeDasharray="3 5" />
          </g>
        );
      })}
      <g style={fadeIn(0)}>
        <circle cx={CX} cy={CY} r="34" fill="#3b8cff" fillOpacity="0.12" stroke="#63c5ff" strokeOpacity="0.8" />
        <circle cx={CX} cy={CY} r="5" fill="#dff3ff" />
      </g>
      {ring.map(([x, y], i) => (
        <g key={i} style={settle(scatter[i][0] * 0.55 + (CX - x) * 0.2, scatter[i][1] * 0.55)}>
          <rect x={x - 22} y={y - 13} width="44" height="26" rx="3" fill="#07111c" stroke="#63c5ff" strokeOpacity="0.55" />
          <rect x={x - 12} y={y - 3} width="24" height="2" fill="#63c5ff" opacity="0.6" />
          <rect x={x - 12} y={y + 2} width="14" height="2" fill="#63c5ff" opacity="0.35" />
        </g>
      ))}
    </Frame>
  );
}

/** Leverage > Headcount: a crowd of seats resolves into a few operators amplified by AI and automation. */
function Leverage() {
  const seats = Array.from({ length: 20 }, (_, i) => [60 + (i % 5) * 26, 70 + Math.floor(i / 5) * 46] as const);
  const operators = [
    [110, 90],
    [110, 230],
  ] as const;
  const kept = [6, 16];
  return (
    <Frame label="Many seats give way to expert operators amplified by AI and automation.">
      {seats.map(([x, y], i) =>
        kept.includes(i) ? null : (
          <g key={i} style={fadeOut(0.06)}>
            <circle cx={x} cy={y - 7} r="5" fill="none" stroke="#93a3bb" strokeOpacity="0.6" />
            <path d={`M${x - 9} ${y + 10} q9 -12 18 0`} fill="none" stroke="#93a3bb" strokeOpacity="0.6" />
          </g>
        ),
      )}
      {operators.map(([x, y], i) => {
        const [sx, sy] = seats[kept[i]];
        return (
          <g key={i} style={settle(sx - x, sy - y)}>
            <circle cx={x} cy={y - 8} r="7" fill="none" stroke="#bfe6ff" />
            <path d={`M${x - 12} ${y + 12} q12 -16 24 0`} fill="none" stroke="#bfe6ff" />
          </g>
        );
      })}
      {operators.map(([x, y], i) => (
        <path key={`l${i}`} d={`M${x + 20} ${y} C ${x + 70} ${y}, 200 ${CY}, 240 ${CY}`} fill="none" stroke="#63c5ff" strokeOpacity="0.6" style={draw(160)} />
      ))}
      <g style={fadeIn()}>
        <rect x="240" y={CY - 30} width="60" height="60" rx="6" fill="#3b8cff" fillOpacity="0.14" stroke="#63c5ff" />
        <text x="270" y={CY + 4} textAnchor="middle" fill="#dff3ff" fontSize="13" fontFamily="var(--font-geist-mono)" letterSpacing="1">
          AI
        </text>
      </g>
      {[-60, -20, 20, 60].map((dy, i) => (
        <g key={i}>
          <line x1="300" y1={CY} x2="388" y2={CY + dy} stroke="#63c5ff" strokeOpacity="0.5" style={draw(100)} />
          <circle cx="392" cy={CY + dy} r="4" fill="#63c5ff" style={fadeIn()} />
        </g>
      ))}
    </Frame>
  );
}

/** Foundations > Firefighting: scattered, broken pieces settle into stacked foundation layers. */
function Foundations() {
  const layers = [0, 1, 2];
  const sparks = [
    [80, 70],
    [150, 120],
    [300, 60],
    [350, 150],
    [110, 200],
    [260, 110],
  ];
  return (
    <Frame label="Scattered fires give way to three stable foundation layers that carry what comes next.">
      {sparks.map(([x, y], i) => (
        <path key={i} d={`M${x} ${y + 14} l6 -14 4 8 5 -16 5 22`} fill="none" stroke="#93a3bb" strokeOpacity="0.7" strokeLinejoin="round" style={fadeOut(0)} />
      ))}
      {layers.map((l) => {
        const y = 250 - l * 44;
        const w = 300 - l * 50;
        return (
          <g key={l} style={{ ...settle((l - 1) * 70, -80 - l * 30), ...fadeIn(0.15) }}>
            <rect x={CX - w / 2} y={y} width={w} height="30" rx="2" fill="#0d1a28" stroke="#63c5ff" strokeOpacity={0.8 - l * 0.15} />
            <line x1={CX - w / 2 + 12} y1={y + 15} x2={CX + w / 2 - 12} y2={y + 15} stroke="#63c5ff" strokeOpacity="0.25" strokeDasharray="2 6" />
          </g>
        );
      })}
      <g style={fadeIn()}>
        <line x1={CX} y1="150" x2={CX} y2="60" stroke="#63c5ff" strokeOpacity="0.7" />
        <path d={`M${CX - 7} 70 l7 -12 7 12`} fill="none" stroke="#dff3ff" />
      </g>
    </Frame>
  );
}

/** Outcomes > Activity: busy noise straightens into one line that moves forward. */
function Outcomes() {
  const noise = Array.from({ length: 36 }, (_, i) => {
    const x = 30 + i * 10;
    const y = 190 + Math.sin(i * 1.7) * 26 + Math.cos(i * 2.9) * 18;
    return `${i === 0 ? "M" : "L"}${x} ${r1(y)}`;
  }).join(" ");
  const ticks = Array.from({ length: 12 }, (_, i) => 40 + i * 30);
  return (
    <Frame label="Noisy activity resolves into one clean line moving forward.">
      {ticks.map((x, i) => (
        <rect key={i} x={x} y={i % 2 ? 250 : 262} width="18" height="6" rx="1" fill="#93a3bb" style={fadeOut(0.08)} />
      ))}
      <path d={noise} fill="none" stroke="#93a3bb" strokeOpacity="0.6" style={fadeOut(0.05)} />
      <path d="M30 250 C 150 240, 230 180, 380 70" fill="none" stroke="#63c5ff" strokeWidth="2" style={draw(420)} />
      <g style={fadeIn()}>
        <circle cx="380" cy="70" r="6" fill="#dff3ff" />
        <circle cx="380" cy="70" r="16" fill="none" stroke="#63c5ff" strokeOpacity="0.4" />
      </g>
    </Frame>
  );
}

const visuals = { systems: Systems, leverage: Leverage, foundations: Foundations, outcomes: Outcomes };

export function PrincipleVisual({ id }: { id: Principle["id"] }) {
  const Visual = visuals[id];
  return <Visual />;
}
