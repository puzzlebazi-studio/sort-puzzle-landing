import { Easing, interpolate, useCurrentFrame } from 'remotion'
import { FACE, liquidHex, PAPER, PLUM } from '../../../brand/palette'
import { fa, Pill, StrokeText, Sunburst } from '../../../brand/ui'
import { Frame, Pop, Sfx } from '../../sort-puzzle-launch/parts'
import { COPY } from '../copy'
import { Caption } from '../parts'

/** The funnel's mouth and spout, in px. */
const MOUTH = { y: 680, w: 540 }
const SPOUT = { y: 860, w: 110 }
const BALLS = 16

/** The whole filter in two numbers: what went in, what came out. */
export function Funnel() {
  const frame = useCurrentFrame()
  const out = Math.round(
    interpolate(frame, [20, 56], [0, COPY.funnel.to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }),
  )
  const funnel = `M${540 - MOUTH.w / 2} ${MOUTH.y} L${540 + MOUTH.w / 2} ${MOUTH.y} L${540 + SPOUT.w / 2} ${SPOUT.y} L${540 - SPOUT.w / 2} ${SPOUT.y} Z`

  return (
    <Frame>
      <Sunburst tone="mint" at={[0.5, 0.2]} />

      <Pop at={4} x={540} y={400}>
        <StrokeText size={170} color={FACE.butter}>
          {fa(COPY.funnel.from)}
        </StrokeText>
      </Pop>
      <Pop at={8} x={540} y={566}>
        <Pill size={40} dark>
          {COPY.funnel.fromUnit}
        </Pill>
      </Pop>

      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        {/* Balls of every color pour in; only now and then does one drop out of the spout. */}
        {Array.from({ length: BALLS }, (_, i) => {
          const cycle = 24
          const t = ((frame + i * (cycle / BALLS) * 3) % cycle) / cycle
          const lane = ((i * 37) % 9) / 8 - 0.5
          const x = 540 + lane * MOUTH.w * 0.8 * (1 - t * 0.85)
          const y = MOUTH.y - 70 + t * (SPOUT.y - MOUTH.y + 30)
          return frame < 10 ? null : <circle key={i} cx={x} cy={y} r={17} fill={liquidHex(i)} stroke={PLUM} strokeWidth={5} />
        })}
        {frame >= 22 && (
          <circle cx={540} cy={SPOUT.y + 20 + ((frame - 22) % 12) * 9} r={17} fill={liquidHex(Math.floor((frame - 22) / 12))} stroke={PLUM} strokeWidth={5} />
        )}
        <path d={funnel} fill={PAPER} stroke={PLUM} strokeWidth={10} strokeLinejoin="round" opacity={frame < 6 ? 0 : 1} />
      </svg>

      <Pop at={18} x={540} y={1010}>
        <StrokeText size={170} color={PAPER}>
          {fa(out)}
        </StrokeText>
      </Pop>
      <Pop at={24} x={540} y={1150}>
        <Pill size={40} face={FACE.butter}>
          {COPY.funnel.toUnit}
        </Pill>
      </Pop>

      <Caption at={6}>{COPY.funnel.caption}</Caption>

      <Sfx at={8} name="pour" volume={0.3} />
      {[20, 26, 32, 38, 44].map((at, i) => (
        <Sfx key={at} at={at} name="tap" volume={0.25} rate={1 + i * 0.1} />
      ))}
      <Sfx at={56} name="coin" volume={0.35} />
    </Frame>
  )
}
