import { Audio } from '@remotion/media'
import { linearTiming, TransitionSeries } from '@remotion/transitions'
import { Fragment, type ComponentType } from 'react'
import { AbsoluteFill, Easing, interpolate, staticFile, useVideoConfig } from 'remotion'
import { circleWipe } from '../../brand/wipe'
import { End } from './scenes/End'
import { Filter } from './scenes/Filter'
import { Funnel } from './scenes/Funnel'
import { Hook } from './scenes/Hook'
import { Duplicate, Range, Sorted } from './scenes/Reject'
import { DURATION, SCENES, TRANSITION, type SceneId } from './timeline'

export { DURATION, FPS } from './timeline'

const SCENE: Record<SceneId, ComponentType> = {
  hook: Hook,
  filter: Filter,
  sorted: Sorted,
  range: Range,
  duplicate: Duplicate,
  funnel: Funnel,
  end: End,
}

/**
 * The studio's generator reel for Instagram, 22.5 s at 1080 × 1920: about 450,000 random layouts
 * in, one in 450 kept, the three reasons the rest go, and the game they became. One scene per line
 * of the approved script (Persian, no voiceover: the script is burned in as captions).
 */
export function StudioGenerator() {
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
                <Scene />
              </TransitionSeries.Sequence>
            </Fragment>
          )
        })}
      </TransitionSeries>
      {/* The music runs under the whole reel (scripts/make-music.ts writes it to this timeline). */}
      <Audio
        src={staticFile('music/studio-generator.wav')}
        volume={(f) => 0.62 * interpolate(f, [0, 3, DURATION - 12, DURATION], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
      />
    </AbsoluteFill>
  )
}
