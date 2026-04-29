'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'

const BUDGETS = [
  '$2.5k – $5k',
  '$5k – $10k',
  '$10k – $25k',
  '$25k+',
  'Not sure yet',
]

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', budget: '', message: '', _honey: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot — bots that auto-fill every field get silently dropped.
    if (form._honey) {
      setStatus('sent')
      setForm({ name: '', email: '', budget: '', message: '', _honey: '' })
      return
    }

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
            _captcha: false,
            _honey: form._honey,
          }),
        }
      )

      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', budget: '', message: '', _honey: '' })
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
      {/* Honeypot — hidden from users + assistive tech, catches naive bots */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        value={form._honey}
        onChange={(e) => update('_honey', e.target.value)}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', opacity: 0 }}
      />

      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="contact-name"
            className="text-[10px] font-black tracking-[0.3em] uppercase text-foreground/30 mb-2 block"
          >
            Name *
          </label>
          <input
            id="contact-name"
            required
            type="text"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Your name"
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-foreground/20 outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/25 transition-all"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="text-[10px] font-black tracking-[0.3em] uppercase text-foreground/30 mb-2 block"
          >
            Email *
          </label>
          <input
            id="contact-email"
            required
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="you@company.com"
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-foreground/20 outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/25 transition-all"
          />
        </div>
      </div>

      {/* Budget selector */}
      <div>
        <span
          id="contact-budget-label"
          className="text-[10px] font-black tracking-[0.3em] uppercase text-foreground/30 mb-2 block"
        >
          Project Budget
        </span>
        <div role="radiogroup" aria-labelledby="contact-budget-label" className="flex flex-wrap gap-2">
          {BUDGETS.map((b) => {
            const selected = form.budget === b
            return (
              <button
                key={b}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => update('budget', b)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider border transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/40 focus-visible:border-accent-purple/50 ${
                  selected
                    ? 'bg-accent-purple/20 border-accent-purple/40 text-white'
                    : 'bg-white/[0.02] border-white/[0.07] text-foreground/35 hover:border-white/15 hover:text-foreground/55'
                }`}
              >
                {b}
              </button>
            )
          })}
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="text-[10px] font-black tracking-[0.3em] uppercase text-foreground/30 mb-2 block"
        >
          Message *
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          name="message"
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
        <p className="text-red-400/80 text-sm text-center" role="alert">
          Something went wrong. Try again or email me directly at{' '}
          <a href="mailto:myselfabhi.dev@gmail.com" className="underline">
            myselfabhi.dev@gmail.com
          </a>
        </p>
      )}
    </form>
  )
}
