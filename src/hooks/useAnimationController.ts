import { useEffect, useState, useRef } from 'react'

export function useAnimationController(activeSection: string) {
  const [animationName, setAnimationName] = useState('Idle')
  const prevScrollY = useRef(0)
  const isScrolling = useRef(false)
  const scrollTimeout = useRef<NodeJS.Timeout>(null)

  useEffect(() => {
    const handleScroll = () => {
      isScrolling.current = true
      
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false
        updateAnimation()
      }, 150)

      updateAnimation()
    }

    const updateAnimation = () => {
      // Logic mapping active section and velocity
      if (isScrolling.current && ['projects', 'how-i-work'].includes(activeSection)) {
        setAnimationName('Walking')
      } else {
        switch (activeSection) {
          case 'hero':
            setAnimationName('Idle')
            break
          case 'projects':
            setAnimationName('Walking')
            break
          case 'how-i-work':
            setAnimationName('Thinking')
            break
          case 'services':
            setAnimationName('Idle')
            break
          case 'contact':
            setAnimationName('Waving')
            break
          default:
            setAnimationName('Idle')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    updateAnimation() // initial

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    }
  }, [activeSection])

  return animationName
}
