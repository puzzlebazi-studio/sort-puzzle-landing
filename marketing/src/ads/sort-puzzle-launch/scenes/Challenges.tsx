import { useCurrentFrame } from 'remotion'
import { BOTTLE_TOP, BOTTLE_WIDTH, BottleArt, bottleHeight, runsOf, type BottleArtProps, type Slot } from '../../../brand/Bottle'
import { Sparkle } from '../../../brand/Decor'
import { Icon } from '../../../brand/icons'
import { bob } from '../../../brand/motion'
import { FACE, PAPER, PLUM } from '../../../brand/palette'
import { fa, Pill, Sticker, StrokeText, Sunburst, useLayout } from '../../../brand/ui'
import { COPY } from '../copy'
import { Frame, Pop, Sfx } from '../parts'

type Card = { id: keyof typeof COPY.challenges.items } & ({ layers: Slot[]; bottle?: Omit<BottleArtProps, 'liquid'> } | { badge: 'moves' | 'tight' })

// In the "۹ چالش ویژه" store banner's order.
const CARDS: Card[] = [
  { id: 'hidden', layers: ['hidden', 'hidden', 'hidden', 0] },
  { id: 'frozen', layers: [1, 2], bottle: { frozen: fa(5) } },
  { id: 'locked', layers: [0, 3], bottle: { lock: 7 } },
  { id: 'ring', layers: [2], bottle: { ring: 2 } },
  { id: 'neck', layers: [7, 6, 4], bottle: { neck: true } },
  { id: 'stones', layers: ['stone', 'stone', 1] },
  { id: 'bomb', layers: [6, 5], bottle: { bomb: fa(4) } },
  { id: 'moves', badge: 'moves' },
  { id: 'tight', badge: 'tight' },
]
const CARDS_AT = 26

/** Depth: nine special rules that keep the game fresh. */
export function Challenges() {
  const frame = useCurrentFrame()
  const { width, portrait } = useLayout()
  const title = portrait ? { x: width / 2, y: 300 } : { x: 1420, y: 420 }
  const grid = portrait ? { card: [296, 300], gap: 30, top: 700, cx: width / 2 } : { card: [262, 244], gap: 24, top: 150, cx: 560 }
  const [cw, ch] = grid.card

  return (
    <Frame>
      <Sunburst tone="sky" at={portrait ? [0.5, 0.25] : [0.74, 0.45]} />

      <Pop at={6} x={title.x} y={title.y}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <StrokeText size={portrait ? 300 : 280} color={FACE.butter} style={{ lineHeight: 1.05 }}>
            {COPY.challenges.count}
          </StrokeText>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {COPY.challenges.lines.map((line) => (
              <StrokeText key={line} size={portrait ? 128 : 118} color={PAPER} style={{ lineHeight: 1.18 }}>
                {line}
              </StrokeText>
            ))}
          </div>
        </div>
      </Pop>
      <Pop at={16} x={title.x} y={title.y + (portrait ? 250 : 260)}>
        <Pill size={portrait ? 44 : 40}>{COPY.challenges.pill}</Pill>
      </Pop>

      {CARDS.map((card, i) => {
        // Right to left, top to bottom.
        const col = i % 3
        const rowIndex = Math.floor(i / 3)
        const x = grid.cx + (1 - col) * (cw + grid.gap)
        const y = grid.top + rowIndex * (ch + grid.gap) + ch / 2
        return (
          <Pop key={card.id} at={CARDS_AT + i * 7.5} x={x} y={y + bob(frame, i * 11, 4)}>
            <Sticker
              radius={40}
              border={7}
              shadow={9}
              style={{
                width: cw,
                height: ch,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 8,
                paddingBottom: 18,
              }}
            >
              <CardArt card={card} height={ch * 0.62} />
              <div style={{ fontSize: portrait ? 36 : 32, fontWeight: 800, lineHeight: 1.2, whiteSpace: 'nowrap' }}>{COPY.challenges.items[card.id]}</div>
            </Sticker>
          </Pop>
        )
      })}

      <Sparkle size={80} style={{ left: portrait ? 70 : 940, top: portrait ? 110 : 120, transform: `rotate(${frame * 3}deg)` }} />
      <Sparkle size={54} gold style={{ left: portrait ? 950 : 1830, top: portrait ? 470 : 720 }} />

      <Sfx at={6} name="reveal" volume={0.35} />
      {CARDS.map((card, i) => (
        <Sfx key={card.id} at={CARDS_AT + i * 7.5} name="select_2" volume={0.32} rate={0.85 + i * 0.06} />
      ))}
    </Frame>
  )
}

function CardArt({ card, height }: { card: Card; height: number }) {
  if ('layers' in card) {
    const h = bottleHeight(4)
    return (
      <svg height={height} viewBox={`-20 ${-BOTTLE_TOP - 20} ${BOTTLE_WIDTH + 40} ${h + 20}`} style={{ overflow: 'visible' }}>
        <BottleArt liquid={runsOf(card.layers)} {...card.bottle} />
      </svg>
    )
  }
  const size = height * 0.72
  if (card.badge === 'moves') {
    return (
      <div style={{ position: 'relative', width: size, height: size, borderRadius: '50%', background: FACE.pink, border: `7px solid ${PLUM}`, display: 'grid', placeItems: 'center', boxSizing: 'border-box', marginBottom: height * 0.12 }}>
        <Icon name="timer" size={size * 0.6} />
      </div>
    )
  }
  return (
    <div style={{ position: 'relative', width: size, height: size, borderRadius: '50%', background: FACE.sky, border: `7px solid ${PLUM}`, display: 'grid', placeItems: 'center', boxSizing: 'border-box', marginBottom: height * 0.12 }}>
      <Icon name="addBottle" size={size * 0.58} />
      <span
        style={{
          position: 'absolute',
          right: -size * 0.12,
          top: -size * 0.12,
          width: size * 0.44,
          height: size * 0.44,
          borderRadius: '50%',
          background: FACE.coral,
          border: `5px solid ${PLUM}`,
          display: 'grid',
          placeItems: 'center',
          boxSizing: 'border-box',
        }}
      >
        <Icon name="no" size={size * 0.3} stroke={2.8} />
      </span>
    </div>
  )
}
