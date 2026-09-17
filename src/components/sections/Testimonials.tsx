import { cases } from "@/content/cases";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { TestimonialCarousel } from "@/components/voices/TestimonialCarousel";
import { Container } from "@/components/ui/Container";

/** Only the quotes that exist on the original site, each tied back to its case study. */
const voices = cases
  .filter((c) => c.voice.quote)
  .map((c) => ({ id: c.id, client: c.client, quote: c.voice.quote!, name: c.voice.name, role: c.voice.role, initials: c.voice.initials }));

export function Testimonials() {
  return (
    <section id="testimonials" data-section aria-labelledby="testimonials-title" className="relative border-b border-line py-24 sm:py-32">
      <Container>
        <SplitReveal id="testimonials-title" className="type-display max-w-4xl text-[clamp(2.5rem,1.4rem+3.6vw,5rem)] leading-[0.98]">
          Not promises. <span className="text-mute">Real outcomes, from the people who shipped with NURONE.</span>
        </SplitReveal>
        <div className="mt-16 sm:mt-20">
          <TestimonialCarousel voices={voices} />
        </div>
      </Container>
    </section>
  );
}
