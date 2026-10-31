import { Audio } from '@remotion/media'
import { linearTiming, TransitionSeries } from '@remotion/transitions'
import { Fragment, type ComponentType } from 'react'
import { AbsoluteFill, Easing, interpolate, staticFile, useVideoConfig } from 'remotion'
import { circleWipe } from '../../brand/wipe'
import { Count } from './scenes/Count'
import { End } from './scenes/End'
import { Stores } from './scenes/Stores'
import { DURATION, SCENES, TRANSITION, type SceneId } from './timeline'

export { DURATION, FPS } from './timeline'

const SCENE: Record<SceneId, ComponentType> = {
  count: Count,
  stores: Stores,
  end: End,
}

/**
 * Sort Puzzle's installs story for Instagram, 15 s at 1080 × 1920: the count of installs on Cafe
 * Bazaar and Myket racing up as the bottles fill, the two stores, and a thank-you to the players.
 * In Persian with no voiceover; everything sits inside the story's safe zone (`SAFE` in parts.tsx).
 */
export function SortPuzzleInstalls() {
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
      {/* The music runs under the whole story (scripts/make-music.ts writes it to this timeline). */}
      <Audio
        src={staticFile('music/sort-puzzle-installs.wav')}
        volume={(f) => 0.62 * interpolate(f, [0, 3, DURATION - 12, DURATION], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
      />
    </AbsoluteFill>
  )
}
