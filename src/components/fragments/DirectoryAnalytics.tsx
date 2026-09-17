import { Pill, Window } from "./primitives";

const providers = ["Payroll & compliance", "Recruitment agencies", "HR software"];
const sources = [
  { k: "linkedin", v: 82 },
  { k: "google", v: 64 },
  { k: "newsletter", v: 41 },
  { k: "direct", v: 28 },
];

/** SG Solutions: B2B HR directory with UTM analytics. */
export function DirectoryAnalytics() {
  return (
    <Window title="sg-solutions / admin" tabs={["Directory", "Analytics", "Clicks"]}>
      <div className="grid gap-5 @sm:grid-cols-2">
        <div>
          <p className="type-label text-mute">Providers</p>
          <ul className="mt-2 divide-y divide-ink-800 border-y border-ink-800">
            {providers.map((p, i) => (
              <li key={p} className="flex items-center justify-between gap-2 py-2 text-sm">
                <span className="truncate">{p}</span>
                {i === 0 ? <Pill tone="signal">Featured</Pill> : <Pill>Listed</Pill>}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="type-label flex justify-between text-mute">
            <span>UTM sources</span>
            <span>visits</span>
          </p>
          <ul className="mt-3 flex h-24 items-end gap-2">
            {sources.map((s, i) => (
              <li key={s.k} className="flex h-full flex-1 flex-col justify-end gap-1.5">
                <span className="grow-y block bg-signal-hi" style={{ height: `${s.v}%`, ["--i" as string]: i }} />
                <span className="truncate text-center font-mono text-[0.6875rem] text-mute">{s.k}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-5 flex items-center gap-2 text-sm text-mute">
        <Pill>Roadmap</Pill> AI provider matching
      </p>
    </Window>
  );
}
