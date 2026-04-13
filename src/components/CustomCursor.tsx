'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(true)

  const mouseX = useSpring(0, { stiffness: 500, damping: 50 })
  const mouseY = useSpring(0, { stiffness: 500, damping: 50 })

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsHidden(false)
    }

    const onMouseDown = () => setIsPointer(true)
    const onMouseUp = () => setIsPointer(false)

    const onPointerOver = (e: any) => {
      const target = e.target as HTMLElement
      if (
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a'
      ) {
        setIsPointer(true)
      } else {
        setIsPointer(false)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mouseover', onPointerOver)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mouseover', onPointerOver)
    }
  }, [mouseX, mouseY])

  if (isHidden) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-accent-purple/40 rounded-full pointer-events-none z-[9999] blur-xl"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isPointer ? 3 : 1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999]"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isPointer ? 0.5 : 1 }}
      />
    </>
  )
}
