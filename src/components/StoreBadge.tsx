import type { CSSProperties } from 'react'
import type { Store } from '../games/types'
import { UI } from '../i18n/ui'
import { useLocale } from '../i18n/useLocale'
import { cn } from '../lib/cn'

interface StoreBadgeProps {
  store: Store
  /** Badge height; every badge has the same proportions, so they line up side by side. */
  height?: string
  className?: string
}

/** The store's official "get it on" badge, lifting like the page's buttons. Renders nothing for a store without one. */
export function StoreBadge({ store, height, className }: StoreBadgeProps) {
  const locale = useLocale()
  const badge = store.badge?.[locale] ?? store.badge?.fa
  if (!badge) return null
  const label = `${store.caption[locale]} ${store.name[locale]}`
  const soon = UI[locale].soon
  const style = height ? ({ '--badge-h': height } as CSSProperties) : undefined
  const image = (
    <img
      src={badge.src}
      width={badge.width}
      height={badge.height}
      alt={store.comingSoon ? `${label} (${soon})` : label}
      className="store-badge__img"
      draggable={false}
    />
  )

  if (store.comingSoon) {
    return (
      <span className={cn('store-badge store-badge--soon', className)} style={style} title={`${store.name[locale]}: ${soon}`}>
        {image}
        <span className="store-badge__soon" aria-hidden="true">
          {soon}
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
