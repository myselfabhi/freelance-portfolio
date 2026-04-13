'use client'

import MagneticButton from '@/components/MagneticButton'
import { Globe, Send, User, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-[#050505] pt-40 pb-20 px-6 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-40">
          <div>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-10">
              Let&apos;s build <br /> something <br />
              <span className="text-accent-purple">legendary.</span>
            </h2>
            <p className="text-xl text-foreground/40 max-w-md">
              Currently accepting new projects for Q3 2026. <br />
              Based in Global / Remote.
            </p>
          </div>

          <div className="flex flex-col justify-end items-start lg:items-end">
            <MagneticButton>
              <a 
                href="mailto:hello@abhinav.com" 
                className="group relative text-3xl md:text-5xl font-bold p-10 glass rounded-full hover:bg-white text-black transition-colors duration-500 overflow-hidden flex items-center justify-center aspect-square"
              >
                <span className="relative z-10 group-hover:text-black transition-colors">Start a Project</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </a>
            </MagneticButton>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-10 border-t border-white/5 pt-10">
          <div className="text-sm font-bold tracking-[0.2em] uppercase text-foreground/20">
            © 2026 Abhinav Verma. All Rights Reserved.
          </div>
          
          <div className="flex items-center gap-8">
            <a href="#" className="text-foreground/40 hover:text-white transition-colors"><Send className="w-6 h-6" /></a>
            <a href="#" className="text-foreground/40 hover:text-white transition-colors"><Globe className="w-6 h-6" /></a>
            <a href="#" className="text-foreground/40 hover:text-white transition-colors"><User className="w-6 h-6" /></a>
            <a href="#" className="text-foreground/40 hover:text-white transition-colors"><Mail className="w-6 h-6" /></a>
          </div>
          
          <div className="text-sm font-bold tracking-[0.2em] uppercase text-foreground/20">
            Back to Top ↑
          </div>
        </div>
      </div>
    </footer>
  )
}
