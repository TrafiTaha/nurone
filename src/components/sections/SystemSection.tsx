"use client";

import { site } from "@/content/site";
import { ProgressRail, ScrollScene, useScene } from "@/components/motion/ScrollScene";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { LayerArchitecture } from "@/components/system/LayerArchitecture";
import { ArrowGlyph } from "@/components/ui/Button";
import { ChapterMark } from "@/components/ui/ChapterMark";
import { Container } from "@/components/ui/Container";

/**
 * Chapter 04 — The engine. Technical Backbone → Agentic Operations → Growth Infrastructure,
 * built up layer by layer while pinned, then lit together as one execution system.
 * Unpinned (mobile, reduced motion) it stays a directly inspectable architecture.
 */
export function SystemSection() {
  return (
    <ScrollScene id="system" labelledBy="system-title" count={4} pin="desktop" length={65} className="border-b border-line" stageClassName="isolate flex flex-col justify-center overflow-hidden py-20 sm:py-24 lg:py-0">
      <div aria-hidden="true" className="schematic-grid absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_60%_70%_at_62%_50%,black,transparent)]" />
      <div aria-hidden="true" className="absolute top-1/2 left-[60%] -z-10 aspect-square w-[46rem] max-w-full -translate-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(59_140_255/0.12),transparent)]" style={{ opacity: "calc(0.5 + var(--p, 1) * 0.5)" }} />
      <Container className="w-full lg:pt-16">
        <Engine />
      </Container>
    </ScrollScene>
  );
}

function Engine() {
  const { step, pinned, goTo } = useScene();
  const driven = pinned ? (step >= 3 ? "all" : Math.max(0, step)) : undefined;

  return (
    <LayerArchitecture
      driven={driven}
      onSelect={pinned ? goTo : undefined}
      intro={
        <>
          <ChapterMark index="04" name="The Engine" />
          <p className="type-label mt-6 text-dim">Not another agency.</p>
          <SplitReveal id="system-title" className="type-heading mt-3 text-[clamp(2.25rem,1.4rem+2.4vw,3.5rem)] leading-[1.04]">
            An execution <span className="text-signal-hi">system.</span>
          </SplitReveal>
          <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-mute">
            Built for founders who want speed, technical depth, AI leverage, and revenue growth in one team.
          </p>
          <a
            href={site.secondaryCta.href}
            className="group mt-4 inline-flex items-center gap-2 py-3 text-sm text-bone underline decoration-signal-hi/50 underline-offset-8 transition-colors hover:text-signal-hi hover:decoration-signal-hi"
          >
            Explore the Labs
            <ArrowGlyph className="size-3.5 transition-transform group-hover:translate-x-1" />
          </a>
          {pinned && <ProgressRail className="mt-6 w-full max-w-sm" />}
        </>
      }
    />
  );
}
