import type { ReactNode } from 'react'
import { useCurrentFrame } from 'remotion'
import type { Slot } from '../../../brand/Bottle'
import { ease } from '../../../brand/motion'
import { FACE, PAPER, PLUM, type SunTone } from '../../../brand/palette'
import { Pill, StrokeText, Sunburst } from '../../../brand/ui'
import { Frame, Pop, Sfx, TitleStack } from '../../sort-puzzle-launch/parts'
import { COPY } from '../copy'
import { Caption, knock, layout, LayoutCard, recolor, Stamp } from '../parts'
import { STAMP_AT } from '../timeline'

/** Where the candidate sits in every reject scene. */
const CARD_Y = 830

/**
 * One reason a candidate is dropped: the question as the title, the candidate, then the stamp on
 * the beat, which knocks the card and turns it gray. `children` draw the candidate; they get how
 * gray it is and how far the stamp knocked it.
 */
function RejectScene({
  tone,
  title,
  stamp,
  stampAt = { x: 540, y: CARD_Y },
  caption,
  children,
}: {
  tone: SunTone
  /** One or two lines, each short enough to stay inside the frame. */
  title: string[]
  stamp: string
  stampAt?: { x: number; y: number }
  caption: string
  children: (hit: { grey: number; dx: number }) => ReactNode
}) {
  const frame = useCurrentFrame()
  const hit = { grey: ease(frame, STAMP_AT + 2, 6) * 0.85, dx: knock(frame, STAMP_AT) }
  return (
    <Frame>
      <Sunburst tone={tone} at={[0.5, 0.2]} />
      <TitleStack at={6} size={title.length > 1 ? 118 : 140} center={{ x: 540, y: title.length > 1 ? 420 : 400 }} lines={title.map((text) => ({ text, color: PAPER }))} />
      {children(hit)}
      <Stamp at={STAMP_AT} x={stampAt.x} y={stampAt.y} size={stamp.length > 4 ? 104 : 124}>
        {stamp}
      </Stamp>
      <Caption at={8}>{caption}</Caption>
      <Sfx at={STAMP_AT} name="bottle" volume={0.55} rate={0.8} />
      <Sfx at={STAMP_AT} name="tap" volume={0.4} rate={0.7} />
    </Frame>
  )
}

/** Two bottles done before the first pour, two a swap away: it looks sorted already. */
const SORTED: Slot[][] = [[0, 0, 0, 0], [1, 1, 1, 1], [3, 3, 3, 4], [4, 4, 4, 3], []]

export function Sorted() {
  return (
    <RejectScene tone="peach" title={COPY.sorted.title} stamp={COPY.sorted.stamp} caption={COPY.sorted.caption}>
      {({ grey, dx }) => (
        <Pop at={4} x={540 + dx} y={CARD_Y}>
          <LayoutCard bottles={SORTED} width={700} style={{ filter: `grayscale(${grey})` }} />
        </Pop>
      )}
    </RejectScene>
  )
}

/** The difficulty track: stage 1 on the right, 1000 on the left, as the stage map reads. */
const TRACK = { y: 1110, left: 250, right: 830, h: 34 }
const MARK = 0.8

export function Range() {
  const frame = useCurrentFrame()
  const travel = ease(frame, 16, 22)
  const length = TRACK.right - TRACK.left
  const place = TRACK.right - length * 0.008
  const mark = place - (place - (TRACK.right - length * MARK)) * travel
  return (
    <RejectScene tone="pink" title={COPY.range.title} stamp={COPY.range.stamp} stampAt={{ x: 540, y: CARD_Y - 40 }} caption={COPY.range.caption}>
      {({ grey, dx }) => (
        <>
          <Pop at={4} x={540 + dx} y={CARD_Y - 40}>
            <LayoutCard bottles={layout(808, 5, 1, 3)} width={720} style={{ filter: `grayscale(${grey})` }} />
          </Pop>
          <Pop at={10} x={(TRACK.left + TRACK.right) / 2} y={TRACK.y}>
            <div
              style={{
                width: length,
                height: TRACK.h,
                borderRadius: 999,
                border: `6px solid ${PLUM}`,
                boxShadow: `0 6px 0 ${PLUM}`,
                background: `linear-gradient(to left, ${FACE.mint}, ${FACE.butter}, ${FACE.coral})`,
              }}
            />
          </Pop>
          {/* Pulled in from the track's end: the action rail covers everything right of SAFE.right. */}
          <Pop at={14} x={place - 70} y={TRACK.y + 66}>
            <Pill size={32} face={FACE.butter}>
              {COPY.range.place}
            </Pill>
          </Pop>
          <Pop at={14} x={TRACK.left + 60} y={TRACK.y + 66}>
            <span style={{ fontSize: 30, fontWeight: 700, color: PLUM }}>{COPY.range.hard}</span>
          </Pop>
          <Pop at={16} x={mark} y={TRACK.y}>
            <div style={{ width: 58, height: 58, borderRadius: '50%', background: FACE.coral, border: `7px solid ${PLUM}`, boxSizing: 'border-box' }} />
          </Pop>
          <Pop at={18} x={mark} y={TRACK.y - 70}>
            <Pill size={32} face={FACE.coral}>
              {COPY.range.level}
            </Pill>
          </Pop>
        </>
      )}
    </RejectScene>
  )
}

/** One layout, then the same one in other colors: the generator counts it once. */
const ORIGINAL = layout(1207, 3, 1, 0)
const SWAPPED = recolor(ORIGINAL, (color) => [7, 5, 8][color] ?? color)
const SWAP_AT = 26
const PAIR = { card: 380, offset: 214 }

export function Duplicate() {
  const frame = useCurrentFrame()
  const copy = { x: 540 - PAIR.offset, y: CARD_Y }
  return (
    <RejectScene tone="lilac" title={COPY.duplicate.title} stamp={COPY.duplicate.stamp} stampAt={copy} caption={COPY.duplicate.caption}>
      {({ grey, dx }) => (
        <>
          <Pop at={4} x={540 + PAIR.offset} y={CARD_Y}>
            <LayoutCard bottles={ORIGINAL} width={PAIR.card} />
          </Pop>
          <Pop at={30} x={540} y={CARD_Y}>
            <StrokeText size={110} color={PAPER}>
              =
            </StrokeText>
          </Pop>
          <Pop at={14} x={copy.x + dx} y={copy.y}>
            <LayoutCard bottles={frame < SWAP_AT ? ORIGINAL : SWAPPED} width={PAIR.card} style={{ filter: `grayscale(${grey})` }} />
          </Pop>
          <Sfx at={SWAP_AT} name="select_2" volume={0.4} />
        </>
      )}
    </RejectScene>
  )
}
