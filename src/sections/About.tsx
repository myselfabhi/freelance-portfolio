'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from '@/components/CountUp'

const STATS = [
  { num: 4,  suffix: '+',  label: 'Years Experience' },
  { num: 20, suffix: '+',  label: 'Projects Shipped' },
  { num: 15, suffix: '+',  label: 'Happy Clients'    },
  { num: 99, suffix: '%',  label: 'Client Retention' },
]

const SKILLS = [
  'Next.js', 'React', 'TypeScript', 'Node.js', 'Go', 'Python',
  'Tailwind CSS', 'PostgreSQL', 'Redis', 'WebSockets', 'Docker',
  'AWS', 'Stripe', 'AI / LLMs', 'Framer Motion',
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-40 bg-[#050505] px-6 lg:px-20 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(139,92,246,0.05),transparent_65%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">

        {/* ── Left: animated photo card ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative flex justify-center"
        >
          <div className="relative w-72 h-72 md:w-[22rem] md:h-[22rem]">
            {/* Card */}
            <div className="w-full h-full rounded-[2.5rem] bg-gradient-to-br from-accent-purple/20 via-accent-blue/10 to-accent-cyan/15 border border-white/[0.08] flex items-center justify-center overflow-hidden group">
              <span className="text-[7rem] font-black text-white/[0.07] italic select-none leading-none group-hover:text-white/[0.12] transition-colors duration-700">
                AV
              </span>
              {/* Inner shimmer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.12),transparent_70%)]" />
            </div>

            {/* Floating stat chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="absolute -bottom-4 -right-4 glass rounded-2xl px-4 py-3 border-white/[0.08]"
            >
              <div className="text-xl font-black text-accent-purple">20+</div>
              <div className="text-[9px] font-bold tracking-widest uppercase text-white/40">Projects</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
              className="absolute -top-4 -left-4 glass rounded-2xl px-4 py-3 border-white/[0.08]"
            >
              <div className="text-xl font-black text-accent-cyan">99%</div>
              <div className="text-[9px] font-bold tracking-widest uppercase text-white/40">Retention</div>
            </motion.div>

            {/* Decorative ring */}
            <div className="absolute -inset-4 rounded-[3rem] border border-white/[0.04]" />
            {/* Glow */}
            <div className="absolute inset-0 bg-accent-purple/10 blur-[90px] rounded-full pointer-events-none -z-10" />
          </div>
        </motion.div>

        {/* ── Right: bio + stats + skills ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 72 }}
            transition={{ duration: 1, ease: 'circOut' }}
            viewport={{ once: true }}
            className="h-[1.5px] bg-accent-purple mb-8"
          />
          <span className="text-[11px] font-black tracking-[0.5em] uppercase text-accent-purple mb-4 block">
            About Me
          </span>

          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.88]">
            Your technical<br />
            <span className="text-foreground/20 italic">co-founder.</span>
          </h2>

          <div className="space-y-4 text-base md:text-lg text-foreground/50 leading-relaxed mb-12 max-w-lg">
            <p>
              I&apos;m Abhinav — a freelance software engineer who partners with founders to
              turn ideas into shipped products. I think in systems, design for scale, and
              obsess over the details that make users stick.
            </p>
            <p>
              From fintech auction platforms to AI-powered EdTech, I&apos;ve shipped products
              used by thousands of people across four continents. My clients don&apos;t hire a
              vendor — they hire a partner who cares about their business outcomes.
            </p>
          </div>

          {/* Stats — animated count-up */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-black text-accent-purple tracking-tight">
                  <CountUp end={s.num} suffix={s.suffix} duration={1600} />
                </div>
                <div className="text-[10px] font-bold tracking-[0.28em] uppercase text-foreground/30 mt-1">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                viewport={{ once: true }}
                className="px-3.5 py-1.5 glass rounded-full text-[11px] font-bold tracking-wider text-foreground/50 hover:text-white hover:border-accent-purple/40 transition-colors duration-300 cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
