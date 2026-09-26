import type { Config } from '@react-router/dev/config'
import { rename, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { GAME_ROUTES } from './src/games/routes.ts'
import { LOCALES } from './src/i18n/locales.ts'

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
    viteConfig.logger.info('\nThe site is in dist/, ready to deploy.')
  },
} satisfies Config
