import { createTubeShape, pourAngle, type TubeShape } from '../../lib/liquid'

/** Sizes follow the game's 1080×1920 bottle sprite: one unit of liquid is 92 px tall. */
export const UNIT = 92
export const HEADROOM = 40
export const INNER_WIDTH = 136
/** Room kept above the rim for a bomb, a padlock or the filled bottle's burst, as in the game. */
export const BOTTLE_TOP = 70
export const BOTTLE_WIDTH = 170

const shapes = new Map<number, TubeShape>()
export function shapeFor(capacity: number) {
  let shape = shapes.get(capacity)
  if (!shape) {
    shape = createTubeShape(INNER_WIDTH, HEADROOM + capacity * UNIT, INNER_WIDTH / 2, capacity, HEADROOM)
    shapes.set(capacity, shape)
  }
  return shape
}

/** The body's height under the rim, and the whole bottle's below its headroom. */
export const bodyHeight = (capacity: number) => 47 + capacity * UNIT
export const bottleHeight = (capacity: number) => BOTTLE_TOP + 22 + bodyHeight(capacity)

/** The tilt, in degrees, at which `units` of liquid just reach the mouth's lip. */
export const pourTilt = (capacity: number, units: number) => (pourAngle(shapeFor(capacity), units) * 180) / Math.PI

/** The mouth's lip the liquid leaves from when the bottle tilts clockwise, in its own frame. */
const LIP = { x: 160, y: 12 }

/**
 * Places a bottle tilted clockwise by `tilt` degrees so its lip lands on `lip`: the transform for
 * its group, which draws a pour's stream from there.
 */
export function tiltedAt(tilt: number, lip: { x: number; y: number }) {
  const a = (tilt * Math.PI) / 180
  const x = lip.x - (LIP.x * Math.cos(a) - LIP.y * Math.sin(a))
  const y = lip.y - (LIP.x * Math.sin(a) + LIP.y * Math.cos(a))
  return `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${tilt.toFixed(2)})`
}
