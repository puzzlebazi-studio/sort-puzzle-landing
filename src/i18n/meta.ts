import type { MetaDescriptor } from 'react-router'
import { absoluteUrl, SITE_URL } from '../site'
import { DEFAULT_LOCALE, LOCALE_INFO, LOCALES, localePath, type Locale } from './locales'

interface PageMeta {
  locale: Locale
  /** The page's path after the language: '' for the studio's home page, a game's slug for its page. */
  page: string
  title: string
  description: string
  siteName: string
  /** Share preview in public/, 1200 × 630. */
  image: string
  ogTitle?: string
  ogDescription?: string
}

/** The head tags of a page: title, description, share preview and, once SITE_URL is set, its canonical and language links. */
export function pageMeta({ locale, page, title, description, siteName, image, ogTitle = title, ogDescription = description }: PageMeta): MetaDescriptor[] {
  const url = (lang: Locale) => absoluteUrl(localePath(lang, page))
  const meta: MetaDescriptor[] = [
    { title },
    { name: 'description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: siteName },
    { property: 'og:locale', content: LOCALE_INFO[locale].ogLocale },
    ...LOCALES.filter((lang) => lang !== locale).map((lang) => ({ property: 'og:locale:alternate', content: LOCALE_INFO[lang].ogLocale })),
    { property: 'og:title', content: ogTitle },
    { property: 'og:description', content: ogDescription },
    { property: 'og:image', content: absoluteUrl(image) },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ]
  if (SITE_URL) {
    meta.push(
      { property: 'og:url', content: url(locale) },
      { tagName: 'link', rel: 'canonical', href: url(locale) },
      ...LOCALES.map((lang) => ({ tagName: 'link' as const, rel: 'alternate', hrefLang: lang, href: url(lang) })),
      { tagName: 'link', rel: 'alternate', hrefLang: 'x-default', href: url(DEFAULT_LOCALE) },
    )
  }
  return meta
}

/** The head of a missing page. */
export const notFoundMeta = (title: string): MetaDescriptor[] => [{ title }, { name: 'robots', content: 'noindex' }]
