'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050505]"
        >
          <div className="relative overflow-hidden mb-8">
            <motion.h1 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="text-2xl md:text-4xl font-bold tracking-tighter uppercase"
            >
              Abhinav Verma
            </motion.h1>
          </div>
          
          <div className="w-64 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
            <motion.div 
              className="absolute h-full bg-accent-purple"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
          
          <div className="mt-4 text-xs font-mono text-white/40 tracking-[0.3em] uppercase">
            Loading Experience — {Math.floor(progress)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
