import { cn } from "@/lib/cn";

/** Chapter folio: a number and a plain name, like a running head in a printed book. */
export function ChapterMark({ index, name, className }: { index: string; name: string; className?: string }) {
  return (
    <p className={cn("flex items-baseline gap-3 text-[0.9375rem]", className)}>
      <span className="font-mono text-[0.8125rem] tabular text-signal-hi">{index}</span>
      <span className="text-mute">{name}</span>
    </p>
  );
}

/**
 * A statement whose words light up as the frame progresses (static when unpinned).
 * `accent` words take the signal colour.
 */
export function LitWords({ text, className, offset = 0, total, accent = [] }: { text: string; className?: string; offset?: number; total?: number; accent?: string[] }) {
  const words = text.split(" ");
  return (
    <span className={className} style={{ ["--n" as string]: total ?? words.length + offset }}>
      {words.map((w, i) => (
        <span key={i} className={cn("word-lit", accent.includes(w.replace(/[.,]/g, "")) && "text-signal-hi")} style={{ ["--w" as string]: i + offset }}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
