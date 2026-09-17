import { metrics, type Metric } from "@/content/system";
import { ProgressRail, ScrollScene } from "@/components/motion/ScrollScene";
import { SceneCounter } from "@/components/motion/SceneCounter";
import { PixelArc } from "@/components/scenes/PixelArc";
import { ChapterMark } from "@/components/ui/ChapterMark";
import { Container } from "@/components/ui/Container";

/** Chapter 07 opens with proof: each real figure takes the whole stage, then hands off to the next. */
export function Impact() {
  return (
    <ScrollScene
      id="impact"
      labelledBy="impact-title"
      count={metrics.length}
      pin="always"
      length={55}
      className="border-b border-line"
      stageClassName="isolate flex flex-col overflow-hidden"
      backdrop={<PixelArc className="absolute inset-0 -z-10 size-full opacity-70 [mask-image:linear-gradient(to_bottom,transparent,black_35%)]" center={0.62} drop={0.55} thickness={0.22} />}
    >
      <Container className="relative flex w-full flex-1 flex-col pt-24 pb-8 sm:pt-28">
        <div className="flex items-center justify-between gap-4">
          <ChapterMark index="07" name="Proof" />
          <SceneCounter />
        </div>
        <h2 id="impact-title" className="type-heading mt-4 text-[clamp(1.5rem,1.1rem+1vw,2rem)] leading-tight">
          Proof of execution
        </h2>

        <div className="frames grid flex-1 content-center gap-20 py-16 lg:py-0">
          {metrics.map((m) => (
            <div key={m.id} data-frame className="grid items-end gap-6 lg:grid-cols-12 lg:gap-8">
              <p className="type-display order-1 text-[clamp(6rem,2rem+15vw,17rem)] leading-[0.82] tracking-[-0.06em] lg:col-span-7">
                <span className="line-mask">
                  <span className="block" style={{ translate: "0 calc((1 - var(--t, 1)) * 40%)", color: "rgb(232 237 244 / var(--t, 1))", WebkitTextStroke: "1.5px rgb(232 237 244 / calc(0.7 - var(--t, 1) * 0.7))", transition: "translate 0.3s linear, color 0.3s linear" }}>
                    {m.prefix}
                    {m.value}
                    <span className="text-signal-hi">{m.suffix}</span>
                  </span>
                </span>
              </p>
              <div className="order-2 lg:col-span-5 lg:pb-6">
                <p className="type-label text-signal-hi">
                  {m.id} / {m.label}
                </p>
                <p className="type-heading mt-3 text-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] leading-tight text-bone">{m.note}</p>
                <div aria-hidden="true" className="mt-8">
                  <MetricViz viz={m.viz} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <ProgressRail className="mt-auto hidden w-full [.scene[data-step]_&]:block" />
      </Container>
    </ScrollScene>
  );
}

/** Each figure drawn as what it measures: hours on a ruler, logged segments, stepped pipeline. */
function MetricViz({ viz }: { viz: Metric["viz"] }) {
  if (viz === "ruler") {
    return (
      <div className="flex h-10 items-end gap-[3px]">
        {Array.from({ length: 36 }, (_, i) => (
          <span key={i} className="w-px bg-signal-hi" style={{ height: i % 6 === 0 ? "100%" : "45%", opacity: `clamp(0.12, calc(var(--t, 1) * 40 - ${i}), 1)` }} />
        ))}
      </div>
    );
  }
  if (viz === "segments") {
    return (
      <div className="grid h-3 grid-cols-20 gap-1">
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} className="rounded-[1px] bg-signal-hi" style={{ opacity: `clamp(0.1, calc(var(--t, 1) * 22 - ${i}), 1)` }} />
        ))}
      </div>
    );
  }
  return (
    <div className="flex h-16 items-end gap-2">
      {Array.from({ length: 10 }, (_, i) => (
        <span key={i} className="flex-1 origin-bottom rounded-t-[1px] bg-gradient-to-t from-signal/40 to-signal-hi" style={{ height: `${18 + i * 9}%`, transform: `scaleY(clamp(0.04, calc(var(--t, 1) * 12 - ${i}), 1))` }} />
      ))}
    </div>
  );
}
