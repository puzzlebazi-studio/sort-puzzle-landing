import type { CSSProperties } from 'react'
import { cn } from '../lib/cn'

export interface WaveLayer {
  color: string
  opacity?: number
  /** Seconds per loop; negative drifts the other way. */
  speed?: number
  /** Moves this layer's surface down (positive) or up, in viewBox units (0-120). */
  offset?: number
}

const WIDTH = 2880
const HEIGHT = 120
const MIDDLE = 48
const AMPLITUDE = 13
// Four identical periods over twice the visible width: shifting by half loops seamlessly,
// and every screen shows two crests.
const PERIODS = 4

function wavePath(offset: number) {
  const half = WIDTH / PERIODS / 2
  const middle = MIDDLE + offset
  let d = `M0 ${middle}`
  for (let k = 0; k < PERIODS * 2; k++) {
    const x = k * half
    // A cubic whose control points sit 4/3 of the amplitude out peaks at exactly the amplitude.
    const y = middle + (k % 2 === 0 ? -1 : 1) * AMPLITUDE * (4 / 3)
    d += `C${x + half * 0.36} ${y} ${x + half * 0.64} ${y} ${x + half} ${middle}`
  }
  return `${d}V${HEIGHT}H0Z`
}

/**
 * Drifting liquid surface between sections, drawn as stacked layers like the liquid in a bottle.
 * The last layer should match the color of whatever comes below it. Position it with `className`.
 */
export function Wave({ layers, className }: { layers: WaveLayer[]; className?: string }) {
  return (
    <div className={cn('pointer-events-none h-14 overflow-hidden md:h-20', className)} aria-hidden="true">
      {layers.map((layer, i) => (
        <svg
          key={i}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          preserveAspectRatio="none"
          className="absolute top-0 h-full w-[200%] animate-wave"
          style={
            {
              left: '-100%',
              animationDuration: `${Math.abs(layer.speed ?? 14)}s`,
              animationDirection: (layer.speed ?? 14) < 0 ? 'reverse' : 'normal',
              opacity: layer.opacity ?? 1,
            } as CSSProperties
          }
        >
          <path d={wavePath(layer.offset ?? 0)} fill={layer.color} />
        </svg>
      ))}
    </div>
  )
}
