import { Meter, Pill, Window } from "./primitives";

const note = [
  { k: "S", text: "Sharp lower back pain for 3 days, worse when sitting.", c: 96 },
  { k: "O", text: "Limited flexion. No neurological deficit noted.", c: 91 },
  { k: "A", text: "Acute mechanical low back pain.", c: 88 },
  { k: "P", text: "Physiotherapy referral. Review in 2 weeks.", c: 93 },
];

/** MediForm AI: conversation to structured SOAP note with confidence scoring. */
export function SoapNote() {
  return (
    <Window title="mediform / encounter" tabs={["Note", "Transcript", "EHR"]}>
      <div className="grid gap-4 @sm:grid-cols-[0.8fr_1.2fr]">
        <div className="grid content-start gap-2 text-sm">
          <p className="type-label flex items-center gap-2 text-mute">
            <span className="pulse size-1.5 bg-live" /> Listening
          </p>
          <p className="border-l border-line-strong pl-3 text-mute">&ldquo;It started on Tuesday, mostly when I sit…&rdquo;</p>
          <p className="border-l border-signal-hi pl-3 text-bone">&ldquo;Any numbness or tingling in the legs?&rdquo;</p>
        </div>
        <ul className="grid gap-2.5">
          {note.map((row) => (
            <li key={row.k} className="grid grid-cols-[1.5rem_1fr_2.75rem] items-center gap-3">
              <span className="type-display text-base text-signal-hi">{row.k}</span>
              <span className="truncate text-sm">{row.text}</span>
              <span className="grid gap-1">
                <span className="text-right font-mono text-[0.6875rem] text-mute">{row.c}%</span>
                <Meter value={row.c} />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-ink-800 pt-4">
        <Pill tone="live">Human review ✓</Pill>
        <Pill tone="bone">Send to EHR →</Pill>
      </div>
    </Window>
  );
}
