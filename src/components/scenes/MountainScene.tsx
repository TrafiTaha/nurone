import type { CSSProperties } from "react";

const depth = (px: number) => ({ ["--depth" as string]: `${px}px` }) as CSSProperties;

/** Deterministic pseudo-random generator so the server and client draw the same ridge. */
function random(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Midpoint-displacement ridgeline across `width`, returned as rounded SVG points. */
function ridge(seed: number, width: number, base: number, roughness: number, peakAt?: { x: number; y: number; spread: number }) {
  const rnd = random(seed);
  let pts: [number, number][] = [
    [0, base + (rnd() - 0.5) * roughness],
    [width, base + (rnd() - 0.5) * roughness],
  ];
  let spread = roughness;
  for (let pass = 0; pass < 7; pass++) {
    const next: [number, number][] = [pts[0]];
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      next.push([(x0 + x1) / 2, (y0 + y1) / 2 + (rnd() - 0.5) * spread], pts[i]);
    }
    pts = next;
    spread *= 0.55;
  }
  if (peakAt) {
    pts = pts.map(([x, y]) => {
      const d = Math.abs(x - peakAt.x) / peakAt.spread;
      // Smooth falloff so the summit reads as a mountain, not a spike.
      return [x, d < 1 ? y + (peakAt.y - y) * (0.5 + 0.5 * Math.cos(Math.PI * d)) * 0.9 : y];
    });
  }
  return pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
}

const W = 1440;

type MountainSceneProps = {
  className?: string;
  /** Horizontal position of the light beam, 0–1. */
  beam?: number;
  /** Show the beam on small screens (only where it can't cross text). */
  beamOnMobile?: boolean;
  /** Taller, more dramatic ridges for standalone panels. */
  tall?: boolean;
  /** Unique prefix for SVG gradient ids (the scene can appear more than once per page). */
  id: string;
};

/**
 * Cinematic closing/manifesto plate: layered ridgelines under a single vertical
 * beam of signal, the system's light reaching the horizon. Pure SVG + CSS.
 */
export function MountainScene({ className, beam = 0.5, beamOnMobile = false, tall = false, id }: MountainSceneProps) {
  const far = ridge(7, W, 150, tall ? 150 : 110);
  const near = ridge(19, W, 205, tall ? 120 : 110, { x: W * beam, y: tall ? 40 : 95, spread: tall ? 330 : 520 });
  const beamVisibility = beamOnMobile ? "block" : "hidden lg:block";
  const pct = `${beam * 100}%`;

  return (
    <div aria-hidden="true" className={className}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 85% at ${pct} 100%, #10294a 0%, #081524 50%, #050b12 100%)` }} />
      {/* faint stars */}
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-1/2 w-full">
        {[[8, 12], [22, 6], [35, 18], [48, 9], [61, 22], [74, 5], [86, 15], [93, 28], [15, 30], [55, 34]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="0.18" fill="#cfe6ff" className="twinkle" style={{ animationDelay: `${i * 0.6}s` }} />
        ))}
      </svg>

      {/* beam */}
      <div className={`absolute top-0 ${tall ? "bottom-[46%]" : "bottom-[33%]"} w-px bg-gradient-to-b from-transparent via-signal-hi/60 to-[#dff3ff] ${beamVisibility}`} style={{ left: pct }} />
      <div className={`breathe absolute ${tall ? "bottom-[30%]" : "bottom-[16%]"} h-[70%] w-[22rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(59_140_255/0.24),transparent)] ${beamVisibility}`} style={{ left: pct }} />

      <div className={`parallax absolute inset-x-0 bottom-0 ${tall ? "h-[64%]" : "h-[62%]"}`} style={depth(10)}>
        <svg viewBox={`0 0 ${W} 300`} preserveAspectRatio="none" className="absolute inset-0 size-full">
          <defs>
            <linearGradient id={`${id}-far`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#15304f" />
              <stop offset="0.7" stopColor="#081626" />
            </linearGradient>
          </defs>
          <polygon points={`${far} ${W} 300 0 300`} fill={`url(#${id}-far)`} opacity="0.9" />
          <polyline points={far} fill="none" stroke="#63c5ff" strokeOpacity="0.14" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <div className={`parallax absolute inset-x-0 bottom-0 ${tall ? "h-[54%]" : "h-[48%]"}`} style={depth(20)}>
        <svg viewBox={`0 0 ${W} 300`} preserveAspectRatio="none" className="absolute inset-0 size-full">
          <defs>
            <linearGradient id={`${id}-near`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0e2138" />
              <stop offset="0.6" stopColor="#050b12" />
            </linearGradient>
            <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="0">
              <stop offset={Math.max(0, beam - 0.18)} stopColor="#63c5ff" stopOpacity="0" />
              <stop offset={beam} stopColor="#9fd8ff" stopOpacity="0.9" />
              <stop offset={Math.min(1, beam + 0.18)} stopColor="#63c5ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`${near} ${W} 300 0 300`} fill={`url(#${id}-near)`} />
          <polyline points={near} fill="none" stroke={`url(#${id}-rim)`} strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  );
}
