/**
 * Sort Puzzle's installs story: when each scene starts, shared by the video (index.tsx) and its
 * music (scripts/make-music.ts) so the count lands on the drop and every cut on the beat. Plain
 * data, no imports: Node runs the music script on it directly.
 */

export const FPS = 30
export const BPM = 120
/** One beat at 120 BPM and 30 fps. */
export const BEAT = 15

/** Each cut is a one-beat wipe; the next scene starts while the last one is still on screen. */
export const TRANSITION = BEAT

export type SceneId = 'count' | 'stores' | 'end'

/** The scenes in order, with their lengths in frames (each includes the wipe that brings it in). */
export const SCENES: { id: SceneId; frames: number }[] = [
  { id: 'count', frames: 10 * BEAT },
  { id: 'stores', frames: 8 * BEAT },
  { id: 'end', frames: 14 * BEAT },
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

/** The whole story: 450 frames, 15 s, one Instagram story. */
export const DURATION = SCENES.reduce((sum, scene) => sum + scene.frames, 0) - (SCENES.length - 1) * TRANSITION

/** In the count scene: the counter lands on its number, with the drop. */
export const LAND = 4 * BEAT
