'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  return (
    <section 
      id="how-i-work"
      ref={containerRef}
      className="relative h-[500vh] w-full bg-[#050505] py-20"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-accent-purple/5 to-transparent" />
        
        <div className="px-6 lg:px-20 mb-12 relative z-10">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ duration: 1, ease: "circOut" }}
            className="h-[1px] bg-white/20 mb-8"
          />
          <h2 className="text-sm font-bold tracking-[0.6em] uppercase text-foreground/30 mb-4 font-mono">Workflow Methodology</h2>
          <h3 className="text-6xl md:text-[9rem] font-black tracking-tighter leading-none italic opacity-10">PROCESS</h3>
          <h3 className="text-5xl md:text-8xl font-black tracking-tighter -mt-8 md:-mt-16">The blueprint.</h3>
        </div>

        <motion.div style={{ x }} className="flex gap-12 px-6 lg:px-20 relative z-20">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative min-w-[350px] md:min-w-[550px] h-[60vh] flex-shrink-0"
            >
              <div className="w-full h-full glass rounded-[3rem] p-12 md:p-16 flex flex-col justify-between hover:bg-white/5 transition-all duration-700 border-white/5 group relative overflow-hidden">
                {/* Background Number */}
                <div className="absolute -bottom-10 -right-10 text-[15rem] font-black italic text-white/5 pointer-events-none group-hover:text-white/10 transition-colors duration-700">
                    {index + 1}
                </div>

                <div className="text-7xl mb-10 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700">{step.icon}</div>
                <div>
                  <h4 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter italic">{step.title}</h4>
                  <p className="text-xl md:text-2xl text-foreground/40 leading-relaxed font-medium group-hover:text-foreground/80 transition-colors duration-700">{step.description}</p>
                </div>
                
                {/* Visual Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute right-[-48px] top-1/2 -translate-y-1/2 w-24 h-[1px] bg-white/10 hidden lg:block" />
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Progress Bar Container */}
        <div className="absolute bottom-20 left-20 right-20 flex items-center gap-10">
            <span className="text-[10px] font-bold tracking-[0.5em] text-white/20">START</span>
            <div className="flex-1 h-[2px] bg-white/5 relative overflow-hidden rounded-full">
                <motion.div 
                    style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                    className="w-full h-full bg-accent-purple shadow-[0_0_20px_#8B5CF6]"
                />
            </div>
            <span className="text-[10px] font-bold tracking-[0.5em] text-white/20">DELIVERY</span>
        </div>
      </div>
    </section>
  )
}
