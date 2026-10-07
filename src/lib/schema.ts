import type { MetaDescriptor } from 'react-router'
import type { Game, Store } from '../games/types'
import { localePath, LOCALES, type Locale } from '../i18n/locales'
import { absoluteUrl } from '../site'
import { STUDIO } from '../studio/studio'

/**
 * Structured data (schema.org JSON-LD) for search engines. The studio and each game have one fixed
 * `@id`, which the blog (blog.puzzlebazi.studio) uses too: search engines then read the site and
 * the blog as one publisher, and a post about a game as being about the game on this site. Keep
 * these ids and the studio's details in step with blog/src/lib/schema.ts.
 */
export const ORGANIZATION_ID = absoluteUrl('/#organization')
export const gameId = (slug: string) => absoluteUrl(`/#${slug}`)

/** React Router's type for JSON-LD in `meta` (not exported by name). */
type LdJsonObject = Exclude<Extract<MetaDescriptor, { 'script:ld+json': unknown }>['script:ld+json'], unknown[]>

const otherLocale = (locale: Locale) => LOCALES.find((lang) => lang !== locale)!

/** A page's structured data, as one graph. */
export const graph = (...nodes: LdJsonObject[]): LdJsonObject => ({ '@context': 'https://schema.org', '@graph': nodes })

export function organization(locale: Locale): LdJsonObject {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: STUDIO.name[locale],
    alternateName: STUDIO.name[otherLocale(locale)],
    url: absoluteUrl(localePath(locale)),
    logo: absoluteUrl('/apple-touch-icon.png'),
    description: STUDIO.intro[locale],
  }
}

/** The site itself, which gives search results its name. */
export function website(locale: Locale): LdJsonObject {
  return {
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    name: STUDIO.name[locale],
    alternateName: STUDIO.name[otherLocale(locale)],
    url: absoluteUrl(localePath(locale)),
    inLanguage: [...LOCALES],
    publisher: { '@id': ORGANIZATION_ID },
  }
}

/** A game, on its own page. Its store listings are the same app elsewhere (`sameAs`). */
export function gameApp(game: Game, locale: Locale, { stores, operatingSystem }: { stores: Store[]; operatingSystem: string }): LdJsonObject {
  return {
    '@type': 'MobileApplication',
    '@id': gameId(game.slug),
    name: game.name[locale],
    alternateName: game.name[otherLocale(locale)],
    description: game.summary[locale],
    url: absoluteUrl(localePath(locale, game.slug)),
    image: absoluteUrl(`/og/${game.slug}-${locale}.jpg`),
    screenshot: absoluteUrl(game.screenshot),
    applicationCategory: 'GameApplication',
    operatingSystem,
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'IRR' },
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    sameAs: stores.filter((store) => !store.comingSoon).map((store) => store.href),
  }
}
