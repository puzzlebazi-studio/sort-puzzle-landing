import type { CSSProperties } from 'react'
import { PLUM } from './palette'

/** Line icons in the UI kit's style: 24 × 24, 2.4 stroke, round caps, plum. */
const PATHS = {
  timer: ['M12 13.5m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0', 'M12 13.5V10M9.8 3h4.4M12 3v3.5M18 7l1.5-1.5'],
  addBottle: ['M7.5 3h5M8.5 3v4.5L5.5 11v8.5A1.5 1.5 0 0 0 7 21h6a1.5 1.5 0 0 0 1.5-1.5V11l-3-3.5V3', 'M19 3.5v6M16 6.5h6'],
  no: ['M12 12m-8.5 0a8.5 8.5 0 1 0 17 0a8.5 8.5 0 1 0 -17 0', 'M6 6l12 12'],
  trophy: ['M7.5 3.5h9V9a4.5 4.5 0 0 1-9 0z', 'M7.5 5.5h-3a3 3 0 0 0 3.2 4M16.5 5.5h3a3 3 0 0 1-3.2 4', 'M12 13.5v3.5M8 21h8M9.5 17h5v4'],
  home: ['M3.5 11 12 3.8l8.5 7.2', 'M6 9.5V20h12V9.5', 'M10 20v-5.5h4V20'],
  plus: ['M12 5v14M5 12h14'],
  undo: ['M9 4.5 4.5 9 9 13.5', 'M4.5 9H14a5.5 5.5 0 0 1 0 11h-3.5'],
  restart: ['M19.5 12a7.5 7.5 0 1 1-2.2-5.3', 'M19.8 3.8v4.9h-4.9'],
  bulb: ['M9.3 17.6h5.4M10.2 21h3.6', 'M12 2.8a6 6 0 0 0-3.6 10.8c.7.6 1 1.3 1 2.1v1.9h5.2v-1.9c0-.8.3-1.5 1-2.1A6 6 0 0 0 12 2.8z'],
  download: ['M12 4v11M7 10.5l5 5 5-5', 'M5 20h14'],
} as const

export type IconName = keyof typeof PATHS

export function Icon({ name, size, stroke = 2.4, style }: { name: IconName; size: number; stroke?: number; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={PLUM} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
      {PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

/** A round button face from the UI kit: a pastel circle, a plum outline, a hard shadow and an icon. */
export function RoundButton({ name, size, face, style }: { name: IconName; size: number; face: string; style?: CSSProperties }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: face,
        border: `${size * 0.06}px solid ${PLUM}`,
        boxShadow: `0 ${size * 0.08}px 0 ${PLUM}`,
        display: 'grid',
        placeItems: 'center',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <Icon name={name} size={size * 0.56} />
    </div>
  )
}
