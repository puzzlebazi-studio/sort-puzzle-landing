import { gamePage, type Game } from './games'
import { otherLocale, type Locale } from './i18n'
import { absoluteUrl, STUDIO_URL } from './site'

/**
 * Structured data (schema.org JSON-LD) for search engines, tied to the studio's site: the studio
 * and its games keep the `@id`s puzzlebazi.studio gives them (its src/lib/schema.ts), so search
 * engines read the blog as the studio's own, and a post about a game as being about the game on
 * its page there. Keep these ids and the studio's details in step with the site.
 */
export const ORGANIZATION_ID = `${STUDIO_URL}/#organization`
export const gameId = (game: Game) => `${STUDIO_URL}/#${game.slug}`
export const blogId = (locale: Locale) => absoluteUrl(`/${locale}#blog`)

type Node = Record<string, unknown>

/** A page's structured data, as one graph, ready for a <script type="application/ld+json">. */
export const jsonLd = (...nodes: Node[]) =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c')

const STUDIO = {
  name: { fa: 'پازل‌بازی استودیو', en: 'PuzzleBazi Studio' },
  intro: {
    fa: 'پازل‌بازی استودیو یک استودیوی مستقل ایرانی است که بازی‌های فکری و رنگی برای موبایل می‌سازد؛ بازی‌هایی که در چند ثانیه یادشان می‌گیری و مدت‌ها سرگرمت می‌کنند.',
    en: 'PuzzleBazi Studio is an independent Iranian studio that makes colorful puzzle games for mobile: games you learn in seconds and enjoy for ages.',
  },
}

/** The studio, as the site describes it. */
export function organization(locale: Locale): Node {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: STUDIO.name[locale],
    alternateName: STUDIO.name[otherLocale(locale)],
    url: `${STUDIO_URL}/${locale}/`,
    logo: `${STUDIO_URL}/apple-touch-icon.png`,
    description: STUDIO.intro[locale],
  }
}

/** A game, pointing at its page on the studio's site, where it is described in full. */
export function game(game: Game, locale: Locale): Node {
  return {
    '@type': 'MobileApplication',
    '@id': gameId(game),
    name: game.name[locale],
    alternateName: game.name[otherLocale(locale)],
    url: gamePage(game, locale),
    applicationCategory: 'GameApplication',
    publisher: { '@id': ORGANIZATION_ID },
  }
}
