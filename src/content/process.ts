export type ProcessStep = {
  state: string;
  title: string;
  happens: string;
  output: string;
  benefit: string;
  promise: string;
};

export const processSteps: ProcessStep[] = [
  {
    state: "Diagnose",
    title: "Fit check",
    happens:
      "Before we sell anything, we look at your idea, MVP, product, workflow, or growth system. We identify what is real, what is risky, and what is blocking progress.",
    output: "A clear verdict: whether NURONE is the right team, and what we would do first.",
    benefit: "Clarity before commitment.",
    promise: "This protects both sides.",
  },
  {
    state: "Route",
    title: "Choose the right Lab",
    happens:
      "You enter the Lab that matches your stage: prototype, launch, scale, operations, talent, or growth. Each path is built for a specific bottleneck, not a generic service package.",
    output: "The right team and scope for the bottleneck you actually have.",
    benefit: "No wrong team. No wasted motion.",
    promise: "Built for your stage.",
  },
  {
    state: "Execute",
    title: "Build with visibility",
    happens:
      "Execution runs on a clear weekly rhythm. You see what was done, what is next, what is blocked, who worked on what, and how every hour was used.",
    output: "A weekly task log: done, next, blocked, hours.",
    benefit: "No black box. No blind trust.",
    promise: "100% tracked execution.",
  },
  {
    state: "Verify",
    title: "Stay accountable",
    happens:
      "You own the code, the assets, the systems, and the progress. If we underestimate a scoped build, we finish the agreed work. If a talent is not the right fit, we replace them fast.",
    output: "Code, assets, workflows and documentation, all in your name.",
    benefit: "Accountability is built into the model.",
    promise: "Replacement within 72h.",
  },
  {
    state: "Resolve",
    title: "Scale or exit cleanly",
    happens:
      "When the stage is complete, you decide what happens next: continue with the team, unlock growth, scale the system, or leave with everything in hand.",
    output: "Continue and scale, or exit with everything.",
    benefit: "No dependency. No pressure. No messy handoff.",
    promise: "Your call, always.",
  },
];
