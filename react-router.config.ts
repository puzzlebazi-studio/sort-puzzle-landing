import type { Config } from '@react-router/dev/config'
import { copyFile } from 'node:fs/promises'
import { join } from 'node:path'
import { GAME_ROUTES } from './src/games/routes.ts'
import { LOCALES } from './src/i18n/locales.ts'

export default {
  appDirectory: 'src',
  buildDirectory: 'dist',
  // A static site: every page below is rendered to its own HTML file at build time.
  ssr: false,
  prerender: [
    '/',
    ...LOCALES.flatMap((lang) => [`/${lang}`, ...GAME_ROUTES.map(({ slug }) => `/${lang}/${slug}`)]),
  ],
  // Any other path gets the app shell, which renders the "page not found" screen. Most static
  // hosts serve 404.html for unknown paths on their own.
  async buildEnd({ reactRouterConfig }) {
    const client = join(reactRouterConfig.buildDirectory, 'client')
    await copyFile(join(client, '__spa-fallback.html'), join(client, '404.html'))
  },
} satisfies Config
