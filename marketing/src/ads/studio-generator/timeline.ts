/**
 * The studio's generator reel: when each scene starts, shared by the video (index.tsx) and its
 * music (scripts/make-music.ts) so every cut and every stamp lands on the beat. Plain data, no
 * imports: Node runs the music script on it directly.
 */

export const FPS = 30
export const BPM = 120
/** One beat at 120 BPM and 30 fps. */
export const BEAT = 15

/** Each cut is a one-beat wipe; the next scene starts while the last one is still on screen. */
export const TRANSITION = BEAT

export type SceneId = 'hook' | 'filter' | 'sorted' | 'range' | 'duplicate' | 'funnel' | 'end'

/** The scenes in order, one per line of the script, with their lengths in frames (each includes the wipe that brings it in). */
export const SCENES: { id: SceneId; frames: number }[] = [
  { id: 'hook', frames: 7 * BEAT },
  { id: 'filter', frames: 11 * BEAT },
  { id: 'sorted', frames: 6 * BEAT },
  { id: 'range', frames: 6 * BEAT },
  { id: 'duplicate', frames: 6 * BEAT },
  { id: 'funnel', frames: 6 * BEAT },
  { id: 'end', frames: 9 * BEAT },
]

/** The frame each scene starts on: the start of the wipe that brings it in. */
export const SCENE_STARTS: Record<SceneId, number> = (() => {
  const starts = {} as Record<SceneId, number>
  let at = 0
  SCENES.forEach((scene, i) => {
    starts[scene.id] = at
    at += scene.frames - (i < SCENES.length - 1 ? TRANSITION : 0)
  })
  return starts
})()

/** The whole reel: 675 frames, 22.5 s. */
export const DURATION = SCENES.reduce((sum, scene) => sum + scene.frames, 0) - (SCENES.length - 1) * TRANSITION

/** In the filter scene: the cut to the one layout that stayed. */
export const SURVIVOR_AT = 6 * BEAT
/** In the sorted, range and duplicate scenes: when the stamp lands. */
export const STAMP_AT = 3 * BEAT
