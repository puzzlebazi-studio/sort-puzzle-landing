import { Easing, interpolate, useCurrentFrame } from 'remotion'
import { Sparkle } from '../../../brand/Decor'
import { FACE } from '../../../brand/palette'
import { fa, Pill, StrokeText, Sunburst } from '../../../brand/ui'
import { Frame, Pop, Sfx } from '../../sort-puzzle-launch/parts'
import { COPY } from '../copy'
import { Caption, gridCell, GRID, layout, LayoutCard } from '../parts'

const CARDS = GRID.cols * GRID.rows.length
/** The counter's run: it speeds up, the way the generator chews through layouts. */
const COUNT_END = 84

/** The hook: the claim up from the first frame, the counter racing, and candidates flickering past. */
export function Hook() {
  const frame = useCurrentFrame()
  const count = Math.round(
    interpolate(frame, [0, COUNT_END], [0, COPY.hook.count], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.quad) }),
  )

  return (
    <Frame>
      <Sunburst tone="sky" at={[0.5, 0.22]} />

      {/* Popped before the first frame: the claim is readable at frame one. */}
      <Pop at={-12} x={540} y={380}>
        <StrokeText size={210} color={FACE.butter}>
          {COPY.hook.title}
        </StrokeText>
      </Pop>
      <Pop at={-4} x={540} y={588}>
        <Pill size={46} dark>
          {/* A fixed width so the pill holds still while the digits run; the number sits against the word. */}
          <span style={{ minWidth: 230, textAlign: 'end', display: 'inline-block' }}>{fa(count)}</span> {COPY.hook.unit}
        </Pill>
      </Pop>

      {Array.from({ length: CARDS }, (_, i) => {
        const { x, y } = gridCell(i)
        // Each card shows a new candidate every three frames, out of step with its neighbours.
        const tick = Math.floor((frame + i * 2) / 3)
        return (
          <Pop key={i} at={i - 16} x={x} y={y} rotate={((i * 7) % 5) - 2}>
            <LayoutCard bottles={layout(i * 9973 + tick, 3, 1, i)} width={GRID.card} />
          </Pop>
        )
      })}

      <Caption at={4}>{COPY.hook.caption}</Caption>

      <Sparkle size={70} gold style={{ left: 120, top: 250, transform: `rotate(${frame * 3}deg)` }} />
      <Sparkle size={52} style={{ left: 880, top: 470, transform: `rotate(${-frame * 3}deg)` }} />

      <Sfx at={0} name="reveal" volume={0.4} />
      {Array.from({ length: 13 }, (_, i) => (
        <Sfx key={i} at={6 + i * 6} name="tap" volume={0.16} rate={0.9 + i * 0.06} />
      ))}
    </Frame>
  )
}
