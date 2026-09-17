import { Meter, Pill, Window } from "./primitives";

const matches = [
  { role: "Product Analyst", fit: 92 },
  { role: "Data Associate", fit: 84 },
  { role: "UX Researcher", fit: 71 },
];

/** HireKey: ATS scoring and job matching. */
export function CareerMatch() {
  const score = 86;
  const circumference = 2 * Math.PI * 34;
  return (
    <Window title="hirekey / profile" tabs={["Resume", "Matches", "Interview"]}>
      <div className="grid gap-5 @sm:grid-cols-[auto_1fr] @sm:items-center">
        <div className="flex items-center gap-4">
          <svg viewBox="0 0 80 80" className="size-20 -rotate-90" aria-hidden="true">
            <circle cx="40" cy="40" r="34" fill="none" stroke="var(--color-ink-800)" strokeWidth="6" />
            <circle cx="40" cy="40" r="34" fill="none" stroke="var(--color-signal-hi)" strokeWidth="6" strokeDasharray={`${(score / 100) * circumference} ${circumference}`} />
          </svg>
          <div>
            <p className="type-display text-3xl leading-none">{score}</p>
            <p className="type-label mt-1 text-mute">ATS score</p>
          </div>
        </div>
        <ul className="grid gap-3">
          {matches.map((m) => (
            <li key={m.role} className="grid gap-1.5">
              <span className="flex justify-between text-sm">
                <span>{m.role}</span>
                <span className="font-mono text-xs text-mute">{m.fit}%</span>
              </span>
              <Meter value={m.fit} />
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <Pill tone="live">Resume parsed</Pill>
        <Pill>3 applications tracked</Pill>
        <Pill tone="signal">Interview prep</Pill>
      </div>
    </Window>
  );
}
