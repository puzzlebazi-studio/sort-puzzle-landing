import { Easing, interpolate, useCurrentFrame } from 'remotion'
import { Star } from '../../../brand/Decor'
import { bob } from '../../../brand/motion'
import { FACE, PAPER, PLUM } from '../../../brand/palette'
import { fa, Sticker, StrokeText, Sunburst, useLayout } from '../../../brand/ui'
import { COPY } from '../copy'
import { Frame, Pop, Sfx } from '../parts'

/** The worlds' pills on the stage map, as the "1000 stages" store banner colors them. */
const FACES = [PAPER, FACE.pink, FACE.lilac, FACE.sky, FACE.butter, FACE.aqua, FACE.peach, FACE.mint, FACE.coral, FACE.lime]
const PILLS_AT = 34

/** Depth: the stage count rolling up, and ten worlds to travel. */
export function Stages() {
  const frame = useCurrentFrame()
  const { width, portrait } = useLayout()
  const count = Math.round(
    interpolate(frame, [8, 40], [0, COPY.stages.count], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }),
  )

  const title = portrait ? { x: width / 2, y: 330 } : { x: 1450, y: 470 }
  // Pills: two columns, five rows (in reading order, right to left).
  const pill = portrait ? { w: 450, h: 104, gapX: 34, gapY: 30, top: 840, cx: width / 2 } : { w: 404, h: 92, gapX: 24, gapY: 26, top: 170, cx: 500 }

  return (
    <Frame>
      <Sunburst tone="mint" at={portrait ? [0.5, 0.2] : [0.73, 0.45]} />

      <Pop at={6} x={title.x} y={title.y}>
        <StrokeText size={portrait ? 260 : 220} color={FACE.butter} style={{ lineHeight: 1.05 }}>
          +{fa(count)}
        </StrokeText>
      </Pop>
      <Pop at={16} x={title.x} y={title.y + (portrait ? 230 : 200)}>
        <StrokeText size={portrait ? 108 : 96} color={PAPER}>
          {COPY.stages.line}
        </StrokeText>
      </Pop>
      {[-1, 0, 1].map((k) => (
        <Pop key={k} at={24 + (k + 1) * 4} x={title.x + k * 105} y={title.y - (portrait ? 215 : 200) + (k === 0 ? -22 : 0)} rotate={k * 12}>
          <Star size={k === 0 ? 96 : 72} />
        </Pop>
      ))}

      {COPY.stages.worlds.map((world, i) => {
        const col = i % 2
        const rowIndex = Math.floor(i / 2)
        // The first column is on the right: the map reads right to left.
        const x = pill.cx + (col === 0 ? 1 : -1) * (pill.w / 2 + pill.gapX / 2)
        const y = pill.top + rowIndex * (pill.h + pill.gapY) + pill.h / 2
        return (
          <Pop key={world} at={PILLS_AT + i * 3} x={x} y={y + bob(frame, i * 9, 3)}>
            <Sticker
              face={FACES[i]}
              radius={999}
              border={6}
              shadow={8}
              style={{
                width: pill.w,
                height: pill.h,
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                padding: '0 14px',
                fontSize: portrait ? 42 : 34,
                fontWeight: 800,
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  width: pill.h - 30,
                  height: pill.h - 30,
                  flexShrink: 0,
                  borderRadius: '50%',
                  border: `5px solid ${PLUM}`,
                  background: i === 0 ? FACE.butter : PAPER,
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: portrait ? 34 : 30,
                  boxSizing: 'border-box',
                }}
              >
                {fa(i + 1)}
              </span>
              {world}
            </Sticker>
          </Pop>
        )
      })}

      {[8, 14, 20, 26, 32, 38].map((at, i) => (
        <Sfx key={at} at={at} name="tap" volume={0.35} rate={1 + i * 0.12} />
      ))}
      {COPY.stages.worlds.map((_, i) => (
        <Sfx key={i} at={PILLS_AT + i * 3} name="select_3" volume={0.22} rate={0.9 + i * 0.05} />
      ))}
    </Frame>
  )
}
