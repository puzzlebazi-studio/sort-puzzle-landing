import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { StudioLogotype } from '../components/StudioLogotype'
import { GAMES } from '../games/registry'
import { useSectionViews } from '../hooks/useSectionViews'
import { DEFAULT_LOCALE, isLocale, localePath } from '../i18n/locales'
import { notFoundMeta, pageMeta } from '../i18n/meta'
import { UI } from '../i18n/ui'
import { track } from '../lib/analytics'
import { graph, organization, website } from '../lib/schema'
import { StudioMark } from '../studio/components/StudioMark'
import { studioContent, useStudioContent } from '../studio/content'
import { About } from '../studio/sections/About'
import { Games } from '../studio/sections/Games'
import { StudioHero } from '../studio/sections/StudioHero'
import { STUDIO } from '../studio/studio'
import type { Route } from './+types/studio'

export const meta: Route.MetaFunction = ({ params }) => {
  if (!isLocale(params.lang)) return notFoundMeta(UI[DEFAULT_LOCALE].notFound.title)
  const locale = params.lang
  const t = studioContent(locale)
  return [
    ...pageMeta({
      locale,
      page: '',
      title: t.meta.title,
      description: t.meta.description,
      siteName: STUDIO.name[locale],
      image: `/og/studio-${locale}.jpg`,
    }),
    { 'script:ld+json': graph(organization(locale), website(locale)) },
  ]
}

/** The studio's home page: who we are and the games we make. */
export default function StudioPage() {
  const { locale, t } = useStudioContent()
  useSectionViews(['games', 'about'])
  return (
    <>
      <Navbar
        brand={<StudioMark />}
        links={[
          { href: '#games', label: t.nav.games },
          { href: '#about', label: t.nav.about },
        ]}
      />
      <main id="main" className="overflow-x-clip">
        <StudioHero />
        <div className="page-bg">
          <Games />
          <About />
        </div>
      </main>
      <SiteFooter
        brand={<StudioLogotype size="footer" />}
        blurb={t.footer.blurb}
        owner={STUDIO.name[locale]}
        columns={[
          {
            title: t.footer.games,
            links: GAMES.map((game) => ({
              label: game.name[locale],
              to: localePath(locale, game.slug),
              onClick: () => track('game_open', { game: game.slug, place: 'footer' }),
            })),
          },
          {
            title: t.footer.studio,
            links: [
              { label: t.nav.games, href: '#games' },
              { label: t.nav.about, href: '#about' },
            ],
          },
        ]}
      />
    </>
  )
}
