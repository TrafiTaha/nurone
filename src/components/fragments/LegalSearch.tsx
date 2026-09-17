import { Meter, Pill, Window } from "./primitives";

/** Ministry: RAG legal search across Arabic and French sources. */
export function LegalSearch() {
  return (
    <Window title="legal-ai / search" tabs={["Search", "Documents", "Policy"]}>
      <div className="flex items-center gap-3 border border-line-strong px-3 py-2.5">
        <span aria-hidden="true" className="type-label text-signal-hi">RAG</span>
        <span className="truncate text-sm">Conditions d&apos;habilitation des diplômes de master</span>
        <Pill>FR</Pill>
      </div>
      <ul className="mt-4 grid gap-3">
        {[
          { src: "Regulation · Article 12", text: "Les établissements doivent justifier…", score: 94, lang: "FR" },
          { src: "Circular · Section 4", text: "شروط التأهيل للمؤسسات الجامعية", score: 89, lang: "AR", rtl: true },
        ].map((r) => (
          <li key={r.src} className="grid gap-2 border-l border-signal-hi/60 pl-3">
            <span className="flex items-center justify-between gap-3">
              <span className="type-label text-mute">{r.src}</span>
              <span className="font-mono text-xs text-mute">{r.score}%</span>
            </span>
            <span className="text-sm" lang={r.lang.toLowerCase()} dir={r.rtl ? "rtl" : undefined}>
              {r.text}
            </span>
            <Meter value={r.score} />
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-mute">
        <span className="text-bone">Answer</span> grounded in 2 cited sources · AR / FR
      </p>
    </Window>
  );
}
