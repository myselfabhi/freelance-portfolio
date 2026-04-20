'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [loading, setLoading]   = useState(true)
  const [progress, setProgress] = useState(0)
  const [exit, setExit]         = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 18
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => setExit(true), 300)
          setTimeout(() => setLoading(false), 1100)
          return 100
        }
        return next
      })
    }, 120)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div className="fixed inset-0 z-[10000] overflow-hidden">
          {/* Top panel slides up */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-[#050505] flex flex-col items-center justify-end pb-8 origin-top"
            animate={exit ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          >
            {/* Name */}
            <motion.div
              className="overflow-hidden mb-6"
              initial={{ opacity: 1 }}
              animate={exit ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <motion.h1
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl md:text-5xl font-black tracking-tighter uppercase"
              >
                Abhinav Verma
              </motion.h1>
            </motion.div>

            {/* Progress bar */}
            <div className="w-56 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute h-full bg-gradient-to-r from-accent-purple to-accent-blue rounded-full"
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>
            <p className="mt-3 text-[11px] font-mono text-white/30 tracking-[0.3em] uppercase">
              Loading — {Math.floor(Math.min(progress, 100))}%
            </p>
          </motion.div>

          {/* Bottom panel slides down */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#050505] origin-bottom"
            animate={exit ? { y: '100%' } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0 }}
          />

          {/* Thin purple line at center seam */}
          <motion.div
            className="absolute inset-x-0 top-1/2 -translate-y-px h-[2px] bg-gradient-to-r from-transparent via-accent-purple to-transparent"
            animate={exit ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
