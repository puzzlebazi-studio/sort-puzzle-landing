import { createTubeShape, type TubeShape } from '../../lib/liquid'

/** Proportions follow the game's bottle sprite: a slim tube with wide bottom corners. */
export const BOTTLE = createTubeShape(56, 188, 20, 4, 12)

/** A taller bottle for charts that stack up to ten colors. */
export const TALL_BOTTLE = createTubeShape(56, 300, 20, 10, 10)

const pathCache = new WeakMap<TubeShape, { interior: string; outline: string }>()

/** The interior closed across the mouth, and the open outline that the rim caps. */
export function tubePaths(shape: TubeShape) {
  let paths = pathCache.get(shape)
  if (!paths) {
    const { width: w, height: h, radius: r } = shape
    const body = `M0 0V${h - r}A${r} ${r} 0 0 0 ${r} ${h}H${w - r}A${r} ${r} 0 0 0 ${w} ${h - r}V0`
    paths = { interior: `${body}Z`, outline: body }
    pathCache.set(shape, paths)
  }
  return paths
}
