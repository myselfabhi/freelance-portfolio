'use client'

import { useScroll, motion } from 'framer-motion'

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[9997]">
      <motion.div
        className="h-full w-full bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  )
}
