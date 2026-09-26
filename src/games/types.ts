import type { Localized } from '../i18n/locales'
import type { Tone } from '../lib/tone'
import type { GameSlug } from './routes'

export interface BadgeImage {
  src: string
  width: number
  height: number
}

export interface Store {
  id: string
  /** Read before the name, e.g. "دریافت از" / "Get it on". */
  caption: Localized<string>
  name: Localized<string>
  href: string
  /**
   * The store's official badge in public/, cropped to its edges so every badge lines up at one
   * height. A language without its own badge shows the Persian one.
   */
  badge?: { fa: BadgeImage } & Partial<Localized<BadgeImage>>
  /** Shown as "soon" and not clickable. */
  comingSoon?: boolean
}

/** A game as the studio's home page lists it. */
export interface Game {
  slug: GameSlug
  name: Localized<string>
  tagline: Localized<string>
  summary: Localized<string>
  /** A few words shown as chips, like the genre and the platform. */
  tags: Localized<string[]>
  /** Square app icon. */
  icon: string
  /** A 9:16 screenshot for the card's phone. */
  screenshot: string
  tone: Tone
  /** The main store, shown as a badge on the card. */
  store?: Store
}
