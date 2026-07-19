import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  max?: number
}

/** Mouse-driven 3D tilt — springs back to flat on leave. */
export default function TiltCard({ children, className = '', max = 5 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(y, [0, 1], [max, -max]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [0, 1], [-max, max]), { stiffness: 200, damping: 20 })

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  function handleMouseLeave() {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
