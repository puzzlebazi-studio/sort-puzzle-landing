import type { Locale, TagId } from './i18n'
import { STUDIO_URL } from './site'

export interface Game {
  /** Its page on the studio's site: /<lang>/<slug>/. */
  slug: string
  name: Record<Locale, string>
  tagline: Record<Locale, string>
  /** Square icon in public/. */
  icon: string
  stores: { id: string; name: Record<Locale, string>; href: string }[]
  /** Its page's sections, by their id there: what a post can link to as `game:<slug>#<section>`. */
  sections: readonly string[]
}

/**
 * The studio's games, by the topic their posts are tagged with. A post tagged with a game ends
 * with the game's card, linking to its page on the studio's site (see GameCard), and the game's
 * name links there where a post first mentions it (see lib/landing.ts). Copied from the site's
 * src/games/: keep the names, taglines, store links and section ids the same.
 */
export const GAMES: Partial<Record<TagId, Game>> = {
  'sort-puzzle': {
    slug: 'sort-puzzle',
    name: { fa: 'سورت پازل', en: 'Sort Puzzle' },
    tagline: { fa: 'رنگ‌ها را بریز، مرتب کن، ببر!', en: 'Pour, sort, win!' },
    icon: '/games/sort-puzzle/icon.svg',
    stores: [
      { id: 'bazaar', name: { fa: 'کافه‌بازار', en: 'Cafe Bazaar' }, href: 'https://cafebazaar.ir/app/com.sortpuzzle.game' },
      { id: 'myket', name: { fa: 'مایکت', en: 'Myket' }, href: 'https://myket.ir/app/com.sortpuzzle.game' },
    ],
    sections: ['features', 'how', 'mechanics', 'stages', 'designs', 'gallery', 'studio', 'download', 'faq'],
  },
}

/** The games a post is about, from its tags. */
export const gamesOf = (tags: TagId[]) => tags.flatMap((tag) => GAMES[tag] ?? [])

/** A game's page on the studio's site, its canonical address there. */
export const gamePage = (game: Game, locale: Locale) => `${STUDIO_URL}/${locale}/${game.slug}/`

/** The game with this slug (its page's address on the studio's site). */
export const gameBySlug = (slug: string) => Object.values(GAMES).find((game) => game?.slug === slug)
