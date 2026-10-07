import { useCurrentFrame, useVideoConfig } from 'remotion'
import { Sparkle } from '../../../brand/Decor'
import { BottleForm, type FormId } from '../../../brand/Forms'
import { bob, drop } from '../../../brand/motion'
import { FACE, PAPER, PLUM } from '../../../brand/palette'
import { Pill, Sticker, Sunburst, useLayout } from '../../../brand/ui'
import { COPY } from '../copy'
import { Frame, Pop, Sfx, TitleStack } from '../parts'

type Rarity = keyof typeof COPY.designs.rarities

/** The designs shop's ten forms on two shelves, with the store banner's ribbons. */
const SHELVES: { form: FormId; color: string; pattern?: 'dots' | 'stripes'; rarity?: Rarity }[][] = [
  [
    { form: 'tube', color: '#FF6F78', pattern: 'dots' },
    { form: 'potion', color: '#B08BF2', pattern: 'stripes', rarity: 'epic' },
    { form: 'hourglass', color: '#6673CC', rarity: 'legendary' },
    { form: 'jar', color: '#FFD45E', pattern: 'stripes' },
    { form: 'slim', color: '#6FD69A' },
  ],
  [
    { form: 'flask', color: '#6FD8E6', pattern: 'dots', rarity: 'rare' },
    { form: 'vase', color: '#FF92C8' },
    { form: 'tumbler', color: '#C2E067', pattern: 'stripes' },
    { form: 'barrel', color: '#FFA35C' },
    { form: 'shoulders', color: '#6FA8F5', pattern: 'dots' },
  ],
]
const RIBBON: Record<Rarity, { face: string; tilt: number }> = {
  rare: { face: FACE.sky, tilt: -5 },
  epic: { face: FACE.lilac, tilt: 5 },
  legendary: { face: FACE.butter, tilt: -6 },
}
const FORMS_AT = 22
const RIBBONS_AT = 66

/** Collecting: dozens of bottle designs in ten shapes. */
export function Designs() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const { width, portrait } = useLayout()
  const title = portrait ? { x: width / 2, y: 340 } : { x: 1420, y: 400 }
  const shelf = portrait ? { w: 940, top: 860, rowH: 440, form: 150, cx: width / 2 } : { w: 820, top: 170, rowH: 390, form: 130, cx: 540 }

  return (
    <Frame>
      <Sunburst tone="pink" at={portrait ? [0.5, 0.3] : [0.74, 0.45]} />
      <TitleStack
        at={6}
        size={portrait ? 150 : 140}
        center={title}
        lines={[
          { text: COPY.designs.lines[0], color: PAPER },
          { text: COPY.designs.lines[1], color: FACE.butter },
        ]}
      />
      <Pop at={16} x={title.x} y={title.y + (portrait ? 290 : 270)}>
        <Pill size={portrait ? 42 : 38}>{COPY.designs.pill}</Pill>
      </Pop>

      {SHELVES.map((row, r) => {
        const base = shelf.top + r * shelf.rowH
        const formH = (shelf.form * 200) / 120
        return (
          <div key={r}>
            <Pop at={FORMS_AT - 6 + r * 4} x={shelf.cx} y={base + formH + 22}>
              <Sticker face={FACE.peach} radius={22} border={7} shadow={10} style={{ width: shelf.w, height: 44, boxSizing: 'border-box' }} />
            </Pop>
            {row.map((design, i) => {
              const k = r * 5 + i
              const at = FORMS_AT + k * 4
              const { y, opacity } = drop(frame, at, fps, 700)
              const x = shelf.cx + (2 - i) * (shelf.w / 5.2)
              return (
                <div key={design.form} style={{ position: 'absolute', left: x - shelf.form / 2, top: base + y + bob(frame, k * 7, 3), opacity, width: shelf.form }}>
                  <BottleForm form={design.form} color={design.color} pattern={design.pattern} style={{ width: shelf.form, height: formH, display: 'block' }} />
                  {design.rarity && (
                    <Pop at={RIBBONS_AT + k} x={shelf.form / 2} y={-36} rotate={RIBBON[design.rarity].tilt}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '8px 24px 12px',
                          borderRadius: 999,
                          border: `5px solid ${PLUM}`,
                          background: RIBBON[design.rarity].face,
                          fontSize: portrait ? 32 : 28,
                          fontWeight: 800,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {COPY.designs.rarities[design.rarity]}
                      </span>
                    </Pop>
                  )}
                </div>
              )
            })}
          </div>
        )
      })}

      <Sparkle size={86} style={{ left: portrait ? 860 : 880, top: portrait ? 760 : 110, transform: `rotate(${frame * 3}deg)` }} />
      <Sparkle size={54} gold style={{ left: portrait ? 90 : 60, top: portrait ? 1320 : 560 }} />

      {SHELVES.flat().map((_, k) => (
        <Sfx key={k} at={FORMS_AT + k * 4 + 7} name="bottle" volume={0.22} rate={0.9 + k * 0.05} />
      ))}
      <Sfx at={RIBBONS_AT} name="unlock" volume={0.3} />
    </Frame>
  )
}
