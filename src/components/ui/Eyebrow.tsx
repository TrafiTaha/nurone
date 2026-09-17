import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** A short section caption in plain sentence case. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-[0.9375rem] text-mute", className)}>{children}</p>;
}
