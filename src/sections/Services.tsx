'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Code2, Palette, Zap, Globe, ArrowUpRight } from 'lucide-react'

const services = [
  {
    title: "MVP & Product Builds",
    description: "Your idea → a production-ready product in 4–12 weeks. Full-stack, scalable architecture, designed to get you to paying customers fast.",
    price: "from $8k",
    icon: <Globe className="w-10 h-10" />,
    accent: "#8B5CF6",
    shadow: "rgba(139,92,246,0.4)",
  },
  {
    title: "Design → Code",
    description: "Figma to pixel-perfect, accessible, butter-smooth frontends. Next.js, Tailwind, Framer Motion. Your brand, engineered to convert.",
    price: "from $2.5k",
    icon: <Palette className="w-10 h-10" />,
    accent: "#3B82F6",
    shadow: "rgba(59,130,246,0.4)",
  },
  {
    title: "Performance Rescue",
    description: "Slow app costing you users? I audit, rewrite the bottlenecks, and ship a site that loads in under a second and runs at 60 FPS.",
    price: "from $3k",
    icon: <Zap className="w-10 h-10" />,
    accent: "#06B6D4",
    shadow: "rgba(6,182,212,0.4)",
  },
  {
    title: "Real-time & AI Systems",
    description: "Auctions, dashboards, AI-powered tools, collaborative apps — built on WebSockets, Redis, and LLMs. Sub-100ms, battle-tested.",
    price: "from $10k",
    icon: <Code2 className="w-10 h-10" />,
    accent: "#8B5CF6",
    shadow: "rgba(139,92,246,0.4)",
  },
]

interface TiltCardProps {
  service: typeof services[0]
  index: number
}

function TiltCard({ service, index }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const tiltX = ((y - cy) / cy) * -10
    const tiltY = ((x - cx) / cx) * 10
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-[480px] glass rounded-[2.5rem] p-10 md:p-12 border border-white/[0.06] overflow-hidden flex flex-col justify-between group cursor-default"
        style={{ transition: 'transform 0.15s ease' }}
      >
        {/* Spotlight glow following mouse */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2.5rem]"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${service.accent}18, transparent 60%)`,
          }}
        />

        {/* Top-right corner glow */}
        <div
          className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
          style={{ background: service.accent }}
        />

        {/* Ghost index */}
        <div
          className="absolute bottom-4 right-6 text-[7rem] font-black italic leading-none pointer-events-none select-none opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500"
          style={{ color: service.accent }}
        >
          0{index + 1}
        </div>

        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6"
          style={{ background: `${service.accent}18`, color: service.accent }}
        >
          {service.icon}
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-3xl md:text-4xl font-black tracking-tighter italic leading-tight">
              {service.title}
            </h3>
            <ArrowUpRight
              className="w-5 h-5 shrink-0 mt-1.5 ml-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-400"
              style={{ color: service.accent }}
            />
          </div>
          <p className="text-base md:text-lg text-foreground/40 leading-relaxed font-medium group-hover:text-foreground/70 transition-colors duration-500 mb-6">
            {service.description}
          </p>
          {/* Price pill */}
          <span
            className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-black tracking-[0.3em] uppercase"
            style={{
              background: `${service.accent}15`,
              color: service.accent,
              border: `1px solid ${service.accent}30`,
            }}
          >
            {service.price}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full py-48 bg-[#050505] px-6 lg:px-20 overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(139,92,246,0.04),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-24">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            transition={{ duration: 1, ease: 'circOut' }}
            viewport={{ once: true }}
            className="h-[1px] bg-accent-purple mb-8"
          />
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.6em] uppercase text-accent-purple mb-6 block"
          >
            Services · Fixed Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-6xl md:text-[9rem] font-black tracking-tighter leading-[0.85]"
          >
            Pick your <br />
            <span className="text-foreground/10 italic">mission.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-foreground/35 max-w-xl mt-8 font-medium leading-relaxed"
          >
            Transparent pricing, fixed scope, weekly shipping. No surprises — just a running product.
          </motion.p>
        </div>

        {/* 2×2 card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <TiltCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
