/**
 * The site's public address, like "https://example.ir" (no trailing slash). Social networks and
 * search engines need absolute URLs for share images, canonical links and language alternates:
 * share images use relative paths until this is set, and the other two are left out.
 */
export const SITE_URL = ''

export const absoluteUrl = (path: string) => (SITE_URL ? new URL(path, SITE_URL).href : path)
