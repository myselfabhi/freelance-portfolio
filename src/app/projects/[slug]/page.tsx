import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects, getProjectBySlug } from '@/lib/projects'
import { SITE, absoluteUrl } from '@/lib/seo'
import { ProjectJsonLd } from '@/components/JsonLd'
import CaseStudyContent from './CaseStudyContent'

// Pre-generate all project slugs at build time
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: 'Not Found' }

  const title = `${project.title} — Case Study`
  const description = `${project.tagline}. ${project.description}`
  const url = `/projects/${project.slug}`

  return {
    title,
    description,
    keywords: [...project.tags, 'case study', 'freelance web development', SITE.author],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url: absoluteUrl(url),
      title: `${title} · ${SITE.shortTitle}`,
      description,
      siteName: SITE.name,
      images: [
        {
          url: absoluteUrl(SITE.ogImage),
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} · ${SITE.shortTitle}`,
      description,
      images: [absoluteUrl(SITE.ogImage)],
      creator: SITE.twitter,
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <>
      <ProjectJsonLd slug={slug} />
      <CaseStudyContent project={project} />
    </>
  )
}
