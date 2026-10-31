import { Img, staticFile, useCurrentFrame } from 'remotion'
import { Sparkle } from '../../../brand/Decor'
import { bob } from '../../../brand/motion'
import { FACE, PAPER, PLUM } from '../../../brand/palette'
import { Pill, Sunburst } from '../../../brand/ui'
import { Frame, Pop, Sfx, TitleStack } from '../../sort-puzzle-launch/parts'
import { COPY } from '../copy'
import { BEAT } from '../timeline'

/** The music's last chord, six beats into this scene (scripts/make-music.ts): the logo bounces on it. */
const FINAL = 6 * BEAT

/** The payoff: the game that came out of the filter, the line that loops back to the hook, and the one ask. */
export function End() {
  const frame = useCurrentFrame()
  const pulse = 1 + 0.08 * (frame >= FINAL ? Math.sin(Math.min(1, (frame - FINAL) / 10) * Math.PI) : 0)

  return (
    <Frame>
      <Sunburst tone="violet" at={[0.5, 0.22]} speed={0.12} />

      <Pop at={4} x={540} y={410 + bob(frame, 0, 6)}>
        <Img
          src={staticFile('sort-puzzle/icon.svg')}
          style={{ width: 240, height: 240, borderRadius: 240 * 0.23, border: `8px solid ${PLUM}`, boxShadow: `0 12px 0 ${PLUM}`, display: 'block' }}
        />
      </Pop>
      <Pop at={10} x={540} y={660}>
        <Img src={staticFile('sort-puzzle/logo-title.png')} style={{ width: 680, display: 'block', transform: `scale(${pulse})` }} />
      </Pop>
      <TitleStack
        at={18}
        size={96}
        center={{ x: 540, y: 905 }}
        lines={[
          { text: COPY.end.lines[0], color: PAPER },
          { text: COPY.end.lines[1], color: FACE.butter },
        ]}
      />
      <Pop at={30} x={540} y={1110}>
        <Pill size={50} face={FACE.butter} style={{ transform: `scale(${pulse})` }}>
          {COPY.end.link}
        </Pill>
      </Pop>
      <Pop at={38} x={540} y={1320}>
        <Img src={staticFile('studio/logotype-fa.svg')} style={{ height: 110, display: 'block' }} />
      </Pop>

      <Sparkle size={86} style={{ left: 110, top: 300, transform: `rotate(${frame * 3}deg)` }} />
      <Sparkle size={58} gold style={{ left: 860, top: 560, transform: `rotate(${-frame * 3}deg)` }} />
      <Sparkle size={44} style={{ left: 150, top: 1180 }} />

      <Sfx at={4} name="reveal" volume={0.4} />
      <Sfx at={30} name="select" volume={0.4} />
      <Sfx at={FINAL} name="achievement" volume={0.4} />
    </Frame>
  )
}
