import { philosophyIntro, principles } from "@/content/philosophy";
import { ProgressRail, ScrollScene } from "@/components/motion/ScrollScene";
import { SceneIndex } from "@/components/motion/SceneCounter";
import { PrincipleVisual } from "@/components/philosophy/PrincipleVisual";
import { ChapterMark } from "@/components/ui/ChapterMark";
import { Container } from "@/components/ui/Container";

/**
 * Chapter 03 — The difference. NURONE's four principles as editorial statements:
 * the lesser word is struck through while the drawing transforms into the NURONE model.
 */
export function Principles() {
  return (
    <ScrollScene id="philosophy" labelledBy="philosophy-title" count={principles.length} pin="always" length={95} className="border-b border-line" stageClassName="isolate flex flex-col">
      <Container className="relative flex w-full flex-1 flex-col pt-24 pb-8 sm:pt-28">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <ChapterMark index="03" name="The Difference" />
            <h2 id="philosophy-title" className="type-heading mt-4 text-[clamp(1.5rem,1.1rem+1vw,2rem)] leading-tight">
              How we work
            </h2>
            <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-mute max-sm:hidden [.scene:not([data-step])_&]:max-sm:block">{philosophyIntro}</p>
          </div>
          <div className="lg:col-span-5 lg:justify-self-end">
            <SceneIndex items={principles.map((p) => p.over)} className="-mx-2.5 max-sm:hidden" />
          </div>
        </div>

        <div className="frames grid flex-1 content-center gap-24 py-16 lg:py-0">
          {principles.map((p) => (
            <article key={p.id} data-frame aria-labelledby={`principle-${p.id}`} className="grid items-center gap-6 sm:gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <h3 id={`principle-${p.id}`} className="type-display text-[clamp(2.75rem,1.2rem+4.4vw,5.5rem)] leading-[0.95]">
                  <span className="block">{p.over}</span>
                  <span className="mt-1 flex items-baseline gap-[0.25em]">
                    <span className="text-signal-hi" aria-hidden="true">
                      &gt;
                    </span>
                    <span className="sr-only">over</span>
                    <span className="relative text-dim">
                      {p.under}
                      <span aria-hidden="true" className="absolute top-[55%] left-0 h-[0.05em] w-full origin-left bg-mute/70" style={{ transform: "scaleX(var(--t, 1))" }} />
                    </span>
                  </span>
                </h3>
                <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-bone/85 sm:mt-7 sm:text-[1.0625rem]">{p.body}</p>
              </div>

              <div className="lg:col-span-6">
                <div className="relative mx-auto max-w-[26rem] max-sm:max-w-[min(20rem,calc(30svh*1.31))] lg:max-w-[min(100%,calc((100svh-21rem)*1.31))]">
                  <PrincipleVisual id={p.id} />
                </div>
                <ol aria-hidden="true" className="mx-auto mt-3 grid max-w-[26rem] grid-cols-2 gap-x-3 gap-y-1 sm:grid-cols-4 sm:gap-2 lg:max-w-[min(100%,calc((100svh-21rem)*1.31))]">
                  {p.stages.map((s, k) => (
                    <li key={s} className="seq-lit border-t border-signal/40 pt-2" style={{ ["--k" as string]: k, ["--of" as string]: 4 }}>
                      <span className="type-label block leading-tight tracking-[0.08em] text-mute">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          ))}
        </div>

        <ProgressRail className="mt-auto hidden w-full [.scene[data-step]_&]:block" />
      </Container>
    </ScrollScene>
  );
}
