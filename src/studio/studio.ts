import type { Localized } from '../i18n/locales'

export type SocialKind = 'github' | 'telegram' | 'instagram' | 'email' | 'website'

export interface SocialLink {
  kind: SocialKind
  label: Localized<string>
  href: string
}

/** The studio behind every game on the site. Check its links before publishing. */
export const STUDIO: {
  name: Localized<string>
  /** For tight spots like the navbar. */
  shortName: Localized<string>
  /** The first paragraph of every "about the studio" card. */
  intro: Localized<string>
  /** The studio's pages (Telegram, Instagram, website…), shown as buttons on its card and in the footer. */
  links: SocialLink[]
} = {
  name: { fa: 'پازل‌بازی استودیو', en: 'PuzzleBazi Studio' },
  shortName: { fa: 'پازل‌بازی', en: 'PuzzleBazi' },
  intro: {
    fa: 'پازل‌بازی استودیو یک استودیوی مستقل ایرانی است که بازی‌های فکری و رنگی برای موبایل می‌سازد؛ بازی‌هایی که در چند ثانیه یادشان می‌گیری و مدت‌ها سرگرمت می‌کنند.',
    en: 'PuzzleBazi Studio is an independent Iranian studio that makes colorful puzzle games for mobile: games you learn in seconds and enjoy for ages.',
  },
  links: [],
}
