'use client'

import { motion } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote:
      "Abhinav didn't just build our platform — he understood our business model and engineered a solution that directly increased our auction close rate by 35%.",
    name: "Rajesh Kumar",
    role: "CEO",
    company: "EP Auctions",
  },
  {
    quote:
      "The speed and quality were unreal. He delivered in 6 weeks what our previous team couldn't in 3 months. The codebase is clean, scalable, and well-documented.",
    name: "Sarah Chen",
    role: "CTO",
    company: "Cat Proxies",
  },
  {
    quote:
      "Working with Abhinav felt like having a technical co-founder. He challenged our assumptions, improved our PRD, and delivered a product our students actually love.",
    name: "Arjun Mehta",
    role: "Founder",
    company: "Effort Education",
  },
]

export default function Testimonials() {
  return (
    <section className="relative w-full py-40 bg-background px-6 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 72 }}
            transition={{ duration: 1, ease: 'circOut' }}
            viewport={{ once: true }}
            className="h-[1.5px] bg-accent-purple mb-8"
          />
          <span className="text-[11px] font-black tracking-[0.5em] uppercase text-accent-purple mb-4 block">
            Testimonials
          </span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">
            What clients<br />
            <span className="text-foreground/15 italic">say.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: 'circOut' }}
              viewport={{ once: true }}
              className="glass rounded-[2rem] p-10 border-white/[0.06] flex flex-col justify-between gap-8 hover:bg-white/[0.04] transition-colors duration-500"
            >
              {/* Opening quote */}
              <div className="text-6xl font-black text-accent-purple/20 leading-none select-none">
                &ldquo;
              </div>

              <p className="text-base md:text-lg text-foreground/60 leading-relaxed font-medium -mt-4">
                {t.quote}
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-white/[0.06]">
                {/* Avatar initials */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-purple/30 to-accent-blue/25 flex items-center justify-center text-[11px] font-black text-white/60 shrink-0">
                  {t.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-[11px] text-foreground/40">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
