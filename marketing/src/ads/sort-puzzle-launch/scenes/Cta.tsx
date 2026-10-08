import { Img, staticFile, useCurrentFrame } from 'remotion'
import { BOTTLE_TOP, BOTTLE_WIDTH, BottleArt, bottleHeight, runsOf } from '../../../brand/Bottle'
import { Sparkle } from '../../../brand/Decor'
import { bob } from '../../../brand/motion'
import { FACE, PLUM } from '../../../brand/palette'
import { Pill, Sunburst, useLayout } from '../../../brand/ui'
import { COPY } from '../copy'
import { BEAT } from '../timeline'
import { Frame, Pop, Sfx } from '../parts'

/** The music's last chord, six beats into this scene (scripts/make-music.ts): the logo and badges bounce on it. */
const FINAL = 6 * BEAT

export type Store = 'bazaar' | 'myket'

/** Every store the game is in, in reading order: Cafe Bazaar on the right. */
export const STORES: Store[] = ['bazaar', 'myket']

const BADGES: Record<Store, { src: string; w: number; h: number }> = {
  bazaar: { src: 'stores/cafebazaar-logo-badge-fa.png', w: 421, h: 125 },
  myket: { src: 'stores/myket-logo-badge-fa.png', w: 966, h: 287 },
}
const BADGE_SFX = ['select', 'select_2'] as const

/** The call to action: the game, its line, and where to get it (`stores`, in reading order). */
export function Cta({ stores = STORES }: { stores?: Store[] }) {
  const frame = useCurrentFrame()
  const { width, portrait } = useLayout()
  const pulse = 1 + 0.08 * (frame >= FINAL ? Math.sin(Math.min(1, (frame - FINAL) / 10) * Math.PI) : 0)

  const icon = portrait ? { x: width / 2, y: 330, size: 330 } : { x: 1380, y: 300, size: 290 }
  const logo = portrait ? { x: width / 2, y: 720, w: 900 } : { x: 700, y: 300, w: 780 }
  const tagline = portrait ? { x: width / 2, y: 1010, size: 54 } : { x: width / 2, y: 600, size: 50 }
  const free = portrait ? { x: width / 2, y: 1140, size: 40 } : { x: width / 2, y: 718, size: 36 }
  const badges = portrait ? { y: 1330, h: 136, gap: 34 } : { y: 860, h: 120, gap: 34 }
  const studio = portrait ? { x: width / 2, y: 1690, h: 170 } : { x: 230, y: 975, h: 120 }

  // The badges' row, centered and laid out right to left; each one pops six frames after the last.
  const widths = stores.map((store) => (badges.h * BADGES[store].w) / BADGES[store].h)
  const rowW = widths.reduce((sum, w) => sum + w, 0) + badges.gap * (stores.length - 1)
  const row = stores.map((store, i) => {
    const before = widths.slice(0, i).reduce((sum, w) => sum + w + badges.gap, 0)
    return { store, x: width / 2 + rowW / 2 - before - widths[i] / 2, at: 38 + 6 * i, sfx: BADGE_SFX[i % BADGE_SFX.length] }
  })

  return (
    <Frame>
      <Sunburst tone="violet" at={portrait ? [0.5, 0.2] : [0.72, 0.28]} speed={0.12} />

      {/* Two filled bottles flanking the icon. */}
      {[-1, 1].map((side) => {
        const s = portrait ? 0.62 : 0.55
        const x = icon.x + side * (icon.size / 2 + (portrait ? 150 : 120)) - (BOTTLE_WIDTH * s) / 2
        const y = icon.y - (bottleHeight(4) * s) / 2 + bob(frame, side * 20, 10) + 30
        return (
          <Pop key={side} at={10 + (side + 1) * 2} x={x + (BOTTLE_WIDTH * s) / 2} y={y + (bottleHeight(4) * s) / 2} rotate={side * 8}>
            <svg width={(BOTTLE_WIDTH + 40) * s} height={(bottleHeight(4) + 20) * s} viewBox={`-20 ${-BOTTLE_TOP - 20} ${BOTTLE_WIDTH + 40} ${bottleHeight(4) + 20}`} style={{ overflow: 'visible' }}>
              <BottleArt liquid={runsOf(side < 0 ? [0, 0, 0, 0] : [2, 2, 2, 2])} done={1} />
            </svg>
          </Pop>
        )
      })}

      <Pop at={4} x={icon.x} y={icon.y + bob(frame, 0, 6)}>
        <Img
          src={staticFile('sort-puzzle/icon.svg')}
          style={{ width: icon.size, height: icon.size, borderRadius: icon.size * 0.23, border: `8px solid ${PLUM}`, boxShadow: `0 14px 0 ${PLUM}`, display: 'block' }}
        />
      </Pop>
      <Pop at={12} x={logo.x} y={logo.y}>
        <Img src={staticFile('sort-puzzle/logo-title.png')} style={{ width: logo.w, display: 'block', transform: `scale(${pulse})` }} />
      </Pop>
      <Pop at={22} x={tagline.x} y={tagline.y}>
        <Pill size={tagline.size} dark>
          {COPY.cta.tagline}
        </Pill>
      </Pop>
      <Pop at={30} x={free.x} y={free.y}>
        <Pill size={free.size} face={FACE.butter}>
          {COPY.cta.free}
        </Pill>
      </Pop>

      {row.map(({ store, x, at }) => (
        <Pop key={store} at={at} x={x} y={badges.y}>
          <Img src={staticFile(BADGES[store].src)} style={{ height: badges.h, display: 'block', transform: `scale(${pulse})`, filter: `drop-shadow(0 8px 0 rgb(46 37 69 / 0.45))` }} />
        </Pop>
      ))}

      <Pop at={54} x={studio.x} y={studio.y}>
        <Img src={staticFile('studio/logotype-fa.svg')} style={{ height: studio.h, display: 'block' }} />
      </Pop>

      <Sparkle size={90} style={{ left: portrait ? 80 : 1700, top: portrait ? 560 : 520, transform: `rotate(${frame * 3}deg)` }} />
      <Sparkle size={60} gold style={{ left: portrait ? 940 : 120, top: portrait ? 1500 : 560, transform: `rotate(${-frame * 3}deg)` }} />
      <Sparkle size={44} style={{ left: portrait ? 860 : 1220, top: portrait ? 120 : 80 }} />

      <Sfx at={4} name="reveal" volume={0.4} />
      {row.map(({ store, at, sfx }) => (
        <Sfx key={store} at={at} name={sfx} volume={0.4} />
      ))}
      <Sfx at={FINAL} name="achievement" volume={0.4} />
    </Frame>
  )
}
