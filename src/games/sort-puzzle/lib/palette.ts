/** The plum that outlines and shades every piece of the game's flat art. */
export const PLUM = '#2E2545'
export const PAPER = '#FFFBF3'
export const GLASS = '#F4F0FF'

/** Liquid colors in the campaign's order (art direction 2.0: "Liquids 0–9"). */
const LIQUIDS = [
  '#FF6F78', // coral
  '#6FA8F5', // blue
  '#6FD69A', // mint
  '#FFD45E', // butter
  '#B08BF2', // lavender
  '#FFA35C', // peach
  '#6FD8E6', // aqua
  '#FF92C8', // pink
  '#6673CC', // indigo
  '#C2E067', // lime
]

export const LIQUID_COUNT = LIQUIDS.length

export const liquidHex = (color: number) => LIQUIDS[((color % LIQUIDS.length) + LIQUIDS.length) % LIQUIDS.length]

/** Hidden layers: gray with a plum «؟» until they come to the top. */
export const HIDDEN = '#B8B0C8'
export const STONE = '#9E96B0'

/** Mixes two hex colors; `amount` is how much of `b` goes in. */
export function mixHex(a: string, b: string, amount: number): string {
  const pa = parseInt(a.slice(1), 16)
  const pb = parseInt(b.slice(1), 16)
  const channel = (shift: number) => {
    const x = (pa >> shift) & 255
    const y = (pb >> shift) & 255
    return Math.round(x + (y - x) * amount)
  }
  return `#${((1 << 24) | (channel(16) << 16) | (channel(8) << 8) | channel(0)).toString(16).slice(1)}`
}
