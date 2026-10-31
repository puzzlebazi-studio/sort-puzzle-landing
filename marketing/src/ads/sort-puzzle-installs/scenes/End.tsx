import { Img, staticFile, useCurrentFrame } from 'remotion'
import { Sparkle } from '../../../brand/Decor'
import { bob } from '../../../brand/motion'
import { FACE, PLUM } from '../../../brand/palette'
import { Pill, StrokeText, Sunburst } from '../../../brand/ui'
import { Frame, Pop, Sfx } from '../../sort-puzzle-launch/parts'
import { COPY } from '../copy'
import { Heart } from '../parts'
import { BEAT } from '../timeline'

/** The music's last chord, six beats into this scene (scripts/make-music.ts): the logo and the thanks bounce on it. */
const FINAL = 6 * BEAT

/** Both stores, in reading order, for whoever hasn't installed it yet. */
const BADGES = [
  { src: 'stores/cafebazaar-logo-badge-fa.png', w: 421, h: 125, at: 34, sfx: 'select' },
  { src: 'stores/myket-logo-badge-fa.png', w: 966, h: 287, at: 40, sfx: 'select_2' },
] as const
const BADGE = { y: 1260, h: 104, gap: 34 }

/**
 * The thanks: the game, the line, where to get it, and the studio. Nothing below y = 1480, so a
 * link sticker added in Instagram has room above the reply bar.
 */
export function End() {
  const frame = useCurrentFrame()
  const pulse = 1 + 0.08 * (frame >= FINAL ? Math.sin(Math.min(1, (frame - FINAL) / 10) * Math.PI) : 0)

  // The badges' row, centered and laid out right to left.
  const widths = BADGES.map((b) => (BADGE.h * b.w) / b.h)
  const rowW = widths.reduce((sum, w) => sum + w, 0) + BADGE.gap * (BADGES.length - 1)
  const xs = widths.map((w, i) => 540 + rowW / 2 - widths.slice(0, i).reduce((sum, v) => sum + v + BADGE.gap, 0) - w / 2)

  return (
    <Frame>
      <Sunburst tone="violet" at={[0.5, 0.24]} speed={0.12} />

      <Pop at={4} x={540} y={465 + bob(frame, 0, 6)}>
        <Img
          src={staticFile('sort-puzzle/icon.svg')}
          style={{ width: 230, height: 230, borderRadius: 230 * 0.23, border: `8px solid ${PLUM}`, boxShadow: `0 12px 0 ${PLUM}`, display: 'block' }}
        />
      </Pop>
      <Pop at={10} x={540} y={705}>
        <Img src={staticFile('sort-puzzle/logo-title.png')} style={{ width: 620, display: 'block', transform: `scale(${pulse})` }} />
      </Pop>

      <Pop at={18} x={540} y={935}>
        <StrokeText size={150} color={FACE.butter} style={{ transform: `scale(${pulse})` }}>
          {COPY.end.title}
        </StrokeText>
      </Pop>
      {[-1, 1].map((side) => (
        <Pop key={side} at={22 + (side + 1) * 2} x={540 + side * 385} y={915 + bob(frame, side * 20, 8)} rotate={side * 14}>
          <Heart size={side < 0 ? 104 : 88} face={side < 0 ? FACE.coral : FACE.pink} />
        </Pop>
      ))}
      <Pop at={26} x={540} y={1105}>
        <Pill size={46}>{COPY.end.line}</Pill>
      </Pop>

      {BADGES.map(({ src, at }, i) => (
        <Pop key={src} at={at} x={xs[i]} y={BADGE.y}>
          <Img src={staticFile(src)} style={{ height: BADGE.h, display: 'block', filter: 'drop-shadow(0 8px 0 rgb(46 37 69 / 0.45))' }} />
        </Pop>
      ))}
      <Pop at={48} x={540} y={1415}>
        <Img src={staticFile('studio/logotype-fa.svg')} style={{ height: 120, display: 'block' }} />
      </Pop>

      <Sparkle size={86} style={{ left: 100, top: 345, transform: `rotate(${frame * 3}deg)` }} />
      <Sparkle size={58} gold style={{ left: 880, top: 605, transform: `rotate(${-frame * 3}deg)` }} />
      <Sparkle size={44} style={{ left: 150, top: 1335 }} />

      <Sfx at={4} name="reveal" volume={0.4} />
      <Sfx at={22} name="star" volume={0.3} />
      {BADGES.map(({ src, at, sfx }) => (
        <Sfx key={src} at={at} name={sfx} volume={0.4} />
      ))}
      <Sfx at={FINAL} name="achievement" volume={0.4} />
    </Frame>
  )
}
