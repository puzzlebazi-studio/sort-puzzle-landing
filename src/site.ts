/**
 * The site's public address (no trailing slash). Social networks and search engines need absolute
 * URLs for share images, canonical links and language alternates; left empty, share images use
 * relative paths and the other two are left out.
 */
export const SITE_URL = 'https://puzzlebazi.studio'

export const absoluteUrl = (path: string) => (SITE_URL ? new URL(path, SITE_URL).href : path)

/** The studio's blog (a separate app, in blog/), linked from the studio's footer. */
export const BLOG_URL = 'https://blog.puzzlebazi.studio'

/** The site's Google Analytics (GA4) measurement ID; root.tsx puts Google's tag in every page's head. */
export const GA_MEASUREMENT_ID = 'G-5G9GE0YWGD'

/** The site's Microsoft Clarity project (recordings, heatmaps and the events in lib/analytics.ts). */
export const CLARITY_PROJECT_ID = 'ytfpq93ggd'
