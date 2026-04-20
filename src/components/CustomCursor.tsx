'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'

type CursorState = 'default' | 'pointer' | 'view'

interface TrailDot {
  id: number
  x: number
  y: number
  opacity: number
}

const TRAIL_LENGTH = 8

export default function CustomCursor() {
  const [state, setState]   = useState<CursorState>('default')
  const [hidden, setHidden] = useState(true)
  const [trail, setTrail]   = useState<TrailDot[]>([])
  const trailIdRef          = useRef(0)
  const posRef              = useRef({ x: 0, y: 0 })

  // Dot: snappy tracking
  const dotX = useSpring(0, { stiffness: 600, damping: 45 })
  const dotY = useSpring(0, { stiffness: 600, damping: 45 })

  // Aura: lags behind dot
  const auraX = useSpring(0, { stiffness: 120, damping: 28 })
  const auraY = useSpring(0, { stiffness: 120, damping: 28 })

  const spawnTrailDot = useCallback((x: number, y: number) => {
    const id = ++trailIdRef.current
    setTrail((prev) => [
      ...prev.slice(-(TRAIL_LENGTH - 1)),
      { id, x, y, opacity: 1 },
    ])
    // fade out
    const fade = (remaining: number) => {
      if (remaining <= 0) {
        setTrail((prev) => prev.filter((d) => d.id !== id))
        return
      }
      setTimeout(() => {
        setTrail((prev) =>
          prev.map((d) =>
            d.id === id ? { ...d, opacity: remaining / 10 } : d
          )
        )
        fade(remaining - 1)
      }, 30)
    }
    fade(10)
  }, [])

  useEffect(() => {
    let lastSpawn = 0

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      auraX.set(e.clientX)
      auraY.set(e.clientY)
      posRef.current = { x: e.clientX, y: e.clientY }
      setHidden(false)

      // Spawn trail dot every 40ms
      const now = Date.now()
      if (now - lastSpawn > 40) {
        lastSpawn = now
        spawnTrailDot(e.clientX, e.clientY)
      }

      const target = e.target as HTMLElement
      if (target.closest('[data-cursor="view"]')) {
        setState('view')
      } else if (
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setState('pointer')
      } else {
        setState('default')
      }
    }

    const onLeave = () => setHidden(true)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [dotX, dotY, auraX, auraY, spawnTrailDot])

  if (hidden) return null

  return (
    <>
      {/* Trail dots */}
      {trail.map((dot, i) => (
        <div
          key={dot.id}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9995]"
          style={{
            transform: `translate(${dot.x - 3}px, ${dot.y - 3}px)`,
            width: 6,
            height: 6,
            backgroundColor: 'rgba(139,92,246,1)',
            opacity: dot.opacity * (i / TRAIL_LENGTH) * 0.6,
            scale: `${0.4 + (i / TRAIL_LENGTH) * 0.6}`,
          }}
        />
      ))}

      {/* Aura blob — lags behind */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center"
        style={{ x: auraX, y: auraY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width:  state === 'view' ? 88 : state === 'pointer' ? 52 : 36,
          height: state === 'view' ? 88 : state === 'pointer' ? 52 : 36,
          backgroundColor:
            state === 'view'
              ? 'rgba(139,92,246,0.22)'
              : state === 'pointer'
              ? 'rgba(139,92,246,0.12)'
              : 'rgba(139,92,246,0.06)',
        }}
        transition={{ duration: 0.25 }}
      >
        {state === 'view' && (
          <span className="text-[9px] font-black tracking-[0.18em] uppercase text-accent-purple select-none">
            VIEW
          </span>
        )}
      </motion.div>

      {/* Hard dot — nearly instant */}
      <motion.div
        className="fixed top-0 left-0 w-[7px] h-[7px] rounded-full bg-white pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: state === 'pointer' || state === 'view' ? 0.5 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
