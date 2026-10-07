import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { BOTTLE_WIDTH, BottleArt, bodyHeight, originForLip, pourTilt, Stream } from '../../../brand/Bottle'
import { Coin, HandArt, Star } from '../../../brand/Decor'
import { RoundButton } from '../../../brand/icons'
import type { LiquidLayer } from '../../../brand/liquid'
import { bob, ease, pop } from '../../../brand/motion'
import { FACE, PAPER, PLUM } from '../../../brand/palette'
import { fa, Ground, Pill, Sticker, StrokeText, useLayout } from '../../../brand/ui'
import { COPY } from '../copy'
import { Frame, Pop, Sfx, type SfxName } from '../parts'
import { POUR_FRAMES, POUR_START, RESULT_AT } from '../timeline'

const GAP = 50
const STEP = BOTTLE_WIDTH + GAP
const LIFT = 44

/** The board, bottom first: two mixed bottles and two waiting for their color. */
const START: number[][] = [
  [0, 1],
  [1, 0],
  [0, 0],
  [1, 1],
]
/** The solution: each move pours one unit of `color`. */
const MOVES = [
  { from: 0, to: 3, color: 1 },
  { from: 1, to: 2, color: 0 },
  { from: 0, to: 2, color: 0 },
  { from: 1, to: 3, color: 1 },
]
const POURS: SfxName[] = ['pour', 'pour_2', 'pour_3', 'pour']

// A move's beats, in frames from its start: lift, swing over, pour, swing back.
const LIFTED = 6
const OVER = 15
const POURED = 29

/** How far each move's pour has gone at `t` frames into the scene (0..1). */
const pourProgress = (m: number, t: number) => ease(t - (POUR_START + m * POUR_FRAMES), OVER, POURED - OVER, (x) => x)

function liquidAt(frame: number): LiquidLayer[][] {
  const bottles = START.map((units) => {
    const runs: LiquidLayer[] = []
    for (const color of units) {
      const last = runs[runs.length - 1]
      if (last && last.color === color) last.amount++
      else runs.push({ color, amount: 1 })
    }
    return runs
  })
  MOVES.forEach((move, m) => {
    const p = pourProgress(m, frame)
    if (p <= 0) return
    const source = bottles[move.from]
    const top = source[source.length - 1]
    top.amount -= p
    if (top.amount <= 1e-3) source.pop()
    const target = bottles[move.to]
    const last = target[target.length - 1]
    if (last && last.color === move.color) last.amount += p
    else target.push({ color: move.color, amount: p })
  })
  return bottles
}

const units = (runs: LiquidLayer[]) => runs.reduce((sum, run) => sum + run.amount, 0)

/** The core loop: tap, pour, every color in its own bottle, and the result. */
export function Play() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const { width, height, portrait } = useLayout()

  const s = portrait ? 1.12 : 0.92
  const row = START.length * BOTTLE_WIDTH + (START.length - 1) * GAP
  const bottom = portrait ? 1480 : 965
  const boardX = width / 2 - (row * s) / 2
  const rim = bottom - (22 + bodyHeight(4)) * s
  const liquid = liquidAt(frame)

  // The bottle in hand, if any.
  const active = MOVES.findIndex((_, m) => {
    const t = frame - (POUR_START + m * POUR_FRAMES)
    return t >= 0 && t < POUR_FRAMES
  })

  const restingX = (i: number) => i * STEP

  let moving: { i: number; x: number; y: number; tilt: number } | null = null
  let stream: { from: { x: number; y: number }; to: { x: number; y: number }; color: number; width: number } | null = null
  if (active >= 0) {
    const move = MOVES[active]
    const t = frame - (POUR_START + active * POUR_FRAMES)
    const lift = LIFT * (ease(t, 0, LIFTED) - ease(t, POURED, POUR_FRAMES - POURED))
    const upright = { x: restingX(move.from), y: -lift }
    const into = { x: restingX(move.to) + BOTTLE_WIDTH / 2, y: 0 }
    const lip = { x: into.x - 64, y: into.y - 110 }
    const held = units(liquid[move.from])
    const tilt = Math.min(118, pourTilt(held) + 6)
    const swing = ease(t, LIFTED, OVER - LIFTED) - ease(t, POURED, POUR_FRAMES - POURED)
    const angle = tilt * swing
    const target = originForLip(angle, lip)
    moving = { i: move.from, x: upright.x + (target.x - upright.x) * swing, y: upright.y + (target.y - upright.y) * swing, tilt: angle }
    if (t >= OVER && t < POURED) {
      const w = 30 * Math.min(1, (t - OVER) / 3, (POURED - t) / 3)
      stream = { from: { x: lip.x + 6, y: lip.y + 4 }, to: { x: into.x, y: into.y + 8 }, color: move.color, width: w }
    }
  }

  // Bottles filled with one color get their burst when their pour ends.
  const doneAt = (i: number) => {
    const m = MOVES.findIndex((move, k) => move.to === i && k >= 2)
    return m < 0 ? Infinity : POUR_START + m * POUR_FRAMES + POURED
  }

  const result = pop(frame, RESULT_AT, fps, 170)
  const dim = interpolate(frame, [RESULT_AT - 4, RESULT_AT + 6], [0, 0.42], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <Frame>
      <Ground />
      {hud()}
      <Pop at={10} x={width / 2} y={portrait ? 330 : 190}>
        <Pill size={portrait ? 50 : 42} dark>
          {COPY.play.caption}
        </Pill>
      </Pop>

      <svg width={width} height={height} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <g transform={`translate(${boardX} ${rim}) scale(${s})`}>
          {START.map((_, i) =>
            moving?.i === i ? null : (
              <g key={i} transform={`translate(${restingX(i)} 0)`}>
                <BottleArt liquid={liquid[i]} done={frame >= doneAt(i) ? pop(frame, doneAt(i), fps) : 0} />
              </g>
            ),
          )}
          {stream && <Stream {...stream} flow={frame / 10} />}
          {moving && (
            <g transform={`translate(${moving.x} ${moving.y}) rotate(${moving.tilt})`}>
              <BottleArt liquid={liquid[moving.i]} tilt={moving.tilt} />
            </g>
          )}
          <Hand frame={frame} />
        </g>
      </svg>

      {portrait && tools()}

      <AbsoluteFill style={{ backgroundColor: PLUM, opacity: dim }} />
      {frame >= RESULT_AT && (
        <div style={{ position: 'absolute', left: width / 2, top: height / 2, transform: `translate(-50%, -50%) scale(${result})` }}>
          <Sticker face={PAPER} radius={60} border={8} shadow={14} style={{ position: 'relative', width: portrait ? 720 : 640, padding: portrait ? '150px 0 60px' : '130px 0 50px', textAlign: 'center' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, transform: 'translate(-50%, -55%)' }}>
              <StrokeText size={portrait ? 170 : 150} color={FACE.butter}>
                {COPY.play.win}
              </StrokeText>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 10, direction: 'ltr' }}>
              {[0, 1, 2].map((k) => {
                const at = RESULT_AT + 7 + k * 6
                const sk = pop(frame, at, fps, 240)
                const size = k === 1 ? 190 : 150
                return (
                  <div key={k} style={{ position: 'relative', width: size, height: size, marginBottom: k === 1 ? 40 : 0 }}>
                    <Star size={size} empty style={{ position: 'absolute', inset: 0 }} />
                    <Star size={size} style={{ position: 'absolute', inset: 0, transform: `scale(${sk}) rotate(${(1 - sk) * 40}deg)`, opacity: frame < at ? 0 : 1 }} />
                  </div>
                )
              })}
            </div>
            <div
              style={{
                marginTop: 34,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 18,
                fontSize: 84,
                fontWeight: 800,
                transform: `scale(${pop(frame, RESULT_AT + 26, fps)})`,
              }}
            >
              <span>+{fa(COPY.play.reward)}</span>
              <Coin size={84} />
            </div>
          </Sticker>
        </div>
      )}

      {MOVES.map((_, m) => {
        const start = POUR_START + m * POUR_FRAMES
        return [
          <Sfx key={`a${m}`} at={start} name="select" volume={0.6} rate={1 + m * 0.05} />,
          <Sfx key={`b${m}`} at={start + LIFTED} name="select_2" volume={0.45} />,
          <Sfx key={`c${m}`} at={start + OVER} name={POURS[m]} volume={0.55} />,
          m >= 2 ? <Sfx key={`d${m}`} at={start + POURED} name="complete" volume={0.5} /> : null,
        ]
      })}
      <Sfx at={RESULT_AT} name="win" volume={0.5} />
      <Sfx at={RESULT_AT + 7} name="star" volume={0.4} />
      <Sfx at={RESULT_AT + 13} name="star2" volume={0.4} />
      <Sfx at={RESULT_AT + 19} name="star3" volume={0.4} />
      <Sfx at={RESULT_AT + 26} name="coin" volume={0.45} />
    </Frame>
  )

  function hud() {
    const size = portrait ? 120 : 96
    const top = portrait ? 70 : 40
    return (
      <>
        <RoundButton name="home" size={size} face={FACE.sky} style={{ position: 'absolute', left: portrait ? 48 : 60, top }} />
        <div style={{ position: 'absolute', left: width / 2, top: top + size / 2, transform: 'translate(-50%, -50%)' }}>
          <Pill size={portrait ? 50 : 42} style={{ padding: portrait ? '14px 90px 18px' : '10px 70px 14px' }}>
            {COPY.play.stage}
          </Pill>
        </div>
        <div style={{ position: 'absolute', right: portrait ? 44 : 60, top: top + size / 2, transform: 'translateY(-50%)' }}>
          <Pill size={portrait ? 46 : 40} style={{ padding: portrait ? '10px 22px 14px' : '8px 18px 12px', gap: 14 }}>
            <Coin size={portrait ? 64 : 54} />
            <span>{fa(COPY.play.coins + (frame >= RESULT_AT + 26 ? COPY.play.reward : 0))}</span>
          </Pill>
        </div>
      </>
    )
  }

  function tools() {
    const names = ['addBottle', 'bulb', 'restart', 'undo'] as const
    return (
      <div style={{ position: 'absolute', left: 120, right: 120, top: 1660, display: 'flex', justifyContent: 'space-between', direction: 'ltr' }}>
        {names.map((name, i) => (
          <RoundButton key={name} name={name} size={128} face={FACE.sky} style={{ transform: `translateY(${bob(frame, i * 12, 4)}px)` }} />
        ))}
      </div>
    )
  }
}

/** The tutorial's hand, tapping the source and then the target of the first two moves. */
function Hand({ frame }: { frame: number }) {
  for (let m = 0; m < 2; m++) {
    const t = frame - (POUR_START + m * POUR_FRAMES)
    if (t < -10 || t > 14) continue
    const move = MOVES[m]
    const at = (i: number) => ({ x: i * STEP + BOTTLE_WIDTH / 2 + 10, y: 300 })
    const a = at(move.from)
    const b = at(move.to)
    const k = ease(t, 2, 5)
    const x = a.x + (b.x - a.x) * k
    const y = a.y + (b.y - a.y) * k + (1 - ease(t, -10, 8)) * 160
    const press = t >= -1 && t <= 2 ? 0.86 : t >= 7 && t <= 10 ? 0.86 : 1
    const opacity = Math.min(ease(t, -10, 6), 1 - ease(t, 10, 4))
    return <HandArt transform={`translate(${x} ${y}) scale(${2.8 * press})`} opacity={opacity} />
  }
  return null
}
