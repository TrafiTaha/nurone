import { cn } from "@/lib/cn";
import { Pill, Window } from "./primitives";

const columns = [
  { name: "Intake", cards: ["Case #118"] },
  { name: "Documents", cards: ["Case #112", "Case #115"] },
  { name: "IRS", cards: ["Case #104"] },
  { name: "Resolution", cards: ["Case #097"] },
];

/** Remedy Tax: case management with agentic automation. */
export function CasePipeline() {
  return (
    <Window title="remedy / operating-layer" tabs={["Cases", "Knowledge", "Agents"]}>
      <div className="grid grid-cols-2 gap-2 @sm:grid-cols-4">
        {columns.map((col, i) => (
          <div key={col.name} className="min-w-0">
            <p className="type-label flex justify-between text-mute">
              <span className="truncate">{col.name}</span>
              <span>{col.cards.length}</span>
            </p>
            <ul className="mt-2 grid gap-1.5">
              {col.cards.map((c) => (
                <li key={c} className={cn("border px-2 py-2 text-xs", i === 1 ? "border-signal-hi/60 bg-signal/10" : "border-ink-800 bg-ink-900")}>
                  {c}
                  <span className="mt-1.5 block h-0.5 w-2/3 bg-ink-800" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-2 border-t border-ink-800 pt-4 font-mono text-xs">
        <p className="flex items-center gap-2">
          <Pill tone="signal">Agent</Pill>
          <span className="truncate text-mute">classified documents → Case #115</span>
        </p>
        <p className="flex items-center gap-2">
          <Pill>RAG</Pill>
          <span className="truncate text-mute">deadline found in IRS notice · reminder scheduled</span>
        </p>
      </div>
    </Window>
  );
}
