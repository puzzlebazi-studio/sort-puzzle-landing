import { useEffect, type ReactNode } from 'react'
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation, useMatches } from 'react-router'
import type { Route } from './+types/root'
import { MessagePage, NotFoundPage } from './components/MessagePage'
import { SvgDefs } from './components/SvgDefs'
import { useHashLinks } from './hooks/useHashLinks'
import { startAnalytics, tag } from './lib/analytics'
import { DEFAULT_LOCALE, LOCALE_INFO } from './i18n/locales'
import { UI } from './i18n/ui'
import { useLocale } from './i18n/useLocale'
import { GA_MEASUREMENT_ID } from './site'
import { STUDIO } from './studio/studio'
import './index.css'

// Every page sets its own; this one titles the "page not found" shell while it starts up.
export const meta: Route.MetaFunction = () => [{ title: STUDIO.name[DEFAULT_LOCALE] }]

// The studio's icons are the site's; a game's page declares its own after these, and the last one wins.
export const links: Route.LinksFunction = () => [
  // Both looks use these two weights (index.css); Sort Puzzle's page also loads Regular.
  { rel: 'preload', href: '/fonts/Lahzeh-ExtraBold.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
  { rel: 'preload', href: '/fonts/Lahzeh-Bold.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
]

// Google Analytics' tag, as Google gives it.
const GTAG_INIT = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_MEASUREMENT_ID}');
`

/** What a page's route can declare in its `handle`: `look: 'flat'` for the light, flat art of Sort Puzzle 2.0. */
export interface PageHandle {
  look?: 'flat'
}

export function Layout({ children }: { children: ReactNode }) {
  const locale = useLocale()
  const { dir } = LOCALE_INFO[locale]
  const flat = useMatches().some((match) => (match.handle as PageHandle | undefined)?.look === 'flat')

  // The "page not found" shell is rendered once for every address, so the language of the
  // one being shown is only known in the browser.
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = dir
  }, [locale, dir])

  return (
    <html lang={locale} dir={dir}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content={flat ? '#e8e0fa' : '#5540c8'} />
        {/* Only the built site has it, so visits to `pnpm dev` aren't counted. */}
        {import.meta.env.PROD && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: GTAG_INIT }} />
          </>
        )}
        <Meta />
        <Links />
        {/* Without scripts nothing would reveal itself on scroll. */}
        <noscript>
          <style>{'.reveal{opacity:1;transform:none}'}</style>
        </noscript>
      </head>
      <body className={flat ? 'look-flat' : undefined}>
        <SvgDefs />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const locale = useLocale()
  const ui = UI[locale]
  const { pathname } = useLocation()
  useHashLinks()

  // Microsoft Clarity (lib/analytics.ts), on the built site only. Each page view is tagged with
  // its page ("studio", a game's slug) and language, so recordings and events can be filtered.
  useEffect(startAnalytics, [])
  useEffect(() => {
    tag({ page: pathname.split('/').filter(Boolean)[1] ?? 'studio', language: locale })
  }, [pathname, locale])
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-gold-400 px-5 py-2 text-choco focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-4"
      >
        {ui.skipToContent}
      </a>
      <Outlet />
    </>
  )
}

/** Shown while a page that isn't pre-rendered (such as "page not found") starts up. */
export function HydrateFallback() {
  return <div className="page-bg min-h-dvh" />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const ui = UI[useLocale()]
  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundPage />
  if (import.meta.env.DEV) console.error(error)
  return <MessagePage heading="!" title={ui.error.title} text={ui.error.text} />
}
