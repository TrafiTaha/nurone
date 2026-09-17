import { labs } from "@/content/labs";
import { site } from "@/content/site";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { LabsMap } from "@/components/labs/LabsMap";
import { ScrollScene } from "@/components/motion/ScrollScene";
import { ArrowGlyph } from "@/components/ui/Button";
import { ChapterMark } from "@/components/ui/ChapterMark";
import { Container } from "@/components/ui/Container";

/**
 * Chapter 05 — The Labs. Five stage-specific entrances revealed one at a time while the
 * map on the left connects each of them to the same NURONE core.
 */
export function Labs() {
  return (
    <ScrollScene id="labs" labelledBy="labs-title" count={labs.length} pin="desktop" length={85} className="border-b border-line" stageClassName="isolate flex flex-col justify-center py-20 sm:py-24 lg:py-0">
      <div aria-hidden="true" className="dot-grid absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_40%_55%_at_22%_58%,black,transparent)]" />
      <Container className="w-full lg:pt-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-5 in-[.scene:not([data-step])]:lg:sticky in-[.scene:not([data-step])]:lg:top-28 in-[.scene:not([data-step])]:lg:self-start">
            <ChapterMark index="05" name="The Labs" />
            <SplitReveal id="labs-title" className="type-heading mt-5 text-[clamp(2.125rem,1.4rem+2vw,3.25rem)] leading-[1.04]">
              Start with your <span className="text-signal-hi">current stage.</span>
            </SplitReveal>
            <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-mute">
              Each Lab is built for a specific bottleneck, not a generic service package. Different entrances into one
              coordinated execution system.
            </p>
            <div className="when-pinned-lg mt-6 w-full max-w-[min(27rem,calc(100svh-25rem))] lg:ml-8">
              <LabsMap />
            </div>
          </div>

          <div className="frames grid gap-16 lg:col-span-7 lg:col-start-6 lg:pl-10 xl:pl-16">
            {labs.map((lab) => (
              <article key={lab.id} data-frame aria-labelledby={`lab-${lab.id}`} className="relative border-t border-line pt-8 lg:border-t-0 lg:pt-0">
                <span aria-hidden="true" className="pointer-events-none absolute -top-6 right-0 font-mono text-[clamp(6rem,4rem+6vw,11rem)] leading-none font-extralight tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgb(99_197_255/0.28)] lg:-top-14" style={{ color: "rgb(99 197 255 / calc(var(--t, 1) * 0.1))", transition: "color 0.3s linear" }}>
                  {lab.entrance}
                </span>
                <p className="type-label text-signal-hi">NURONE / {lab.key}</p>
                <h3 id={`lab-${lab.id}`} className="type-display mt-4 text-[clamp(2.25rem,1.5rem+2.2vw,3.5rem)] leading-none">
                  {lab.name}
                </h3>
                <p className="mt-4 text-lg text-bone/90">&ldquo;{lab.stage}&rdquo;</p>
                <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-mute">{lab.summary}</p>

                <ol aria-label="Transformation" className="mt-7 flex flex-wrap items-center gap-y-2">
                  {lab.journey.map((j, k) => (
                    <li key={j} className="seq-lit flex items-center" style={{ ["--k" as string]: k, ["--of" as string]: lab.journey.length }}>
                      <span className={k === lab.journey.length - 1 ? "rounded-full border border-signal-hi/70 bg-signal/15 px-3 py-1.5 text-[0.8125rem] text-bone" : "rounded-full border border-line-strong px-3 py-1.5 text-[0.8125rem] text-mute"}>{j}</span>
                      {k < lab.journey.length - 1 && <ArrowGlyph className="mx-1.5 size-3 text-signal-hi/70" />}
                    </li>
                  ))}
                </ol>

                <div className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-[1.3fr_1fr]">
                  <div>
                    <p className="type-label text-dim">What it builds</p>
                    <ul className="mt-3 grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
                      {lab.outcomes.map((o) => (
                        <li key={o} className="flex items-baseline gap-2 text-[0.875rem] text-bone/85">
                          <span aria-hidden="true" className="size-1 shrink-0 translate-y-[-2px] rounded-full bg-signal-hi" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="type-label text-dim">Entry point</p>
                    <p className="mt-3 text-[0.875rem] text-bone/85">{lab.entryPoint}</p>
                    <a href={site.primaryCta.href} className="group mt-3 inline-flex items-center gap-2 py-2 text-sm text-signal-hi transition-colors hover:text-bone">
                      {lab.cta}
                      <ArrowGlyph className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </ScrollScene>
  );
}
