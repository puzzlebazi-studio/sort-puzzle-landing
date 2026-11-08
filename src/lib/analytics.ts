import Clarity from '@microsoft/clarity'
import { CLARITY_PROJECT_ID } from '../site'

/**
 * Microsoft Clarity: session recordings and heatmaps, plus the custom events below. Like Google
 * Analytics, it runs only on the built site, so visits to `pnpm dev` aren't counted; there, events
 * are logged to the console instead.
 *
 * Clarity events carry no values, so each event's details go to session tags (filterable in
 * Clarity's dashboard: "Custom tags"). Every session is also tagged with its `page` and `language`.
 */
export type AnalyticsEvent =
  /** A store badge or store link: the conversion. The session is kept for recording. Tags: store, place. */
  | 'store_click'
  /** The hero's "how to play" button on a game's page. */
  | 'how_to_play_click'
  /** A link to a section in the navbar or its menu. Tags: section, place. */
  | 'nav_click'
  /** The navbar's menu opened, on phones and tablets. */
  | 'menu_open'
  /** The language switch. Tags: language (the one switched to), place. */
  | 'language_switch'
  /** A question opened in the FAQ. Tags: faq (its number). */
  | 'faq_open'
  /** Another screenshot chosen in the gallery (not the autoplay). Tags: shot, how. */
  | 'gallery_browse'
  /** From a game's page to the studio's. */
  | 'studio_visit'
  /** From the studio's page to a game's. Tags: game, place. */
  | 'game_open'
  /** A section scrolled to the middle of the screen, once per page view: `view_<section id>`. */
  | `view_${string}`

export type AnalyticsTag = 'store' | 'place' | 'section' | 'language' | 'faq' | 'shot' | 'how' | 'game' | 'page'

/** Where on a page an event happened ("message": the not-found and error pages). */
export type Place = 'hero' | 'download' | 'footer' | 'navbar' | 'menu' | 'games' | 'message'

/** Events that mean a visitor is about to install: Clarity keeps their sessions' recordings. */
const CONVERSIONS: AnalyticsEvent[] = ['store_click']

let started = false

/** Starts Clarity once, in the browser, on the built site. */
export function startAnalytics() {
  if (started || typeof window === 'undefined' || !import.meta.env.PROD || !CLARITY_PROJECT_ID) return
  started = true
  Clarity.init(CLARITY_PROJECT_ID)
}

// Clarity's API calls window.clarity, which only exists once init() has run.
const ready = () => typeof window !== 'undefined' && typeof (window as { clarity?: unknown }).clarity === 'function'

/** Sets session tags. */
export function tag(tags: Partial<Record<AnalyticsTag, string>>) {
  if (!ready()) return
  for (const [key, value] of Object.entries(tags)) if (value) Clarity.setTag(key, value)
}

/** Reports an event, with its details as session tags. */
export function track(event: AnalyticsEvent, tags: Partial<Record<AnalyticsTag, string>> = {}) {
  if (import.meta.env.DEV) console.debug('[clarity]', event, tags)
  if (!ready()) return
  tag(tags)
  Clarity.event(event)
  if (CONVERSIONS.includes(event)) Clarity.upgrade(event)
}
