import type { LucideIcon } from 'lucide-react'
import type { Tone } from '../data/content'
import { cn } from '../lib/cn'

interface GameIconProps {
  icon: LucideIcon
  tone?: Tone
  size?: number
  className?: string
}

/** A glossy round badge with a white, chocolate-outlined glyph, like the game's HUD buttons. */
export function GameIcon({ icon: Icon, tone = 'aqua', size = 56, className }: GameIconProps) {
  return (
    <span
      className={cn('icon-3d', `tone-${tone}`, className)}
      style={{ width: size, height: size, fontSize: size / 4 }}
      aria-hidden="true"
    >
      <Icon strokeWidth={6.5} />
      <Icon strokeWidth={3.2} />
    </span>
  )
}
