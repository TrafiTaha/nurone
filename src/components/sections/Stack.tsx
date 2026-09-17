"use client";

import { useEffect, useRef } from "react";
import { stack, stackIntro } from "@/content/philosophy";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { BlurWords } from "@/components/motion/BlurWords";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ChapterMark } from "@/components/ui/ChapterMark";
import { Container } from "@/components/ui/Container";

/**
 * Chapter 08 — The stack. Frontend, backend and AI as three layers on one spine that
 * resolves into the execution system. The spine draws and each layer comes online as it's reached.
 */
export function Stack() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo("[data-spine]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-layers]", start: "top 75%", end: "bottom 55%", scrub: true } });
      gsap.utils.toArray<HTMLElement>("[data-layer]").forEach((layer) => {
        gsap.fromTo(
          layer,
          { opacity: 0.25, x: 24 },
          { opacity: 1, x: 0, ease: "none", scrollTrigger: { trigger: layer, start: "top 85%", end: "top 55%", scrub: true, toggleClass: { targets: layer, className: "is-online" } } },
        );
      });
    }, el);
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="stack" data-section aria-labelledby="stack-title" className="relative isolate overflow-hidden border-b border-line py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <ChapterMark index="08" name="The Stack" />
              <SplitReveal id="stack-title" className="type-heading mt-5 text-[clamp(2rem,1.4rem+1.6vw,2.75rem)] leading-[1.06]">
                Technology <span className="text-signal-hi">we work with.</span>
              </SplitReveal>
              <BlurWords className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-mute" text={stackIntro} />
            </div>
          </div>

          <div data-layers className="relative lg:col-span-8">
            <span aria-hidden="true" className="absolute top-2 bottom-24 left-[7px] w-px bg-line-strong" />
            <span data-spine aria-hidden="true" className="absolute top-2 bottom-24 left-[7px] w-px origin-top bg-gradient-to-b from-signal to-signal-hi" />

            <ol className="grid gap-4">
              {stack.map((s) => (
                <li key={s.id} data-layer className="group relative pl-10">
                  <span aria-hidden="true" className="absolute top-8 left-0 grid size-[15px] place-items-center rounded-full border border-line-strong bg-ink-950 transition-colors duration-500 group-[.is-online]:border-signal-hi">
                    <span className="size-[5px] rounded-full bg-dim transition-colors duration-500 group-[.is-online]:bg-signal-hi" />
                  </span>
                  <span aria-hidden="true" className="absolute top-[37px] left-[15px] h-px w-[25px] bg-line-strong transition-colors duration-500 group-[.is-online]:bg-signal-hi/70" />
                  <article className="spotlight relative grid gap-6 rounded-[3px] border border-line bg-ink-900/55 p-6 backdrop-blur-[2px] transition-[border-color,background-color] duration-500 hover:border-signal/50 hover:bg-ink-900/80 sm:p-8 md:grid-cols-[1fr_auto] md:items-start">
                    <div>
                      <p className="type-label text-dim">{s.index}</p>
                      <h3 className="mt-2 text-xl tracking-[-0.01em] text-bone">{s.name}</h3>
                      <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-mute">{s.body}</p>
                    </div>
                    <ul className="grid grid-cols-2 gap-2 md:w-56" aria-label={`${s.name} tools`}>
                      {s.tools.map((t) => (
                        <li key={t} className="rounded-[2px] border border-line-strong px-3 py-2.5 font-mono text-[0.75rem] text-bone/90 transition-colors duration-300 group-hover:border-signal/40">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </article>
                </li>
              ))}
              <li className="relative pl-10">
                <span aria-hidden="true" className="absolute top-1/2 left-0 grid size-[15px] -translate-y-1/2 place-items-center rounded-full border border-signal-hi bg-signal/20 shadow-[0_0_18px_rgb(59_140_255/0.5)]">
                  <span className="size-[5px] rounded-full bg-bone" />
                </span>
                <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-6">
                  <span className="type-label text-signal-hi">Connected through</span>
                  <span className="type-heading text-2xl text-bone">NURONE&apos;s execution system</span>
                </p>
                <p className="-mt-3 max-w-lg text-[0.875rem] leading-relaxed text-mute">Speed, ownership, scalability, and control. You own the code, the infrastructure and the systems we build.</p>
              </li>
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
