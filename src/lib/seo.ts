/**
 * Central SEO constants. Edit these once; they propagate to metadata,
 * sitemap, robots, Open Graph, Twitter cards, and JSON-LD.
 *
 * Note: The OG image and apple-touch-icon are generated dynamically
 * from `src/app/opengraph-image.tsx` and `src/app/apple-icon.tsx` via
 * the Next.js file-convention metadata APIs — no static asset paths.
 */

export const SITE = {
  name: "Abhinav Verma",
  title: "Abhinav Verma — Freelance Software Engineer & Web Developer",
  shortTitle: "Abhinav Verma",
  tagline: "Freelance Software Engineer — I ship production-grade web products for founders and startups",
  description:
    "Freelance software engineer building high-performance web apps, SaaS products, real-time platforms, and AI-powered tools for ambitious founders and startups. Available for new projects.",
  // IMPORTANT: update this before deploy
  url: "https://abhinavverma.dev",
  author: "Abhinav Verma",
  email: "myselfabhi.dev@gmail.com",
  twitter: "@myselfabhi",
  locale: "en_US",
  keywords: [
    "freelance web developer",
    "freelance software engineer",
    "hire Next.js developer",
    "hire React developer",
    "SaaS developer for hire",
    "full stack developer freelance",
    "AI developer freelance",
    "real-time web app developer",
    "WebSocket developer",
    "custom web application development",
    "MVP developer for startups",
    "Abhinav Verma",
  ],
  jobTitle: "Freelance Software Engineer",
  foundingLocation: "India",
  sameAs: [
    "https://github.com/myselfabhi",
    "https://www.linkedin.com/in/abhinav-verma-2b2303203/",
    "https://instagram.com/_myselfabhi",
  ],
  availability: "Booking Q3 2026 · 2 Slots Left · Remote",
  // Canonical route exposed by `src/app/opengraph-image.tsx` (file convention).
  // Used for JSON-LD schema.org image fields. Layout/metadata don't reference
  // this — they're auto-injected by Next.js from the file convention itself.
  ogImage: "/opengraph-image",
} as const

export const absoluteUrl = (path = "/") =>
  `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`
