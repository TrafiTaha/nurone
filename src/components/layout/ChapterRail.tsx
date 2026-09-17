"use client";

import { useEffect, useState } from "react";
import { sections } from "@/content/site";
import { cn } from "@/lib/cn";

/** One entry per chapter: the first section that carries each chapter index. */
const chapters = sections.filter((s, i) => sections.findIndex((t) => t.index === s.index) === i);

/**
 * Fixed chapter rail on wide screens: nine ticks, the current chapter extended and
 * named, each a jump link. Appears once the visitor leaves the hero.
 */
export function ChapterRail() {
  const [current, setCurrent] = useState("01");
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const byId = new Map(sections.map((s) => [s.id, s.index]));
    const targets = sections.map((s) => document.getElementById(s.id)).filter((n): n is HTMLElement => Boolean(n));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(byId.get(e.target.id as never) ?? "01");
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    const hero = document.getElementById("top");
    const heroObserver = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting), { rootMargin: "0px 0px -40% 0px" });
    if (hero) heroObserver.observe(hero);
    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, []);

  return (
    <nav
      aria-label="Chapters"
      className={cn(
        "fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 transition-[opacity,translate] duration-700 ease-expo xl:block",
        shown ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-4 opacity-0",
      )}
    >
      <ol className="flex flex-col items-end gap-0.5">
        {chapters.map((c) => {
          const on = c.index === current;
          const past = Number(c.index) < Number(current);
          return (
            <li key={c.index}>
              <a href={`#${c.id}`} aria-current={on ? "step" : undefined} tabIndex={shown ? 0 : -1} className="group flex h-7 items-center justify-end gap-3">
                <span className={cn("type-label whitespace-nowrap transition-[opacity,translate,color] duration-500 ease-expo", "translate-x-2 rounded-sm bg-ink-950/90 px-2 py-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100", on ? "text-bone" : "text-mute")}>
                  <span className="tabular text-signal-hi">{c.index}</span> {c.name}
                </span>
                <span aria-hidden="true" className={cn("h-px transition-[width,background-color] duration-700 ease-expo", on ? "w-8 bg-signal-hi" : past ? "w-4 bg-signal/60" : "w-3 bg-line-strong group-hover:w-5 group-hover:bg-mute")} />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
