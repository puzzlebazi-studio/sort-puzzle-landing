import { GAMES, gameBySlug, gamePage } from './games'
import { UI, type Locale } from './i18n'
import { STUDIO_URL } from './site'

/** The studio's home page on puzzlebazi.studio, in a language. */
export const studioPage = (locale: Locale) => `${STUDIO_URL}/${locale}/`

/** The studio's home page's sections, by their id there: what `studio:#<section>` can link to. */
const STUDIO_SECTIONS = ['games', 'about']

/**
 * A shortcut to the studio's site in a post's Markdown, resolved in the post's language:
 *
 *   [text](game:sort-puzzle)            → https://puzzlebazi.studio/fa/sort-puzzle/
 *   [text](game:sort-puzzle#mechanics)  → https://puzzlebazi.studio/fa/sort-puzzle/#mechanics
 *   [text](studio:#about)               → https://puzzlebazi.studio/fa/#about
 *
 * An unknown game or section throws, so a typo stops the build instead of linking nowhere. Any
 * other address comes back as it is.
 */
export function resolveShortcut(href: string, locale: Locale): string {
  const match = /^(game|studio):([^#]*)(?:#(.*))?$/.exec(href)
  if (!match) return href
  const [, kind, slug, section] = match
  let page: string
  let sections: readonly string[]
  if (kind === 'studio') {
    if (slug) throw new Error(`"${href}": the studio's page takes no name, only a section (studio:#about)`)
    page = studioPage(locale)
    sections = STUDIO_SECTIONS
  } else {
    const game = gameBySlug(slug)
    const known = Object.values(GAMES).map((g) => g?.slug)
    if (!game) throw new Error(`"${href}": no game "${slug}" (games: ${known.join(', ')}; add it to GAMES in src/lib/games.ts)`)
    page = gamePage(game, locale)
    sections = game.sections
  }
  if (section !== undefined && !sections.includes(section)) {
    throw new Error(`"${href}": no section "#${section}" on that page (${sections.map((id) => `#${id}`).join(', ')})`)
  }
  return section ? `${page}#${section}` : page
}

/**
 * The names a post links on their first mention: each game's to its page, the studio's to its
 * home page.
 */
export function mentions(locale: Locale): { name: string; href: string }[] {
  return [
    ...Object.values(GAMES).flatMap((game) => (game ? [{ name: game.name[locale], href: gamePage(game, locale) }] : [])),
    { name: UI[locale].by, href: studioPage(locale) },
  ]
}
