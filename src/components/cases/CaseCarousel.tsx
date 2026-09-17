"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cases } from "@/content/cases";
import { cn } from "@/lib/cn";
import { CASE_EVENT, prefersReducedMotion } from "@/lib/motion";
import { ArrowGlyph } from "@/components/ui/Button";
import { CaseCard } from "./CaseCard";

/** Three-up editorial carousel: native scroll-snap for touch/trackpad/keyboard, arrows and position dots below. */
export function CaseCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const [highlight, setHighlight] = useState<string | null>(null);

  const step = useCallback(() => {
    const items = track.current?.children;
    if (!items || items.length < 2) return 300;
    return (items[1] as HTMLElement).offsetLeft - (items[0] as HTMLElement).offsetLeft;
  }, []);

  const scrollToIndex = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(cases.length - 1, i));
      el.scrollTo({ left: clamped * step(), behavior: prefersReducedMotion() ? "auto" : "smooth" });
    },
    [step],
  );

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / step()));
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const i = cases.findIndex((c) => c.id === id);
      if (i < 0) return;
      scrollToIndex(i);
      setHighlight(id);
      clearTimeout(timer);
      timer = setTimeout(() => setHighlight(null), 2400);
    };
    window.addEventListener(CASE_EVENT, onSelect);
    return () => {
      window.removeEventListener(CASE_EVENT, onSelect);
      clearTimeout(timer);
    };
  }, [scrollToIndex]);

  return (
    <div>
      <ul
        ref={track}
        onScroll={onScroll}
        tabIndex={0}
        aria-label="Case studies"
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pt-1 pb-2 focus-visible:outline-offset-[-2px] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {cases.map((study) => (
          <li key={study.id} className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]">
            <CaseCard study={study} total={cases.length} highlighted={highlight === study.id} />
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-center gap-2 sm:gap-5">
        <NavButton label="Previous case study" disabled={index === 0} onClick={() => scrollToIndex(index - 1)} direction="left" />
        <ol className="flex items-center gap-1.5" aria-label="Case study position">
          {cases.map((c, i) => (
            <li key={c.id}>
              <button
                type="button"
                aria-label={`Go to ${c.client}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => scrollToIndex(i)}
                className="group grid h-10 min-w-6 place-items-center sm:min-w-8"
              >
                <span className={cn("block h-px transition-[width,background-color] duration-500 ease-expo", i === index ? "w-6 bg-signal-hi" : "w-3 bg-line-strong group-hover:bg-mute")} />
              </button>
            </li>
          ))}
        </ol>
        <NavButton label="Next case study" disabled={atEnd} onClick={() => scrollToIndex(index + 1)} direction="right" />
      </div>
    </div>
  );
}

function NavButton({ label, disabled, onClick, direction }: { label: string; disabled: boolean; onClick: () => void; direction: "left" | "right" }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="group grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-bone transition-colors hover:border-signal-hi hover:text-signal-hi disabled:pointer-events-none disabled:opacity-30"
    >
      <ArrowGlyph direction={direction} className={cn("size-3.5 transition-transform duration-300", direction === "left" ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5")} />
    </button>
  );
}
