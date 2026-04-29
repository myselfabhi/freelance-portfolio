'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import HeroCanvas from '@/components/HeroCanvas'
import MagneticButton from '@/components/MagneticButton'
import { SITE } from '@/lib/seo'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef     = useRef<HTMLHeadingElement>(null)
  const subRef       = useRef<HTMLParagraphElement>(null)
  const ctaRef       = useRef<HTMLDivElement>(null)
  const scrollRef    = useRef<HTMLDivElement>(null)
  const badgeRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Split title into chars ──────────────────────────────────────────
      if (titleRef.current) {
        const words = titleRef.current.innerText.split(' ')
        titleRef.current.innerHTML = words
          .map(
            (word) =>
              `<span class="word inline-block overflow-hidden pb-1 whitespace-nowrap">${word
                .split('')
                .map((ch) => `<span class="char inline-block translate-y-[110%]">${ch}</span>`)
                .join('')}</span>`
          )
          .join('<span class="inline-block">&nbsp;</span>')

        gsap.to('.char', {
          y: '0%',
          stagger: 0.025,
          duration: 1.4,
          ease: 'expo.out',
          delay: 0.6,
        })
      }

      // ── Staggered fade-ins ─────────────────────────────────────────────
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1,  y: 0,   duration: 1,   ease: 'expo.out', delay: 0.4 }
      )
      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 24 },
        { opacity: 0.6, y: 0, duration: 1.4, ease: 'expo.out', delay: 1.15 }
      )
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1,  y: 0,   duration: 1.4, ease: 'expo.out', delay: 1.35 }
      )
      gsap.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1,          duration: 1,   ease: 'expo.out', delay: 2.2 }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background px-6"
    >
      {/* ── Particle background ─────────────────────────────────────── */}
      <HeroCanvas />

      {/* ── Radial purple focal glow ────────────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_50%_50%,rgba(139,92,246,0.07),transparent)] pointer-events-none" />

      {/* ── Corner accent gradients ─────────────────────────────────── */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-[radial-gradient(circle,rgba(59,130,246,0.04),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vh] bg-[radial-gradient(circle,rgba(6,182,212,0.04),transparent_70%)] pointer-events-none" />

      {/* ── Content ─────────────────────────────────────────────────── */}
      {/* pt-24 offsets the fixed nav so vertical centering uses the visible area */}
      <div className="relative z-10 max-w-5xl w-full text-center flex flex-col items-center pt-24 pb-24">

        {/* Status badge — natural width, centered on same axis as nav pill */}
        <div ref={badgeRef} className="mb-10">
          <div className="inline-flex items-center gap-2.5 glass px-5 py-2.5 rounded-full border-white/[0.07]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] animate-pulse shrink-0" />
            <span className="text-[11px] font-bold tracking-[0.35em] uppercase text-foreground/50">
              {SITE.availability}
            </span>
          </div>
        </div>

        {/* Headline — capped at 7rem so it never clips on 1440px */}
        <h1
          ref={titleRef}
          className="text-[clamp(2.8rem,7.5vw,7rem)] font-black tracking-tighter leading-[0.9] mb-8 w-full"
        >
          Web products that print money
        </h1>

        {/* Subline */}
        <p
          ref={subRef}
          className="text-lg md:text-xl text-foreground/60 max-w-xl mx-auto mb-14 font-medium leading-relaxed"
        >
          I&apos;m <span className="text-white">Abhinav</span> — a freelance software engineer helping
          founders ship fast, scalable web products. SaaS, real-time platforms, AI tools.
          Shipped in weeks, not quarters.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent-purple text-white rounded-full font-bold text-sm tracking-wide hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:bg-accent-purple/90 transition-all duration-300"
            >
              See Case Studies
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 glass border border-white/10 text-white rounded-full font-bold text-sm tracking-wide hover:bg-white/[0.08] transition-all duration-300"
            >
              Book a Call
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* ── Scroll indicator — pushed below content with margin ─────── */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.5em] text-foreground/25 font-bold">
          Scroll
        </span>
        <div
          className="w-[1px] h-10 bg-gradient-to-b from-accent-purple/60 to-transparent"
          style={{ animation: 'scrollPulse 2.2s ease-in-out infinite' }}
        />
      </div>
    </section>
  )
}
