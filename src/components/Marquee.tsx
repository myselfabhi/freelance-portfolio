'use client'

const ITEMS = [
  'Product Development',
  'UI Engineering',
  'Performance Optimization',
  'Real-time Systems',
  'Next.js',
  'TypeScript',
  'WebSockets',
  'Redis',
  'Fintech',
  'Hyperscale',
  'Precision',
  'Architecture',
]

// Duplicate for seamless loop
const TRACK = [...ITEMS, ...ITEMS]

export default function Marquee() {
  return (
    <section className="py-7 border-y border-white/[0.04] overflow-hidden bg-[#050505]">
      <div className="flex overflow-hidden">
        <div className="flex gap-10 shrink-0 animate-marquee">
          {TRACK.map((item, i) => (
            <div key={i} className="flex items-center gap-10 shrink-0">
              <span className="text-[11px] font-black tracking-[0.38em] uppercase text-foreground/25 whitespace-nowrap">
                {item}
              </span>
              <span className="text-accent-purple/40 text-[7px]">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
