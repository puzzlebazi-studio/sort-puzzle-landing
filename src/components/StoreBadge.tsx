import type { CSSProperties } from 'react'
import type { Store } from '../data/site'
import { cn } from '../lib/cn'

interface StoreBadgeProps {
  store: Store
  /** Badge height; every badge has the same proportions, so they line up side by side. */
  height?: string
  className?: string
}

/** The store's official "دریافت از" badge, lifting like the page's buttons. Renders nothing for a store without one. */
export function StoreBadge({ store, height, className }: StoreBadgeProps) {
  const { badge } = store
  if (!badge) return null
  const label = `${store.caption} ${store.name}`
  const style = height ? ({ '--badge-h': height } as CSSProperties) : undefined
  const image = (
    <img
      src={badge.src}
      width={badge.width}
      height={badge.height}
      alt={store.comingSoon ? `${label} (به‌زودی)` : label}
      className="store-badge__img"
      draggable={false}
    />
  )

  if (store.comingSoon) {
    return (
      <span className={cn('store-badge store-badge--soon', className)} style={style} title={`${store.name} به‌زودی`}>
        {image}
        <span className="store-badge__soon" aria-hidden="true">
          به‌زودی
        </span>
      </span>
    )
  }
  return (
    <a href={store.href} target="_blank" rel="noopener noreferrer" className={cn('store-badge', className)} style={style}>
      {image}
    </a>
  )
}
