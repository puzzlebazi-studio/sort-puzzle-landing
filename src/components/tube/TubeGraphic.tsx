import type { ReactNode } from 'react'
import { toPath, type LiquidBand, type TubeShape } from '../../lib/liquid'
import { liquidHex, shade } from '../../lib/palette'
import { tubePaths } from './shapes'

export interface CorkState {
  /** Vertical offset while the cork drops in; 0 once seated. */
  offset: number
  opacity: number
}

interface TubeGraphicProps {
  shape: TubeShape
  bands: LiquidBand[]
  cork?: CorkState | null
  /** A soft colored halo, for the selected bottle or a hint. */
  glow?: string | null
  /** Clip applied to the liquid layer, e.g. to reveal it from the bottom. */
  liquidClip?: string
  /** Drawn inside the liquid layer, e.g. bubbles. */
  children?: ReactNode
}

const CHOCO = '#3A1500'

/** One bottle in its local frame: the mouth's left corner at (0, 0), the bottom at y = height. */
export function TubeGraphic({ shape, bands, cork, glow, liquidClip, children }: TubeGraphicProps) {
  const { width: w, height: h } = shape
  const { interior, outline } = tubePaths(shape)
  const top = bands[bands.length - 1]

  return (
    <g>
      {glow && <path d={interior} fill="none" stroke={glow} strokeWidth={14} strokeLinejoin="round" opacity={0.9} filter="url(#sp-glow)" />}
      <path d={interior} fill="url(#sp-glass)" />
      <g clipPath={liquidClip}>
        {bands.map((band, i) => (
          <path key={i} d={toPath(band.points)} fill={liquidHex(band.color)} />
        ))}
        {top?.surface && (
          <line
            x1={top.surface[0].x}
            y1={top.surface[0].y}
            x2={top.surface[1].x}
            y2={top.surface[1].y}
            stroke={shade(liquidHex(top.color), 0.45)}
            strokeWidth={3.5}
            strokeLinecap="round"
          />
        )}
        {children}
      </g>
      <path d={interior} fill="url(#sp-glass-shade)" />
      <rect x={w * 0.14} y={h * 0.1} width={w * 0.11} height={h * 0.7} rx={w * 0.055} fill="#fff" opacity={0.45} />
      <rect x={w * 0.73} y={h * 0.13} width={w * 0.07} height={h * 0.26} rx={w * 0.035} fill="#fff" opacity={0.3} />
      <path d={outline} fill="none" stroke={CHOCO} strokeWidth={4.5} strokeLinejoin="round" strokeLinecap="round" />
      {cork && <Cork width={w} state={cork} />}
      <rect x={-7} y={-6.5} width={w + 14} height={12} rx={6} fill="url(#sp-rim)" stroke={CHOCO} strokeWidth={3.5} />
      <rect x={-1} y={-4} width={w * 0.45} height={3} rx={1.5} fill="#fff" opacity={0.85} />
    </g>
  )
}

function Cork({ width: w, state }: { width: number; state: CorkState }) {
  const cw = w * 0.76
  const ch = w * 0.5
  const x = (w - cw) / 2
  return (
    <g transform={`translate(0 ${state.offset})`} opacity={state.opacity}>
      <rect x={x} y={-ch - 3} width={cw} height={ch + 9} rx={w * 0.13} fill="url(#sp-cork)" stroke={CHOCO} strokeWidth={3.5} />
      <rect x={x + 5} y={-ch + 0.5} width={cw - 10} height={4} rx={2} fill="#fff" opacity={0.45} />
      <g fill="#a76b36" opacity={0.75}>
        <circle cx={x + cw * 0.28} cy={-ch * 0.45} r={1.8} />
        <circle cx={x + cw * 0.62} cy={-ch * 0.62} r={1.4} />
        <circle cx={x + cw * 0.74} cy={-ch * 0.3} r={1.9} />
        <circle cx={x + cw * 0.45} cy={-ch * 0.22} r={1.3} />
      </g>
    </g>
  )
}
