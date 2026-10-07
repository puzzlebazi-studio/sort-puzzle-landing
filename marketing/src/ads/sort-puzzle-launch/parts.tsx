import { Audio } from '@remotion/media'
import type { CSSProperties, ReactNode } from 'react'
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'
import { pop } from '../../brand/motion'
import { FONT, StrokeText } from '../../brand/ui'

export type SfxName =
  | 'tap'
  | 'select'
  | 'select_2'
  | 'select_3'
  | 'pour'
  | 'pour_2'
  | 'pour_3'
  | 'complete'
  | 'win'
  | 'coin'
  | 'star'
  | 'star2'
  | 'star3'
  | 'reward'
  | 'achievement'
  | 'reveal'
  | 'unlock'
  | 'bottle'

/** One of the game's own sound effects (public/sfx, from Assets/SortFactory/Audio), on a frame of its scene. */
export function Sfx({ at, name, volume = 0.5, rate = 1 }: { at: number; name: SfxName; volume?: number; rate?: number }) {
  return (
    <Sequence from={Math.round(at)} layout="none" name={`sfx ${name}`}>
      <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} playbackRate={rate} />
    </Sequence>
  )
}

/** A scene's frame: right to left, in Lahzeh. */
export function Frame({ children }: { children: ReactNode }) {
  return <AbsoluteFill style={{ direction: 'rtl', fontFamily: FONT, overflow: 'hidden' }}>{children}</AbsoluteFill>
}

/** Pops its children in with a spring at `at`, centered on (x, y). */
export function Pop({
  at,
  x,
  y,
  children,
  rotate = 0,
  stiffness,
  style,
}: {
  at: number
  x: number
  y: number
  children: ReactNode
  rotate?: number
  stiffness?: number
  style?: CSSProperties
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = pop(frame, at, fps, stiffness)
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${s}) rotate(${(1 - s) * -12 + rotate}deg)`,
        opacity: frame < at ? 0 : 1,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/** A banner title: lines of stroked type stacked and centered, each popping in a little after the last. */
export function TitleStack({
  lines,
  size,
  at,
  center,
}: {
  lines: { text: string; color: string; size?: number }[]
  size: number
  at: number
  /** The block's center, in px. */
  center: { x: number; y: number }
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  return (
    <div
      style={{
        position: 'absolute',
        left: center.x,
        top: center.y,
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {lines.map((line, i) => {
        const s = pop(frame, at + i * 5, fps, 200)
        return (
          <div key={line.text} style={{ transform: `scale(${s})`, opacity: frame < at + i * 5 ? 0 : 1 }}>
            <StrokeText size={line.size ?? size} color={line.color}>
              {line.text}
            </StrokeText>
          </div>
        )
      })}
    </div>
  )
}
