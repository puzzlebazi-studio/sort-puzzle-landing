import Clarity from "@microsoft/clarity";
import { CLARITY_PROJECT_ID } from "./site";

/**
 * Microsoft Clarity, as on puzzlebazi.studio (the same project; blog sessions carry `site: blog`).
 * Production builds only: in `pnpm dev` events are logged to the console instead. Clarity events
 * carry no values, so their details are set as session tags.
 */
export type BlogEvent =
  /** A post opened from a list. Tags: post, place (home, tag, related). */
  | "post_open"
  /** A reader reached the end of a post. Tags: post. */
  | "read_complete"
  /** A link to Cafe Bazaar or Myket inside a post: the conversion. Tags: store, post. */
  | "store_click"
  /** A share button. Tags: share (telegram, whatsapp, x, copy), post. */
  | "share_click"
  /** The language switch. Tags: language, place. */
  | "language_switch"
  /** A link to the studio's site or a game's page there. Tags: place (header, footer, game_card, post), post. */
  | "studio_link";

export type BlogTag = "site" | "page" | "language" | "post" | "place" | "store" | "share";

let started = false;

export function startAnalytics() {
  if (started || typeof window === "undefined" || process.env.NODE_ENV !== "production") return;
  started = true;
  Clarity.init(CLARITY_PROJECT_ID);
}

const ready = () => typeof window !== "undefined" && typeof (window as { clarity?: unknown }).clarity === "function";

export function tag(tags: Partial<Record<BlogTag, string>>) {
  if (!ready()) return;
  for (const [key, value] of Object.entries(tags)) if (value) Clarity.setTag(key, value);
}

export function track(event: BlogEvent, tags: Partial<Record<BlogTag, string>> = {}) {
  if (process.env.NODE_ENV === "development") console.debug("[clarity]", event, tags);
  if (!ready()) return;
  tag(tags);
  Clarity.event(event);
  // Sessions that lead to an install are kept for recording.
  if (event === "store_click") Clarity.upgrade(event);
}
