import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

/**
 * Hero decoration that drifts with the pointer by `depth` pixels (nearer objects move more).
 * Reads --px and --py from usePointerParallax on an ancestor.
 */
export function Depth({ depth, className, children }: { depth: number; className?: string; children: ReactNode }) {
  return (
    <div
      className={cn('absolute transition-transform duration-500 ease-out', className)}
      style={{ transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth * 0.7}px), 0)` }}
    >
      {children}
    </div>
  )
}
