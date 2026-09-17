/** "How we work", from dev.nurone.io/the-system. */
export const philosophyIntro =
  "The way we build is shaped by one belief: real growth does not come from more noise. It comes from better systems, better people, and better leverage.";

export type Principle = {
  id: "systems" | "leverage" | "foundations" | "outcomes";
  over: string;
  under: string;
  body: string;
  /** Visual stages the scene moves through, from the lesser model to the NURONE model. */
  stages: string[];
};

export const principles: Principle[] = [
  {
    id: "systems",
    over: "Systems",
    under: "Services",
    body: "We don't sell isolated tasks. We build the product, technical, operational, and growth systems that keep creating value after the sprint ends.",
    stages: ["Isolated task", "Connected workflow", "Coordinated system", "Scalable infrastructure"],
  },
  {
    id: "leverage",
    over: "Leverage",
    under: "Headcount",
    body: "We don't scale by throwing people at problems. We combine expert operators with AI, automation, and sharp execution to do more with less.",
    stages: ["More people", "Expert operators", "AI + automation", "More with less"],
  },
  {
    id: "foundations",
    over: "Foundations",
    under: "Firefighting",
    body: "Speed matters. But speed without foundations becomes technical debt, broken workflows, and expensive fixes. We build for what comes next.",
    stages: ["Broken workflows", "Technical debt", "Foundations", "What comes next"],
  },
  {
    id: "outcomes",
    over: "Outcomes",
    under: "Activity",
    body: "We don't confuse meetings, tickets, and dashboards with progress. The work has to move the product, the operations, or the revenue forward.",
    stages: ["Meetings", "Tickets", "Dashboards", "Forward"],
  },
];

/** "Technology We Work With", from dev.nurone.io/the-system. */
export const stackIntro =
  "We don't choose tools because they are trendy. We choose the stack that gives your business speed, ownership, scalability, and control.";

export const stack = [
  {
    id: "frontend",
    index: "S.01",
    name: "Frontend & Product",
    body: "Modern interfaces, web apps, dashboards, portals, onboarding flows, and customer-facing product experiences built for clarity and speed.",
    tools: ["React", "Next.js", "TypeScript", "Framer"],
  },
  {
    id: "backend",
    index: "S.02",
    name: "Backend & Data",
    body: "APIs, databases, permissions, business logic, data models, and backend foundations designed to survive real users and real growth.",
    tools: ["Node.js", "PostgreSQL", "Supabase", "Prisma"],
  },
  {
    id: "ai",
    index: "S.03",
    name: "AI & Agents",
    body: "LLM workflows, AI agents, prompt systems, retrieval, automation loops, memory, context, and guardrails built around real business logic.",
    tools: ["OpenAI", "Anthropic", "LangChain", "Pinecone"],
  },
] as const;
