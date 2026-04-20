'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useSectionObserver } from '@/hooks/useSectionObserver'

const SECTIONS = [
  { id: 'hero',      label: 'Home' },
  { id: 'projects',  label: 'Work' },
  { id: 'how-i-work', label: 'Process' },
  { id: 'services',  label: 'Services' },
  { id: 'about',     label: 'About' },
  { id: 'faq',       label: 'FAQ' },
  { id: 'contact',   label: 'Contact' },
]

export default function SectionDots() {
  const active = useSectionObserver(SECTIONS.map((s) => s.id))

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 pointer-events-auto"
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            className="group relative flex items-center justify-end gap-2"
          >
            {/* Tooltip label */}
            <span className="opacity-0 group-hover:opacity-100 text-[10px] font-black tracking-[0.2em] uppercase text-white/40 transition-opacity duration-200 pr-1 select-none">
              {label}
            </span>

            {/* Dot */}
            <motion.div
              animate={{
                width:  isActive ? 20 : 6,
                height: 6,
                backgroundColor: isActive
                  ? 'rgba(139,92,246,1)'
                  : 'rgba(255,255,255,0.2)',
                boxShadow: isActive
                  ? '0 0 10px rgba(139,92,246,0.8)'
                  : 'none',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="rounded-full"
            />
          </a>
        )
      })}
    </nav>
  )
}
