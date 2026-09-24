import type { CSSProperties } from 'react'
import { cn } from '../lib/cn'

interface Coin3DProps {
  size?: number
  /** Seconds per turn. */
  speed?: number
  /** Starts the turn part-way through, so several coins don't spin in sync. */
  phase?: number
  className?: string
  style?: CSSProperties
}

const LAYERS = 9

/** A gold coin spinning in real 3D, with a stacked edge for thickness. */
export function Coin3D({ size = 64, speed = 4, phase = 0, className, style }: Coin3DProps) {
  const depth = size * 0.14
  return (
    <div
      className={cn('coin-3d', className)}
      style={{ '--size': `${size}px`, '--speed': `${speed}s`, '--delay': `${-phase * speed}s`, ...style } as CSSProperties}
      aria-hidden="true"
    >
      <div className="coin-3d__spin">
        {Array.from({ length: LAYERS }, (_, i) => (
          <i key={i} className="coin-3d__layer" style={{ '--z': `${(i / (LAYERS - 1) - 0.5) * depth}px` } as CSSProperties} />
        ))}
        <CoinFace className="coin-3d__face coin-3d__face--front" />
        <CoinFace className="coin-3d__face coin-3d__face--back" />
      </div>
    </div>
  )
}

export function CoinFace({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <circle cx="32" cy="32" r="29.5" fill="url(#sp-coin)" stroke="#3A1500" strokeWidth="3" />
      <circle cx="32" cy="32" r="21" fill="none" stroke="#e08a0c" strokeWidth="3" />
      <path
        d="M32 21.5L34.9 28.9L42.8 29.3L36.6 34.3L38.7 41.9L32 37.6L25.3 41.9L27.4 34.3L21.2 29.3L29.1 28.9Z"
        fill="#e8940f"
        stroke="#e8940f"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M13.5 24A20 20 0 0 1 26 12.5" fill="none" stroke="#fff" strokeOpacity="0.75" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  )
}
