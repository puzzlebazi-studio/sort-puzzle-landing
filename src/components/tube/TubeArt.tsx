import { useId, useMemo, type CSSProperties } from 'react'
import { cn } from '../../lib/cn'
import { liquidBands, toLayers, toPath, type TubeShape } from '../../lib/liquid'
import { BOTTLE } from './shapes'
import { TubeGraphic } from './TubeGraphic'

interface TubeArtProps {
  /** Colors from bottom to top, one entry per unit. */
  colors: readonly number[]
  shape?: TubeShape
  cork?: boolean
  /** Reserve the cork's space even without one, so neighbours line up. */
  corkSpace?: boolean
  bubbles?: boolean
  /** When set, the liquid rises into place once it turns true. */
  filled?: boolean
  fillDelay?: number
  className?: string
  style?: CSSProperties
  label?: string
}

const BUBBLES = [
  { x: 0.3, r: 3.2, dur: 3.4, delay: 0 },
  { x: 0.62, r: 2.2, dur: 2.7, delay: 1.1 },
  { x: 0.45, r: 2.6, dur: 3.9, delay: 2 },
  { x: 0.72, r: 1.8, dur: 3.1, delay: 0.6 },
]

/** A standalone, upright bottle for decoration. */
export function TubeArt({ colors, shape = BOTTLE, cork, corkSpace, bubbles, filled, fillDelay = 0, className, style, label }: TubeArtProps) {
  const id = useId().replace(/:/g, '')
  const bands = useMemo(() => liquidBands(shape, 0, toLayers(colors)), [shape, colors])
  const { width: w, height: h } = shape
  const top = cork || corkSpace ? w * 0.5 + 12 : 12
  const surfaceY = h - colors.length * shape.unit
  const reveal = filled !== undefined

  return (
    <svg
      viewBox={`-10 ${-top} ${w + 20} ${h + top + 8}`}
      className={cn('overflow-visible', className)}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        {bubbles && (
          <clipPath id={`liquid-${id}`}>
            {bands.map((band, i) => (
              <path key={i} d={toPath(band.points)} />
            ))}
          </clipPath>
        )}
        {reveal && (
          <clipPath id={`fill-${id}`}>
            <rect
              x={-10}
              y={-10}
              width={w + 20}
              height={h + 20}
              style={{
                transform: filled ? 'translateY(0)' : `translateY(${h + 20}px)`,
                transition: `transform 1.4s cubic-bezier(.3,.9,.3,1) ${fillDelay}ms`,
              }}
            />
          </clipPath>
        )}
      </defs>
      <TubeGraphic
        shape={shape}
        bands={bands}
        cork={cork ? { offset: 0, opacity: 1 } : null}
        liquidClip={reveal ? `url(#fill-${id})` : undefined}
      >
        {bubbles && colors.length > 0 && (
          <g clipPath={`url(#liquid-${id})`}>
            {BUBBLES.map((b, i) => (
              <circle
                key={i}
                className="bubble"
                cx={w * b.x}
                cy={h - 8}
                r={b.r}
                fill="url(#sp-bubble)"
                style={{ '--dur': `${b.dur}s`, '--delay': `${b.delay}s`, '--rise': `${surfaceY - h + 14}px` } as CSSProperties}
              />
            ))}
          </g>
        )}
      </TubeGraphic>
    </svg>
  )
}
