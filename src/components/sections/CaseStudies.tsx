import { cases } from "@/content/cases";
import { CaseCarousel } from "@/components/cases/CaseCarousel";
import { CaseScene } from "@/components/cases/CaseScene";
import { ChapterMark } from "@/components/ui/ChapterMark";
import { Container } from "@/components/ui/Container";

/**
 * Real projects. On large screens with motion, a pinned story per case (CaseScene);
 * on touch screens and with reduced motion, the swipeable carousel.
 */
export function CaseStudies() {
  return (
    <section id="work" data-section aria-labelledby="work-title" className="relative border-b border-line">
      <div className="unless-pinned-lg py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4 lg:pr-6">
              <ChapterMark index="07" name="Proof" />
              <h2 id="work-title" className="type-heading mt-5 text-[clamp(2rem,1.3rem+2vw,3rem)] leading-[1.08]">
                Real products. <span className="text-mute">Real results.</span>
              </h2>
              <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-mute">
                We don&apos;t just build features. We rebuild the systems behind real products, from AI-built MVPs to
                public-sector AI. Here are {cases.length} of them.
              </p>
              <p className="type-label mt-8 flex items-center gap-3 text-dim">
                <span className="h-px w-5 bg-signal-hi/60" /> Open a project to see challenge → outcome
              </p>
            </div>

            <div className="min-w-0 lg:col-span-8">
              <CaseCarousel />
            </div>
          </div>
        </Container>
      </div>
      <CaseScene className="when-pinned-lg" />
    </section>
  );
}
