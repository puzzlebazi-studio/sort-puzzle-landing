import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { GameCard } from '@/components/GameCard'
import { PostCard } from '@/components/PostCard'
import { Title3D } from '@/components/Title3D'
import { formatNumber } from '@/lib/format'
import { GAMES } from '@/lib/games'
import { isLocale, isTag, LOCALES, TAGS, UI } from '@/lib/i18n'
import { getPosts, getTags } from '@/lib/posts'

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  return isLocale(params.lang) ? getTags(params.lang).map(({ tag }) => ({ tag })) : []
}
export const dynamicParams = false

export async function generateMetadata({ params }: PageProps<'/[lang]/tags/[tag]'>): Promise<Metadata> {
  const { lang, tag } = await params
  if (!isLocale(lang) || !isTag(tag)) return {}
  const languages = Object.fromEntries(LOCALES.filter((l) => getTags(l).some((t) => t.tag === tag)).map((l) => [l, `/${l}/tags/${tag}`]))
  return { title: UI[lang].tagged(TAGS[tag][lang]), alternates: { canonical: `/${lang}/tags/${tag}`, languages } }
}

/** The posts on one topic. */
export default async function TagPage({ params }: PageProps<'/[lang]/tags/[tag]'>) {
  const { lang, tag } = await params
  if (!isLocale(lang) || !isTag(tag)) notFound()
  const t = UI[lang]
  const posts = getPosts(lang).filter((post) => post.tags.includes(tag))
  if (posts.length === 0) notFound()
  // A game's topic opens with the game, linking to its page on the studio's site.
  const game = GAMES[tag]

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-8 sm:pt-14">
      <Breadcrumbs locale={lang} />
      <header className="mt-6 mb-10 text-center">
        <Title3D as="h1" className="text-4xl sm:text-5xl">
          {t.tagged(TAGS[tag][lang])}
        </Title3D>
        <p className="mt-2 text-lg text-grape-100">{t.taggedCount(formatNumber(lang, posts.length))}</p>
      </header>
      {game && <GameCard game={game} locale={lang} place="tag" className="mx-auto mb-10 max-w-3xl" />}
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} locale={lang} place="tag" />
          </li>
        ))}
      </ul>
    </div>
  )
}
