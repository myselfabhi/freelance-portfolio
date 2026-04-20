'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'
import { useSectionObserver } from '@/hooks/useSectionObserver'

const NAV_ITEMS = [
  { label: 'Work',     href: '#projects', sectionId: 'projects' },
  { label: 'Services', href: '#services', sectionId: 'services' },
  { label: 'About',    href: '#about',    sectionId: 'about'    },
  { label: 'FAQ',      href: '#faq',      sectionId: 'faq'      },
  { label: 'Contact',  href: '#contact',  sectionId: 'contact'  },
]

const SECTION_IDS = ['hero', 'projects', 'how-i-work', 'services', 'why-me', 'about', 'faq', 'contact']

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useSectionObserver(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 pointer-events-none">
      <motion.div
        className="relative max-w-7xl mx-auto flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── Logo ────────────────────────────────────────────────── */}
        <a
          href="#hero"
          className="text-2xl font-black tracking-tighter pointer-events-auto hover:text-accent-purple transition-colors duration-300"
        >
          AV.
        </a>

        {/* ── Nav links — absolutely centered on viewport ─────────── */}
        <div
          className={`hidden md:flex absolute left-1/2 -translate-x-1/2 w-[480px] justify-evenly px-6 py-3.5 rounded-full pointer-events-auto border border-white/[0.06] transition-all duration-500 ${
            scrolled
              ? 'bg-black/70 backdrop-blur-xl shadow-[0_4px_40px_rgba(0,0,0,0.4)]'
              : 'bg-white/[0.02] backdrop-blur-sm'
          }`}
        >
          {NAV_ITEMS.map(({ label, href, sectionId }) => {
            const isActive = activeSection === sectionId
            return (
              <a
                key={label}
                href={href}
                className={`relative text-[10px] font-black uppercase tracking-widest transition-colors duration-300 pb-0.5 ${
                  isActive ? 'text-white' : 'text-foreground/40 hover:text-white/70'
                }`}
              >
                {label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-accent-purple rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </div>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <MagneticButton className="pointer-events-auto">
          <a
            href="#contact"
            className="px-6 py-3 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-full hover:shadow-[0_0_24px_rgba(255,255,255,0.28)] transition-all duration-300"
          >
            Let&apos;s Chat
          </a>
        </MagneticButton>
      </motion.div>
    </nav>
  )
}
