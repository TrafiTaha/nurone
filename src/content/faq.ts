export type FaqGroup = {
  title: string;
  items: { q: string; a: string }[];
};

export const faqGroups: FaqGroup[] = [
  {
    title: "Getting started",
    items: [
      {
        q: "Do you work with people who only have an idea?",
        a: "Yes. If the idea has a real market, a clear ambition, or strong founder expertise behind it, we can start before there is a product. We help you turn it into a clear prototype so you can see it, test it, and decide what deserves to be built.",
      },
      {
        q: "Is the 72h prototype really free?",
        a: "Yes, for selected projects. We use it to understand your vision, show you how we think, and help both sides decide if there is a serious opportunity to build together.",
      },
      {
        q: "What if I already built an MVP with no-code, Lovable, Cursor, or freelancers?",
        a: "That is one of our strongest use cases. We review what exists, identify what is risky, what can be saved, and what needs to be rebuilt. Then we give the product the technical foundation it needs to launch and handle real users.",
      },
      {
        q: "What kind of businesses do you accept?",
        a: "Ambitious founders and companies building something serious. The project needs a real problem, real market potential, and a founder who is ready to move. If we don't believe we can create leverage, we won't take it.",
      },
      {
        q: "What happens after I request access?",
        a: "We review where you are now: idea, MVP, product, operations, team, or growth. Then we tell you which Lab fits your stage, what we would do first, and whether NURONE is the right partner to help you win.",
      },
    ],
  },
  {
    title: "Working together",
    items: [
      {
        q: "Are you a software agency?",
        a: "No. An agency usually delivers tasks. NURONE is an AI-augmented operating team combining product, engineering, automation and growth. We don't just build features; we build the system behind the next stage of the business.",
      },
      {
        q: "Do you replace a CTO or work with our existing team?",
        a: "Both. We can operate as your fractional CTO team if you don't have one, or plug into your existing team to accelerate delivery, architecture, automation, AI implementation, or growth infrastructure.",
      },
      {
        q: "How does the fractional CTO model work?",
        a: "You get the right team for your stage: engineers, product architects, AI operators, DevOps, UX/UI or automation experts. Hours are tracked, execution is visible, and you receive a weekly task log showing what was done, what is next, and what is blocked.",
      },
      {
        q: "Do you provide talent only?",
        a: "Yes. Through our talent layer we can deploy vetted technical talent in 5-7 days. If the talent is not the right fit, we replace them within 72 hours.",
      },
      {
        q: "How does the Growth Layer work?",
        a: "The Growth Layer is our private GTM system for selected businesses: positioning, inbound, outbound, ads, lead generation and revenue pipeline. In some cases we work on performance, per-lead, or equity-based models.",
      },
    ],
  },
  {
    title: "Ownership & terms",
    items: [
      {
        q: "Do we own the code and assets?",
        a: "Yes. You own the code, product assets, workflows, documentation and systems built for your project. No lock-in. No dependency by design.",
      },
      {
        q: "Do you work for equity?",
        a: "For the right business, yes. With strong founder commitment, real potential and a market worth attacking, we can invest our CTO and/or CMO execution in exchange for equity. We don't do this for every project.",
      },
    ],
  },
];
