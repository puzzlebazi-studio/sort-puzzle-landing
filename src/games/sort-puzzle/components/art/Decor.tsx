import type { CSSProperties, SVGProps } from 'react'
import { cn } from '../../../../lib/cn'
import { PAPER, PLUM } from '../../lib/palette'

interface ArtProps {
  className?: string
  style?: CSSProperties
}

const SPARK = 'M12 1C13 8 16 11 23 12C16 13 13 16 12 23C11 16 8 13 1 12C8 11 11 8 12 1Z'

/** The four-point sparkle of the flat art, cream or butter with a plum outline. */
export function FlatSparkle({ size = 24, gold, twinkle = true, className, style }: ArtProps & { size?: number; gold?: boolean; twinkle?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn('pointer-events-none overflow-visible', twinkle && 'animate-twinkle', className)}
      style={style}
      aria-hidden="true"
    >
      <path d={SPARK} fill={gold ? '#FFD45E' : PAPER} stroke={PLUM} strokeWidth={1.6} strokeLinejoin="round" />
    </svg>
  )
}

/** A gold coin with a star, like the game's coin sprite. */
export function Coin({ className, style }: ArtProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden="true">
      <CoinArt />
    </svg>
  )
}

export function CoinArt(props: SVGProps<SVGGElement>) {
  return (
    <g {...props}>
      <circle cx={24} cy={24} r={20} fill="#FFD45E" stroke={PLUM} strokeWidth={4} />
      <circle cx={24} cy={24} r={13} fill="none" stroke="#E9A93B" strokeWidth={3} />
      <path
        d="M24 16.5l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z"
        fill={PAPER}
        stroke={PLUM}
        strokeWidth={2.4}
        strokeLinejoin="round"
      />
    </g>
  )
}

/** A star, earned (butter) or not yet (lilac). */
export function Star({ empty, className, style }: ArtProps & { empty?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className={cn('overflow-visible', className)} style={style} aria-hidden="true">
      <path
        d="M24 4.5l5.9 12.1 13.4 1.9-9.7 9.4 2.3 13.3L24 34.9l-11.9 6.3 2.3-13.3-9.7-9.4 13.4-1.9z"
        fill={empty ? '#D9CDF6' : '#FFD45E'}
        stroke={PLUM}
        strokeWidth={4}
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** The pink treasure chest of the daily reward's seventh day, with coins spilling over its lid. */
export function Chest({ className, style }: ArtProps) {
  return (
    <svg viewBox="0 0 250 210" className={className} style={style} aria-hidden="true">
      <CoinArt transform="translate(40 22) scale(1.1667)" />
      <CoinArt transform="translate(62 10) scale(1.3333)" />
      <CoinArt transform="translate(112 0) scale(1.3333)" />
      <CoinArt transform="translate(150 22) scale(1.1667)" />
      <CoinArt transform="translate(96 26) scale(1.0833)" />
      <path d="M28 98 V82 C28 44 64 30 125 30 C186 30 222 44 222 82 V98 Z" fill="#FF9CC9" stroke={PLUM} strokeWidth={6} strokeLinejoin="round" />
      <rect x={28} y={98} width={194} height={98} rx={16} fill="#FF9CC9" stroke={PLUM} strokeWidth={6} />
      <path d="M68 34 V196 M182 34 V196" stroke={PLUM} strokeWidth={20} />
      <path d="M68 34 V196 M182 34 V196" stroke="#FFD45E" strokeWidth={9} />
      <rect x={106} y={80} width={38} height={46} rx={10} fill="#FFD45E" stroke={PLUM} strokeWidth={5} />
      <circle cx={125} cy={100} r={6} fill={PLUM} />
    </svg>
  )
}

/** A hand pointer tapping, like the tutorial's. */
export function HandPointer(props: SVGProps<SVGGElement>) {
  return (
    <g {...props}>
      <path
        d="M14 30V9a5 5 0 0 1 10 0v13l3-1.2a5 5 0 0 1 4 .2l9 4.2a6 6 0 0 1 3.4 6.4L41 46a6 6 0 0 1-6 5H22a6 6 0 0 1-4.8-2.4L7.6 36a4.6 4.6 0 0 1 6.4-6.4z"
        fill={PAPER}
        stroke={PLUM}
        strokeWidth={3.6}
        strokeLinejoin="round"
      />
      <path d="M24 22v10M31 22.5v9.5" stroke={PLUM} strokeWidth={3} strokeLinecap="round" />
    </g>
  )
}
