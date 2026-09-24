import type { ElementType, ReactNode } from 'react'
import { cn } from '../lib/cn'

interface Title3DProps {
  children: ReactNode
  as?: ElementType
  tone?: 'gold' | 'white' | 'cream' | 'red'
  className?: string
  id?: string
}

/** Gold, extruded lettering in the style of the game's logo and popup titles. */
export function Title3D({ children, as: Tag = 'h2', tone = 'gold', className, id }: Title3DProps) {
  return (
    <Tag id={id} className={cn('title-3d', tone !== 'gold' && `title-3d--${tone}`, className)}>
      <span className="title-3d__back" aria-hidden="true">
        {children}
      </span>
      <span className="title-3d__depth" aria-hidden="true">
        {children}
      </span>
      <span className="title-3d__face">
        <span className="title-3d__ink">{children}</span>
      </span>
    </Tag>
  )
}
