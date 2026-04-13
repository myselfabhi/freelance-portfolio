'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function WhyMe() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>('.why-line')
      lines.forEach((line, i) => {
        gsap.fromTo(line, 
          { x: i % 2 === 0 ? -100 : 100, opacity: 0, filter: "blur(20px)" },
          {
            scrollTrigger: {
              trigger: line,
              start: "top 95%",
              end: "top 60%",
              scrub: 1,
            },
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            ease: "expo.out",
          }
        )
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="why-me" ref={containerRef} className="w-full py-64 bg-[#050505] px-6 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-32">
        <div className="why-line text-6xl md:text-[11rem] font-black tracking-tighter leading-[0.8] uppercase flex flex-col items-start italic">
          <span className="text-white">I don&apos;t just</span>
          <span className="text-accent-purple/30 ml-20 md:ml-40">Build Apps.</span>
        </div>
        
        <div className="why-line text-6xl md:text-[11rem] font-black tracking-tighter leading-[0.8] uppercase flex flex-col items-end text-right italic">
          <span className="text-accent-blue/30 mr-20 md:mr-40">I Engineer</span>
          <span className="text-white">Experiences.</span>
        </div>

        <div className="why-line text-6xl md:text-[11rem] font-black tracking-tighter leading-[0.8] uppercase flex flex-col items-start italic">
          <span className="text-white">Built for</span>
          <span className="text-accent-cyan/30 ml-20 md:ml-40">Hyperscale.</span>
        </div>
      </div>

      <div className="mt-64 flex flex-col items-center gap-10 opacity-30">
          <div className="w-[1px] h-40 bg-white" />
          <div className="text-sm font-bold tracking-[1em] uppercase">ADAPTABLITY • SCALE • PRECISION</div>
      </div>
    </section>
  )
}
