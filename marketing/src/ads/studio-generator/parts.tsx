import type { CSSProperties, ReactNode } from 'react'
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { BOTTLE_WIDTH, BottleArt, bodyHeight, runsOf, type Slot } from '../../brand/Bottle'
import { pop } from '../../brand/motion'
import { FACE, LIQUID_COUNT, PAPER } from '../../brand/palette'
import { Sticker, StrokeText } from '../../brand/ui'

/**
 * Instagram's safe zone on a 1080 × 1920 reel: the profile row sits above `top`, the caption and
 * audio strip below `bottom`, and the action rail right of `right`. Text stays inside it.
 */
export const SAFE = { top: 230, bottom: 1440, right: 850 }
/** Text is centered on the frame, so its widest is what the action rail leaves on both sides. */
export const TEXT_WIDTH = 2 * (SAFE.right - 540)

/** The script's line for this beat, burned in at the bottom of the safe zone: most people watch muted. */
export function Caption({ at, children }: { at: number; children: ReactNode }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = pop(frame, at, fps, 220)
  const shadow = 8
  return (
    <div
      style={{
        position: 'absolute',
        left: 540,
        top: SAFE.bottom - shadow,
        transform: `translate(-50%, -100%) scale(${s})`,
        transformOrigin: '50% 100%',
        opacity: frame < at ? 0 : 1,
      }}
    >
      <Sticker
        radius={34}
        border={6}
        shadow={shadow}
        style={{ width: TEXT_WIDTH, boxSizing: 'border-box', padding: '18px 30px 24px', fontSize: 42, fontWeight: 700, lineHeight: 1.55, textAlign: 'center' }}
      >
        {children}
      </Sticker>
    </div>
  )
}

/** A rubber stamp slammed onto a layout at `at`: big, then down to size in five frames. */
export function Stamp({ at, x, y, size = 120, children }: { at: number; x: number; y: number; size?: number; children: ReactNode }) {
  const frame = useCurrentFrame()
  if (frame < at) return null
  const t = interpolate(frame, [at, at + 5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) })
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%, -50%) rotate(-12deg) scale(${2.3 - 1.3 * t})`, opacity: t }}>
      <Sticker face={FACE.coral} radius={size * 0.24} border={8} shadow={10} style={{ padding: `${size * 0.02}px ${size * 0.34}px ${size * 0.12}px` }}>
        <StrokeText size={size}>{children}</StrokeText>
      </Sticker>
    </div>
  )
}

/** How far a stamped card jumps, in px: a hard knock at `at` that dies away. */
export const knock = (frame: number, at: number) => (frame < at ? 0 : Math.sin((frame - at) * 2.2) * 16 * Math.exp(-(frame - at) / 4))

const GAP = 34
const DEPTH = 22 + bodyHeight(4)

/** One layout on a card: its bottles side by side, the way the stage generator sees a candidate. */
export function LayoutCard({ bottles, width, face = PAPER, style }: { bottles: Slot[][]; width: number; face?: string; style?: CSSProperties }) {
  const pad = Math.round(width * 0.07)
  const row = bottles.length * BOTTLE_WIDTH + (bottles.length - 1) * GAP
  const inner = width - pad * 2
  return (
    <Sticker
      face={face}
      radius={width * 0.1}
      border={Math.max(5, width * 0.016)}
      shadow={Math.max(7, width * 0.022)}
      style={{ width, boxSizing: 'border-box', padding: pad, ...style }}
    >
      <svg width={inner} height={(inner * (DEPTH + 16)) / (row + 16)} viewBox={`-8 -8 ${row + 16} ${DEPTH + 16}`} style={{ display: 'block', overflow: 'visible' }}>
        {bottles.map((layers, i) => (
          <g key={i} transform={`translate(${i * (BOTTLE_WIDTH + GAP)} 0)`}>
            <BottleArt liquid={runsOf(layers)} />
          </g>
        ))}
      </svg>
    </Sticker>
  )
}

/** A seeded random number generator (mulberry32), so every render is identical. */
function random(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** A random layout as the generator starts from one: four units of each color shuffled into as many bottles, then the empty ones. */
export function layout(seed: number, colors: number, empty = 1, shift = 0): Slot[][] {
  const rng = random(seed)
  const units = Array.from({ length: colors * 4 }, (_, i) => (Math.floor(i / 4) + shift) % LIQUID_COUNT)
  for (let i = units.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[units[i], units[j]] = [units[j], units[i]]
  }
  return [...Array.from({ length: colors }, (_, b) => units.slice(b * 4, b * 4 + 4)), ...Array.from({ length: empty }, () => [])]
}

/** The same layout with its colors swapped for others: what the generator counts as a duplicate. */
export const recolor = (bottles: Slot[][], map: (color: number) => number): Slot[][] =>
  bottles.map((layers) => layers.map((slot) => (typeof slot === 'number' ? map(slot) : slot)))

/** The 3 × 3 grid of candidates in the hook and the filter: card i's center, read right to left. */
export const GRID = { cols: 3, card: 236, gap: 22, rows: [745, 912, 1079] }
export function gridCell(i: number) {
  const col = i % GRID.cols
  return { x: 540 + (1 - col) * (GRID.card + GRID.gap), y: GRID.rows[Math.floor(i / GRID.cols)] }
}
