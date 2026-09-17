import { cn } from "@/lib/cn";

/** A supporting paragraph. Kept as a component so intros share one measure and tone. */
export function BlurWords({ text, className }: { text: string; className?: string }) {
  return <p className={cn(className)}>{text}</p>;
}
