import type { CapabilityId } from "@/content/system";

/* The hero system is drawn on a 640 × 560 canvas; HTML layers are placed in % of it. */
export const W = 640;
export const H = 560;
export const CX = 320;
export const CY = 282;
export const CORE_R = 78;

export type Orbit = { rx: number; ry: number; tilt: number };

/** Round to 2 decimals so server (Node) and client (browser) trig produce identical markup. */
export const r2 = (n: number) => Math.round(n * 100) / 100;

/** Point at `radius` and `deg` around the system centre, rounded for hydration safety. */
export const polar = (radius: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: r2(CX + Math.cos(a) * radius), y: r2(CY + Math.sin(a) * radius) };
};

/** Two tilted orbits crossing, like the concept: a wide shallow one and a taller steep one. */
export const ORBIT_A: Orbit = { rx: 292, ry: 142, tilt: -16 };
export const ORBIT_B: Orbit = { rx: 214, ry: 238, tilt: 28 };

export function pointOn(o: Orbit, tDeg: number) {
  const t = (tDeg * Math.PI) / 180;
  const a = (o.tilt * Math.PI) / 180;
  const x = o.rx * Math.cos(t);
  const y = o.ry * Math.sin(t);
  return { x: r2(CX + x * Math.cos(a) - y * Math.sin(a)), y: r2(CY + x * Math.sin(a) + y * Math.cos(a)) };
}

export const ellipsePath = (o: Orbit) =>
  `M${CX - o.rx} ${CY}a${o.rx} ${o.ry} 0 1 0 ${o.rx * 2} 0a${o.rx} ${o.ry} 0 1 0 ${-o.rx * 2} 0`;

/** Node placement mirrors the concept: Product top, Engineering upper right, AI right, Operations lower right, Growth lower left, Automation left. */
const placement: { id: CapabilityId; orbit: Orbit; t: number }[] = [
  { id: "product", orbit: ORBIT_B, t: -128 },
  { id: "engineering", orbit: ORBIT_A, t: -38 },
  { id: "ai", orbit: ORBIT_A, t: 6 },
  { id: "operations", orbit: ORBIT_B, t: 36 },
  { id: "growth", orbit: ORBIT_A, t: 118 },
  { id: "automation", orbit: ORBIT_A, t: 186 },
];

export const nodes = placement.map((p) => {
  const pos = pointOn(p.orbit, p.t);
  const angle = Math.atan2(pos.y - CY, pos.x - CX);
  return {
    id: p.id,
    x: pos.x,
    y: pos.y,
    /** Connection starts just outside the core. */
    sx: r2(CX + Math.cos(angle) * (CORE_R + 14)),
    sy: r2(CY + Math.sin(angle) * (CORE_R + 14)),
  };
});

/** Deterministic data points so server and client render identically. */
export const dataPoints = (() => {
  let s = 42;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  return Array.from({ length: 34 }, () => {
    const r = 110 + rnd() * 200;
    const a = rnd() * Math.PI * 2;
    return { x: r2(CX + Math.cos(a) * r * 1.05), y: r2(CY + Math.sin(a) * r * 0.82), size: rnd() > 0.8 ? 1.6 : 1, delay: r2(rnd() * 6) };
  });
})();

export const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(3)}%`;
