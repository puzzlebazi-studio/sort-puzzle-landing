/**
 * Sort Puzzle's launch ad: when each scene starts, shared by the video (index.tsx) and its music
 * (scripts/make-music.ts) so every cut lands on the beat. Plain data, no imports: Node runs the
 * music script on it directly.
 */

export const FPS = 30
export const BPM = 120
/** One beat at 120 BPM and 30 fps. */
export const BEAT = 15

/** Each cut is a one-beat wipe; the next scene starts while the last one is still on screen. */
export const TRANSITION = BEAT

export type SceneId = 'hook' | 'play' | 'stages' | 'challenges' | 'designs' | 'rewards' | 'cta'

/** The scenes in order, with their lengths in frames (each includes the wipe that brings it in). */
export const SCENES: { id: SceneId; frames: number }[] = [
  { id: 'hook', frames: 7 * BEAT },
  { id: 'play', frames: 15 * BEAT },
  { id: 'stages', frames: 7 * BEAT },
  { id: 'challenges', frames: 9 * BEAT },
  { id: 'designs', frames: 7 * BEAT },
  { id: 'rewards', frames: 7 * BEAT },
  { id: 'cta', frames: 11 * BEAT },
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

/** The whole ad: 855 frames, 28.5 s. */
export const DURATION = SCENES.reduce((sum, scene) => sum + scene.frames, 0) - (SCENES.length - 1) * TRANSITION

/** In the play scene: when each of the four pours starts, and how long one takes. */
export const POUR_START = BEAT
export const POUR_FRAMES = 36
/** The result card, after the last pour. */
export const RESULT_AT = POUR_START + 4 * POUR_FRAMES + 6
