import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "signal" | "outline" | "ghost" | "beam";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  signal:
    "bg-signal text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18)] hover:bg-signal-ink hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_8px_30px_-8px_rgb(59_140_255/0.55)]",
  outline: "border border-line-strong text-bone hover:border-signal-hi/70 hover:bg-signal/[0.07]",
  ghost: "text-bone hover:text-signal-hi",
  beam: "isolate overflow-hidden text-white hover:shadow-[0_0_44px_-10px_rgb(59_140_255/0.6)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem] gap-2",
  md: "h-11 px-5 text-sm gap-2.5",
  lg: "h-[3.25rem] px-7 text-[0.9375rem] gap-3",
};

type Common = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  /** Shows a light tracing the border and marks the control busy. */
  loading?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkProps = Common & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "className" | "children">;
type ButtonProps = Common & { href?: never } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

/** Pill button. Hover rolls the label to a duplicate line and slides the arrow through. */
export function Button(props: LinkProps | ButtonProps) {
  const { variant = "signal", size = "md", arrow = true, loading = false, className, children, ...rest } = props;
  const classes = cn(
    "group/btn relative inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap select-none",
    "transition-[background-color,border-color,box-shadow,color] duration-300 ease-out active:translate-y-px",
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      {variant === "beam" && (
        /* Single border beam, drifting dot texture and a glow that rises on hover.
           Adapted from ThreeUI Community "Gradient Beam CTA" (MIT, © 2026 Meng To). */
        <>
          <span aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden rounded-full bg-line-strong">
            <span className="absolute top-1/2 left-1/2 aspect-square w-[180%] -translate-1/2 bg-[conic-gradient(from_0deg,transparent_0_290deg,#63c5ff_360deg)] motion-safe:animate-[spin_3s_linear_infinite]" />
          </span>
          <span aria-hidden="true" className="absolute inset-px -z-10 overflow-hidden rounded-full bg-ink-900">
            <span className="absolute inset-0 bg-gradient-to-b from-signal/25 to-transparent" />
            <span className="dot-drift absolute inset-0 opacity-40" />
            <span className="absolute bottom-0 left-1/2 h-1/2 w-2/3 -translate-x-1/2 rounded-full bg-signal/20 blur-xl transition-colors duration-500 group-hover/btn:bg-signal/50" />
          </span>
        </>
      )}
      {loading && (
        /* A comet tracing the pill while a request is in flight.
           Adapted from ThreeUI Community "Thinking Button" (MIT, © 2026 Meng To). */
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full overflow-visible">
          <rect x="0" y="0" width="100%" height="100%" rx="26" fill="none" pathLength={100} stroke="#63c5ff" strokeOpacity="0.25" strokeWidth="2" />
          <rect x="0" y="0" width="100%" height="100%" rx="26" fill="none" pathLength={100} stroke="#dff3ff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="22 78" className="comet" />
        </svg>
      )}
      {variant === "outline" && (
        /* Spinning border beam on hover. Adapted from ThreeUI Community "Spinning Border Button" (MIT, © 2026 Meng To). */
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100 group-focus-visible/btn:opacity-100"
          style={{
            padding: 1,
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
          }}
        >
          <span className="absolute top-1/2 left-1/2 aspect-square w-[260%] -translate-1/2 bg-[conic-gradient(from_90deg,transparent_0%,transparent_72%,#63c5ff_92%,#dff3ff_100%)] motion-safe:animate-[spin_2.8s_linear_infinite]" />
        </span>
      )}
      <span className="relative block overflow-hidden leading-5">
        <span className="block transition-transform duration-500 ease-expo group-hover/btn:-translate-y-full">{children}</span>
        <span aria-hidden="true" className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-expo group-hover/btn:translate-y-0">
          {children}
        </span>
      </span>
      {arrow && (
        <span aria-hidden="true" className="relative -mr-1 flex size-4 overflow-hidden">
          <ArrowGlyph className="shrink-0 transition-transform duration-500 ease-expo group-hover/btn:translate-x-full" />
          <ArrowGlyph className="absolute shrink-0 -translate-x-full transition-transform duration-500 ease-expo group-hover/btn:translate-x-0" />
        </span>
      )}
    </>
  );

  if ("href" in rest && typeof rest.href === "string") {
    return (
      <a className={classes} aria-busy={loading || undefined} {...(rest as ComponentPropsWithoutRef<"a">)}>
        {content}
      </a>
    );
  }
  return (
    <button className={classes} aria-busy={loading || undefined} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {content}
    </button>
  );
}

export function ArrowGlyph({ className, direction = "right" }: { className?: string; direction?: "right" | "down" | "left" }) {
  const rotate = direction === "down" ? "rotate-90" : direction === "left" ? "rotate-180" : "";
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={cn("size-4", rotate, className)} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
