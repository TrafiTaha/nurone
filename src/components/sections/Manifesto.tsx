import { fractures } from "@/content/system";
import { ProgressRail, ScrollScene } from "@/components/motion/ScrollScene";
import { SceneCounter } from "@/components/motion/SceneCounter";
import { HorizonGlow } from "@/components/three/HorizonGlow";
import { MountainScene } from "@/components/scenes/MountainScene";
import { ChapterMark, LitWords } from "@/components/ui/ChapterMark";
import { Container } from "@/components/ui/Container";

/**
 * Chapter 02 — The system. The original manifesto broken into choreographed fragments:
 * ambition → where it breaks → the three fractures → what the market rewards.
 * The horizon beam brightens as the argument resolves.
 */
export function Manifesto() {
  return (
    <ScrollScene
      id="manifesto"
      labelledBy="manifesto-title"
      count={4}
      pin="always"
      length={70}
      className="border-b border-line"
      stageClassName="isolate flex flex-col overflow-hidden"
      backdrop={
        <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ opacity: "calc(0.25 + var(--p, 1) * 0.75)" }}>
          <MountainScene className="absolute inset-x-0 bottom-0 h-[45%] opacity-60 lg:inset-y-0 lg:opacity-100 lg:left-[38%] lg:h-auto lg:[mask-image:linear-gradient(to_right,transparent,black_35%)]" beam={0.55} tall id="manifesto-scene" />
          <HorizonGlow className="absolute inset-x-0 bottom-0 h-[55%] w-full lg:left-[30%] lg:h-[70%] lg:w-[70%]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--page-bg)_40%,transparent)] lg:bg-[linear-gradient(to_right,var(--page-bg)_30%,transparent_65%)]" />
        </div>
      }
    >
      <Container className="relative flex w-full flex-1 flex-col pt-24 pb-8 sm:pt-28">
        <div className="flex items-center justify-between gap-4">
          <ChapterMark index="02" name="The System" />
          <SceneCounter />
        </div>

        <h2 id="manifesto-title" className="sr-only">
          Ambition rarely dies in the idea. It breaks in the system behind it.
        </h2>

        <div className="frames grid flex-1 content-center gap-28 py-20 lg:py-0">
          <div data-frame aria-hidden="true">
            <p className="type-display max-w-[14ch] text-manifesto">
              <LitWords text="Ambition rarely dies in the idea." />
            </p>
          </div>

          <div data-frame aria-hidden="true">
            <p className="type-display max-w-[13ch] text-manifesto">
              <LitWords text="It breaks in the system behind it." accent={["system"]} />
            </p>
          </div>

          <div data-frame>
            <ol className="grid max-w-3xl border-t border-line">
              {fractures.map((f, i) => (
                <li key={f.statement} className="seq-lit grid grid-cols-[2.25rem_1fr] items-baseline gap-3 border-b border-line py-5 sm:grid-cols-[3.5rem_1fr] sm:py-7" style={{ ["--k" as string]: i, ["--of" as string]: 3 }}>
                  <span className="type-label tabular text-signal-hi">0{i + 1}</span>
                  <div>
                    <p className="type-heading text-[clamp(1.375rem,1rem+1.6vw,2.25rem)] leading-tight text-bone">{f.statement}</p>
                    <p aria-hidden="true" className="type-label mt-3 flex items-center gap-2 text-dim">
                      {f.from}
                      <span className="flex items-center">
                        <span className="h-px w-8 bg-mute/60 sm:w-14" />
                        <span className="mx-1.5 text-signal-hi">✕</span>
                        <span className="h-px w-8 translate-y-[3px] rotate-[8deg] border-t border-dashed border-mute/40 sm:w-14" />
                      </span>
                      {f.to}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div data-frame>
            <p className="type-heading max-w-2xl text-[clamp(1.375rem,1rem+1.4vw,2.125rem)] leading-snug text-mute">
              The market doesn&apos;t reward what you imagined.
            </p>
            <p className="type-display mt-4 max-w-[16ch] text-[clamp(2.5rem,1rem+4.6vw,5.75rem)] leading-[1]">
              <LitWords text="It rewards what your system can carry." accent={["system"]} />
            </p>
          </div>
        </div>

        <ProgressRail className="mt-auto hidden w-full [.scene[data-step]_&]:block" />
      </Container>
    </ScrollScene>
  );
}
