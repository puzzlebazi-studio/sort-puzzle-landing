import type { ElementType, ReactNode } from 'react'

interface Title3DProps {
  children: ReactNode
  as?: ElementType
  tone?: 'gold' | 'white' | 'cream'
  className?: string
}

/** Gold, extruded lettering, as on puzzlebazi.studio (its src/components/Title3D.tsx). */
export function Title3D({ children, as: Tag = 'h2', tone = 'gold', className = '' }: Title3DProps) {
  return (
    <Tag className={`title-3d ${tone !== 'gold' ? `title-3d--${tone}` : ''} ${className}`}>
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
