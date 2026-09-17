import { cn } from "@/lib/cn";

/** NURONE wordmark: set in Geist, with the N's diagonal carried by a signal stroke. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-bone", className)}>
      <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5 shrink-0">
        <path d="M3 17V3l14 14V3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M3 3l14 14" fill="none" stroke="var(--color-signal)" strokeWidth="2.4" />
      </svg>
      <span className="text-[1.0625rem] font-semibold tracking-[0.14em]">NURONE</span>
    </span>
  );
}
