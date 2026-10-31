import type { CSSProperties } from 'react'
import { useCurrentFrame, useVideoConfig } from 'remotion'
import { FACE, LIQUID_COUNT, liquidHex, PAPER, PLUM } from '../../brand/palette'

/**
 * Instagram's safe zone on a 1080 × 1920 story: the progress bar and the profile row sit above
 * `top`, the reply bar below `bottom` (about 14% of the height each). Text and logos stay inside it.
 */
export const SAFE = { top: 270, bottom: 1650 }

/** A number in 0..1 for `n`, the same on every render. */
const hash = (n: number) => {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

const HEART = 'M12 21C12 21 2.5 15.2 2.5 8.6C2.5 5.5 4.9 3.2 7.8 3.2C9.6 3.2 11.1 4.1 12 5.6C12.9 4.1 14.4 3.2 16.2 3.2C19.1 3.2 21.5 5.5 21.5 8.6C21.5 15.2 12 21 12 21Z'

/** The flat art's heart: a pastel face, a plum outline and a cream glint, drawn like the sparkle. */
export function Heart({ size, face = FACE.coral, style }: { size: number; face?: string; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block', overflow: 'visible', ...style }}>
      <path d={HEART} fill={face} stroke={PLUM} strokeWidth={1.8} strokeLinejoin="round" />
      <path d="M5.6 8.2C5.8 6.9 6.7 6 7.9 5.9" fill="none" stroke={PAPER} strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  )
}

/** Each confetti piece's launch: angle from straight up (radians), speed (px/s), size, spin (deg/s) and flutter phase. */
const PIECES = Array.from({ length: 70 }, (_, i) => ({
  angle: (hash(i) - 0.5) * 2.5,
  speed: 1300 + hash(i + 100) * 1500,
  color: i % LIQUID_COUNT,
  round: hash(i + 200) < 0.28,
  size: 0.8 + hash(i + 300) * 0.6,
  spin: (hash(i + 400) - 0.5) * 900,
  phase: hash(i + 500) * Math.PI * 2,
}))
/** Air drag (1/s) and the speed the pieces settle into as they fall (px/s). */
const DRAG = 2.6
const FALL = 380

/** A burst of confetti in the liquids' colors from (x, y) at `at`: up and out, then fluttering down. */
export function Confetti({ at, x, y }: { at: number; x: number; y: number }) {
  const frame = useCurrentFrame()
  const { fps, width, height } = useVideoConfig()
  if (frame < at) return null
  const t = (frame - at) / fps
  // Linear drag under gravity: the launch dies away while the fall reaches FALL.
  const spent = (1 - Math.exp(-DRAG * t)) / DRAG
  return (
    <svg width={width} height={height} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      {PIECES.map((p, i) => {
        const px = x + Math.sin(p.angle) * p.speed * spent + Math.sin(t * 5 + p.phase) * 26 * Math.min(1, t * 2)
        const py = y + (-Math.cos(p.angle) * p.speed - FALL) * spent + FALL * t
        if (py > height + 60) return null
        const flip = Math.cos(t * 7 + p.phase)
        return (
          <g key={i} transform={`translate(${px} ${py}) rotate(${p.spin * t + p.phase * 57}) scale(${p.size} ${p.size * flip})`}>
            {p.round ? (
              <circle r={9} fill={liquidHex(p.color)} stroke={PLUM} strokeWidth={4} />
            ) : (
              <rect x={-14} y={-8} width={28} height={16} rx={4} fill={liquidHex(p.color)} stroke={PLUM} strokeWidth={4} />
            )}
          </g>
        )
      })}
    </svg>
  )
}

/** Hearts floating up from below the frame from `from`, one every few frames, swaying as they go. */
export function RisingHearts({ from, count = 14 }: { from: number; count?: number }) {
  const frame = useCurrentFrame()
  const { fps, width, height } = useVideoConfig()
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const t = (frame - from - i * 6) / fps
        if (t < 0) return null
        const size = 54 + hash(i + 600) * 50
        // Spread across the width by the golden ratio, so neighbours never share a lane.
        const x = 70 + ((i * 0.618 + 0.3) % 1) * (width - 140) + Math.sin(t * 3 + i) * 30
        const y = height + size - t * (480 + hash(i + 700) * 260)
        return (
          <Heart
            key={i}
            size={size}
            face={i % 3 === 1 ? FACE.pink : FACE.coral}
            style={{ position: 'absolute', left: x - size / 2, top: y - size / 2, transform: `rotate(${Math.sin(t * 2.4 + i) * 14}deg)` }}
          />
        )
      })}
    </>
  )
}
