import type { ReactNode } from 'react'
import { cn } from '../../../../lib/cn'
import { liquidHex, PLUM } from '../../lib/palette'
import { BottleArt, type BottleArtProps } from './Bottle'
import { BOTTLE_WIDTH, pourTilt, tiltedAt } from './geometry'
import { HandPointer } from './Decor'

const GAP = 44
const STEP = BOTTLE_WIDTH + GAP
/** The rim's top of an upright bottle; its headroom (BOTTLE_TOP) is above it. */
const RIM = 0

interface SceneProps {
  className?: string
  /** Read by screen readers; without it the scene is decoration. */
  label?: string
}

/** Three bottles side by side, with room above for one lifted or pouring. */
function Scene({ className, label, children }: SceneProps & { children: ReactNode }) {
  return (
    <svg
      viewBox={`-40 -290 ${3 * BOTTLE_WIDTH + 2 * GAP + 80} 745`}
      className={cn('overflow-visible', className)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {children}
    </svg>
  )
}

const at = (index: number) => `translate(${index * STEP} ${RIM})`

/** A stream of liquid from a tilted bottle's lip down into a mouth, outlined in plum. */
export function Stream({ from, to, color, width = 30 }: { from: { x: number; y: number }; to: { x: number; y: number }; color: number; width?: number }) {
  const d = `M${from.x} ${from.y}C${from.x + 6} ${from.y + 40} ${to.x} ${to.y - 70} ${to.x} ${to.y}`
  return (
    <g>
      <path d={d} fill="none" stroke={PLUM} strokeWidth={width + 14} strokeLinecap="round" />
      <path d={d} fill="none" stroke={liquidHex(color)} strokeWidth={width} strokeLinecap="round" />
      <path d={d} fill="none" stroke="#fff" strokeOpacity={0.5} strokeWidth={width * 0.22} strokeLinecap="round" strokeDasharray="8 30" className="stream-flow" />
    </g>
  )
}

interface PourProps {
  /** The pouring bottle's liquid, bottom first; its top color is the one pouring. */
  from: BottleArtProps['layers']
  /** Where the stream lands: the receiving bottle's rim center. */
  into: { x: number; y: number }
}

/**
 * A bottle lifted and tilted over another's mouth, pouring its top color. Its liquid stays level
 * and just reaches the lip, as in the game.
 */
export function Pour({ from, into }: PourProps) {
  const top = from[from.length - 1] as number
  const tilt = Math.min(118, pourTilt(4, from.length) + 6)
  const lip = { x: into.x - 64, y: into.y - 110 }
  return (
    <>
      <Stream from={{ x: lip.x + 6, y: lip.y + 4 }} to={{ x: into.x, y: into.y + 8 }} color={top} />
      <g transform={tiltedAt(tilt, lip)}>
        <BottleArt layers={from} tilt={tilt} />
      </g>
    </>
  )
}

/** Step 1: a bottle rises when tapped. */
export function SelectScene(props: SceneProps) {
  return (
    <Scene {...props}>
      <g transform={at(0)}>
        <BottleArt layers={[1, 0]} lifted />
        <g className="tap-bob" style={{ transformOrigin: '120px 390px' }}>
          <HandPointer transform="translate(96 330) scale(2.1)" />
        </g>
      </g>
      <g transform={at(1)}>
        <BottleArt layers={[1, 1, 1]} />
      </g>
      <g transform={at(2)}>
        <BottleArt layers={[0, 0, 0]} />
      </g>
    </Scene>
  )
}

/** Step 2: it pours its top color onto the same color. */
export function PourScene(props: SceneProps) {
  return (
    <Scene {...props}>
      <g transform={at(1)}>
        <BottleArt layers={[1, 1, 1]} />
      </g>
      <g transform={at(2)}>
        <BottleArt layers={[0, 0, 0]} />
      </g>
      <Pour from={[1, 0]} into={{ x: 2 * STEP + BOTTLE_WIDTH / 2, y: RIM }} />
    </Scene>
  )
}

/** Step 3: every color in its own bottle. */
export function SortedScene(props: SceneProps) {
  return (
    <Scene {...props}>
      <g transform={at(0)}>
        <BottleArt layers={[]} />
      </g>
      <g transform={at(1)}>
        <BottleArt layers={[1, 1, 1, 1]} done />
      </g>
      <g transform={at(2)}>
        <BottleArt layers={[0, 0, 0, 0]} done />
      </g>
    </Scene>
  )
}
