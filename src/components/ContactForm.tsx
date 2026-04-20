'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'

const BUDGETS = [
  'Under $2k',
  '$2k – $5k',
  '$5k – $15k',
  '$15k+',
  'Not sure yet',
]

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', budget: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      // FormSubmit.co AJAX endpoint — free, no signup needed.
      // First submission triggers a confirmation email to the address below.
      const res = await fetch(
        'https://formsubmit.co/ajax/myselfabhi.dev@gmail.com',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            budget: form.budget || 'Not specified',
            message: form.message,
            _subject: `New project inquiry from ${form.name}`,
          }),
        }
      )

      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', budget: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  // ── Success state ────────────────────────────────────────────────
  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
          <span className="text-emerald-400 text-2xl">✓</span>
        </div>
        <h3 className="text-3xl font-black tracking-tight mb-3">Message sent!</h3>
        <p className="text-foreground/40 text-lg mb-8">
          I&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-accent-purple text-sm font-bold tracking-wider uppercase hover:text-white transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  // ── Form ─────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto w-full">
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="text-[10px] font-black tracking-[0.3em] uppercase text-foreground/30 mb-2 block">
            Name *
          </label>
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Your name"
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-foreground/20 outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/25 transition-all"
          />
        </div>
        <div>
          <label className="text-[10px] font-black tracking-[0.3em] uppercase text-foreground/30 mb-2 block">
            Email *
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="you@company.com"
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-foreground/20 outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/25 transition-all"
          />
        </div>
      </div>

      {/* Budget selector */}
      <div>
        <label className="text-[10px] font-black tracking-[0.3em] uppercase text-foreground/30 mb-2 block">
          Project Budget
        </label>
        <div className="flex flex-wrap gap-2">
          {BUDGETS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => update('budget', b)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider border transition-all duration-300 ${
                form.budget === b
                  ? 'bg-accent-purple/20 border-accent-purple/40 text-white'
                  : 'bg-white/[0.02] border-white/[0.07] text-foreground/35 hover:border-white/15 hover:text-foreground/55'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="text-[10px] font-black tracking-[0.3em] uppercase text-foreground/30 mb-2 block">
          Message *
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Tell me about your project — goals, timeline, anything helpful..."
          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-foreground/20 outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/25 transition-all resize-none"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-center pt-2">
        <MagneticButton distance={0.3}>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-white text-black rounded-full font-black text-sm tracking-tight overflow-hidden hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-shadow duration-500 disabled:opacity-50 disabled:pointer-events-none"
          >
            <span className="absolute inset-0 bg-accent-purple translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </span>
          </button>
        </MagneticButton>
      </div>

      {status === 'error' && (
        <p className="text-red-400/80 text-sm text-center">
          Something went wrong. Try again or email me directly at{' '}
          <a href="mailto:myselfabhi.dev@gmail.com" className="underline">
            myselfabhi.dev@gmail.com
          </a>
        </p>
      )}
    </form>
  )
}
