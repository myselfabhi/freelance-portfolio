'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  opacityDir: number
  color: string
}

// Mostly white stars, subtle purple/blue/cyan tint
const COLORS = [
  '255,255,255',
  '255,255,255',
  '255,255,255',
  '200,180,255',
  '139,92,246',
  '59,130,246',
]

export default function FooterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })
  const rafRef    = useRef<number>(0)
  const starsRef  = useRef<Star[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0

    const init = () => {
      const parent = canvas.parentElement
      w = parent ? parent.clientWidth  : window.innerWidth
      h = parent ? parent.clientHeight : window.innerHeight
      canvas.width  = w
      canvas.height = h

      const count = w < 768 ? 70 : 150

      starsRef.current = Array.from({ length: count }, () => ({
        x:          Math.random() * w,
        y:          Math.random() * h,
        vx:         (Math.random() - 0.5) * 0.12,
        vy:         -(Math.random() * 0.25 + 0.04),  // upward drift
        radius:     Math.random() * 1.5 + 0.2,
        opacity:    Math.random() * 0.55 + 0.1,
        opacityDir: (Math.random() > 0.5 ? 1 : -1) * (0.003 + Math.random() * 0.004),
        color:      COLORS[Math.floor(Math.random() * COLORS.length)],
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      const { x: mx, y: my } = mouseRef.current
      const ATTRACT_R = 220

      for (const s of starsRef.current) {
        // Twinkle
        s.opacity += s.opacityDir
        if (s.opacity >= 0.75 || s.opacity <= 0.05) s.opacityDir *= -1

        // Mouse attraction — stars drift gently toward cursor
        const dx = mx - s.x
        const dy = my - s.y
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < ATTRACT_R && d > 0) {
          const f = ((ATTRACT_R - d) / ATTRACT_R) * 0.06
          s.vx += (dx / d) * f
          s.vy += (dy / d) * f
        }

        // Damping + persistent upward bias
        s.vx *= 0.97
        s.vy  = s.vy * 0.98 - 0.018

        s.x = (s.x + s.vx + w) % w
        // Wrap from top back to bottom
        s.y = s.y + s.vy
        if (s.y < -4) s.y = h + 4

        // Soft glow halo for brighter stars
        if (s.radius > 1.1) {
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.radius * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${s.color},${s.opacity * 0.12})`
          ctx.fill()
        }

        // Core dot
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${s.color},${s.opacity})`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    // Use canvas-relative coords so interaction only fires inside footer
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    let timer: ReturnType<typeof setTimeout>
    const onResize = () => { clearTimeout(timer); timer = setTimeout(init, 200) }

    init()
    draw()
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize',    onResize)
    canvas.addEventListener('mouseleave', onMouseLeave)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize',    onResize)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      clearTimeout(timer)
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
