'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FAQ_ITEMS } from '@/lib/faq'

function FaqItem({
  q,
  a,
  index,
  open,
  onClick,
}: {
  q: string
  a: string
  index: number
  open: boolean
  onClick: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: 'circOut' }}
      viewport={{ once: true, margin: '-50px' }}
      className="border-b border-white/[0.06]"
    >
      <button
        onClick={onClick}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-6 py-8 text-left group"
      >
        <span className="text-xl md:text-3xl font-black tracking-tight text-white/90 group-hover:text-accent-purple transition-colors duration-300">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 w-10 h-10 rounded-full glass flex items-center justify-center border-white/[0.08]"
        >
          <Plus className="w-4 h-4 text-white/70" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-base md:text-lg text-foreground/55 leading-relaxed font-medium pb-8 pr-16 max-w-3xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="relative w-full py-40 bg-background px-6 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,rgba(139,92,246,0.05),transparent_65%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-20">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 72 }}
            transition={{ duration: 1, ease: 'circOut' }}
            viewport={{ once: true }}
            className="h-[1.5px] bg-accent-purple mb-8"
          />
          <span className="text-[11px] font-black tracking-[0.5em] uppercase text-accent-purple mb-4 block">
            FAQ
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88]">
            Questions,<br />
            <span className="text-foreground/15 italic">answered.</span>
          </h2>
        </div>

        <div>
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem
              key={item.q}
              q={item.q}
              a={item.a}
              index={i}
              open={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
