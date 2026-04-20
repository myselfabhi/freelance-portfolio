'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function InteractiveDivider() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const orbY1 = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const orbY2 = useTransform(scrollYProgress, [0, 1], ['15%', '-15%'])
  const scale  = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85])
  const fade   = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section
      ref={ref}
      className="relative h-[60vh] w-full overflow-hidden bg-[#050505] flex items-center justify-center"
    >
      {/* Gradient orbs with parallax */}
      <motion.div
        style={{ y: orbY1 }}
        className="absolute -left-48 -top-20 w-[700px] h-[700px] rounded-full bg-accent-purple/[0.07] blur-[130px] pointer-events-none"
      />
      <motion.div
        style={{ y: orbY2 }}
        className="absolute -right-48 -bottom-20 w-[600px] h-[600px] rounded-full bg-accent-blue/[0.07] blur-[110px] pointer-events-none"
      />

      {/* Ghost background text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[5rem] sm:text-[8rem] md:text-[11rem] font-black uppercase tracking-tighter text-white/[0.022] leading-none">
          INTERACTIVE
        </span>
        <span className="text-[5rem] sm:text-[8rem] md:text-[11rem] font-black uppercase tracking-tighter text-white/[0.022] leading-none -mt-3">
          SYSTEMS
        </span>
      </div>

      {/* Animated orrery rings */}
      <motion.div style={{ scale, opacity: fade }} className="relative z-10 flex items-center justify-center">
        {/* Outer static ring */}
        <div className="absolute w-48 h-48 rounded-full border border-white/[0.05]" />

        {/* Mid ring — clockwise */}
        <div
          className="absolute w-32 h-32 rounded-full border border-accent-purple/[0.18]"
          style={{ animation: 'spin 14s linear infinite' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-accent-purple shadow-[0_0_8px_rgba(139,92,246,0.9)]" />
        </div>

        {/* Inner ring — counter-clockwise */}
        <div
          className="absolute w-18 h-18 rounded-full border border-accent-blue/[0.2]"
          style={{ width: 72, height: 72, animation: 'spin 9s linear infinite reverse' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-accent-blue shadow-[0_0_8px_rgba(59,130,246,0.9)]" />
        </div>

        {/* Core glow */}
        <div className="w-3 h-3 rounded-full bg-accent-purple shadow-[0_0_24px_6px_rgba(139,92,246,0.5)]" />
      </motion.div>

      {/* Top + bottom fade-out edges */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </section>
  )
}
