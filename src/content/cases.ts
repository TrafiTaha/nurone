import type { CapabilityId } from "./system";

export type CaseStudy = {
  id: string;
  client: string;
  sector: string;
  engagement: string;
  status?: "In progress";
  before: string;
  transformation: string;
  result: string;
  stats: { value: string; label: string }[];
  capabilities: CapabilityId[];
  /** Founder quote when the current site has one; otherwise the named client lead. */
  voice: { quote?: string; name: string; role: string; initials?: string };
};

/** Copy and figures come from dev.nurone.io, restructured as before → transformation → result. */
export const cases: CaseStudy[] = [
  {
    id: "001",
    client: "Trucking88",
    sector: "Logistics",
    engagement: "MVP → production SaaS",
    before: "A first AI-built MVP and a clear market need.",
    transformation: "Stronger foundations, cleaner UX, AI-assisted workflows and a product roadmap for growth.",
    result: "A production-ready transportation SaaS on web and mobile.",
    stats: [
      { value: "AI", label: "Load creation" },
      { value: "Web+Mobile", label: "SaaS platform" },
      { value: "Real-time", label: "Tracking" },
    ],
    capabilities: ["product", "engineering", "ai", "automation"],
    voice: { name: "Adrian R.", role: "Founder, Trucking88" },
  },
  {
    id: "002",
    client: "HireKey",
    sector: "Career tech",
    engagement: "AI platform",
    before: "Job seekers stuck with static resume builders.",
    transformation: "Resume parsing, ATS scoring, job matching, application tracking and interview preparation.",
    result: "An AI career platform with personalized guidance for students, graduates and professionals.",
    stats: [
      { value: "ATS", label: "Resume scoring" },
      { value: "Smart", label: "Job matching" },
      { value: "Guided", label: "Career workflow" },
    ],
    capabilities: ["product", "ai"],
    voice: {
      quote:
        "Job seekers don't just need a resume builder. They need an intelligent system that understands their profile, improves their positioning, and guides them toward the right opportunities.",
      name: "Nela D.",
      role: "Co-Founder, HireKey",
    },
  },
  {
    id: "003",
    client: "MediForm AI",
    sector: "HealthTech",
    engagement: "Clinical AI",
    before: "Clinicians losing hours to documentation after every patient conversation.",
    transformation: "Speech recognition, medical NLP, confidence scoring and human review in one flow.",
    result: "Patient conversations become structured, EHR-ready SOAP notes.",
    stats: [
      { value: "80%", label: "Time reduced" },
      { value: "SOAP", label: "AI notes" },
      { value: "EHR", label: "Integration ready" },
    ],
    capabilities: ["ai", "product", "engineering"],
    voice: {
      quote:
        "Clinicians don't need another tool to manage. They need an AI system that listens, structures the clinical story, and gives them back time without losing control.",
      name: "Pablo C.",
      role: "Founder, MediForm AI",
    },
  },
  {
    id: "004",
    client: "Ministry of Higher Education & Scientific Research",
    sector: "Public sector",
    engagement: "Legal AI",
    before: "Complex legal and regulatory knowledge that teams struggled to search and act on.",
    transformation: "Document intelligence, RAG-based legal search, Arabic/French NLP and policy analysis.",
    result: "Modernized public-sector legal workflows built on institutional intelligence.",
    stats: [
      { value: "RAG", label: "Legal search" },
      { value: "AI", label: "Document review" },
      { value: "AR/FR", label: "Legal NLP" },
    ],
    capabilities: ["ai", "engineering"],
    voice: {
      quote:
        "Legal and regulatory knowledge is only useful when teams can access it, search it, understand it, and act on it quickly. The goal was to turn complex information into institutional intelligence.",
      name: "Strategic AI Initiative",
      initials: "AI",
      role: "Public sector, Tunisia",
    },
  },
  {
    id: "005",
    client: "YouthSchedule",
    sector: "Scheduling SaaS",
    engagement: "Rescue & migration",
    before: "Stuck inside Lovable with limited database access, a corrupted schema and a risky migration path.",
    transformation: "Extracted the product, migrated and rebuilt 300+ files, reconstructed the database.",
    result: "The platform now runs on real SaaS infrastructure.",
    stats: [
      { value: "300+", label: "Files migrated" },
      { value: "Rebuilt", label: "Database schema" },
      { value: "Escaped", label: "Lovable Cloud" },
    ],
    capabilities: ["engineering"],
    voice: { name: "Brad B.", role: "Founder, YouthSchedule" },
  },
  {
    id: "006",
    client: "SG Solutions",
    sector: "B2B HR",
    engagement: "Idea → product",
    before: "A founder idea.",
    transformation: "A free prototype in 48 hours, then a full build with admin, visitor tracking and UTM analytics.",
    result: "A B2B HR provider directory with a large database and a roadmap toward AI matching.",
    stats: [
      { value: "48h", label: "Prototype sprint" },
      { value: "B2B", label: "HR directory" },
      { value: "AI", label: "Matching roadmap" },
    ],
    capabilities: ["product", "engineering", "operations"],
    voice: { name: "Yahya H.", role: "Founder, SG Solutions" },
  },
  {
    id: "007",
    client: "Remedy Tax Solutions",
    sector: "Tax relief",
    engagement: "AI operating system",
    status: "In progress",
    before: "Deadlines, documents, IRS communication and case strategy spread across tools and people.",
    transformation: "CRM workflows, case management, document intelligence, RAG retrieval, agentic automation and DevOps.",
    result: "One intelligent operating layer for tax relief teams.",
    stats: [
      { value: "RAG", label: "Case intelligence" },
      { value: "Agents", label: "Workflow automation" },
      { value: "OS", label: "Tax operations" },
    ],
    capabilities: ["ai", "automation", "operations"],
    voice: {
      quote:
        "Tax relief is not just about managing clients. It is about managing deadlines, documents, IRS communication, case strategy, team execution, and trust. We needed a system that could bring all of that into one intelligent operating layer.",
      name: "Tomy C.",
      role: "COO, Remedy Tax Solutions",
    },
  },
];

export const caseById = Object.fromEntries(cases.map((c) => [c.id, c])) as Record<string, CaseStudy>;
