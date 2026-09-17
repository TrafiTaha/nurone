"use client";

import { selectCase } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useRovingTabs } from "@/lib/useRovingTabs";
import { ArrowGlyph } from "@/components/ui/Button";

type Voice = { id: string; client: string; quote: string; name: string; role: string; initials?: string };

/**
 * Voices as an index, not a carousel: the people on the left, the words at editorial
 * scale on the right. Hovering or focusing a name brings its quote forward; arrow keys
 * move through the list (WAI-ARIA tabs).
 */
export function TestimonialCarousel({ voices }: { voices: Voice[] }) {
  const { active, select, tabProps, panelProps } = useRovingTabs(voices.length);
  const v = voices[active];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div role="tablist" aria-label="Client testimonials" aria-orientation="vertical" className="order-2 grid content-start border-t border-line lg:order-1 lg:col-span-4">
        {voices.map((item, i) => {
          const on = i === active;
          return (
            <button
              key={item.id}
              {...tabProps(i)}
              onPointerEnter={(e) => e.pointerType === "mouse" && select(i)}
              className="group relative grid grid-cols-[2.5rem_1fr] items-baseline border-b border-line py-5 text-left"
            >
              <span aria-hidden="true" className={cn("absolute top-0 left-0 h-px bg-signal-hi transition-[width] duration-700 ease-expo", on ? "w-full" : "w-0")} />
              <span className={cn("type-label tabular transition-colors duration-500", on ? "text-signal-hi" : "text-dim")}>{item.id}</span>
              <span>
                <span className={cn("block text-lg tracking-[-0.01em] transition-[color,translate] duration-500 ease-expo", on ? "translate-x-1 text-bone" : "text-mute group-hover:text-bone")}>{item.client}</span>
                <span className="mt-0.5 block text-[0.8125rem] text-dim">
                  {item.name}, {item.role.split(",")[0]}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <figure {...panelProps} className="order-1 lg:order-2 lg:col-span-8 lg:pl-8 xl:pl-14">
        <div key={v.id} className="relative">
          <span aria-hidden="true" className="voice-in type-display absolute -top-6 -left-2 text-[7rem] leading-none text-signal/25 sm:-left-8 sm:text-[9rem]">
            &ldquo;
          </span>
          <blockquote className="voice-in type-heading relative text-[clamp(1.5rem,1.05rem+1.5vw,2.625rem)] leading-[1.2] text-bone">{v.quote}</blockquote>
          <figcaption className="voice-in mt-10 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ ["--i" as string]: 1 }}>
            <span>
              <span className="block text-bone">{v.name}</span>
              <span className="block text-[0.875rem] text-mute">{v.role}</span>
            </span>
            <a href="#work" onClick={() => selectCase(v.id)} className="group ml-auto inline-flex items-center gap-2 py-2 text-sm text-signal-hi transition-colors hover:text-bone">
              Read the {v.client.length > 20 ? "case" : v.client} story
              <ArrowGlyph className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </figcaption>
        </div>
      </figure>
    </div>
  );
}
