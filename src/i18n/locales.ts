/**
 * The site's languages. Every page lives under its language: /fa/…, /en/….
 * Plain data (no React) so react-router.config.ts can import it.
 */
export const LOCALES = ['fa', 'en'] as const

export type Locale = (typeof LOCALES)[number]

/** Where "/" sends visitors. */
export const DEFAULT_LOCALE: Locale = 'fa'

/** A value for each language, e.g. `{ fa: 'سورت پازل', en: 'Sort Puzzle' }`. */
export type Localized<T> = Record<Locale, T>

interface LocaleInfo {
  dir: 'rtl' | 'ltr'
  /** The language's name in itself, for the language switch. */
  name: string
  /** For Intl formatting. */
  intl: string
  ogLocale: string
}

export const LOCALE_INFO: Localized<LocaleInfo> = {
  fa: { dir: 'rtl', name: 'فارسی', intl: 'fa-IR', ogLocale: 'fa_IR' },
  en: { dir: 'ltr', name: 'English', intl: 'en-US', ogLocale: 'en_US' },
}

export const isLocale = (value: unknown): value is Locale => LOCALES.includes(value as Locale)

/**
 * A page's path in a language, with the trailing slash that matches the pre-rendered
 * folder (/fa/sort-puzzle/index.html), so static hosts serve it without a redirect.
 */
export const localePath = (locale: Locale, page = '') => `/${locale}/${page ? `${page}/` : ''}`

/** The same page in another language: /fa/sort-puzzle/ → /en/sort-puzzle/. */
export function switchLocalePath(pathname: string, locale: Locale) {
  const [, first, ...rest] = pathname.split('/')
  return isLocale(first) ? `/${[locale, ...rest].join('/')}` : localePath(locale)
}
