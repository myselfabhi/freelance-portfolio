'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  colorIndex: number
}

// RGB channels for purple / blue / cyan
const PALETTE = ['139,92,246', '59,130,246', '6,182,212']

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0

    const init = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h

      const isMobile = w < 768
      const count = isMobile ? 55 : 110

      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.4 + 0.4,
        opacity: Math.random() * 0.45 + 0.1,
        colorIndex: Math.floor(Math.random() * PALETTE.length),
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      const { x: mx, y: my } = mouseRef.current
      const particles = particlesRef.current
      const CONNECT = w < 768 ? 80 : 130
      const MOUSE_R = 160

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse repulsion
        const dx = p.x - mx
        const dy = p.y - my
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < MOUSE_R && d > 0) {
          const force = ((MOUSE_R - d) / MOUSE_R) * 0.55
          p.vx += (dx / d) * force
          p.vy += (dy / d) * force
        }

        // Damping + integrate
        p.vx *= 0.97
        p.vy *= 0.97
        p.x = (p.x + p.vx + w) % w
        p.y = (p.y + p.vy + h) % h

        // Draw particle
        const col = PALETTE[p.colorIndex]
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${col},${p.opacity})`
        ctx.fill()

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const cx = p.x - q.x
          const cy = p.y - q.y
          const cd = Math.sqrt(cx * cx + cy * cy)
          if (cd < CONNECT) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(139,92,246,${(1 - cd / CONNECT) * 0.1})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(init, 200)
    }

    init()
    draw()
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', onResize)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', onResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
