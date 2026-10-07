import { Easing, interpolate, spring } from 'remotion'

/** A springy pop from 0 to 1 starting at `start`, overshooting a little like the game's popups. */
export function pop(frame: number, start: number, fps: number, stiffness = 180) {
  return spring({ frame: frame - start, fps, config: { damping: 11, stiffness, mass: 0.6 } })
}

/** 0 → 1 over [start, start + length], eased. */
export function ease(frame: number, start: number, length: number, easing = Easing.inOut(Easing.cubic)) {
  return interpolate(frame, [start, start + length], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing })
}

/** A bottle dropping in from above and settling with a bounce. */
export function drop(frame: number, start: number, fps: number, height: number) {
  const s = spring({ frame: frame - start, fps, config: { damping: 9, stiffness: 160, mass: 0.7 } })
  return { y: (1 - s) * -height, opacity: frame >= start ? 1 : 0 }
}

/** A gentle idle bob, in px. */
export const bob = (frame: number, phase = 0, amount = 8, period = 50) => Math.sin(((frame + phase) / period) * Math.PI * 2) * amount
