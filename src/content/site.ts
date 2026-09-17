export const site = {
  name: "NURONE",
  url: "https://dev.nurone.io",
  title: "NURONE | You bring the ambition. We build the system to scale it.",
  description:
    "NURONE is an AI-augmented operating team of elite engineers, product architects and growth hackers. We turn ideas, broken MVPs and existing businesses into scalable products, automated systems and revenue growth engines.",
  primaryCta: { label: "Request access", href: "#request-access" },
  secondaryCta: { label: "Explore Labs", href: "#labs" },
  contactCta: { label: "Get in touch", href: "#request-access" },
} as const;

/** The homepage is one journey in nine chapters; each section belongs to one. */
export const sections = [
  { id: "top", index: "01", name: "Ambition" },
  { id: "manifesto", index: "02", name: "The System" },
  { id: "philosophy", index: "03", name: "The Difference" },
  { id: "system", index: "04", name: "The Engine" },
  { id: "labs", index: "05", name: "The Labs" },
  { id: "process", index: "06", name: "The Method" },
  { id: "impact", index: "07", name: "Proof" },
  { id: "work", index: "07", name: "Proof" },
  { id: "testimonials", index: "07", name: "Proof" },
  { id: "stack", index: "08", name: "The Stack" },
  { id: "faq", index: "09", name: "The Decision" },
  { id: "request-access", index: "09", name: "The Decision" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

/** Mirrors the live navigation (Home, Labs, The System, How it works), in page order, plus Case Studies. */
export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "The System", href: "#philosophy" },
  { label: "Labs", href: "#labs" },
  { label: "How It Works", href: "#process" },
  { label: "Case Studies", href: "#work" },
] as const;

export const footerPages = [
  { label: "Home", href: "#top" },
  { label: "The System", href: "#philosophy" },
  { label: "Case Studies", href: "#work" },
  { label: "FAQ", href: "#faq" },
] as const;

/** Live pages on dev.nurone.io (verified). */
export const footerResources = [
  { label: "The System", href: "https://dev.nurone.io/the-system" },
  { label: "Foundation Lab", href: "https://dev.nurone.io/labs/foundation" },
  { label: "Blog", href: "https://dev.nurone.io/blog" },
  { label: "Contact", href: "#request-access" },
] as const;

/** The original footer lists these networks but links them to "#"; no URLs are invented here. */
export const socialNetworks = ["LinkedIn", "X (Twitter)", "Instagram"] as const;
