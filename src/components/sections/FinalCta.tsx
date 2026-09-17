import { SplitReveal } from "@/components/motion/SplitReveal";
import { BlurWords } from "@/components/motion/BlurWords";
import { RequestDialog } from "@/components/request/RequestDialog";
import { MountainScene } from "@/components/scenes/MountainScene";
import { Container } from "@/components/ui/Container";
import { ChapterMark } from "@/components/ui/ChapterMark";

/** Closing band: the system's signal meeting the horizon, one clear next step. */
export function FinalCta() {
  return (
    <section id="request-access" data-section aria-labelledby="cta-title" className="relative isolate overflow-hidden border-b border-line">
      <MountainScene className="absolute inset-0 -z-10" id="cta-scene" />

      <Container className="py-14 sm:py-20">
        <div className="brackets relative grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-14 lg:py-16">
          <div className="lg:col-span-6">
            <ChapterMark index="09" name="The Decision" />
            <SplitReveal id="cta-title" className="type-heading mt-5 text-[clamp(2rem,1.2rem+2.4vw,3.25rem)] leading-[1.08]">
              Bring the ambition. We&apos;ll build the <span className="text-signal-hi">system</span> behind it.
            </SplitReveal>
            <div className="reveal mt-8">
              <RequestDialog />
            </div>
          </div>

          <div className="reveal lg:col-span-4 lg:col-start-9">
            <BlurWords className="text-[0.9375rem] leading-relaxed text-bone/90" text="Tell us where you are now: idea, product, operations, or growth. We'll show you where NURONE can create serious leverage." />
            <p className="type-label mt-5 leading-5 text-dim">We don&apos;t work with everyone. We work where we believe we can win.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
