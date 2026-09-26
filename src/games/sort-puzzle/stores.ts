import type { Store } from '../types'

/** Store links and the APK. The package name is the game's (Player Settings, and the release APK). */
const PACKAGE_NAME = 'com.sortpuzzle.game'

export const MIN_ANDROID = 8

export const STORES: Store[] = [
  {
    id: 'bazaar',
    caption: { fa: 'دریافت از', en: 'Get it on' },
    name: { fa: 'کافه‌بازار', en: 'Cafe Bazaar' },
    href: `https://cafebazaar.ir/app/${PACKAGE_NAME}`,
    badge: { fa: { src: '/cafebazaar-logo-badge.png', width: 421, height: 125 } },
  },
  // In-app purchases use Bazaar's Poolakey SDK, so Myket needs its own billing before it goes live.
  {
    id: 'myket',
    caption: { fa: 'دریافت از', en: 'Get it on' },
    name: { fa: 'مایکت', en: 'Myket' },
    href: `https://myket.ir/app/${PACKAGE_NAME}`,
    badge: { fa: { src: '/myket-logo-badge.png', width: 966, height: 287 } },
    comingSoon: true,
  },
  // Put the signed release APK at public/downloads/sort-puzzle.apk.
  {
    id: 'apk',
    caption: { fa: 'دانلود مستقیم', en: 'Direct download' },
    name: { fa: 'فایل APK', en: 'APK file' },
    href: '/downloads/sort-puzzle.apk',
  },
]

export const BAZAAR = STORES[0]
export const APK = STORES[2]
