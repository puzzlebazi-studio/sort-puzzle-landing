import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GameCard } from '@/components/GameCard'
import { PostCard } from '@/components/PostCard'
import { Title3D } from '@/components/Title3D'
import { formatNumber } from '@/lib/format'
import { GAMES } from '@/lib/games'
import { isLocale, LOCALE_INFO, TAGS, UI } from '@/lib/i18n'
import { getPosts, getTags } from '@/lib/posts'
import { blogId, jsonLd, ORGANIZATION_ID, organization } from '@/lib/schema'
import { absoluteUrl, BLOG_URL } from '@/lib/site'

export async function generateMetadata({ params }: PageProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  return {
    title: { absolute: UI[lang].title },
    alternates: { canonical: `/${lang}`, languages: { fa: '/fa', en: '/en', 'x-default': '/fa' } },
  }
}

/** Every post, newest first: the latest one large, the rest in a grid. */
export default async function BlogHome({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = UI[lang]
  const posts = getPosts(lang)
  const [latest, ...rest] = posts
  const tags = getTags(lang)
  const home = absoluteUrl(`/${lang}`)
  const games = Object.values(GAMES).filter((game) => game !== undefined)

  // Structured data: the blog (and its site, which names it in search results), the studio's own.
  const structured = jsonLd(
    organization(lang),
    { '@type': 'WebSite', '@id': `${BLOG_URL}/#website`, name: t.title, url: home, publisher: { '@id': ORGANIZATION_ID } },
    {
      '@type': 'Blog',
      '@id': blogId(lang),
      name: t.title,
      description: t.description,
      url: home,
      inLanguage: LOCALE_INFO[lang].intl,
      publisher: { '@id': ORGANIZATION_ID },
      blogPost: posts.map((post) => ({ '@id': `${absoluteUrl(`/${lang}/${post.slug}`)}#post` })),
    },
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structured }} />
      <section className="relative isolate overflow-hidden bg-[radial-gradient(56rem_30rem_at_50%_4rem,#9a84ff_0%,#7560ee_34%,transparent_75%)] px-4 pt-14 pb-16 text-center sm:pt-20 sm:pb-20">
        <span className="eyebrow tone-aqua">{t.eyebrow}</span>
        <h1 className="mx-auto mt-6 flex flex-col items-center gap-2">
          <Image
            src={`/brand/logotype-${lang}-on-dark.svg`}
            alt={t.by}
            width={lang === 'fa' ? 430 : 520}
            height={lang === 'fa' ? 180 : 146}
            loading="eager"
            fetchPriority="high"
            className="h-auto w-[min(80vw,26rem)] drop-shadow-[0_18px_22px_rgba(20,8,60,0.45)]"
          />
          <Title3D as="span" className="text-4xl sm:text-5xl">
            {t.heroTitle}
          </Title3D>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-9 text-grape-100 sm:text-xl sm:leading-10">{t.description}</p>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-8">
        {latest ? (
          <>
            <h2 className="sr-only">{t.latest}</h2>
            <PostCard post={latest} locale={lang} place="home" featured />
            {rest.length > 0 && (
              <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <li key={post.slug}>
                    <PostCard post={post} locale={lang} place="home" />
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="py-16 text-center text-xl text-grape-100">{t.empty}</p>
        )}

        <section aria-labelledby="our-games" className="mt-16">
          <h2 id="our-games" className="text-center text-2xl text-gold-300" style={{ textShadow: 'var(--outline-choco-sm)' }}>
            {t.ourGames}
          </h2>
          <ul className="mx-auto mt-5 max-w-3xl space-y-6">
            {games.map((game) => (
              <li key={game.slug}>
                <GameCard game={game} locale={lang} place="home" />
              </li>
            ))}
          </ul>
        </section>

        {tags.length > 0 && (
          <nav aria-label={t.topics} className="mt-16 text-center">
            <h2 className="text-2xl text-gold-300" style={{ textShadow: 'var(--outline-choco-sm)' }}>
              {t.topics}
            </h2>
            <ul className="mt-5 flex flex-wrap justify-center gap-3">
              {tags.map(({ tag, count }) => (
                <li key={tag}>
                  <Link href={`/${lang}/tags/${tag}`} className="btn-3d btn-3d--sm tone-grape">
                    <span>{TAGS[tag][lang]}</span>
                    <span className="rounded-full bg-black/20 px-2 text-sm">{formatNumber(lang, count)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </>
  )
}
