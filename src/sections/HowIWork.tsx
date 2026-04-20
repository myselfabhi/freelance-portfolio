'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion'

const steps = [
  {
    title: "Understand",
    description: "Deep dive into your business goals, target audience, and market landscape.",
    icon: "🔍"
  },
  {
    title: "PRD Creation",
    description: "Detailed Product Requirement Documents to define the scope and technical path.",
    icon: "📄"
  },
  {
    title: "Design Thinking",
    description: "Creating wireframes and prototypes focused on user experience and visual polish.",
    icon: "🎨"
  },
  {
    title: "Development",
    description: "Turning designs into high-performance code using modern, scalable tech stacks.",
    icon: "💻"
  },
  {
    title: "Feedback Loop",
    description: "Continuous testing and refinement based on stakeholder and user feedback.",
    icon: "🔄"
  },
  {
    title: "Delivery",
    description: "Final optimization, deployment, and performance monitoring of the product.",
    icon: "🚀"
  }
]

export default function HowIWork() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef     = useRef<HTMLDivElement>(null)

  // Use a plain MotionValue so we can set exact pixel offsets
  const x = useMotionValue(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // On every scroll tick, translate by the exact amount needed to
  // carry the last card fully into view — regardless of card size or
  // viewport width.
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      if (!trackRef.current) return
      const trackWidth = trackRef.current.scrollWidth
      const viewWidth  = window.innerWidth
      // Add one card-gap worth of breathing room at the end (48px)
      const maxScroll  = Math.max(0, trackWidth - viewWidth + 48)
      x.set(-v * maxScroll)
    })
    return unsubscribe
  }, [scrollYProgress, x])

  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0])

  return (
    <section
      id="how-i-work"
      ref={containerRef}
      // 600 vh gives enough vertical travel for the full track on any screen
      className="relative h-[600vh] w-full bg-[#050505]"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-accent-purple/5 to-transparent"
        />

        {/* ── Section header ─────────────────────────────────────── */}
        <div className="px-6 lg:px-20 mb-10 relative z-10 shrink-0">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="h-[1px] bg-white/20 mb-8"
          />
          <h2 className="text-xs font-black tracking-[0.6em] uppercase text-foreground/30 mb-4 font-mono">
            Workflow Methodology
          </h2>
          <h3 className="text-6xl md:text-[9rem] font-black tracking-tighter leading-none italic opacity-10 select-none">
            PROCESS
          </h3>
          <h3 className="text-5xl md:text-8xl font-black tracking-tighter -mt-8 md:-mt-16">
            The blueprint.
          </h3>
        </div>

        {/* ── Scrolling track ────────────────────────────────────── */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-12 px-6 lg:px-20 relative z-20 shrink-0"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative min-w-[320px] md:min-w-[500px] lg:min-w-[540px] h-[52vh] flex-shrink-0"
            >
              <div className="w-full h-full glass rounded-[3rem] p-10 md:p-14 flex flex-col justify-between hover:bg-white/5 transition-all duration-700 border-white/5 group relative overflow-hidden">
                {/* Ghost step number */}
                <div className="absolute -bottom-8 -right-8 text-[13rem] font-black italic text-white/[0.04] pointer-events-none group-hover:text-white/[0.08] transition-colors duration-700 select-none">
                  {index + 1}
                </div>

                <div className="text-6xl group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700">
                  {step.icon}
                </div>

                <div>
                  <h4 className="text-4xl md:text-5xl font-black mb-5 tracking-tighter italic">
                    {step.title}
                  </h4>
                  <p className="text-lg md:text-xl text-foreground/40 leading-relaxed font-medium group-hover:text-foreground/70 transition-colors duration-700">
                    {step.description}
                  </p>
                </div>

                {/* Connector line to next card */}
                {index < steps.length - 1 && (
                  <div className="absolute right-[-48px] top-1/2 -translate-y-1/2 w-12 h-[1px] bg-white/10 hidden lg:block" />
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Progress bar ───────────────────────────────────────── */}
        <div className="absolute bottom-12 left-10 right-10 lg:left-20 lg:right-20 flex items-center gap-8">
          <span className="text-[10px] font-black tracking-[0.5em] text-white/20 shrink-0">START</span>
          <div className="flex-1 h-[2px] bg-white/5 relative overflow-hidden rounded-full">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              className="w-full h-full bg-accent-purple shadow-[0_0_16px_#8B5CF6]"
            />
          </div>
          <span className="text-[10px] font-black tracking-[0.5em] text-white/20 shrink-0">DELIVERY</span>
        </div>
      </div>
    </section>
  )
}
