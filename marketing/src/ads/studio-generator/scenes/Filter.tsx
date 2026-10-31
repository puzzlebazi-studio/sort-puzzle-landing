import { interpolate, useCurrentFrame } from 'remotion'
import { Sparkle } from '../../../brand/Decor'
import { bob, ease } from '../../../brand/motion'
import { FACE, PAPER } from '../../../brand/palette'
import { fa, Ground, StrokeText } from '../../../brand/ui'
import { Frame, Pop, Sfx } from '../../sort-puzzle-launch/parts'
import { COPY } from '../copy'
import { Caption, gridCell, GRID, layout, LayoutCard } from '../parts'
import { SURVIVOR_AT } from '../timeline'

/** The candidate that stays: the middle card. The rest go, right to left, one every seven frames. */
const SURVIVOR = 4
const REJECTS = [0, 1, 2, 3, 5, 6, 7, 8]
const FIRST = 18
const STEP = 7
const cardLayout = (i: number) => layout(400 + i * 31, 3, 1, i + 2)

/** The filter: the program tries each candidate and drops all but one, then the cut to the one left. */
export function Filter() {
  const frame = useCurrentFrame()
  const rejected = Math.round(
    interpolate(frame, [FIRST, FIRST + STEP * REJECTS.length], [0, COPY.filter.rejected], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
  )
  const survived = frame >= SURVIVOR_AT

  return (
    <Frame>
      <Ground />

      {!survived && (
        <>
          <Pop at={4} x={540} y={400}>
            <StrokeText size={128} color={FACE.coral}>
              {fa(rejected)}
              {COPY.filter.title}
            </StrokeText>
          </Pop>
          <Pop at={10} x={gridCell(SURVIVOR).x} y={gridCell(SURVIVOR).y}>
            <LayoutCard bottles={cardLayout(SURVIVOR)} width={GRID.card} />
          </Pop>
          {REJECTS.map((i, k) => {
            const at = FIRST + k * STEP
            const { x, y } = gridCell(i)
            const grey = ease(frame, at, 6)
            const fall = ease(frame, at + 3, 12)
            return (
              <Pop key={i} at={k + 2} x={x} y={y + fall * 70} rotate={fall * (k % 2 ? 9 : -9)}>
                <LayoutCard bottles={cardLayout(i)} width={GRID.card} style={{ filter: `grayscale(${grey})`, opacity: 1 - 0.65 * grey }} />
              </Pop>
            )
          })}
        </>
      )}

      {survived && (
        <>
          <Pop at={SURVIVOR_AT + 2} x={540} y={400}>
            <StrokeText size={170} color={FACE.mint}>
              {COPY.filter.survivor}
            </StrokeText>
          </Pop>
          <Pop at={SURVIVOR_AT} x={540} y={880 + bob(frame, 0, 8)} stiffness={140}>
            <LayoutCard bottles={cardLayout(SURVIVOR)} width={600} face={PAPER} />
          </Pop>
          <Sparkle size={96} gold style={{ left: 170, top: 640, transform: `rotate(${frame * 3}deg)` }} />
          <Sparkle size={70} style={{ left: 820, top: 1030, transform: `rotate(${-frame * 3}deg)` }} />
          <Sparkle size={56} gold style={{ left: 780, top: 600 }} />
        </>
      )}

      <Caption at={6}>{COPY.filter.caption}</Caption>

      {REJECTS.map((_, k) => (
        <Sfx key={k} at={FIRST + k * STEP} name="select" volume={0.22} rate={1.15 - k * 0.04} />
      ))}
      <Sfx at={SURVIVOR_AT} name="complete" volume={0.45} />
      <Sfx at={SURVIVOR_AT + 6} name="star" volume={0.3} />
    </Frame>
  )
}
