/* The NURONE execution system: capabilities, layers, fracture points and telemetry. */

export type CapabilityId = "product" | "engineering" | "ai" | "automation" | "operations" | "growth";

export type Capability = {
  id: CapabilityId;
  index: string;
  name: string;
  line: string;
  /** Short technical tags shown in the hero hover card. */
  tags: string;
  /** Case study ids that show this capability in production. */
  proof: string[];
};

export const capabilities: Capability[] = [
  {
    id: "product",
    index: "N.01",
    name: "Product",
    tags: "Scope · User flows · Launch logic",
    line: "Clear scope, clean user flows and launch-ready logic that turn ambition into something people adopt.",
    proof: ["006", "001"],
  },
  {
    id: "engineering",
    index: "N.02",
    name: "Engineering",
    tags: "Architecture · Code quality · Delivery",
    line: "Architecture, code quality and delivery discipline built to carry real users and real growth.",
    proof: ["005", "001"],
  },
  {
    id: "ai",
    index: "N.03",
    name: "AI",
    tags: "Agents · RAG · Document intelligence",
    line: "Agents, RAG, speech and document intelligence embedded inside real workflows, not bolted on.",
    proof: ["003", "004", "002"],
  },
  {
    id: "automation",
    index: "N.04",
    name: "Automation",
    tags: "Workflows · Integrations · Agents",
    line: "Workflows that stop depending on spreadsheets, copy-paste and manual glue between tools.",
    proof: ["007", "001"],
  },
  {
    id: "operations",
    index: "N.05",
    name: "Operations",
    tags: "Internal tools · Dashboards · CTO",
    line: "Internal tools, dashboards, fractional CTO execution and vetted talent around your real process.",
    proof: ["007", "006"],
  },
  {
    id: "growth",
    index: "N.06",
    name: "Growth",
    tags: "Positioning · Outbound · Pipeline",
    line: "Positioning, outbound, inbound and ads run as one system for qualified leads, pipeline and revenue.",
    proof: [],
  },
];

export const capabilityById = Object.fromEntries(capabilities.map((c) => [c.id, c])) as Record<
  CapabilityId,
  Capability
>;

export type Layer = {
  id: string;
  index: string;
  name: string;
  components: string[];
  does: string;
  why: string;
  outcome: string;
  proof: string[];
};

export const layers: Layer[] = [
  {
    id: "backbone",
    index: "L1",
    name: "Technical backbone",
    components: ["Architecture", "Code quality", "Delivery discipline", "Fractional CTO"],
    does: "We build and rebuild products with the architecture, code quality and delivery discipline needed to scale.",
    why: "Prototypes look good, then collapse with real users. Products get traction, then slow under growth.",
    outcome: "A product foundation that carries growth, with code you fully own.",
    proof: ["005", "001"],
  },
  {
    id: "operations",
    index: "L2",
    name: "Agentic operations",
    components: ["AI systems", "Automations", "Internal tools", "Expert operators"],
    does: "We combine AI systems, automations and expert operators to remove bottlenecks and accelerate execution.",
    why: "Companies add tools and AI on top of chaos instead of fixing the system underneath.",
    outcome: "Workflows that run on a system instead of manual glue.",
    proof: ["003", "007"],
  },
  {
    id: "growth",
    index: "L3",
    name: "Growth infrastructure",
    components: ["Positioning", "Outbound", "Inbound", "Ads"],
    does: "We turn positioning, outbound, inbound and ads into repeatable systems for leads, pipeline and revenue.",
    why: "The market doesn't reward what you imagined. It rewards what your system can carry.",
    outcome: "Qualified pipeline from a system, not a generic marketing retainer.",
    proof: [],
  },
];

export const fractures = [
  {
    from: "Idea",
    to: "Real users",
    statement: "Prototypes look good, then collapse with real users.",
  },
  {
    from: "Traction",
    to: "Growth",
    statement: "Products get traction, then slow under growth.",
  },
  {
    from: "Tools",
    to: "Leverage",
    statement: "Companies add tools and AI on top of chaos.",
  },
] as const;

export type Metric = {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix: string;
  note: string;
  viz: "ruler" | "segments" | "steps";
};

export const metrics: Metric[] = [
  { id: "M.01", label: "Prototype sprint", value: 72, suffix: "h", note: "From idea to a working prototype.", viz: "ruler" },
  { id: "M.02", label: "Tracked execution", value: 100, suffix: "%", note: "Every hour, task and blocker logged weekly.", viz: "segments" },
  { id: "M.03", label: "Revenue pipeline", value: 10, prefix: "€", suffix: "M+", note: "Built through our growth systems.", viz: "steps" },
];
