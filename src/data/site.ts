/**
 * Everything you may want to change before publishing: store links, the APK, the studio.
 * The package name is the placeholder from the game's Player Settings; replace it
 * with the final one from the Cafe Bazaar developer panel.
 */
const PACKAGE_NAME = 'com.sortfactory.game'

export const SITE = {
  name: 'سورت پازل',
  tagline: 'رنگ‌ها را بریز، مرتب کن، ببر!',
  minAndroid: '۸',
}

export type StoreId = 'bazaar' | 'myket' | 'apk'

export interface BadgeImage {
  src: string
  width: number
  height: number
}

export interface Store {
  id: StoreId
  /** Read before the name, e.g. "دریافت از". */
  caption: string
  name: string
  href: string
  /** The store's official badge in public/, cropped to its edges so every badge lines up at one height. */
  badge?: BadgeImage
  /** Shown as "به‌زودی" and not clickable. */
  comingSoon?: boolean
}

export const STORES: Store[] = [
  {
    id: 'bazaar',
    caption: 'دریافت از',
    name: 'کافه‌بازار',
    href: `https://cafebazaar.ir/app/${PACKAGE_NAME}`,
    badge: { src: '/cafebazaar-logo-badge.png', width: 421, height: 125 },
  },
  // In-app purchases use Bazaar's Poolakey SDK, so Myket needs its own billing before it goes live.
  {
    id: 'myket',
    caption: 'دریافت از',
    name: 'مایکت',
    href: `https://myket.ir/app/${PACKAGE_NAME}`,
    badge: { src: '/myket-logo-badge.png', width: 966, height: 287 },
    comingSoon: true,
  },
  // Put the signed release APK at public/downloads/sort-puzzle.apk.
  { id: 'apk', caption: 'دانلود مستقیم', name: 'فایل APK', href: '/downloads/sort-puzzle.apk' },
]

export const BAZAAR = STORES[0]
export const APK = STORES[2]

export type SocialKind = 'github' | 'telegram' | 'instagram' | 'email' | 'website'

export interface SocialLink {
  kind: SocialKind
  label: string
  href: string
}

export const STUDIO = {
  name: 'پیکسل استودیو',
  role: 'سازنده سورت پازل',
  /** One letter for the avatar badge. Set `avatar` to an image URL to show the studio's logo instead. */
  initial: 'پ',
  avatar: null as string | null,
  bio: [
    'پیکسل استودیو یک استودیوی مستقل ایرانی است که بازی‌های فکری و رنگی برای موبایل می‌سازد؛ بازی‌هایی که در چند ثانیه یادشان می‌گیری و مدت‌ها سرگرمت می‌کنند.',
    'سورت پازل را ساختیم تا هم آرامت کند و هم ذهنت را به چالش بکشد؛ از چیدن مرحله‌ها تا صدای ریختن رنگ‌ها، برای تک‌تک جزئیاتش وقت گذاشته‌ایم.',
  ],
  /** The studio's pages (Telegram, Instagram, website…), shown as buttons on the card and in the footer. */
  links: [] as SocialLink[],
}
