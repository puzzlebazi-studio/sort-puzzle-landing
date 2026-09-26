/**
 * The site's public address (no trailing slash). Social networks and search engines need absolute
 * URLs for share images, canonical links and language alternates; left empty, share images use
 * relative paths and the other two are left out.
 */
export const SITE_URL = 'https://puzzlebazi.studio'

export const absoluteUrl = (path: string) => (SITE_URL ? new URL(path, SITE_URL).href : path)
