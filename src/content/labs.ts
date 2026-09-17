import type { CapabilityId } from "./system";

export type Lab = {
  id: string;
  entrance: string;
  /** Short name used in the NURONE / NAME grammar. */
  key: string;
  name: string;
  stage: string;
  summary: string;
  outcomes: string[];
  /** The transformation this Lab performs, left to right. */
  journey: string[];
  activates: CapabilityId[];
  entryPoint: string;
  cta: string;
};

/**
 * Stage-specific entrances into one operating system. Copy comes from dev.nurone.io
 * (home, /the-system, /labs/foundation and the FAQ). Only Foundation has its own page
 * on the live site; Scale, Operations and the Growth Layer are named in its FAQ, and
 * the talent layer in its Talent Model and FAQ.
 */
export const labs: Lab[] = [
  {
    id: "foundation",
    entrance: "01",
    key: "Foundation",
    name: "Foundation Lab",
    stage: "I have an idea or a rough MVP",
    summary:
      "For founders with an idea, deep expertise, a rough prototype, or a fragile MVP. We turn early ambition into the first serious version of the product: clear scope, clean architecture, real user flows, and a foundation ready for users, clients, or investors.",
    outcomes: ["Product blueprint", "72h prototype sprint", "MVP build", "100% code ownership"],
    journey: ["Idea", "Prototype", "Architecture", "Product", "Foundation"],
    activates: ["product", "engineering"],
    entryPoint: "72h Prototype Sprint or free MVP code review",
    cta: "Start with Foundation",
  },
  {
    id: "scale",
    entrance: "02",
    key: "Scale",
    name: "Scale Lab",
    stage: "I have traction, but the product is slowing down",
    summary:
      "For a working product that needs to scale. We strengthen the architecture, add AI features and automation, and bring fractional CTO execution so growth stops breaking the product.",
    outcomes: ["Scalable architecture", "AI features", "Automation", "Fractional CTO"],
    journey: ["Working product", "Constraints", "Architecture", "Stronger systems", "Scale"],
    activates: ["engineering", "ai", "automation"],
    entryPoint: "Free scale diagnosis",
    cta: "Scale without breaking",
  },
  {
    id: "operations",
    entrance: "03",
    key: "Operations",
    name: "Operations Lab",
    stage: "My operations run on manual work",
    summary:
      "For operations that are messy. We replace tool sprawl and manual workflows with internal tools, automations, dashboards and AI agents built around how your team really works.",
    outcomes: ["Internal tools", "Automations", "Dashboards", "AI agents"],
    journey: ["Fragmented work", "Manual process", "Automation", "AI-assisted", "Systemized"],
    activates: ["ai", "automation", "operations"],
    entryPoint: "Free workflow prototype",
    cta: "Automate the operation",
  },
  {
    id: "talent",
    entrance: "04",
    key: "Talent",
    name: "Talent Layer",
    stage: "I need senior execution capacity",
    summary:
      "Depending on your stage, NURONE assembles the right specialists at the right time. You don't manage individuals. You work with one coordinated execution system, alongside your existing team or as the team.",
    outcomes: ["Vetted technical talent", "Deployed in 5-7 days", "Replaced within 72h if not the right fit", "One coordinated system"],
    journey: ["Your stage", "Specialists", "Assembled", "Coordinated", "One system"],
    activates: ["engineering", "operations"],
    entryPoint: "Vetted technical talent in 5-7 days",
    cta: "Access the system",
  },
  {
    id: "growth",
    entrance: "05",
    key: "Growth",
    name: "Growth Layer",
    stage: "I need pipeline and revenue",
    summary:
      "Our private GTM system for selected businesses. We turn positioning, inbound, outbound and ads into a repeatable system for qualified leads, pipeline and revenue.",
    outcomes: ["Positioning", "Outbound & inbound", "Paid acquisition", "Revenue pipeline"],
    journey: ["Positioning", "Outbound", "Inbound", "Ads", "Pipeline", "Revenue"],
    activates: ["growth", "operations"],
    entryPoint: "Free GTM plan for selected businesses",
    cta: "Explore the Growth Layer",
  },
];
