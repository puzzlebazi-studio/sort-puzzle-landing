import type { Store } from '../types'

/** The stores that offer the game; there is no direct APK download. The package name is the game's (Player Settings). */
const PACKAGE_NAME = 'com.sortpuzzle.game'

export const MIN_ANDROID = 8

export const STORES: Store[] = [
  {
    id: 'bazaar',
    caption: { fa: 'دریافت از', en: 'Get it on' },
    name: { fa: 'کافه‌بازار', en: 'Cafe Bazaar' },
    href: `https://cafebazaar.ir/app/${PACKAGE_NAME}`,
    badge: {
      fa: { src: '/cafebazaar-logo-badge-fa.png', width: 421, height: 125 },
      en: { src: '/cafebazaar-logo-badge-en.png', width: 421, height: 125 },
    },
  },
  {
    id: 'myket',
    caption: { fa: 'دریافت از', en: 'Get it on' },
    name: { fa: 'مایکت', en: 'Myket' },
    href: `https://myket.ir/app/${PACKAGE_NAME}`,
    badge: {
      fa: { src: '/myket-logo-badge-fa.png', width: 966, height: 287 },
      en: { src: '/myket-logo-badge-en.png', width: 966, height: 287 },
    },
  },
]

export const BAZAAR = STORES[0]
