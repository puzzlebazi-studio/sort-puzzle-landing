/**
 * Every game's page, served at /<lang>/<slug>/. To add a game, add its page here and its card to
 * GAMES in registry.ts. Plain data (no React) so the route and build configs can import it.
 */
export const GAME_ROUTES = [{ slug: 'sort-puzzle', module: 'games/sort-puzzle/route.tsx' }] as const

export type GameSlug = (typeof GAME_ROUTES)[number]['slug']
