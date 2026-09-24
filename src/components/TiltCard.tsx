import { useRef, type PointerEvent, type ReactNode } from 'react'
import { useFinePointer, useReducedMotion } from '../hooks/useMediaQuery'
import { cn } from '../lib/cn'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Maximum tilt in degrees. */
  max?: number
}

/** Tilts toward the pointer in 3D, with a moving glare. Static on touch screens. */
export function TiltCard({ children, className, max = 9 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const active = fine && !reduced

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current
    if (!active || !element) return
    const rect = element.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    element.style.setProperty('--rx', `${(-py * max).toFixed(2)}deg`)
    element.style.setProperty('--ry', `${(px * max).toFixed(2)}deg`)
    element.style.setProperty('--gx', `${((px + 0.5) * 100).toFixed(1)}%`)
    element.style.setProperty('--gy', `${((py + 0.5) * 100).toFixed(1)}%`)
  }

  const onLeave = () => {
    const element = ref.current
    if (!element) return
    element.style.setProperty('--rx', '0deg')
    element.style.setProperty('--ry', '0deg')
  }

  return (
    <div ref={ref} className={cn('tilt', className)} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
      {active && <span className="tilt__glare" aria-hidden="true" />}
    </div>
  )
}
