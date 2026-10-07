import { useId } from 'react'
import { createTubeShape, liquidBands, pourAngle, toPath, type LiquidLayer, type TubeShape } from './liquid'
import { GLASS, HIDDEN, liquidHex, mixHex, PAPER, PLUM, STONE } from './palette'

/**
 * The game's flat bottle (art direction 2.0), as on the site, in its own frame: the rim's top left
 * at (0, 0), 170 wide, one unit of liquid 92 tall. Its liquid can hold fractional amounts, so a
 * pour can be animated frame by frame.
 */

export const UNIT = 92
const HEADROOM = 40
const INNER_WIDTH = 136
export const BOTTLE_WIDTH = 170
/** Room above the rim for a bomb, a padlock or the filled bottle's burst. */
export const BOTTLE_TOP = 70
export const bodyHeight = (capacity: number) => 47 + capacity * UNIT
export const bottleHeight = (capacity: number) => BOTTLE_TOP + 22 + bodyHeight(capacity)

const HIDDEN_CODE = -1
const STONE_CODE = -2

const shapes = new Map<number, TubeShape>()
function shapeFor(capacity: number) {
  let shape = shapes.get(capacity)
  if (!shape) {
    shape = createTubeShape(INNER_WIDTH, HEADROOM + capacity * UNIT, INNER_WIDTH / 2, capacity, HEADROOM)
    shapes.set(capacity, shape)
  }
  return shape
}

/** The tilt, in degrees, at which `units` of liquid just reach the mouth's lip. */
export const pourTilt = (units: number, capacity = 4) => (pourAngle(shapeFor(capacity), Math.max(0.05, units)) * 180) / Math.PI

/** The lip the liquid leaves from when the bottle tilts clockwise, in its own frame. */
export const LIP = { x: 160, y: 12 }

/** Where a bottle's origin goes so that, tilted by `tilt` degrees, its lip sits on `lip`. */
export function originForLip(tilt: number, lip: { x: number; y: number }) {
  const a = (tilt * Math.PI) / 180
  return { x: lip.x - (LIP.x * Math.cos(a) - LIP.y * Math.sin(a)), y: lip.y - (LIP.x * Math.sin(a) + LIP.y * Math.cos(a)) }
}

export type Slot = number | 'hidden' | 'stone'

/** Whole units, bottom first, as runs of one color. */
export function runsOf(layers: Slot[]): LiquidLayer[] {
  const runs: LiquidLayer[] = []
  for (const slot of layers) {
    const color = slot === 'hidden' ? HIDDEN_CODE : slot === 'stone' ? STONE_CODE : slot
    const last = runs[runs.length - 1]
    if (last && last.color === color) last.amount++
    else runs.push({ color, amount: 1 })
  }
  return runs
}

export interface BottleArtProps {
  /** Liquid, bottom first; amounts can be fractional while a pour runs. */
  liquid: LiquidLayer[]
  capacity?: number
  /** Clockwise tilt in degrees, so the liquid stays level; the parent rotates the bottle. */
  tilt?: number
  /** 0..1: the filled bottle's burst over its mouth. */
  done?: number
  frozen?: string
  lock?: number
  ring?: number
  neck?: boolean
  bomb?: string
}

export function BottleArt({ liquid, capacity = 4, tilt = 0, done = 0, frozen, lock, ring, neck, bomb }: BottleArtProps) {
  const id = `b${useId().replace(/[^\w-]/g, '')}`
  const shape = shapeFor(capacity)
  const bottom = 22 + bodyHeight(capacity)
  const inner = 22 + shape.height
  const ringColor = ring === undefined ? undefined : liquidHex(ring)
  const glass = ringColor ? mixHex(GLASS, ringColor, 0.3) : GLASS
  const outline = `M13.5 22V${bottom - 75}A71.5 71.5 0 0 0 156.5 ${bottom - 75}V22`
  const bands = liquidBands(shape, (tilt * Math.PI) / 180, liquid)
  const fill = (code: number) => (code === HIDDEN_CODE ? HIDDEN : code === STONE_CODE ? STONE : liquidHex(code))

  // Upright, whole units: the hidden layers' «؟» and the stones' pebbles, slot by slot.
  const marks: { code: number; slot: number }[] = []
  if (tilt === 0) {
    let slot = 0
    for (const run of liquid) {
      for (let k = 0; k < Math.round(run.amount); k++) marks.push({ code: run.color, slot: slot++ })
    }
  }

  return (
    <g>
      <defs>
        <clipPath id={id}>
          <path d={`${outline}Z`} />
        </clipPath>
      </defs>
      <path d={`${outline}Z`} fill={glass} />
      <g clipPath={`url(#${id})`}>
        <g transform="translate(17 22)">
          {bands.map((band, i) => (
            <path key={i} d={toPath(band.points)} fill={fill(band.color)} />
          ))}
        </g>
        {marks.map(({ code, slot }) => {
          const top = inner - (slot + 1) * UNIT
          if (code === HIDDEN_CODE) {
            return (
              <text key={slot} x={85} y={top + UNIT / 2} textAnchor="middle" dominantBaseline="central" fontSize={58} fontWeight={800} fill={PLUM}>
                ؟
              </text>
            )
          }
          if (code === STONE_CODE) {
            return (
              <g key={slot}>
                <circle cx={17 + 0.28 * INNER_WIDTH} cy={top + 0.38 * UNIT} r={10} fill="#847B99" />
                <circle cx={17 + 0.7 * INNER_WIDTH} cy={top + 0.64 * UNIT} r={8} fill="#847B99" />
                <circle cx={17 + 0.54 * INNER_WIDTH} cy={top + 0.22 * UNIT} r={6} fill="#B3ABC4" />
              </g>
            )
          }
          return null
        })}
        <rect x={33} y={44} width={14} height={Math.round((HEADROOM + capacity * UNIT) * 0.55)} rx={7} fill="#fff" opacity={0.6} />
        {frozen !== undefined && (
          <>
            <rect x={0} y={0} width={BOTTLE_WIDTH} height={bottom} fill="rgb(223 243 255 / 0.62)" />
            <path
              transform={`translate(17 ${inner - 24 - 300})`}
              d="M98 40 L80 92 L104 132 L86 186 M80 92 L52 110 M104 132 L124 150 M86 186 L60 214 L70 262"
              fill="none"
              stroke="#fff"
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </g>
      <path d={outline} fill="none" stroke={PLUM} strokeWidth={7} strokeLinejoin="round" />
      <rect x={3.5} y={3.5} width={163} height={23} rx={11.5} fill={ringColor ?? PAPER} stroke={PLUM} strokeWidth={7} />
      {frozen !== undefined && (
        <>
          <path
            transform="translate(-13 -22)"
            d="M14 34 C10 18 30 10 42 20 C48 6 72 6 78 18 C86 6 110 6 116 18 C124 6 148 8 152 20 C166 12 186 20 180 36 L170 38 L162 38 L158 58 L150 38 L108 38 L100 62 L92 38 L52 38 L46 54 L38 38 L20 38 Z"
            fill="#fff"
            stroke={PLUM}
            strokeWidth={5}
            strokeLinejoin="round"
          />
          <circle cx={85} cy={138} r={39} fill="#CDEBFA" stroke={PLUM} strokeWidth={6} />
          <text x={85} y={140} textAnchor="middle" dominantBaseline="central" fontSize={48} fontWeight={800} fill={PLUM}>
            {frozen}
          </text>
        </>
      )}
      {neck && (
        <g transform="translate(0 -54)">
          <path d="M10 80 C14 62 30 46 56 40 L60 14 L110 14 L114 40 C140 46 156 62 160 80 Z" fill="#FFD45E" stroke={PLUM} strokeWidth={7} strokeLinejoin="round" />
          <path d="M58 40 L112 40" stroke={PLUM} strokeWidth={5} strokeLinecap="round" />
          <ellipse cx={85} cy={14} rx={25} ry={7} fill={PLUM} />
        </g>
      )}
      {lock !== undefined && (
        <g transform="translate(33 -46)">
          <path d="M28 54 V36 a24 24 0 0 1 48 0 V54" fill="none" stroke={PLUM} strokeWidth={12} strokeLinecap="round" />
          <rect x={10} y={50} width={84} height={60} rx={16} fill={liquidHex(lock)} stroke={PLUM} strokeWidth={7} />
          <circle cx={52} cy={74} r={8} fill={PLUM} />
          <path d="M52 78 V94" stroke={PLUM} strokeWidth={8} strokeLinecap="round" />
        </g>
      )}
      {bomb !== undefined && (
        <g>
          <g transform="translate(22 -86)">
            <path d="M78 34 C82 22 92 16 102 18" fill="none" stroke={PLUM} strokeWidth={7} strokeLinecap="round" />
            <rect x={62} y={26} width={26} height={20} rx={5} transform="rotate(35 75 36)" fill="#66597E" stroke={PLUM} strokeWidth={5} />
            <circle cx={56} cy={74} r={44} fill={PLUM} />
            <path d="M30 60 A30 30 0 0 1 48 42" fill="none" stroke="#66597E" strokeWidth={7} strokeLinecap="round" />
            <path
              d="M106 2 C107 12 110 15 120 16 C110 17 107 20 106 30 C105 20 102 17 92 16 C102 15 105 12 106 2Z"
              fill="#FFD45E"
              stroke={PLUM}
              strokeWidth={3.5}
              strokeLinejoin="round"
            />
          </g>
          <text x={78} y={-10} textAnchor="middle" dominantBaseline="central" fontSize={50} fontWeight={800} fill="#FFD45E">
            {bomb}
          </text>
        </g>
      )}
      {done > 0 && <DoneBurst progress={done} />}
    </g>
  )
}

/** The flat burst over a filled bottle, popping out with `progress` (0..1). */
export function DoneBurst({ progress }: { progress: number }) {
  const s = Math.min(1, progress)
  return (
    <g transform={`translate(85 -30) scale(${s}) translate(-100 -32)`} opacity={Math.min(1, progress * 2)}>
      <path d="M30 18 C31 30 34 33 46 34 C34 35 31 38 30 50 C29 38 26 35 14 34 C26 33 29 30 30 18Z" fill="#FFD45E" stroke={PLUM} strokeWidth={4} strokeLinejoin="round" />
      <path d="M168 4 C169 18 173 22 187 23 C173 24 169 28 168 42 C167 28 163 24 149 23 C163 22 167 18 168 4Z" fill={PAPER} stroke={PLUM} strokeWidth={4} strokeLinejoin="round" />
      <path d="M100 6 L100 26 M72 22 L80 38 M128 22 L120 38" stroke={PLUM} strokeWidth={6} strokeLinecap="round" />
    </g>
  )
}

/** A stream of liquid from a lip down into a mouth, outlined in plum. `flow` (0..1) moves its highlight. */
export function Stream({ from, to, color, width = 30, flow = 0 }: { from: { x: number; y: number }; to: { x: number; y: number }; color: number; width?: number; flow?: number }) {
  const d = `M${from.x} ${from.y}C${from.x + 6} ${from.y + 40} ${to.x} ${to.y - 70} ${to.x} ${to.y}`
  return (
    <g>
      <path d={d} fill="none" stroke={PLUM} strokeWidth={width + 14} strokeLinecap="round" />
      <path d={d} fill="none" stroke={liquidHex(color)} strokeWidth={width} strokeLinecap="round" />
      <path
        d={d}
        fill="none"
        stroke="#fff"
        strokeOpacity={0.5}
        strokeWidth={width * 0.22}
        strokeLinecap="round"
        strokeDasharray="8 30"
        strokeDashoffset={-flow * 76}
      />
    </g>
  )
}
