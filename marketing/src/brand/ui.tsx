import type { CSSProperties, ReactNode } from 'react'
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import { FACE, PAPER, PLUM, SUN, type SunTone } from './palette'

/** The Lahzeh family, loaded in fonts.ts. */
export const FONT = 'Lahzeh, sans-serif'

/** Short side of the frame / 1080: everything is drawn for a 1080 px short side. */
export function useLayout() {
  const { width, height } = useVideoConfig()
  return { width, height, portrait: height > width, u: Math.min(width, height) / 1080 }
}

/**
 * The store banners' retro background: 28 rays in two tints of one pastel from a point,
 * turning slowly.
 */
export function Sunburst({ tone, at = [0.5, 0.45], speed = 0.08 }: { tone: SunTone; at?: [number, number]; speed?: number }) {
  const frame = useCurrentFrame()
  const { width, height } = useVideoConfig()
  const [base, ray] = SUN[tone]
  const cx = width * at[0]
  const cy = height * at[1]
  const r = Math.hypot(width, height) * 1.1
  const rays = 28
  const d = Array.from({ length: rays }, (_, i) => {
    const a0 = (i / rays) * Math.PI * 2
    const a1 = a0 + (Math.PI * 2) / rays / 2
    return `M${cx} ${cy}L${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)}L${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)}Z`
  }).join('')
  return (
    <AbsoluteFill style={{ backgroundColor: base }}>
      <svg width={width} height={height} style={{ position: 'absolute', inset: 0 }}>
        <g transform={`rotate(${frame * speed} ${cx} ${cy})`}>
          <path d={d} fill={ray} />
        </g>
      </svg>
    </AbsoluteFill>
  )
}

/** The game's lavender ground with its tiled dots. */
export function Ground() {
  const { u } = useLayout()
  return (
    <AbsoluteFill
      style={{
        backgroundColor: FACE.ground,
        backgroundImage: `radial-gradient(${FACE.dot} ${5 * u}px, transparent ${5.6 * u}px)`,
        backgroundSize: `${72 * u}px ${72 * u}px`,
      }}
    />
  )
}

/** Title type: a pastel face over a thick plum outline and a hard plum drop, as in the banners. */
export function StrokeText({ size, color = PAPER, children, style }: { size: number; color?: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <span
      style={{
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1.22,
        color,
        WebkitTextStroke: `${size * 0.135}px ${PLUM}`,
        paintOrder: 'stroke fill',
        textShadow: `0 ${size * 0.094}px 0 ${PLUM}`,
        whiteSpace: 'nowrap',
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
    </span>
  )
}

/** A cream (or colored) pill with a plum outline and a hard shadow. */
export function Pill({ size, face = PAPER, dark, children, style }: { size: number; face?: string; dark?: boolean; children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size * 0.35,
        padding: `${size * 0.36}px ${size * 0.95}px ${size * 0.42}px`,
        background: dark ? PLUM : face,
        color: dark ? PAPER : PLUM,
        border: `${Math.max(3, size * 0.15)}px solid ${PLUM}`,
        borderRadius: 999,
        boxShadow: `0 ${size * 0.2}px 0 ${dark ? 'rgb(46 37 69 / 0.4)' : PLUM}`,
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1.25,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/** A flat panel: a pastel face, a plum outline and a hard plum shadow. */
export function Sticker({ face = PAPER, radius, border, shadow, children, style }: { face?: string; radius: number; border: number; shadow: number; children?: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        background: face,
        border: `${border}px solid ${PLUM}`,
        borderRadius: radius,
        boxShadow: `0 ${shadow}px 0 ${PLUM}`,
        color: PLUM,
        fontFamily: FONT,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/** Persian digits for a number, with the Persian thousands separator: 1000 → «۱٬۰۰۰». */
export function fa(value: number) {
  return new Intl.NumberFormat('fa-IR').format(value)
}
