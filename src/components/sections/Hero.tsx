import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollDrift } from "@/components/motion/ScrollDrift";

const stagger = (i: number) => ({ ["--i" as string]: i });

/**
 * Opening scene. The promise is the design: NURONE's two sentences set at poster scale,
 * then one line of context and one decision. Nothing decorative competes with it.
 */
export function Hero() {
  return (
    <section id="top" data-section aria-labelledby="hero-title" className="relative flex min-h-[100dvh] flex-col border-b border-line pt-28 pb-10 sm:pt-32 lg:pt-36">
      <Container className="flex w-full flex-1 flex-col">
        <p className="fade-in text-[0.9375rem] text-mute">AI-powered tech &amp; growth lab</p>

        <ScrollDrift y={-40} fade={0.4}>
          <h1 id="hero-title" className="type-display mt-8 text-[clamp(3.25rem,0.6rem+8.2vw,9.5rem)] leading-[0.9] sm:mt-10">
            <span className="line-mask">
              <span className="line-in block" style={stagger(0)}>
                You bring the ambition.
              </span>
            </span>
            <span className="line-mask">
              <span className="line-in block text-mute" style={stagger(1)}>
                We build the <span className="text-signal-hi">system</span>
              </span>
            </span>
            <span className="line-mask">
              <span className="line-in block text-mute" style={stagger(2)}>
                to scale it.
              </span>
            </span>
          </h1>
        </ScrollDrift>

        <div className="fade-in mt-auto grid gap-8 border-t border-line pt-8 sm:pt-10 lg:grid-cols-12 lg:items-end" style={stagger(3)}>
          <p className="max-w-[34rem] text-[1.125rem] leading-relaxed text-bone/85 lg:col-span-6">
            NURONE is an AI-augmented operating team of elite engineers, product architects and growth hackers.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
            <Button href={site.primaryCta.href} size="lg" className="w-full sm:w-auto">
              {site.primaryCta.label}
            </Button>
            <Button href={site.secondaryCta.href} size="lg" variant="outline" className="w-full sm:w-auto">
              {site.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
