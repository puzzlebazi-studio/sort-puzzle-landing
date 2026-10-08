import { Audio } from '@remotion/media'
import { linearTiming, TransitionSeries } from '@remotion/transitions'
import { Fragment, type ComponentType } from 'react'
import { AbsoluteFill, Easing, interpolate, staticFile, useVideoConfig } from 'remotion'
import { circleWipe } from '../../brand/wipe'
import { Challenges } from './scenes/Challenges'
import { Cta, STORES, type Store } from './scenes/Cta'
import { Designs } from './scenes/Designs'
import { Hook } from './scenes/Hook'
import { Play } from './scenes/Play'
import { Rewards } from './scenes/Rewards'
import { Stages } from './scenes/Stages'
import { DURATION, SCENES, TRANSITION, type SceneId } from './timeline'

export { DURATION, FPS } from './timeline'

const SCENE: Record<SceneId, ComponentType<{ stores: Store[] }>> = {
  hook: Hook,
  play: Play,
  stages: Stages,
  challenges: Challenges,
  designs: Designs,
  rewards: Rewards,
  cta: Cta,
}

/**
 * Sort Puzzle's launch ad, 28.5 s: the hook, the core loop, depth (stages, challenges), collecting
 * (designs, rewards) and the call to action. Every layout adapts to the frame, so the same
 * composition renders 16:9 and 9:16. `stores` picks the end card's badges (both by default).
 */
export function SortPuzzleLaunch({ stores = STORES }: { stores?: Store[] }) {
  const { width, height } = useVideoConfig()
  const ring = Math.min(width, height) * 0.012
  return (
    <AbsoluteFill style={{ backgroundColor: '#E8E0FA' }}>
      <TransitionSeries>
        {SCENES.map((scene, i) => {
          const Scene = SCENE[scene.id]
          return (
            <Fragment key={scene.id}>
              {i > 0 && (
                <TransitionSeries.Transition
                  presentation={circleWipe({ width, height, ring })}
                  timing={linearTiming({ durationInFrames: TRANSITION, easing: Easing.inOut(Easing.cubic) })}
                />
              )}
              <TransitionSeries.Sequence durationInFrames={scene.frames} name={scene.id}>
                <Scene stores={stores} />
              </TransitionSeries.Sequence>
            </Fragment>
          )
        })}
      </TransitionSeries>
      {/* The music runs under the whole ad (scripts/make-music.ts writes it to this timeline). */}
      <Audio
        src={staticFile('music/sort-puzzle-launch.wav')}
        volume={(f) => 0.62 * interpolate(f, [0, 3, DURATION - 12, DURATION], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
      />
    </AbsoluteFill>
  )
}
