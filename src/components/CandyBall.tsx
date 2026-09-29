import { useId, type CSSProperties } from 'react'
import { cn } from '../lib/cn'
import type { Tone } from '../lib/tone'

/** The chocolate outline around every ball, in the units of the SVG it's drawn in. */
const OUTLINE = 3

/** Rounds to hundredths, to keep the path data short. */
const round = (n: number) => Math.round(n * 100) / 100

interface BallProps {
  tone: Tone
  r?: number
  /** Where its center goes in the SVG it's drawn in. */
  x?: number
  y?: number
}

/**
 * A glossy ball for drawing inside another SVG: outlined in chocolate over a darker side, with a
 * lip at the bottom and a shine at the top, like the game's round buttons.
 */
export function Ball({ tone, r = 12, x = 0, y = 0 }: BallProps) {
  const id = `ball-${useId().replace(/[^\w-]/g, '')}`
  // The lip is the bottom of the ball, under a flatter arc between two points 22° below its middle.
  const lx = round(r * 0.927)
  const ly = round(r * 0.375)
  const shine = { x: round(r * -0.3), y: round(r * -0.42) }
  return (
    <g transform={`translate(${x} ${y})`} className={`tone-${tone}`}>
      <radialGradient id={id} cx="0.38" cy="0.3" r="0.75">
        <stop offset="0" style={{ stopColor: 'var(--t-hi)' }} />
        <stop offset="0.5" style={{ stopColor: 'var(--t)' }} />
        <stop offset="1" style={{ stopColor: 'var(--t-lo)' }} />
      </radialGradient>
      <circle cy={round(3 + r * 0.05)} r={r + OUTLINE} fill="#3A1500" />
      <circle r={r + OUTLINE} fill="#3A1500" />
      <circle r={r} fill={`url(#${id})`} />
      <path
        d={`M${lx} ${ly}A${r} ${r} 0 0 1 ${-lx} ${ly}A${r * 1.5} ${r * 1.5} 0 0 0 ${lx} ${ly}Z`}
        style={{ fill: 'var(--t-lip)' }}
        opacity={0.9}
      />
      <ellipse
        cx={shine.x}
        cy={shine.y}
        rx={round(r * 0.34)}
        ry={round(r * 0.2)}
        transform={`rotate(-32 ${shine.x} ${shine.y})`}
        fill="#fff"
        opacity={0.85}
      />
    </g>
  )
}

interface CandyBallProps {
  tone?: Tone
  /** A mark in the middle of the ball, like "?". */
  label?: string
  className?: string
  style?: CSSProperties
}

/** Drawn larger than the logo's dots, so the outline stays about as thin as the page's borders. */
const R = 24

/** One of the logo's candy balls on its own, for decoration. */
export function CandyBall({ tone = 'pink', label, className, style }: CandyBallProps) {
  const edge = R + OUTLINE
  return (
    <svg
      viewBox={`${-edge} ${-edge} ${2 * edge} ${2 * edge + round(3 + R * 0.05)}`}
      className={cn('overflow-visible', className)}
      style={style}
      aria-hidden="true"
    >
      <Ball tone={tone} r={R} />
      {label && (
        <text
          y={2}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={30}
          fill="#fff"
          stroke="#3A1500"
          strokeWidth={5}
          strokeLinejoin="round"
          paintOrder="stroke"
        >
          {label}
        </text>
      )}
    </svg>
  )
}
