import type { CapabilityId } from "@/content/system";
import { cn } from "@/lib/cn";

const paths: Record<CapabilityId, React.ReactNode> = {
  product: (
    <>
      <path d="M12 3 20 7.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="M4 7.5 12 12l8-4.5M12 12v9" />
    </>
  ),
  engineering: <path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4M13.5 5.5l-3 13" />,
  ai: (
    <>
      <circle cx="12" cy="12" r="2.25" />
      <circle cx="5" cy="6" r="1.5" />
      <circle cx="19" cy="6" r="1.5" />
      <circle cx="5" cy="18" r="1.5" />
      <circle cx="19" cy="18" r="1.5" />
      <path d="m6.2 7 4 3.4M17.8 7l-4 3.4M6.2 17l4-3.4M17.8 17l-4-3.4" />
    </>
  ),
  automation: <path d="M13 3 5.5 13.5H12L11 21l7.5-10.5H12L13 3Z" />,
  operations: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" />
    </>
  ),
  growth: <path d="M5 20V14M10 20V10M15 20v-7M20 20V5M4 20h17" />,
};

export function CapabilityIcon({ id, className }: { id: CapabilityId; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn("size-5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[id]}
    </svg>
  );
}
