'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { projects } from '@/lib/projects'

gsap.registerPlugin(ScrollTrigger)

function ProjectPanel({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef   = useRef<HTMLDivElement>(null)
  const panelRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
          end:   'top 25%',
          scrub: 1,
        },
        opacity: 0,
        x: -40,
        filter: 'blur(8px)',
      })
      gsap.from(panelRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end:   'top 20%',
          scrub: 1,
        },
        opacity: 0,
        x: 40,
        filter: 'blur(8px)',
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center py-40 px-6 lg:px-20 overflow-hidden"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* ── Left: project info ──────────────────────────────────── */}
        <div ref={contentRef} className="flex flex-col items-start">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 56 }}
            transition={{ duration: 0.8, ease: 'circOut' }}
            className="h-[2px] mb-6"
            style={{ background: project.color }}
          />
          <span className="text-xs font-black tracking-[0.45em] uppercase mb-4 block" style={{ color: project.color }}>
            Project 0{index + 1}
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.88]">
            {project.title}
          </h2>
          <p className="text-lg md:text-xl text-foreground/40 mb-10 max-w-md leading-relaxed font-medium">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-12">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 glass rounded-full text-[11px] font-black uppercase tracking-widest text-foreground/50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <Link
            href={`/projects/${project.slug}`}
            className="group relative inline-flex items-center gap-3 text-xl font-black tracking-tighter pb-2 overflow-hidden"
          >
            <span className="relative z-10 uppercase italic">Explore Case Study</span>
            <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform duration-500" />
            <div
              className="absolute bottom-0 left-0 w-full h-[3px] origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
              style={{ background: project.color }}
            />
          </Link>
        </div>

        {/* ── Right: what we built ────────────────────────────────── */}
        <div ref={panelRef} className="relative">
          <div
            className="relative glass rounded-[2.5rem] p-10 md:p-12 border overflow-hidden"
            style={{ borderColor: `${project.color}18` }}
          >
            {/* Subtle corner glow */}
            <div
              className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[90px] opacity-20 pointer-events-none"
              style={{ background: project.color }}
            />

            {/* Ghost index */}
            <div
              className="absolute bottom-6 right-8 text-[8rem] font-black italic leading-none pointer-events-none select-none opacity-[0.04]"
              style={{ color: project.color }}
            >
              0{index + 1}
            </div>

            {/* Deliverables */}
            <p className="text-[10px] font-black tracking-[0.4em] uppercase mb-6 opacity-30">
              What We Built
            </p>
            <ul className="space-y-4 mb-10 relative z-10">
              {project.deliverables.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: 'circOut' }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 text-foreground/70 text-sm md:text-base font-medium leading-snug"
                >
                  <span
                    className="mt-[6px] w-[5px] h-[5px] rounded-full shrink-0"
                    style={{ background: project.color, boxShadow: `0 0 6px ${project.color}` }}
                  />
                  {item}
                </motion.li>
              ))}
            </ul>

            {/* Metrics row */}
            <div className="grid grid-cols-3 gap-4 border-t pt-8 relative z-10" style={{ borderColor: `${project.color}15` }}>
              {project.metrics.map((m) => (
                <div key={m.label} className="flex flex-col gap-1">
                  <span
                    className="text-xl md:text-2xl font-black tracking-tight"
                    style={{ color: project.color }}
                  >
                    {m.value}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 leading-tight">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background radial tint */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04] pointer-events-none"
        style={{ background: `radial-gradient(circle at 60% 50%, ${project.color}, transparent 65%)` }}
      />
    </section>
  )
}

export default function Projects() {
  return (
    <div id="projects" className="w-full bg-background">
      <div className="pt-20 pb-10 text-center">
        <h2 className="text-[11px] font-black tracking-[0.55em] uppercase text-foreground/30">
          Selected Works
        </h2>
      </div>
      {projects.map((project, index) => (
        <ProjectPanel key={project.id} project={project} index={index} />
      ))}
    </div>
  )
}
