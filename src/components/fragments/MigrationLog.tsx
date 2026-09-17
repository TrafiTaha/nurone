import { Window } from "./primitives";

const steps = [
  { ok: true, text: "extract product from lovable-cloud" },
  { ok: true, text: "reconstruct database schema" },
  { ok: true, text: "migrate & rebuild files" },
  { ok: true, text: "deploy to production infrastructure" },
];

/** YouthSchedule: escaping a locked platform. */
export function MigrationLog() {
  return (
    <Window title="youthschedule / migration.log">
      <div className="font-mono text-[0.8125rem] leading-7">
        <p className="text-mute">
          <span className="text-signal-hi">$</span> nurone migrate --from lovable --to saas-infra
        </p>
        <ul>
          {steps.map((s, i) => (
            <li key={s.text} className="reveal flex gap-3" style={{ ["--i" as string]: i }}>
              <span className="text-live">✓</span>
              <span className="truncate">{s.text}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-mute">files</span>
          <span className="relative h-2 flex-1 bg-ink-800">
            <span className="draw-x absolute inset-0 bg-signal-hi" />
          </span>
          <span className="text-bone">300+ / 300+</span>
        </div>
        <p className="mt-3 text-live">● platform running on real SaaS infrastructure</p>
      </div>
    </Window>
  );
}
