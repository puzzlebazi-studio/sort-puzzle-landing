import type { CSSProperties, SVGProps } from 'react'
import { PAPER, PLUM } from './palette'

const SPARK = 'M12 1C13 8 16 11 23 12C16 13 13 16 12 23C11 16 8 13 1 12C8 11 11 8 12 1Z'

/** The four-point sparkle of the flat art. */
export function Sparkle({ size, gold, style }: { size: number; gold?: boolean; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ position: 'absolute', overflow: 'visible', ...style }}>
      <path d={SPARK} fill={gold ? '#FFD45E' : PAPER} stroke={PLUM} strokeWidth={1.6} strokeLinejoin="round" />
    </svg>
  )
}

export function CoinArt(props: SVGProps<SVGGElement>) {
  return (
    <g {...props}>
      <circle cx={24} cy={24} r={20} fill="#FFD45E" stroke={PLUM} strokeWidth={4} />
      <circle cx={24} cy={24} r={13} fill="none" stroke="#E9A93B" strokeWidth={3} />
      <path d="M24 16.5l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z" fill={PAPER} stroke={PLUM} strokeWidth={2.4} strokeLinejoin="round" />
    </g>
  )
}

export function Coin({ size, style }: { size: number; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={style}>
      <CoinArt />
    </svg>
  )
}

export function Star({ size, empty, style }: { size: number; empty?: boolean; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={{ overflow: 'visible', ...style }}>
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

/** The daily reward's chest. `open` (0..1) lifts its lid. */
export function Chest({ width, open = 0, style }: { width: number; open?: number; style?: CSSProperties }) {
  return (
    <svg width={width} height={(width * 210) / 250} viewBox="0 0 250 210" style={{ overflow: 'visible', ...style }}>
      <g transform={`translate(0 ${-open * 26}) rotate(${-open * 8} 28 98)`}>
        <path d="M28 98 V82 C28 44 64 30 125 30 C186 30 222 44 222 82 V98 Z" fill="#FF9CC9" stroke={PLUM} strokeWidth={6} strokeLinejoin="round" />
        <path d="M68 34 V98 M182 34 V98" stroke={PLUM} strokeWidth={20} />
        <path d="M68 34 V98 M182 34 V98" stroke="#FFD45E" strokeWidth={9} />
      </g>
      <rect x={28} y={98} width={194} height={98} rx={16} fill="#FF9CC9" stroke={PLUM} strokeWidth={6} />
      <path d="M68 98 V196 M182 98 V196" stroke={PLUM} strokeWidth={20} />
      <path d="M68 100 V194 M182 100 V194" stroke="#FFD45E" strokeWidth={9} />
      <rect x={106} y={80} width={38} height={46} rx={10} fill="#FFD45E" stroke={PLUM} strokeWidth={5} />
      <circle cx={125} cy={100} r={6} fill={PLUM} />
    </svg>
  )
}

/** A hand pointer tapping, like the tutorial's, its fingertip at (0, 0). */
export function HandArt(props: SVGProps<SVGGElement>) {
  return (
    <g {...props}>
      <g transform="translate(-19 -4)">
        <path
          d="M14 30V9a5 5 0 0 1 10 0v13l3-1.2a5 5 0 0 1 4 .2l9 4.2a6 6 0 0 1 3.4 6.4L41 46a6 6 0 0 1-6 5H22a6 6 0 0 1-4.8-2.4L7.6 36a4.6 4.6 0 0 1 6.4-6.4z"
          fill={PAPER}
          stroke={PLUM}
          strokeWidth={3.6}
          strokeLinejoin="round"
        />
        <path d="M24 22v10M31 22.5v9.5" stroke={PLUM} strokeWidth={3} strokeLinecap="round" />
      </g>
    </g>
  )
}
