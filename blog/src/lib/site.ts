/** The blog's own address (no trailing slash): canonical links, the sitemap, RSS and share images. */
export const BLOG_URL = 'https://blog.puzzlebazi.studio'

/** The studio's site, which the blog links back to. */
export const STUDIO_URL = 'https://puzzlebazi.studio'

/**
 * Analytics, shared with puzzlebazi.studio: Google Analytics' measurement ID and Microsoft
 * Clarity's project. Both run only in production builds, and every blog session is tagged
 * `site: blog` in Clarity so it can be told apart from the studio's site.
 */
export const GA_MEASUREMENT_ID = 'G-5G9GE0YWGD'
export const CLARITY_PROJECT_ID = 'ytfpq93ggd'

export const absoluteUrl = (path: string) => new URL(path, BLOG_URL).href
