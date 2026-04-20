/**
 * Central SEO constants. Edit these once; they propagate to metadata,
 * sitemap, robots, Open Graph, Twitter cards, and JSON-LD.
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
  ogImage: "/og-image.png", // 1200x630 — create this asset if not present
} as const

export const absoluteUrl = (path = "/") =>
  `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`
