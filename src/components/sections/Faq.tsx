import { faqGroups } from "@/content/faq";
import { BlurWords } from "@/components/motion/BlurWords";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Container } from "@/components/ui/Container";
import { FaqIndex } from "./FaqIndex";

/** Global question numbers (01…12) across groups, computed once. */
const offsets = faqGroups.map((_, gi) => faqGroups.slice(0, gi).reduce((sum, g) => sum + g.items.length, 0));

/** Desktop: question index + answer stage. Touch: an accordion, one question at a time. */
export function Faq() {
  return (
    <section id="faq" data-section aria-labelledby="faq-title" className="relative border-b border-line py-24 sm:py-32">
      <Container>
        <div className="max-w-3xl">
          <SplitReveal id="faq-title" className="type-display text-[clamp(2.5rem,1.4rem+3.6vw,5rem)] leading-[0.98]">
            Questions before you <span className="text-mute">request access.</span>
          </SplitReveal>
          <BlurWords className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-mute" text="Everything you need to know before we decide if NURONE is the right operating team for your next stage." />
        </div>

        <div className="mt-16 hidden lg:block">
          <FaqIndex />
        </div>

        <div className="mt-12 grid gap-12 lg:hidden">
          {faqGroups.map((group, gi) => (
            <div key={group.title}>
              <h3 className="text-[0.8125rem] text-dim">{group.title}</h3>
              <ul className="mt-3 border-t border-line">
                {group.items.map((item, ii) => (
                  <li key={item.q} className="border-b border-line">
                    <details className="group/faq relative">
                      <span aria-hidden="true" className="absolute top-0 left-0 h-full w-[2px] origin-top scale-y-0 bg-signal-hi transition-transform duration-500 ease-expo group-open/faq:scale-y-100" />
                      <summary className="grid grid-cols-[2.25rem_1fr_2.5rem] items-start gap-2 py-5 transition-[padding] duration-500 ease-expo group-open/faq:pl-4">
                        <span className="pt-1 font-mono text-[0.75rem] tabular text-dim group-open/faq:text-signal-hi">{String(offsets[gi] + ii + 1).padStart(2, "0")}</span>
                        <span className="text-[1.0625rem] leading-snug text-bone/90">{item.q}</span>
                        <span aria-hidden="true" className="grid size-10 place-items-center rounded-full border border-line-strong text-mute transition-[transform,border-color,color] duration-500 ease-expo group-open/faq:rotate-45 group-open/faq:border-signal-hi group-open/faq:text-signal-hi">
                          <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                            <path d="M8 3v10M3 8h10" />
                          </svg>
                        </span>
                      </summary>
                      <p className="pr-10 pb-6 pl-[2.75rem] leading-relaxed text-mute">{item.a}</p>
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
