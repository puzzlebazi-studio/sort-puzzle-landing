import type { TransitionPresentation, TransitionPresentationComponentProps } from '@remotion/transitions'
import { AbsoluteFill } from 'remotion'
import { PAPER, PLUM } from './palette'

type WipeProps = { width: number; height: number; ring: number }

/** The next scene opens in a growing circle edged with a cream and plum ring, like a sticker. */
function CircleWipe({ children, presentationDirection, presentationProgress, passedProps }: TransitionPresentationComponentProps<WipeProps>) {
  if (presentationDirection === 'exiting') return <AbsoluteFill>{children}</AbsoluteFill>
  const { width, height, ring } = passedProps
  const r = (Math.hypot(width, height) / 2 + ring * 2) * presentationProgress
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `circle(${r}px at 50% 50%)` }}>{children}</AbsoluteFill>
      <svg width={width} height={height} style={{ position: 'absolute', inset: 0 }}>
        <circle cx={width / 2} cy={height / 2} r={r + ring * 0.5} fill="none" stroke={PLUM} strokeWidth={ring * 2} />
        <circle cx={width / 2} cy={height / 2} r={r + ring * 0.55} fill="none" stroke={PAPER} strokeWidth={ring * 0.7} />
      </svg>
    </AbsoluteFill>
  )
}

export const circleWipe = (props: WipeProps): TransitionPresentation<WipeProps> => ({ component: CircleWipe, props })
