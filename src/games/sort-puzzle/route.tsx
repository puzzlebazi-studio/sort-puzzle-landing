import { Navbar } from '../../components/Navbar'
import { SiteFooter } from '../../components/SiteFooter'
import { DEFAULT_LOCALE, isLocale } from '../../i18n/locales'
import { notFoundMeta, pageMeta } from '../../i18n/meta'
import { UI } from '../../i18n/ui'
import type { Route } from './+types/route'
import { GameLogo } from './components/GameLogo'
import { contentFor, SECTIONS, useContent } from './content'
import { SORT_PUZZLE } from './game'
import { Download } from './sections/Download'
import { Faq } from './sections/Faq'
import { Features } from './sections/Features'
import { Gallery } from './sections/Gallery'
import { Hero } from './sections/Hero'
import { HowToPlay } from './sections/HowToPlay'
import { Mechanics } from './sections/Mechanics'
import { Stages } from './sections/Stages'
import { Studio } from './sections/Studio'
import { STORES } from './stores'

export const meta: Route.MetaFunction = ({ params }) => {
  if (!isLocale(params.lang)) return notFoundMeta(UI[DEFAULT_LOCALE].notFound.title)
  const locale = params.lang
  const { meta } = contentFor(locale)
  return pageMeta({
    locale,
    page: SORT_PUZZLE.slug,
    ...meta,
    siteName: SORT_PUZZLE.name[locale],
    image: `/og/sort-puzzle-${locale}.jpg`,
  })
}

export const links: Route.LinksFunction = () => [
  { rel: 'icon', type: 'image/svg+xml', href: '/sort-puzzle/favicon.svg' },
  { rel: 'apple-touch-icon', href: '/sort-puzzle/apple-touch-icon.png' },
]

/** Sort Puzzle's page: it introduces the game; nothing on it is playable. */
export default function SortPuzzlePage() {
  const { locale, t, name } = useContent()
  return (
    <>
      <Navbar brand={<GameLogo size="nav" />} links={SECTIONS.map((id) => ({ href: `#${id}`, label: t.nav[id] }))} />
      <main id="main" className="overflow-x-clip">
        <Hero />
        <div className="page-bg">
          <Features />
          <HowToPlay />
          <Mechanics />
          <Stages />
          <Gallery />
          <Studio />
          <Download />
          <Faq />
        </div>
      </main>
      <SiteFooter
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
            })),
          },
        ]}
      />
    </>
  )
}
