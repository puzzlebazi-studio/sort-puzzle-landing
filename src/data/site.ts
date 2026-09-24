/**
 * Everything you may want to change before publishing: store links, the APK, the developer.
 * The package name is the placeholder from the Unity project's Player Settings; replace it
 * with the final one from the Cafe Bazaar developer panel.
 */
const PACKAGE_NAME = 'com.sortfactory.game'

export const SITE = {
  name: 'سورت پازل',
  tagline: 'رنگ‌ها را بریز، مرتب کن، ببر!',
  minAndroid: '۸',
}

export type StoreId = 'bazaar' | 'myket' | 'apk'

export interface Store {
  id: StoreId
  /** Small line above the name, e.g. "دریافت از". */
  caption: string
  name: string
  href: string
  /** Shown as "به‌زودی" and not clickable. */
  comingSoon?: boolean
  note?: string
}

export const STORES: Store[] = [
  { id: 'bazaar', caption: 'دریافت از', name: 'کافه‌بازار', href: `https://cafebazaar.ir/app/${PACKAGE_NAME}` },
  // In-app purchases use Bazaar's Poolakey SDK, so Myket needs its own billing before it goes live.
  { id: 'myket', caption: 'دریافت از', name: 'مایکت', href: `https://myket.ir/app/${PACKAGE_NAME}`, comingSoon: true },
  // Put the signed release APK at public/downloads/sort-puzzle.apk.
  { id: 'apk', caption: 'دانلود مستقیم', name: 'فایل APK', href: '/downloads/sort-puzzle.apk', note: 'حدود ۵۰ مگابایت' },
]

export const BAZAAR = STORES[0]

export type SocialKind = 'github' | 'telegram' | 'instagram' | 'email' | 'website'

export interface SocialLink {
  kind: SocialKind
  label: string
  href: string
}

export const DEVELOPER = {
  name: 'علیرضا همتی',
  role: 'برنامه‌نویس و سازنده بازی',
  /** One letter for the avatar badge. Set `avatar` to an image URL to show a photo instead. */
  initial: 'ع',
  avatar: null as string | null,
  bio: [
    'سلام! من علیرضا هستم و سورت پازل را از صفر با یونیتی ساخته‌ام؛ از موتور حل‌کننده‌ای که تک‌تک مرحله‌ها را امتحان می‌کند تا انیمیشن ریختن رنگ‌ها و گرافیک بازی.',
    'دلم می‌خواست بازی‌ای بسازم که هم آرامت کند و هم ذهنت را به چالش بکشد؛ بازی‌ای که هیچ‌وقت با یک مرحله بی‌راه‌حل ناامیدت نکند.',
  ],
  skills: ['Unity 6', 'C#', 'A* Solver', 'Illustrator'],
  links: [{ kind: 'github', label: 'گیت‌هاب', href: 'https://github.com/alirezahematidev' }] as SocialLink[],
}
