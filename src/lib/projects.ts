export interface ProjectMetric {
  label: string
  value: string
}

export interface Project {
  id: number
  slug: string
  title: string
  tagline: string
  description: string
  color: string
  tags: string[]
  deliverables: string[]
  metrics: ProjectMetric[]
  // Case-study fields
  challenge: string
  solution: string
  results: string[]
  timeline: string
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "ep-e-auction",
    title: "EP E-Auction Platform",
    tagline: "Real-time competitive bidding at enterprise scale",
    description:
      "Enterprise auction platform that increased close rates by 35% with real-time bidding and smart analytics.",
    color: "#8B5CF6",
    tags: ["Next.js", "Redis", "WebSockets"],
    deliverables: [
      "Real-time bidding engine with sub-100ms latency",
      "Live auction dashboard with WebSocket sync",
      "Admin panel for lot management & analytics",
      "Automated email + notification pipeline",
      "Role-based auth for buyers, sellers & admins",
    ],
    metrics: [
      { label: "Close Rate Increase", value: "+35%" },
      { label: "Bid Latency", value: "<100ms" },
      { label: "Uptime", value: "99.9%" },
    ],
    challenge:
      "The client was running high-value auctions on a legacy system that regularly crashed under load. Bids were being lost, users were frustrated, and the business was leaking revenue. They needed a platform that could handle 500+ concurrent bidders with zero dropped bids.",
    solution:
      "I designed a real-time bidding architecture using WebSockets backed by Redis pub/sub. Every bid is validated server-side in under 100ms and broadcast to all connected clients instantly. The admin dashboard gives auctioneers full control — live lot management, real-time analytics, and automated notifications. Role-based access ensures buyers, sellers, and admins each see exactly what they need.",
    results: [
      "Auction close rates increased by 35% within the first quarter",
      "Zero dropped bids across 200+ live auction events",
      "500+ concurrent users with sub-100ms bid confirmation",
      "Admin workload reduced by 60% through automation",
    ],
    timeline: "8 weeks",
  },
  {
    id: 2,
    slug: "cat-proxies",
    title: "Cat Proxies",
    tagline: "Self-serve proxy infrastructure with automated billing",
    description:
      "Scaled a proxy business to consistent MRR growth with a self-serve dashboard and automated Stripe billing.",
    color: "#3B82F6",
    tags: ["React", "Go", "Stripe"],
    deliverables: [
      "Self-serve proxy provisioning dashboard",
      "Stripe subscription + usage-based billing",
      "Real-time bandwidth & geo analytics",
      "IP rotation engine in Go",
      "Customer portal with plan management",
    ],
    metrics: [
      { label: "Churn Reduction", value: "-40%" },
      { label: "Proxy Uptime", value: "99.7%" },
      { label: "Countries", value: "40+" },
    ],
    challenge:
      "Cat Proxies was managing everything manually — provisioning, billing, and support. Customer churn was high because there was no self-serve option and billing disputes were constant. They needed to automate operations and give customers control.",
    solution:
      "I built a full self-serve dashboard where customers can provision proxies, manage plans, and monitor usage in real-time. Stripe handles subscriptions with usage-based billing that scales automatically. The IP rotation engine, written in Go for performance, handles millions of requests daily across 40+ countries.",
    results: [
      "Customer churn dropped 40% after launch of self-serve portal",
      "Support tickets reduced by 70% — most actions are now self-serve",
      "Billing disputes dropped to near zero with transparent usage tracking",
      "Consistent month-over-month MRR growth since launch",
    ],
    timeline: "6 weeks",
  },
  {
    id: 3,
    slug: "projectclay",
    title: "ProjectClay",
    tagline: "Visual component builder for engineering teams",
    description:
      "Cut design-to-production time by 60% with a visual component builder used by 12+ engineering teams.",
    color: "#06B6D4",
    tags: ["TypeScript", "Canvas API", "Tailwind"],
    deliverables: [
      "Drag-and-drop component canvas (Canvas API)",
      "Live Tailwind code export engine",
      "Component library with version control",
      "Multiplayer editing with presence cursors",
      "One-click Figma import pipeline",
    ],
    metrics: [
      { label: "Dev Time Saved", value: "60%" },
      { label: "Components Built", value: "200+" },
      { label: "Teams Using", value: "12+" },
    ],
    challenge:
      "Engineering teams were spending weeks translating Figma designs into production code. Designers and developers spoke different languages, and every handoff created bottlenecks. The client wanted a tool that bridges the gap between design and code.",
    solution:
      "I built a visual canvas where designers and developers collaborate in real-time. Components are dragged and assembled visually, and the engine exports production-ready Tailwind code instantly. A Figma import pipeline means existing designs can be brought in with one click. Real-time multiplayer editing with cursor presence keeps everyone in sync.",
    results: [
      "Design-to-code cycle reduced from 2 weeks to 3 days",
      "200+ reusable components created across all teams",
      "Adopted by 12+ engineering teams internally",
      "Design consistency improved — fewer UI bugs in production",
    ],
    timeline: "10 weeks",
  },
  {
    id: 4,
    slug: "effort-education",
    title: "Effort Education",
    tagline: "AI-powered learning that adapts to every student",
    description:
      "AI-powered LMS that boosted student completion rates by 38% with adaptive learning and real-time tracking.",
    color: "#EC4899",
    tags: ["AI", "Next.js", "PostgreSQL"],
    deliverables: [
      "AI tutor chat with context-aware responses",
      "Adaptive quiz engine with spaced repetition",
      "Student progress & performance dashboard",
      "Course builder with rich media support",
      "Parent & teacher reporting module",
    ],
    metrics: [
      { label: "Completion Rate", value: "+38%" },
      { label: "Active Students", value: "1,000+" },
      { label: "Courses", value: "80+" },
    ],
    challenge:
      "Traditional e-learning platforms were failing their students. Completion rates hovered at 15%, courses were one-size-fits-all, and teachers had no visibility into where students were struggling. The client needed a platform that makes learning personal.",
    solution:
      "I built an AI-powered LMS where every student gets a personalised learning path. The AI tutor provides context-aware help, the quiz engine uses spaced repetition to optimise retention, and the adaptive system adjusts difficulty in real-time. Teachers and parents get detailed dashboards showing exactly where each student stands.",
    results: [
      "Student completion rates jumped from 15% to 53%",
      "Average quiz scores improved by 28% within 2 months",
      "1,000+ active students across 80+ courses",
      "Teachers report 50% less time spent on manual progress tracking",
    ],
    timeline: "12 weeks",
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
