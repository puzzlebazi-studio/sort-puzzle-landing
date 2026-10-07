import { useCurrentFrame, useVideoConfig } from 'remotion'
import { BOTTLE_WIDTH, BottleArt, bodyHeight, runsOf } from '../../../brand/Bottle'
import { Sparkle } from '../../../brand/Decor'
import { drop, ease } from '../../../brand/motion'
import { FACE, PAPER } from '../../../brand/palette'
import { Pill, Sunburst, useLayout } from '../../../brand/ui'
import { COPY } from '../copy'
import { Frame, Pop, Sfx, TitleStack } from '../parts'

/** Four bottles with every color mixed up, bottom first. */
const MESS = [
  [0, 1, 2, 3],
  [2, 3, 0, 1],
  [1, 0, 3, 2],
  [3, 2, 1, 0],
]
const DROPS = [26, 32, 38, 44]

/** The hook: a mess of colors and the promise to sort them. */
export function Hook() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const { width, height, portrait } = useLayout()

  const s = portrait ? 1.06 : 0.98
  const gap = 46
  const row = MESS.length * BOTTLE_WIDTH + (MESS.length - 1) * gap
  const bottom = portrait ? 1770 : 985
  const cx = portrait ? width / 2 : 540
  const rim = bottom - (22 + bodyHeight(4)) * s
  // From the second bar the bottles fidget on every beat: they want sorting.
  const fidget = ease(frame, 60, 12)

  return (
    <Frame>
      <Sunburst tone="butter" at={portrait ? [0.5, 0.42] : [0.72, 0.5]} />
      <TitleStack
        at={6}
        size={portrait ? 158 : 150}
        center={portrait ? { x: width / 2, y: 370 } : { x: 1390, y: 410 }}
        lines={[
          { text: COPY.hook.lines[0], color: PAPER },
          { text: COPY.hook.lines[1], color: FACE.coral },
        ]}
      />
      <Pop at={20} x={portrait ? width / 2 : 1390} y={portrait ? 660 : 720}>
        <Pill size={portrait ? 44 : 40}>{COPY.hook.pill}</Pill>
      </Pop>

      <svg width={width} height={height} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        {MESS.map((layers, i) => {
          const { y, opacity } = drop(frame, DROPS[i], fps, 900)
          const x = cx - (row * s) / 2 + i * (BOTTLE_WIDTH + gap) * s
          const wiggle = fidget * Math.sin(((frame - 60) / 15) * Math.PI + i * 1.7) * 5
          const pivot = `${BOTTLE_WIDTH / 2} ${22 + bodyHeight(4)}`
          return (
            <g key={i} opacity={opacity} transform={`translate(${x} ${rim + y}) scale(${s}) rotate(${wiggle} ${pivot})`}>
              <BottleArt liquid={runsOf(layers)} />
            </g>
          )
        })}
      </svg>

      <Sparkle size={92} style={{ left: portrait ? 90 : 1010, top: portrait ? 150 : 180, transform: `rotate(${frame * 2}deg)` }} />
      <Sparkle size={60} gold style={{ left: portrait ? 930 : 1800, top: portrait ? 470 : 560, transform: `rotate(${-frame * 2}deg)` }} />
      <Sparkle size={50} style={{ left: portrait ? 120 : 140, top: portrait ? 1080 : 300 }} />

      <Sfx at={6} name="reveal" volume={0.45} />
      {DROPS.map((at, i) => (
        <Sfx key={at} at={at + 6} name="bottle" volume={0.35} rate={1 + i * 0.06} />
      ))}
    </Frame>
  )
}
