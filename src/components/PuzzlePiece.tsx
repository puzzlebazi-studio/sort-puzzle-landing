import { useId, type CSSProperties } from 'react'
import { cn } from '../lib/cn'
import type { Tone } from '../lib/tone'

/** A jigsaw piece: a 100 × 100 body with knobs on its top and right and holes in its bottom and left. */
const PIECE_PATH =
  'M0 10Q0 0 10 0H36C40 0 43-3 41-7C32-12 38-24 50-24C62-24 68-12 59-7C57-3 60 0 64 0H90Q100 0 100 10V36C100 40 103 43 107 41C112 32 124 38 124 50C124 62 112 68 107 59C103 57 100 60 100 64V90Q100 100 90 100H64C60 100 57 97 59 93C68 88 62 76 50 76C38 76 32 88 41 93C43 97 40 100 36 100H10Q0 100 0 90V64C0 60 3 57 7 59C12 68 24 62 24 50C24 38 12 32 7 41C3 43 0 40 0 36Z'

interface PuzzlePieceProps {
  tone?: Tone
  /** A mark in the middle of the piece, like "?". */
  label?: string
  className?: string
  style?: CSSProperties
}

/** The studio's mark: a glossy jigsaw piece, outlined in chocolate over a darker side, like the game's buttons. */
export function PuzzlePiece({ tone = 'gold', label, className, style }: PuzzlePieceProps) {
  const id = `piece-${useId().replace(/[^\w-]/g, '')}`
  return (
    <svg viewBox="-8 -32 140 150" className={cn(`tone-${tone}`, 'overflow-visible', className)} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--t-hi)' }} />
          <stop offset="0.42" style={{ stopColor: 'var(--t)' }} />
          <stop offset="1" style={{ stopColor: 'var(--t-lo)' }} />
        </linearGradient>
      </defs>
      <path d={PIECE_PATH} transform="translate(0 10)" style={{ fill: 'var(--t-lip)' }} stroke="#3A1500" strokeWidth={5} strokeLinejoin="round" />
      <path d={PIECE_PATH} fill={`url(#${id})`} stroke="#3A1500" strokeWidth={5} strokeLinejoin="round" />
      <path d="M12 30V21Q12 12 21 12H29" fill="none" stroke="#fff" strokeOpacity={0.75} strokeWidth={6} strokeLinecap="round" />
      <ellipse cx={45} cy={-14} rx={5} ry={3.5} fill="#fff" opacity={0.6} />
      {label && (
        <text
          x={50}
          y={50}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={60}
          fill="#fff"
          stroke="#3A1500"
          strokeWidth={8}
          strokeLinejoin="round"
          paintOrder="stroke"
        >
          {label}
        </text>
      )}
    </svg>
  )
}
