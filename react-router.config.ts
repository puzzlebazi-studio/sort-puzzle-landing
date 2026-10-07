import type { Config } from '@react-router/dev/config'
import { rename, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { GAME_ROUTES } from './src/games/routes.ts'
import { DEFAULT_LOCALE, localePath, LOCALES } from './src/i18n/locales.ts'
import { absoluteUrl, SITE_URL } from './src/site.ts'

/** Every page, in every language, with its translations: what search engines should index. */
function sitemap() {
  const pages = ['', ...GAME_ROUTES.map(({ slug }) => slug)]
  const urls = pages.flatMap((page) => {
    const alternates = [...LOCALES.map((lang) => [lang, lang] as const), ['x-default', DEFAULT_LOCALE] as const]
      .map(([hreflang, lang]) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${absoluteUrl(localePath(lang, page))}"/>`)
      .join('\n')
    return LOCALES.map((lang) => `  <url>\n    <loc>${absoluteUrl(localePath(lang, page))}</loc>\n${alternates}\n  </url>`)
  })
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
}

export default {
  appDirectory: 'src',
  // React Router builds here first; only the site itself ends up in dist/ (see buildEnd).
  buildDirectory: '.react-router/build',
  // A static site: every page below is rendered to its own HTML file at build time.
  ssr: false,
  prerender: [
    '/',
    ...LOCALES.flatMap((lang) => [`/${lang}`, ...GAME_ROUTES.map(({ slug }) => `/${lang}/${slug}`)]),
  ],
  // The client build becomes dist/. Any other path gets the app shell, which renders the "page not
  // found" screen; most static hosts serve 404.html for unknown paths on their own. The server build
  // was only needed to render the pages, so it goes.
  async buildEnd({ reactRouterConfig, viteConfig }) {
    const build = reactRouterConfig.buildDirectory
    const client = join(build, 'client')
    const dist = join(viteConfig.root, 'dist')
    await rename(join(client, '__spa-fallback.html'), join(client, '404.html'))
    await rm(dist, { recursive: true, force: true })
    await rename(client, dist)
    await rm(build, { recursive: true, force: true })
    // For search engines (absolute addresses, so only once SITE_URL is set).
    if (SITE_URL) {
      await writeFile(join(dist, 'sitemap.xml'), sitemap())
      await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`)
    }
    viteConfig.logger.info('\nThe site is in dist/, ready to deploy.')
  },
} satisfies Config
