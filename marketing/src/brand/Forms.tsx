// The ten bottle forms, as on the site (src/games/sort-puzzle/components/art/Forms.tsx).
import { useId, type CSSProperties } from 'react'
import { PAPER, PLUM } from './palette'

export type FormId = 'tube' | 'slim' | 'jar' | 'flask' | 'potion' | 'hourglass' | 'vase' | 'tumbler' | 'barrel' | 'shoulders'

type Pattern = 'dots' | 'stripes'

interface FormSpec {
  body: string
  /** Its top: a rim, a cap or a lid, with its own fill. */
  tops?: { x: number; y: number; width: number; height: number; rx: number; fill?: string }[]
}

/** The ten bottle forms of the designs shop, drawn in a 120 × 200 box (art direction 2.0). */
const FORMS: Record<FormId, FormSpec> = {
  tube: { body: 'M30 26 H90 V160 a30 30 0 0 1 -60 0 Z', tops: [{ x: 22, y: 12, width: 76, height: 18, rx: 9 }] },
  slim: { body: 'M42 26 H78 V172 a18 18 0 0 1 -36 0 Z', tops: [{ x: 34, y: 12, width: 52, height: 18, rx: 9 }] },
  jar: {
    body: 'M18 52 H102 V172 a18 18 0 0 1 -18 18 H36 a18 18 0 0 1 -18 -18 Z',
    tops: [{ x: 32, y: 26, width: 56, height: 28, rx: 8 }],
  },
  flask: {
    body: 'M46 26 H74 V72 L104 166 a16 16 0 0 1 -15 22 H31 a16 16 0 0 1 -15 -22 L46 72 Z',
    tops: [{ x: 38, y: 12, width: 44, height: 18, rx: 9 }],
  },
  potion: { body: 'M48 24 H72 V66 A50 50 0 1 1 48 66 Z', tops: [{ x: 42, y: 8, width: 36, height: 20, rx: 7, fill: '#FFAA66' }] },
  hourglass: {
    body: 'M24 24 H96 C96 74 66 92 66 108 C66 124 96 142 96 190 H24 C24 142 54 124 54 108 C54 92 24 74 24 24 Z',
    tops: [
      { x: 16, y: 12, width: 88, height: 16, rx: 8, fill: '#FFD45E' },
      { x: 16, y: 186, width: 88, height: 12, rx: 6, fill: '#FFD45E' },
    ],
  },
  vase: { body: 'M44 26 H76 V52 C110 74 108 150 86 190 H34 C12 150 10 74 44 52 Z', tops: [{ x: 38, y: 14, width: 44, height: 16, rx: 8 }] },
  tumbler: { body: 'M22 28 H98 L88 188 H32 Z' },
  barrel: { body: 'M30 26 H90 C108 74 108 142 90 190 H30 C12 142 12 74 30 26 Z' },
  shoulders: { body: 'M44 22 H76 V40 L100 60 V172 a16 16 0 0 1 -16 16 H36 a16 16 0 0 1 -16 -16 V60 L44 40 Z' },
}

interface BottleFormProps {
  form: FormId
  color: string
  pattern?: Pattern
  style?: CSSProperties
}

/** One bottle design: its form in a flat color, with dots or stripes for the fancier ones. */
export function BottleForm({ form, color, pattern, style }: BottleFormProps) {
  const id = `f${useId().replace(/[^\w-]/g, '')}`
  const { body, tops = [] } = FORMS[form]
  return (
    <svg viewBox="0 0 120 200" style={style} overflow="visible">
      <defs>
        <pattern id={`${id}-dots`} width={22} height={22} patternUnits="userSpaceOnUse">
          <circle cx={11} cy={11} r={4.5} fill={PAPER} />
        </pattern>
        <pattern id={`${id}-stripes`} width={28} height={28} patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width={14} height={28} fill={PAPER} opacity={0.55} />
        </pattern>
      </defs>
      <g stroke={PLUM} strokeWidth={7} strokeLinejoin="round">
        <path d={body} fill={color} />
        {pattern && <path d={body} fill={`url(#${id}-${pattern})`} />}
        {form === 'barrel' && <path d="M17 80 H103 M17 140 H103" fill="none" strokeWidth={6} />}
        {tops.map((top, i) => (
          <rect key={i} {...top} fill={top.fill ?? PAPER} />
        ))}
      </g>
    </svg>
  )
}
