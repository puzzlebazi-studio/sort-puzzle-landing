import { Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'
import { BOTTLE_WIDTH, BottleArt, bodyHeight } from '../../../brand/Bottle'
import { Sparkle, Star } from '../../../brand/Decor'
import { Icon } from '../../../brand/icons'
import { bob, drop, ease } from '../../../brand/motion'
import { FACE, PAPER } from '../../../brand/palette'
import { fa, Pill, Sticker, StrokeText, Sunburst } from '../../../brand/ui'
import { Frame, Pop, Sfx } from '../../sort-puzzle-launch/parts'
import { COPY } from '../copy'
import { Confetti } from '../parts'
import { LAND } from '../timeline'

/** The shelf's bottles, right to left, each filling with one color. */
const COLORS = [0, 1, 2, 4, 7]
/** When each bottle is full: an eighth note apart, the last one on the landing. */
const FULL = COLORS.map((_, i) => Math.round(LAND - (COLORS.length - 1 - i) * 7.5))
const NUMBER = { x: 540, y: 670 }
const PILL_Y = 900
const SHELF = { y: 1510, scale: 0.85, gap: 40 }

/** The hook: the count racing up while the bottles fill, landing with the drop in a burst of confetti. */
export function Count() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const count = Math.round(
    interpolate(frame, [0, LAND], [0, COPY.count.value], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }),
  )
  const punch = 1 + 0.18 * (frame >= LAND ? Math.sin(Math.min(1, (frame - LAND) / 8) * Math.PI) : 0)

  const s = SHELF.scale
  const row = (COLORS.length * BOTTLE_WIDTH + (COLORS.length - 1) * SHELF.gap) * s
  const rim = SHELF.y - (22 + bodyHeight(4)) * s

  return (
    <Frame>
      <Sunburst tone="butter" at={[0.5, 0.35]} />

      {/* Popped before the first frame: whose story this is, readable at frame one. */}
      <Pop at={-12} x={540} y={380}>
        <Img src={staticFile('sort-puzzle/logo-title.png')} style={{ width: 520, display: 'block' }} />
      </Pop>

      <Pop at={-6} x={NUMBER.x} y={NUMBER.y}>
        <StrokeText size={230} color={PAPER} style={{ transform: `scale(${punch})` }}>
          +{fa(count)}
        </StrokeText>
      </Pop>
      <Pop at={-4} x={540} y={PILL_Y}>
        <Pill size={58} face={FACE.coral}>
          <Icon name="download" size={62} stroke={3} />
          {COPY.count.unit}
        </Pill>
      </Pop>
      {[-1, 1].map((side) => (
        <Pop key={side} at={LAND + 2 + (side + 1) * 2} x={540 + side * 255} y={PILL_Y - 6} rotate={side * 14}>
          <Star size={side < 0 ? 104 : 88} />
        </Pop>
      ))}

      <Pop at={0} x={540} y={SHELF.y + 14}>
        <Sticker radius={999} border={6} shadow={10} style={{ width: row + 110, height: 30 }} />
      </Pop>
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        {COLORS.map((color, i) => {
          // The first bottle is on the right: the shelf reads right to left.
          const x = 540 + row / 2 - (i + 1) * BOTTLE_WIDTH * s - i * SHELF.gap * s
          const { y, opacity } = drop(frame, i * 2 - 12, fps, 500)
          const fill = interpolate(frame, [2 + i * 4, FULL[i]], [0, 4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
          const hop = frame >= FULL[i] ? Math.sin(Math.min(1, (frame - FULL[i]) / 9) * Math.PI) * -34 : 0
          const idle = frame > LAND ? bob(frame, i * 11, 5) : 0
          return (
            <g key={color} opacity={opacity} transform={`translate(${x} ${rim + y + hop + idle}) scale(${s})`}>
              <BottleArt liquid={fill > 0.01 ? [{ color, amount: fill }] : []} done={ease(frame, FULL[i], 6, Easing.out(Easing.cubic))} />
            </g>
          )
        })}
      </svg>

      <Confetti at={LAND} x={NUMBER.x} y={NUMBER.y} />

      <Sparkle size={80} gold style={{ left: 70, top: 1010, transform: `rotate(${frame * 3}deg)` }} />
      <Sparkle size={56} style={{ left: 950, top: 1060, transform: `rotate(${-frame * 3}deg)` }} />

      <Sfx at={0} name="reveal" volume={0.4} />
      {(['pour', 'pour_2', 'pour_3'] as const).map((name, i) => (
        <Sfx key={name} at={2 + i * 8} name={name} volume={0.22} />
      ))}
      {FULL.map((at, i) => (
        <Sfx key={at} at={at} name="bottle" volume={0.32} rate={1 + i * 0.07} />
      ))}
      <Sfx at={LAND} name="win" volume={0.45} />
    </Frame>
  )
}
