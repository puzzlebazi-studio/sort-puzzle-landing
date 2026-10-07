import { useCurrentFrame, useVideoConfig } from 'remotion'
import { Chest, Coin, Sparkle, Star } from '../../../brand/Decor'
import { Icon } from '../../../brand/icons'
import { bob, drop, ease } from '../../../brand/motion'
import { FACE, PAPER, PLUM } from '../../../brand/palette'
import { fa, Pill, Sticker, Sunburst, useLayout } from '../../../brand/ui'
import { COPY } from '../copy'
import { Frame, Pop, Sfx, TitleStack } from '../parts'

const CHEST_AT = 14
const OPEN_AT = 30
const STARS_AT = 46
/** Coins thrown out of the chest: launch angle (degrees from straight up), speed and spin. */
const COINS = [
  [-62, 1.0, 9],
  [-38, 1.18, -7],
  [-16, 1.3, 11],
  [6, 1.24, -9],
  [28, 1.12, 8],
  [50, 0.98, -11],
  [-50, 0.82, 6],
  [40, 0.86, -6],
]

/** Rewards: a gift every day, achievements and stars. */
export function Rewards() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const { width, portrait } = useLayout()
  const title = portrait ? { x: width / 2, y: 330 } : { x: 1420, y: 390 }
  const chest = portrait ? { x: width / 2, y: 1240, w: 640 } : { x: 560, y: 690, w: 520 }
  const fall = drop(frame, CHEST_AT, fps, 900)
  const open = ease(frame, OPEN_AT, 6)

  return (
    <Frame>
      <Sunburst tone="lilac" at={portrait ? [0.5, 0.62] : [0.3, 0.55]} />
      <TitleStack
        at={6}
        size={portrait ? 150 : 140}
        center={title}
        lines={[
          { text: COPY.rewards.lines[0], color: PAPER },
          { text: COPY.rewards.lines[1], color: FACE.butter },
        ]}
      />
      <Pop at={16} x={title.x} y={title.y + (portrait ? 290 : 270)}>
        <Pill size={portrait ? 40 : 36}>{COPY.rewards.pill}</Pill>
      </Pop>

      {/* Stars over the chest. */}
      {[-1, 0, 1].map((k) => (
        <Pop
          key={k}
          at={STARS_AT + (k + 1) * 6}
          x={chest.x + k * chest.w * 0.36}
          y={chest.y - chest.w * (portrait ? (k === 0 ? 0.78 : 0.64) : k === 0 ? 0.92 : 0.74)}
          rotate={k * 12}
        >
          <Star size={k === 0 ? chest.w * 0.34 : chest.w * 0.25} />
        </Pop>
      ))}

      {/* Coins flying out once the lid pops. */}
      {COINS.map(([angle, speed, spin], i) => {
        const t = (frame - OPEN_AT - 2 - (i % 3)) / fps
        if (t < 0) return null
        const a = (angle * Math.PI) / 180
        const v = chest.w * 2.1 * speed
        const x = chest.x + Math.sin(a) * v * t
        const y = chest.y - chest.w * 0.25 - Math.cos(a) * v * t + 0.5 * chest.w * 5.2 * t * t
        const size = chest.w * 0.16
        return <Coin key={i} size={size} style={{ position: 'absolute', left: x - size / 2, top: y - size / 2, transform: `rotate(${t * spin * 60}deg)` }} />
      })}

      <div style={{ position: 'absolute', left: chest.x - chest.w / 2, top: chest.y - chest.w * 0.42 + fall.y, opacity: fall.opacity }}>
        <Chest width={chest.w} open={open} />
      </div>

      <Pop at={62} x={chest.x - chest.w * 0.62} y={chest.y + chest.w * 0.5 + bob(frame, 0, 4)} rotate={-7}>
        <Sticker radius={36} border={8} shadow={12} style={{ padding: '18px 34px 22px', textAlign: 'center' }}>
          <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.1 }}>{COPY.rewards.day}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 54, fontWeight: 800, lineHeight: 1.2 }}>
            <Coin size={50} />
            {fa(COPY.rewards.dayCoins)}
          </div>
        </Sticker>
      </Pop>
      <Pop at={70} x={chest.x + chest.w * 0.6} y={chest.y + chest.w * 0.46 + bob(frame, 20, 4)} rotate={8}>
        <div
          style={{
            width: 210,
            height: 210,
            borderRadius: '50%',
            background: FACE.butter,
            border: `8px solid ${PLUM}`,
            boxShadow: `0 12px 0 ${PLUM}`,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="trophy" size={78} />
          <span style={{ fontSize: 46, fontWeight: 800, lineHeight: 1 }}>{COPY.rewards.achievements}</span>
        </div>
      </Pop>

      <Sparkle size={80} style={{ left: portrait ? 110 : 120, top: portrait ? 760 : 160, transform: `rotate(${frame * 3}deg)` }} />
      <Sparkle size={56} gold style={{ left: portrait ? 920 : 1000, top: portrait ? 900 : 540 }} />

      <Sfx at={CHEST_AT + 8} name="bottle" volume={0.35} rate={0.7} />
      <Sfx at={OPEN_AT} name="reward" volume={0.5} />
      <Sfx at={OPEN_AT + 3} name="coin" volume={0.4} />
      <Sfx at={STARS_AT} name="star" volume={0.35} />
      <Sfx at={STARS_AT + 6} name="star2" volume={0.35} />
      <Sfx at={STARS_AT + 12} name="star3" volume={0.35} />
      <Sfx at={70} name="achievement" volume={0.3} />
    </Frame>
  )
}
