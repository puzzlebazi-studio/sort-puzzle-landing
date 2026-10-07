import { Navbar } from '../../components/Navbar'
import { SiteFooter } from '../../components/SiteFooter'
import { DEFAULT_LOCALE, isLocale } from '../../i18n/locales'
import { notFoundMeta, pageMeta } from '../../i18n/meta'
import { useSectionViews } from '../../hooks/useSectionViews'
import { UI } from '../../i18n/ui'
import { track } from '../../lib/analytics'
import { gameApp, graph, organization } from '../../lib/schema'
import type { PageHandle } from '../../root'
import type { Route } from './+types/route'
import { GameLogo } from './components/GameLogo'
import { contentFor, SECTIONS, useContent } from './content'
import { SORT_PUZZLE } from './game'
import { Designs } from './sections/Designs'
import { Download } from './sections/Download'
import { Faq } from './sections/Faq'
import { Features } from './sections/Features'
import { Gallery } from './sections/Gallery'
import { Hero } from './sections/Hero'
import { HowToPlay } from './sections/HowToPlay'
import { Mechanics } from './sections/Mechanics'
import { Stages } from './sections/Stages'
import { Studio } from './sections/Studio'
import { MIN_ANDROID, STORES } from './stores'

export const meta: Route.MetaFunction = ({ params }) => {
  if (!isLocale(params.lang)) return notFoundMeta(UI[DEFAULT_LOCALE].notFound.title)
  const locale = params.lang
  const { meta } = contentFor(locale)
  return [
    ...pageMeta({
      locale,
      page: SORT_PUZZLE.slug,
      ...meta,
      siteName: SORT_PUZZLE.name[locale],
      image: `/og/sort-puzzle-${locale}.jpg`,
    }),
    {
      'script:ld+json': graph(
        organization(locale),
        gameApp(SORT_PUZZLE, locale, { stores: STORES, operatingSystem: `Android ${MIN_ANDROID}+` }),
      ),
    },
  ]
}

/** The page wears the game's flat art (Sort Puzzle 2.0), from its first paint. */
export const handle: PageHandle = { look: 'flat' }

export const links: Route.LinksFunction = () => [
  { rel: 'icon', type: 'image/svg+xml', href: '/sort-puzzle/favicon.svg' },
  { rel: 'apple-touch-icon', href: '/sort-puzzle/apple-touch-icon.png' },
]

/** Sort Puzzle's page: it introduces the game; nothing on it is playable. */
export default function SortPuzzlePage() {
  const { locale, t, name } = useContent()
  useSectionViews([...SECTIONS, 'download'])
  return (
    <>
      <Navbar look="flat" brand={<GameLogo size="nav" />} links={SECTIONS.map((id) => ({ href: `#${id}`, label: t.nav[id] }))} />
      <main id="main" className="overflow-x-clip">
        <Hero />
        <div className="flat-ground border-t-4 border-plum">
          <Features />
          <HowToPlay />
          <Mechanics />
          <Stages />
          <Designs />
          <Gallery />
          <Studio />
          <Download />
          <Faq />
        </div>
      </main>
      <SiteFooter
        look="flat"
        brand={<GameLogo size="footer" />}
        blurb={t.footer.blurb}
        owner={name}
        credit
        columns={[
          { title: t.footer.sections, wide: true, links: SECTIONS.map((id) => ({ label: t.nav[id], href: `#${id}` })) },
          {
            title: t.footer.download,
            links: STORES.map((store) => ({
              label: store.name[locale],
              href: store.href,
              soon: store.comingSoon,
              onClick: () => track('store_click', { store: store.id, place: 'footer' }),
            })),
          },
        ]}
      />
    </>
  )
}
