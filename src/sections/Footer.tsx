'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { Mail, ArrowUp } from 'lucide-react'
import FooterCanvas from '@/components/FooterCanvas'
import MagneticButton from '@/components/MagneticButton'
import ContactForm from '@/components/ContactForm'

gsap.registerPlugin(ScrollTrigger)

// Inline SVG brand icons (lucide-react 1.x removed brand logos)
function IconGithub({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}

const SOCIALS = [
  { label: 'GitHub',    Icon: IconGithub,    href: 'https://github.com/myselfabhi'                          },
  { label: 'LinkedIn',  Icon: IconLinkedIn,  href: 'https://www.linkedin.com/in/abhinav-verma-2b2303203/'  },
  { label: 'Instagram', Icon: IconInstagram, href: 'https://instagram.com/_myselfabhi'                     },
  { label: 'Email',     Icon: Mail,          href: 'mailto:myselfabhi.dev@gmail.com'                       },
]

export default function Footer() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headingRef  = useRef<HTMLHeadingElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word heading reveal on scroll
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll<HTMLElement>('.footer-word')
        gsap.fromTo(
          words,
          { y: '110%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            stagger: 0.12,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
            },
          }
        )
      }

      // CTA block fade-in
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#030303] overflow-hidden flex flex-col border-t border-white/[0.04]"
    >
      {/* ── Starfield canvas ──────────────────────────────────────── */}
      <FooterCanvas />

      {/* ── Gradient orbs ─────────────────────────────────────────── */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(139,92,246,0.08),transparent_65%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(59,130,246,0.05),transparent_65%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[350px] bg-[radial-gradient(circle,rgba(6,182,212,0.04),transparent_65%)] pointer-events-none" />

      {/* ── Main content ──────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 lg:px-20 pt-32 pb-16 relative z-10">

        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'circOut' }}
          viewport={{ once: true }}
          className="flex items-center gap-3 glass px-6 py-3 rounded-full mb-16 border-white/[0.06]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
          <span className="text-[11px] font-black tracking-[0.38em] uppercase text-foreground/50">
            Available · Q3 2026 · Remote
          </span>
        </motion.div>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-[clamp(3.2rem,10vw,12rem)] font-black tracking-tighter leading-[0.85] text-center mb-16 overflow-hidden"
        >
          {["Let's", "build", "something"].map((word) => (
            <span key={word} className="inline-block overflow-hidden mr-[0.2em] last:mr-0">
              <span className="footer-word inline-block">{word}</span>
            </span>
          ))}
          <br />
          <span className="inline-block overflow-hidden">
            <span className="footer-word inline-block gradient-text italic">legendary.</span>
          </span>
        </h2>

        {/* Contact form */}
        <div ref={ctaRef} className="w-full max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-white/[0.05] px-6 lg:px-20 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Copyright */}
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-foreground/20 order-3 md:order-1">
            © 2026 Abhinav Verma. All Rights Reserved.
          </span>

          {/* Social links */}
          <div className="flex items-center gap-6 order-1 md:order-2">
            {SOCIALS.map(({ label, Icon, href }) => (
              <MagneticButton key={label} distance={0.6}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 glass rounded-full text-foreground/40 hover:text-white hover:border-white/20 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              </MagneticButton>
            ))}
          </div>

          {/* Back to top */}
          <MagneticButton distance={0.5} className="order-2 md:order-3">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-[11px] font-black tracking-[0.3em] uppercase text-foreground/30 hover:text-white transition-colors duration-300 group"
            >
              Back to Top
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </MagneticButton>
        </div>
      </div>
    </footer>
  )
}
