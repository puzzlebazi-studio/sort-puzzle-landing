import { useId, type CSSProperties } from 'react'
import { cn } from '../lib/cn'
import { Ball } from './CandyBall'

/** The letter's bowl as one thick stroke: the tooth on the right, down and along, then the tail curling up on the left. */
const BOWL = 'M89 14L91 24A20 20 0 0 1 71 44H39C26 44 17 37 14 28'

/** The three dots under the bowl, two above and one below, as in «پ». */
const DOTS = [
  { tone: 'pink', x: 68.5, y: 80 },
  { tone: 'aqua', x: 41.5, y: 80 },
  { tone: 'leaf', x: 55, y: 103.4 },
] as const

interface StudioLogoProps {
  /** Makes the dots pop one after another. */
  lively?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * The studio's logo: «پ», the first letter of پازل‌بازی, in the extruded gold of the titles, with its
 * three dots as candy balls.
 */
export function StudioLogo({ lively, className, style }: StudioLogoProps) {
  const id = `logo-${useId().replace(/[^\w-]/g, '')}`
  return (
    <svg viewBox="0 0 105 122" className={cn('overflow-visible', className)} style={style} aria-hidden="true">
      <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="5" y2="55">
        <stop offset="0" stopColor="#fff7c9" />
        <stop offset="0.3" stopColor="#ffd84a" />
        <stop offset="0.62" stopColor="#ffb526" />
        <stop offset="1" stopColor="#ff9419" />
      </linearGradient>
      <g fill="none" stroke="#3A1500" strokeWidth={27} strokeLinecap="round" strokeLinejoin="round">
        <path d={BOWL} transform="translate(0 6)" />
        <path d={BOWL} transform="translate(0 6)" stroke="#c7600a" strokeWidth={21} />
        <path d={BOWL} />
        <path d={BOWL} stroke={`url(#${id})`} strokeWidth={21} />
        <path d="M86.8 20V16" stroke="#fff" strokeOpacity={0.8} strokeWidth={5.5} />
      </g>
      {DOTS.map((dot, i) => (
        <Ball
          key={dot.tone}
          {...dot}
          className={lively ? 'origin-center transform-fill animate-dot-pop' : undefined}
          style={lively ? { animationDelay: `${i * 0.22}s` } : undefined}
        />
      ))}
    </svg>
  )
}
