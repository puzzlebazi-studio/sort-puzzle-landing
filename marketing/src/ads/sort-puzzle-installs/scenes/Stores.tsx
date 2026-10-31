import { Img, staticFile, useCurrentFrame } from 'remotion'
import { Sparkle } from '../../../brand/Decor'
import { bob } from '../../../brand/motion'
import { FACE, PAPER } from '../../../brand/palette'
import { fa, Pill, Sunburst } from '../../../brand/ui'
import { Frame, Pop, Sfx, TitleStack } from '../../sort-puzzle-launch/parts'
import { COPY } from '../copy'
import { Heart, RisingHearts } from '../parts'

/** The two stores the installs came from, in reading order: Cafe Bazaar first. */
const BADGES = [
  { src: 'stores/cafebazaar-logo-badge-fa.png', y: 1010, at: 24, sfx: 'select' },
  { src: 'stores/myket-logo-badge-fa.png', y: 1240, at: 32, sfx: 'select_2' },
] as const
const HEARTS_AT = 44

/** Where: the count again, the two stores, and hearts floating up for the players. */
export function Stores() {
  const frame = useCurrentFrame()

  return (
    <Frame>
      <Sunburst tone="sky" at={[0.5, 0.36]} />
      <RisingHearts from={14} />

      <Pop at={4} x={540} y={420}>
        <Pill size={50} dark>
          +{fa(COPY.count.value)} {COPY.count.unit}
        </Pill>
      </Pop>
      <TitleStack
        at={10}
        size={136}
        center={{ x: 540, y: 665 }}
        lines={[
          { text: COPY.stores.lines[0], color: PAPER },
          { text: COPY.stores.lines[1], color: FACE.butter },
        ]}
      />

      {BADGES.map(({ src, y, at }, i) => (
        <Pop key={src} at={at} x={540} y={y + bob(frame, i * 25, 5)}>
          <Img src={staticFile(src)} style={{ height: 190, display: 'block', filter: 'drop-shadow(0 10px 0 rgb(46 37 69 / 0.45))' }} />
        </Pop>
      ))}

      {[-1, 0, 1].map((k) => (
        <Pop key={k} at={HEARTS_AT + (k + 1) * 4} x={540 + k * 150} y={1470 + (k === 0 ? -14 : 0) + bob(frame, k * 15, 6)} rotate={k * 14}>
          <Heart size={k === 0 ? 130 : 96} face={k === 0 ? FACE.coral : FACE.pink} />
        </Pop>
      ))}

      <Sparkle size={78} style={{ left: 80, top: 330, transform: `rotate(${frame * 3}deg)` }} />
      <Sparkle size={54} gold style={{ left: 940, top: 860, transform: `rotate(${-frame * 3}deg)` }} />

      <Sfx at={4} name="reveal" volume={0.35} />
      {BADGES.map(({ src, at, sfx }) => (
        <Sfx key={src} at={at} name={sfx} volume={0.4} />
      ))}
      <Sfx at={HEARTS_AT} name="star" volume={0.35} />
    </Frame>
  )
}
