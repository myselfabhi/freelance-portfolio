'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Code2, Palette, Zap, Globe } from 'lucide-react'

const services = [
  {
    title: "Product Development",
    description: "End-to-end full-stack development. From architecture and design to scalable, secure, and production-ready code.",
    icon: <Globe className="w-12 h-12 text-accent-purple" />,
    color: "rgba(139, 92, 246, 0.15)"
  },
  {
    title: "UI to Code",
    description: "Translating pixel-perfect designs into performant, clean, and accessible frontend code with advanced animations.",
    icon: <Palette className="w-12 h-12 text-accent-blue" />,
    color: "rgba(59, 130, 246, 0.15)"
  },
  {
    title: "Performance Optimization",
    description: "Ensuring your applications load instantly and run at 60 FPS by eliminating bottlenecks and leveraging modern caching.",
    icon: <Zap className="w-12 h-12 text-accent-cyan" />,
    color: "rgba(6, 182, 212, 0.15)"
  },
  {
    title: "Real-time Systems",
    description: "Building low-latency architectures for dashboards, auctions, and collaborative platforms using WebSockets and Redis.",
    icon: <Code2 className="w-12 h-12 text-accent-purple" />,
    color: "rgba(139, 92, 246, 0.15)"
  }
]

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = document.querySelectorAll('.service-card')
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      ;(card as HTMLElement).style.setProperty('--mouse-x', `${x}px`)
      ;(card as HTMLElement).style.setProperty('--mouse-y', `${y}px`)
    })
  }

  return (
    <section 
      id="services"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-48 bg-[#050505] px-6 lg:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-32">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ duration: 1, ease: "circOut" }}
            className="h-[1px] bg-accent-purple mb-8"
          />
          <motion.span 
            className="text-sm font-bold tracking-[0.6em] uppercase text-accent-purple mb-6 block"
          >
            Capabilities
          </motion.span>
          <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.85]">
            Engineering <br />
            <span className="text-foreground/10 italic">Solutions.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "circOut" }}
              className="service-card group relative h-[500px] glass rounded-[3rem] p-12 md:p-16 border border-white/5 transition-all duration-700 overflow-hidden flex flex-col justify-between"
            >
              {/* Spotlight Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ 
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${service.color}, transparent 60%)` 
                }}
              />
              
              <div className="relative z-10 flex flex-col items-start gap-10 h-full">
                <div className="p-6 glass rounded-[2rem] group-hover:bg-white group-hover:text-black transition-all duration-700 shadow-xl border-white/10 group-hover:scale-110 group-hover:-rotate-6">
                  {service.icon}
                </div>
                
                <div>
                    <h3 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter group-hover:translate-x-4 transition-transform duration-700 italic">{service.title}</h3>
                    <p className="text-xl md:text-2xl text-foreground/40 leading-relaxed font-medium group-hover:text-foreground/80 transition-colors duration-700">
                        {service.description}
                    </p>
                </div>
              </div>

              {/* Decorative Index */}
              <div className="absolute top-10 right-10 text-white/5 font-black text-6xl group-hover:text-accent-purple/20 transition-colors duration-700 italic">0{index + 1}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
