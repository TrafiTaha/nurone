import { processSteps } from "@/content/process";
import { site } from "@/content/site";
import { ProgressRail, ScrollScene } from "@/components/motion/ScrollScene";
import { SceneIndex } from "@/components/motion/SceneCounter";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { MethodVisual } from "@/components/process/MethodVisual";
import { Button } from "@/components/ui/Button";
import { ChapterMark } from "@/components/ui/ChapterMark";
import { Container } from "@/components/ui/Container";

/**
 * Chapter 06 — The method. How it works as one unfolding situation:
 * diagnosed, routed to a Lab, built in the open, owned, then resolved.
 */
export function Process() {
  return (
    <ScrollScene id="process" labelledBy="process-title" count={processSteps.length} pin="desktop" length={80} className="border-b border-line" stageClassName="isolate flex flex-col justify-center py-20 sm:py-24 lg:py-0">
      <Container className="w-full lg:pt-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-4 lg:pr-6 in-[.scene:not([data-step])]:lg:sticky in-[.scene:not([data-step])]:lg:top-28 in-[.scene:not([data-step])]:lg:self-start">
            <ChapterMark index="06" name="The Method" />
            <SplitReveal id="process-title" className="type-heading mt-5 text-[clamp(2rem,1.4rem+1.6vw,2.75rem)] leading-[1.06]">
              A clear path from ambition to <span className="text-signal-hi">execution.</span>
            </SplitReveal>
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-mute">
              First we understand where you stand. Then we choose the right Lab, assemble the right team, and execute
              with full visibility.
            </p>
            <div className="when-pinned-lg mt-8 max-w-xs">
              <ProgressRail className="mb-3 w-full" />
              <SceneIndex vertical items={processSteps.map((s) => s.title)} />
            </div>
          </div>

          <div className="frames grid gap-20 lg:col-span-8">
            {processSteps.map((s, i) => (
              <article key={s.title} data-frame aria-labelledby={`step-${i}`} className="grid items-center gap-8 border-t border-line pt-8 md:grid-cols-2 lg:border-t-0 lg:pt-0 xl:gap-12">
                <div>
                  <p className="type-display text-[clamp(3.5rem,2.5rem+3vw,6rem)] leading-none text-signal-hi/90 tabular">0{i + 1}.</p>
                  <p className="type-label mt-5 text-dim">{s.state}</p>
                  <h3 id={`step-${i}`} className="type-heading mt-2 text-[clamp(1.75rem,1.3rem+1.2vw,2.5rem)] leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-bone/85">{s.happens}</p>
                  <p className="mt-5 border-l border-signal-hi/60 pl-4 text-[0.9375rem] text-signal-hi">{s.benefit}</p>
                </div>
                <div>
                  <MethodVisual index={i} />
                  {i === processSteps.length - 1 && (
                    <div className="mt-6">
                      <Button href={site.primaryCta.href} variant="outline">
                        Get started
                      </Button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </ScrollScene>
  );
}
