import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '../hooks/useInView'
import { cn } from '../lib/cn'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

/** Rises and tips into place the first time it scrolls into view. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    <div ref={ref} className={cn('reveal', className)} data-shown={inView} style={{ '--delay': `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  )
}
