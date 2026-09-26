import { index, route, type RouteConfig } from '@react-router/dev/routes'
import { GAME_ROUTES } from './games/routes'

export default [
  // "/" forwards to the default language.
  index('routes/home.tsx'),
  // Every page lives under its language: /fa/, /en/sort-puzzle/…
  route(':lang', 'routes/locale.tsx', [
    index('routes/studio.tsx'),
    ...GAME_ROUTES.map(({ slug, module }) => route(slug, module)),
    route('*', 'routes/not-found.tsx'),
  ]),
] satisfies RouteConfig
