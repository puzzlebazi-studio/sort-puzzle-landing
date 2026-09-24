import { Download, ShoppingBag, Store as StoreIcon, type LucideIcon } from 'lucide-react'
import type { Tone } from '../data/content'
import type { Store, StoreId } from '../data/site'
import { cn } from '../lib/cn'

const LOOK: Record<StoreId, { icon: LucideIcon; tone: Tone }> = {
  bazaar: { icon: ShoppingBag, tone: 'leaf' },
  myket: { icon: StoreIcon, tone: 'sky' },
  apk: { icon: Download, tone: 'orange' },
}

interface StoreButtonProps {
  store: Store
  size?: 'md' | 'lg'
  className?: string
}

/** A chunky store badge: icon, "دریافت از" caption and the store name. */
export function StoreButton({ store, size = 'md', className }: StoreButtonProps) {
  const { icon: Icon, tone } = LOOK[store.id]
  const classes = cn('store-btn', size === 'lg' && 'store-btn--lg', store.comingSoon && 'store-btn--soon', className)
  const body = (
    <>
      <span className={cn('icon-3d store-btn__icon', `tone-${tone}`)} aria-hidden="true">
        <Icon strokeWidth={6} />
        <Icon strokeWidth={3} />
      </span>
      <span className="flex flex-col items-start">
        <span className="store-btn__caption">{store.caption}</span>
        <span className="store-btn__name">{store.name}</span>
      </span>
      {store.comingSoon && <span className="store-btn__soon">به‌زودی</span>}
    </>
  )

  if (store.comingSoon) {
    return (
      <span className={classes} aria-disabled="true" title={`${store.name} به‌زودی`}>
        {body}
      </span>
    )
  }
  const external = store.href.startsWith('http')
  return (
    <a
      href={store.href}
      className={classes}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : { download: '' })}
    >
      {body}
    </a>
  )
}
