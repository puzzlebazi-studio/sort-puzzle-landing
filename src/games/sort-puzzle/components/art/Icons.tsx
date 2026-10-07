import type { SVGProps } from 'react'

interface IconProps extends SVGProps<SVGSVGElement> {
  strokeWidth?: number
}

/**
 * btn_round_bottle's icon: a bottle with a plus, the extra bottle. Lucide has no match, so it is
 * drawn in lucide's shape: 24 × 24, round caps, the stroke set by the caller.
 */
export function AddBottle({ strokeWidth = 2.4, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M7.5 3h5M8.5 3v4.5L5.5 11v8.5A1.5 1.5 0 0 0 7 21h6a1.5 1.5 0 0 0 1.5-1.5V11l-3-3.5V3" />
      <path d="M19 3.5v6M16 6.5h6" />
    </svg>
  )
}
