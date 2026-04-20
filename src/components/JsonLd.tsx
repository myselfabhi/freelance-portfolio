import { SITE, absoluteUrl } from "@/lib/seo"
import { projects } from "@/lib/projects"

/**
 * Root JSON-LD: Person + WebSite + ProfessionalService.
 * Drop this once in the root of the home page.
 */
export function HomeJsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.author,
    url: SITE.url,
    email: `mailto:${SITE.email}`,
    jobTitle: SITE.jobTitle,
    image: absoluteUrl(SITE.ogImage),
    sameAs: SITE.sameAs,
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Go",
      "PostgreSQL",
      "Redis",
      "WebSockets",
      "AI / LLM integration",
      "Stripe",
      "AWS",
    ],
    description: SITE.description,
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: SITE.author,
      url: SITE.url,
    },
  }

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${SITE.author} — Freelance Web Development`,
    url: SITE.url,
    image: absoluteUrl(SITE.ogImage),
    priceRange: "$$-$$$",
    description:
      "Freelance software engineering services: web app development, SaaS platforms, real-time systems, and AI-powered products for founders and startups.",
    areaServed: "Worldwide",
    provider: {
      "@type": "Person",
      name: SITE.author,
      url: SITE.url,
    },
    serviceType: [
      "Web Application Development",
      "SaaS Product Development",
      "Real-time System Engineering",
      "AI / LLM Integration",
      "Performance Optimization",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Freelance Engineering Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Product Development",
            description:
              "End-to-end full-stack product development — from architecture to production deployment.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI to Production Code",
            description:
              "Pixel-perfect translation of designs into performant, accessible, animated frontend code.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Performance Optimization",
            description:
              "Audit and optimize existing web apps for sub-second loads and 60 FPS interactions.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Real-time Systems",
            description:
              "WebSocket and Redis-backed real-time platforms for auctions, dashboards, and collaboration.",
          },
        },
      ],
    },
  }

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    ],
  }

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Selected Projects",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}/projects/${p.slug}`,
      name: p.title,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
    </>
  )
}

export function ProjectJsonLd({ slug }: { slug: string }) {
  const p = projects.find((x) => x.slug === slug)
  if (!p) return null

  const creativeWork = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    headline: p.tagline,
    description: p.description,
    url: `${SITE.url}/projects/${p.slug}`,
    image: absoluteUrl(SITE.ogImage),
    keywords: p.tags.join(", "),
    author: {
      "@type": "Person",
      name: SITE.author,
      url: SITE.url,
    },
    creator: {
      "@type": "Person",
      name: SITE.author,
      url: SITE.url,
    },
  }

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${SITE.url}/#projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: p.title,
        item: `${SITE.url}/projects/${p.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWork) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </>
  )
}

/** Standalone FAQ JSON-LD. Pass the same items you render visually. */
export function FaqJsonLd({
  items,
}: {
  items: { q: string; a: string }[]
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: i.a,
      },
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}
