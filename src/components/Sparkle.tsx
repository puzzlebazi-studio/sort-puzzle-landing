import type { CSSProperties } from 'react'
import { cn } from '../lib/cn'

interface SparkleProps {
  size?: number
  className?: string
  style?: CSSProperties
}

/** The four-point twinkle from the game's logo. */
export function Sparkle({ size = 20, className, style }: SparkleProps) {
  return (
    <svg
      viewBox="-12 -12 24 24"
      width={size}
      height={size}
      className={cn('pointer-events-none animate-twinkle drop-shadow-[0_0_6px_rgba(255,255,255,0.85)]', className)}
      style={style}
      aria-hidden="true"
    >
      <path d="M0-12Q1.8-1.8 12 0Q1.8 1.8 0 12Q-1.8 1.8-12 0Q-1.8-1.8 0-12z" fill="#fff" />
    </svg>
  )
}
