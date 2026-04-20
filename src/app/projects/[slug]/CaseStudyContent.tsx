'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react'
import Link from 'next/link'
import type { Project } from '@/lib/projects'
import MagneticButton from '@/components/MagneticButton'
import HeroCanvas from '@/components/HeroCanvas'

gsap.registerPlugin(ScrollTrigger)

export default function CaseStudyContent({ project }: { project: Project }) {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cs-fade', {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: 'expo.out',
        delay: 0.3,
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-end overflow-hidden px-6 lg:px-20 pb-20">
        <HeroCanvas />
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 80%, ${project.color}, transparent)` }}
        />

        <div className="relative z-10 max-w-5xl w-full">
          <Link
            href="/#projects"
            className="cs-fade inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-foreground/40 hover:text-white transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          <div className="cs-fade flex flex-wrap items-center gap-4 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 glass rounded-full text-[11px] font-black uppercase tracking-widest text-foreground/50"
              >
                {tag}
              </span>
            ))}
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-foreground/30">
              <Clock className="w-3 h-3" /> {project.timeline}
            </span>
          </div>

          <h1
            className="cs-fade text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.88] mb-6"
            style={{ color: project.color }}
          >
            {project.title}
          </h1>
          <p className="cs-fade text-xl md:text-2xl text-foreground/50 max-w-2xl leading-relaxed font-medium">
            {project.tagline}
          </p>
        </div>
      </section>

      {/* ── Metrics bar ─────────────────────────────────────────── */}
      <section className="border-y border-white/[0.06] bg-[#070707]">
        <div className="max-w-5xl mx-auto px-6 lg:px-20 py-12 grid grid-cols-3 gap-8">
          {project.metrics.map((m) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: project.color }}>
                {m.value}
              </div>
              <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-foreground/30 mt-1">
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Challenge ───────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 lg:px-20 py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-[11px] font-black tracking-[0.5em] uppercase text-accent-purple mb-4 block">
            The Challenge
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[0.9]">
            What was broken
          </h2>
          <p className="text-lg md:text-xl text-foreground/50 leading-relaxed max-w-3xl">
            {project.challenge}
          </p>
        </motion.div>
      </section>

      {/* ── Solution ────────────────────────────────────────────── */}
      <section className="bg-[#070707] py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-[11px] font-black tracking-[0.5em] uppercase text-accent-blue mb-4 block">
              The Solution
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[0.9]">
              How I fixed it
            </h2>
            <p className="text-lg md:text-xl text-foreground/50 leading-relaxed max-w-3xl mb-12">
              {project.solution}
            </p>

            {/* Deliverables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.deliverables.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 p-5 glass rounded-2xl border-white/[0.05]"
                >
                  <span
                    className="mt-1 w-[6px] h-[6px] rounded-full shrink-0"
                    style={{ background: project.color, boxShadow: `0 0 8px ${project.color}` }}
                  />
                  <span className="text-sm text-foreground/65 font-medium">{d}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Results ─────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 lg:px-20 py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-[11px] font-black tracking-[0.5em] uppercase text-emerald-400 mb-4 block">
            The Results
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 leading-[0.9]">
            What changed
          </h2>
          <div className="space-y-5">
            {project.results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 text-lg text-foreground/60 font-medium"
              >
                <span className="text-emerald-400 font-black text-xl mt-0.5 shrink-0">→</span>
                {r}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] py-28 text-center px-6">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
          Want something similar?
        </h2>
        <p className="text-lg text-foreground/40 mb-10">
          Let&apos;s talk about your project.
        </p>
        <MagneticButton distance={0.4}>
          <Link
            href="/#contact"
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-black text-sm overflow-hidden hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-shadow duration-500"
          >
            <span className="absolute inset-0 bg-accent-purple translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            <span className="relative z-10 group-hover:text-white transition-colors">Start a Project</span>
            <ArrowUpRight className="relative z-10 w-5 h-5 group-hover:text-white transition-colors" />
          </Link>
        </MagneticButton>
      </section>
    </div>
  )
}
