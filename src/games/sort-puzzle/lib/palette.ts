/** Liquid colors in the game's order (ArtCatalog.DefaultLiquidColors). */
const LIQUIDS = [
  '#FF3B47', // red
  '#2F7BFF', // blue
  '#3DDC4A', // green
  '#FFD83A', // yellow
  '#A45CFF', // purple
  '#FF8A1F', // orange
  '#22D3EE', // cyan
  '#FF5FB2', // pink
  '#9A5A2E', // brown
  '#B4F03C', // lime
]

export const liquidHex = (color: number) => LIQUIDS[color % LIQUIDS.length]

/** Mixes a hex color toward white (amount > 0) or black (amount < 0). */
export function shade(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16)
  const target = amount > 0 ? 255 : 0
  const t = Math.abs(amount)
  const mix = (c: number) => Math.round(c + (target - c) * t)
  const r = mix((n >> 16) & 255)
  const g = mix((n >> 8) & 255)
  const b = mix(n & 255)
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}
