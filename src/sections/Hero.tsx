'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import MagneticButton from '@/components/MagneticButton'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subTitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation
      const text = titleRef.current?.innerText || ""
      if (titleRef.current) {
        const text = titleRef.current.innerText
        const words = text.split(" ")
        
        titleRef.current.innerHTML = words
          .map((word) => {
            const chars = word
              .split("")
              .map((char) => `<span class="char inline-block translate-y-[110%]">${char}</span>`)
              .join("")
            return `<span class="word inline-block overflow-hidden pb-2 whitespace-nowrap">${chars}</span>`
          })
          .join('<span class="char inline-block">&nbsp;</span>')

        gsap.to(".char", {
          y: "0%",
          stagger: 0.03,
          duration: 1.5,
          ease: "expo.out",
          delay: 0.8,
        })
      }

      gsap.fromTo(subTitleRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 0.6, y: 0, duration: 1.5, ease: "expo.out", delay: 1.2 }
      )

      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "expo.out", delay: 1.4 }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background px-4"
    >
      <div className="relative z-10 max-w-6xl text-center">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-none mb-6"
        >
          I build products, not just websites
        </h1>
        
        <p 
          ref={subTitleRef}
          className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-10 font-medium"
        >
          Abhinav Verma — Freelance Software Engineer specialized in high-performance digital experiences that scale.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <MagneticButton>
            <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300">
              View Work
            </button>
          </MagneticButton>
          
          <MagneticButton>
            <button className="px-8 py-4 glass text-white rounded-full font-bold hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-300">
              Get in Touch
            </button>
          </MagneticButton>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-[0.2em] text-foreground/40 font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent-purple to-transparent animate-bounce" />
      </div>
    </section>
  )
}
