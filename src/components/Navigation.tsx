'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from './MagneticButton'

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter pointer-events-auto"
        >
          AV.
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex glass px-8 py-4 rounded-full gap-8 pointer-events-auto border-white/5"
        >
          {navItems.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              className="text-xs font-bold uppercase tracking-widest text-foreground/60 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pointer-events-auto"
        >
          <MagneticButton>
            <button className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all">
              Let&apos;s Chat
            </button>
          </MagneticButton>
        </motion.div>
      </div>
    </nav>
  )
}
