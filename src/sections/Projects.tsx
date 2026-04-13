'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: "EP E-Auction Platform",
    description: "A high-performance enterprise auction system built with real-time bidding engines and advanced analytics.",
    color: "#8B5CF6",
    tags: ["Next.js", "Redis", "WebSockets"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Cat Proxies",
    description: "Premium proxy dashboard with real-time data visualization and automated billing infrastructure.",
    color: "#3B82F6",
    tags: ["React", "Go", "Stripe"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "ProjectClay",
    description: "Collaborative design-to-code platform for engineering teams to streamline UI development.",
    color: "#06B6D4",
    tags: ["TypeScript", "Canvas", "Tailwind"],
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Effort Education",
    description: "Next-gen learning management system focused on interactive student engagement and AI tutoring.",
    color: "#EC4899",
    tags: ["AI", "Next.js", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop"
  }
]

function ProjectSection({ project, index }: { project: typeof projects[0], index: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "top 20%",
          scrub: 1,
        },
        opacity: 0,
        x: -50,
        filter: "blur(10px)",
      })

      // Image parallax & entry
      gsap.fromTo(imageRef.current, 
        { scale: 1.2, y: 100 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
          scale: 1,
          y: 0,
          ease: "none"
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center py-40 px-6 lg:px-20 overflow-hidden"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Project Info */}
        <div ref={contentRef} className="z-10 order-2 lg:order-1 flex flex-col items-start">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="h-[2px] bg-accent-purple mb-6"
          />
          <motion.span 
            className="text-accent-purple font-bold tracking-[0.4em] uppercase text-xs mb-4 block"
          >
            Project 0{index + 1}
          </motion.span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            {project.title}
          </h2>
          <p className="text-xl md:text-2xl text-foreground/40 mb-10 max-w-lg leading-relaxed font-medium">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-4 mb-12">
            {project.tags.map(tag => (
              <span key={tag} className="px-5 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest text-foreground/60 border-white/5">
                {tag}
              </span>
            ))}
          </div>

          <button className="group relative flex items-center gap-3 text-2xl font-black tracking-tighter overflow-hidden pb-2">
            <span className="relative z-10 uppercase italic">Explore Case Study</span>
            <ArrowUpRight className="w-8 h-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
            <div className="absolute bottom-0 left-0 w-full h-[4px] bg-accent-purple origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          </button>
        </div>

        {/* Project Preview */}
        <div className="relative order-1 lg:order-2 flex justify-center items-center h-full">
          <div
            ref={imageRef}
            className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10"
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000 scale-110 hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
            
            {/* Project Indicator on Image */}
            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                <div className="text-white font-black text-4xl italic leading-none opacity-20">0{index + 1}</div>
                <div className="glass px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Launch Site</div>
            </div>

            {/* Glowing Accent */}
            <div 
              className="absolute -top-20 -right-20 w-80 h-80 opacity-30 blur-[100px] rounded-full mix-blend-screen pointer-events-none"
              style={{ background: project.color }}
            />
          </div>
        </div>
      </div>

      {/* Floating Section Index (Side) */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 opacity-10">
          <div className="w-[1px] h-20 bg-white" />
          <span className="rotate-90 text-[10px] font-bold tracking-[0.5em] uppercase">MXXXVI</span>
          <div className="w-[1px] h-20 bg-white" />
      </div>

      {/* Background Section Morph (subtle) */}
      <div 
        className="absolute top-0 left-0 w-full h-full -z-10 opacity-5 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at center, ${project.color}, transparent 70%)` 
        }}
      />
    </section>
  )
}

export default function Projects() {
  return (
    <div id="projects" className="w-full bg-background">
      <div className="pt-20 pb-10 text-center">
        <h2 className="text-sm font-bold tracking-[0.5em] uppercase text-foreground/40">Selected Works</h2>
      </div>
      {projects.map((project, index) => (
        <ProjectSection key={project.id} project={project} index={index} />
      ))}
    </div>
  )
}
