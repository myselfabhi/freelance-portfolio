export interface FaqItem {
  q: string
  a: string
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How do we get started?",
    a: "Drop a message through the contact form with a short brief — goals, timeline, and any existing assets. I reply within 24 hours with a scoped proposal, a fixed quote (or weekly rate), and a kickoff date. Most projects start within 1–2 weeks.",
  },
  {
    q: "What does a typical project cost?",
    a: "Landing pages and marketing sites start around $2,500. Full SaaS MVPs, dashboards, and real-time platforms typically range $8,000–$35,000 depending on scope. Retainer engagements are available at a weekly rate. Every quote is fixed and transparent — no surprises.",
  },
  {
    q: "How fast can you ship?",
    a: "Marketing sites in 1–3 weeks. MVPs in 4–8 weeks. Enterprise platforms in 8–14 weeks. I work in weekly shipping cycles with a live staging URL from day one, so you always see progress.",
  },
  {
    q: "Do you work with existing codebases?",
    a: "Yes — I regularly rescue stalled projects, refactor legacy React/Next.js apps, and add new features to production systems. I start with a free 30-minute audit to scope the work.",
  },
  {
    q: "What's your tech stack?",
    a: "Next.js, React, TypeScript, Tailwind on the frontend. Node.js, Go, PostgreSQL, Redis, and WebSockets on the backend. I also integrate AI/LLMs (OpenAI, Anthropic), Stripe, and deploy on Vercel/AWS. The stack flexes to fit your needs — I pick what's right for the project, not what's trendy.",
  },
  {
    q: "Who owns the code?",
    a: "You do — 100%. I transfer the Git repository, all accounts, and deployment access on delivery. No lock-in, no licensing fees.",
  },
  {
    q: "Do you offer post-launch support?",
    a: "Yes. Every project includes 30 days of free bug fixes post-launch. Beyond that, I offer monthly retainers for ongoing development, monitoring, and iteration.",
  },
  {
    q: "Where are you based and what hours do you work?",
    a: "I'm based in India but work with clients globally — US, EU, UK, Australia. I overlap 4+ hours with every major timezone and respond within a few hours on weekdays.",
  },
]
