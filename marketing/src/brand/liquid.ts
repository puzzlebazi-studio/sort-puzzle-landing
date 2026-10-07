// A copy of the site's src/games/sort-puzzle/lib/liquid.ts: this package stands on its own.
/**
 * Liquid that stays level while a tube tilts, like the game's SortFactory/Liquid shader.
 *
 * Everything is in the tube's local frame: x across the tube, y from the mouth (0) down to
 * the bottom (height). A tube tilted by `angle` radians (clockwise, mouth moving right) sees
 * gravity along g = (sin angle, cos angle), and its liquid is the part of the interior with
 * g · p >= c for the level c that encloses the liquid's area.
 */

export interface Vec {
  x: number
  y: number
}

export interface TubeShape {
  width: number
  height: number
  radius: number
  /** Height of one unit of liquid in an upright tube. */
  unit: number
  capacity: number
  /** Interior outline, convex, closed across the mouth. */
  polygon: Vec[]
  fullArea: number
}

export interface LiquidLayer {
  color: number
  /** Units of liquid; fractional while a pour is running. */
  amount: number
}

export interface LiquidBand {
  color: number
  points: Vec[]
  /** The free surface, only on the top band. */
  surface?: [Vec, Vec]
}

const ITERATIONS = 24
const HALF_PI = Math.PI / 2

export function createTubeShape(width: number, height: number, radius: number, capacity: number, headroom: number): TubeShape {
  const polygon: Vec[] = [
    { x: 0, y: 0 },
    { x: width, y: 0 },
  ]
  const steps = 10
  // Bottom-right then bottom-left corner arcs.
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * HALF_PI
    polygon.push({ x: width - radius + radius * Math.cos(a), y: height - radius + radius * Math.sin(a) })
  }
  for (let i = 0; i <= steps; i++) {
    const a = HALF_PI + (i / steps) * HALF_PI
    polygon.push({ x: radius + radius * Math.cos(a), y: height - radius + radius * Math.sin(a) })
  }
  return {
    width,
    height,
    radius,
    capacity,
    unit: (height - headroom) / capacity,
    polygon,
    fullArea: area(polygon),
  }
}

/** Sutherland–Hodgman against the half-plane nx·x + ny·y >= c. */
function clip(polygon: Vec[], nx: number, ny: number, c: number): Vec[] {
  const out: Vec[] = []
  const n = polygon.length
  for (let i = 0; i < n; i++) {
    const a = polygon[i]
    const b = polygon[(i + 1) % n]
    const da = nx * a.x + ny * a.y - c
    const db = nx * b.x + ny * b.y - c
    if (da >= 0) out.push(a)
    if ((da >= 0) !== (db >= 0)) {
      const t = da / (da - db)
      out.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t })
    }
  }
  return out
}

function area(polygon: Vec[]): number {
  let sum = 0
  for (let i = 0, n = polygon.length; i < n; i++) {
    const a = polygon[i]
    const b = polygon[(i + 1) % n]
    sum += a.x * b.y - b.x * a.y
  }
  return Math.abs(sum) / 2
}

/** Area of liquid that `units` units fill in the upright tube. */
export function unitsToArea(shape: TubeShape, units: number): number {
  if (units <= 0) return 0
  const level = shape.height - units * shape.unit
  if (level <= 0) return shape.fullArea
  return area(clip(shape.polygon, 0, 1, level))
}

function levelFor(shape: TubeShape, gx: number, gy: number, liquidArea: number): number {
  let lo = Infinity
  let hi = -Infinity
  for (const p of shape.polygon) {
    const d = gx * p.x + gy * p.y
    if (d < lo) lo = d
    if (d > hi) hi = d
  }
  if (liquidArea >= shape.fullArea) return lo
  if (liquidArea <= 0) return hi
  for (let i = 0; i < ITERATIONS; i++) {
    const mid = (lo + hi) / 2
    if (area(clip(shape.polygon, gx, gy, mid)) > liquidArea) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

/** The tilt (0..π/2) at which `units` of liquid just reaches the lip of the mouth. */
export function pourAngle(shape: TubeShape, units: number): number {
  const target = unitsToArea(shape, units)
  if (target >= shape.fullArea) return 0
  if (target <= 0) return HALF_PI
  let lo = 0
  let hi = HALF_PI
  for (let i = 0; i < ITERATIONS; i++) {
    const mid = (lo + hi) / 2
    const s = Math.sin(mid)
    const held = area(clip(shape.polygon, s, Math.cos(mid), shape.width * s))
    if (held > target) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

/** Polygons for each layer, bottom first, in the tube's local frame. */
export function liquidBands(shape: TubeShape, angle: number, layers: LiquidLayer[]): LiquidBand[] {
  const gx = Math.sin(angle)
  const gy = Math.cos(angle)
  const upright = Math.abs(angle) < 1e-4
  const bands: LiquidBand[] = []
  let units = 0
  let previous = Infinity

  for (const layer of layers) {
    if (layer.amount <= 1e-4) continue
    units += layer.amount
    const level = upright
      ? Math.max(0, shape.height - units * shape.unit)
      : levelFor(shape, gx, gy, unitsToArea(shape, units))
    let points = clip(shape.polygon, gx, gy, level)
    if (previous !== Infinity) points = clip(points, -gx, -gy, -previous)
    if (points.length >= 3) bands.push({ color: layer.color, points })
    previous = level
  }

  const top = bands[bands.length - 1]
  if (top && previous !== Infinity) {
    const onSurface = top.points.filter((p) => Math.abs(gx * p.x + gy * p.y - previous) < 1e-3)
    if (onSurface.length >= 2) top.surface = [onSurface[0], onSurface[onSurface.length - 1]]
  }
  return bands
}

export function toPath(points: Vec[]): string {
  let d = ''
  for (let i = 0; i < points.length; i++) d += `${i ? 'L' : 'M'}${points[i].x.toFixed(2)} ${points[i].y.toFixed(2)}`
  return d + 'Z'
}

/** Groups a tube's colors into runs for rendering. */
export function toLayers(tube: readonly number[]): LiquidLayer[] {
  const layers: LiquidLayer[] = []
  for (const color of tube) {
    const last = layers[layers.length - 1]
    if (last && last.color === color) last.amount++
    else layers.push({ color, amount: 1 })
  }
  return layers
}
