import { Pointer } from 'lucide-react'
import { useMemo } from 'react'
import { liquidBands, pourAngle, toLayers, type LiquidLayer } from '../../lib/liquid'
import { liquidHex } from '../../lib/palette'
import { BOTTLE } from './shapes'
import { TubeGraphic } from './TubeGraphic'

const W = BOTTLE.width
const H = BOTTLE.height
const SPARKLE = 'M0-12Q1.8-1.8 12 0Q1.8 1.8 0 12Q-1.8 1.8-12 0Q-1.8-1.8 0-12z'
/** Every scene shares one frame so the bottles are the same size in all three steps. */
const VIEW_BOX = '8 20 264 300'

interface PlacedBottleProps {
  x: number
  y: number
  layers: LiquidLayer[]
  cork?: boolean
  glow?: string
  className?: string
}

function PlacedBottle({ x, y, layers, cork, glow, className }: PlacedBottleProps) {
  const bands = useMemo(() => liquidBands(BOTTLE, 0, layers), [layers])
  return (
    <g transform={`translate(${x} ${y})`} className={className}>
      <TubeGraphic shape={BOTTLE} bands={bands} cork={cork ? { offset: 0, opacity: 1 } : null} glow={glow} />
    </g>
  )
}

const SELECT = { left: toLayers([2, 0, 1, 1]), picked: toLayers([1, 3, 0, 0]), right: toLayers([3, 2, 2, 3]) }
const SORTED = [toLayers([0, 0, 0, 0]), toLayers([1, 1, 1, 1]), toLayers([3, 3, 3, 3])]

// The pour scene: a bottle mid-pour with 2.4 units left, its lip over the target's mouth.
const POUR_TARGET = { x: 196, y: 128 }
const POUR_LIP = { x: POUR_TARGET.x + W / 2, y: POUR_TARGET.y - 36 }
const POUR_ANGLE = pourAngle(BOTTLE, 2.4)
const POUR_SOURCE = liquidBands(BOTTLE, POUR_ANGLE, [
  { color: 3, amount: 1 },
  { color: 0, amount: 1.4 },
])
const POUR_TARGET_LAYERS: LiquidLayer[] = [
  { color: 1, amount: 1 },
  { color: 0, amount: 1.6 },
]
const POUR_SURFACE = POUR_TARGET.y + H - 2.6 * BOTTLE.unit

/** Step 1: the tapped bottle rises, ready to pour. */
export function SelectScene({ className }: { className?: string }) {
  return (
    <svg viewBox={VIEW_BOX} className={className} aria-hidden="true">
      <PlacedBottle x={22} y={118} layers={SELECT.left} />
      <g className="animate-[lift_2.8s_ease-in-out_infinite]">
        <PlacedBottle x={112} y={118} layers={SELECT.picked} glow="#fff4a8" />
      </g>
      <PlacedBottle x={202} y={118} layers={SELECT.right} />
      <g transform="translate(150 236)">
        <circle cx={12} cy={-4} r={16} fill="none" stroke="#fff" strokeWidth={4} className="animate-[ripple_2.8s_ease-out_infinite] [transform-box:fill-box] [transform-origin:center]" />
        <Pointer x={-6} y={-8} width={54} height={54} color="#3A1500" strokeWidth={6} />
        <Pointer x={-6} y={-8} width={54} height={54} color="#fff" strokeWidth={2.6} />
      </g>
    </svg>
  )
}

/** Step 2: mid-pour, with the liquid kept level by the same geometry as the game's shader. */
export function PourScene({ className }: { className?: string }) {
  const lip = POUR_LIP
  const surface = POUR_SURFACE
  return (
    <svg viewBox={VIEW_BOX} className={className} aria-hidden="true">
      <PlacedBottle x={POUR_TARGET.x} y={POUR_TARGET.y} layers={POUR_TARGET_LAYERS} />
      <rect x={lip.x - 4} y={lip.y} width={8} height={surface - lip.y + 2} rx={4} fill={liquidHex(0)} />
      <line
        x1={lip.x}
        y1={lip.y + 6}
        x2={lip.x}
        y2={surface - 6}
        stroke="#fff"
        strokeOpacity={0.6}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeDasharray="10 14"
        className="animate-[flow_0.6s_linear_infinite]"
      />
      <ellipse cx={lip.x} cy={surface} rx={10} ry={3.5} fill="#ff8f96" />
      <g transform={`translate(${lip.x} ${lip.y}) rotate(${(POUR_ANGLE * 180) / Math.PI}) translate(${-W} 0)`}>
        <TubeGraphic shape={BOTTLE} bands={POUR_SOURCE} />
      </g>
    </svg>
  )
}

/** Step 3: every bottle holds one color and gets its cork. */
export function SortedScene({ className }: { className?: string }) {
  return (
    <svg viewBox={VIEW_BOX} className={className} aria-hidden="true">
      {SORTED.map((layers, i) => (
        <PlacedBottle key={i} x={22 + i * 90} y={128} layers={layers} cork />
      ))}
      {[
        [48, 54, 1, 0],
        [140, 40, 1.3, 0.8],
        [232, 58, 0.9, 1.6],
        [92, 76, 0.6, 2.2],
        [186, 80, 0.7, 1.2],
      ].map(([x, y, scale, delay], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${scale})`}>
          <path
            d={SPARKLE}
            fill={i % 2 ? '#fff' : '#ffe27a'}
            className="animate-twinkle [transform-box:fill-box] [transform-origin:center]"
            style={{ animationDelay: `${delay}s` }}
          />
        </g>
      ))}
    </svg>
  )
}
