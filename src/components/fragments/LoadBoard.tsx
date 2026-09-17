import { Pill, Window } from "./primitives";

const loads = [
  { id: "TR-2041", route: "DAL → ATL", status: "In transit", eta: "14:20", tone: "live" as const },
  { id: "TR-2042", route: "HOU → MEM", status: "Assigned", eta: "Tomorrow", tone: "line" as const },
  { id: "TR-2043", route: "PHX → DEN", status: "AI import", eta: "Draft", tone: "signal" as const },
];

/** Trucking88: AI load creation and real-time tracking. */
export function LoadBoard() {
  return (
    <Window title="trucking88 / loads" tabs={["Board", "Map", "Drivers"]}>
      <div className="flex items-center justify-between gap-3 border border-dashed border-line-strong px-3 py-2.5 text-sm">
        <span className="truncate text-mute">
          <span className="text-bone">rate_confirmation.pdf</span> → AI import
        </span>
        <Pill tone="live">6 fields ✓</Pill>
      </div>
      <ul className="mt-4 divide-y divide-ink-800 border-y border-ink-800">
        {loads.map((l) => (
          <li key={l.id} className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 py-2.5 text-sm @sm:grid-cols-[5rem_1fr_6rem_auto]">
            <span className="font-mono text-xs text-mute">{l.id}</span>
            <span className="truncate">{l.route}</span>
            <span className="hidden font-mono text-xs text-mute @sm:block">{l.eta}</span>
            <Pill tone={l.tone}>{l.status}</Pill>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center gap-3">
        <span className="type-label text-mute">Live</span>
        <span className="relative h-px flex-1 bg-line-strong">
          <span className="flow-x absolute -top-[3px] size-[7px] bg-live" />
        </span>
        <span className="type-label text-mute">ATL</span>
      </div>
    </Window>
  );
}
