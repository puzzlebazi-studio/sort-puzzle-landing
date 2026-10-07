import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { GameCard } from '@/components/GameCard'
import { ReadTracker } from '@/components/ReadTracker'
import { Share } from '@/components/Share'
import { TrackedLink } from '@/components/TrackedLink'
import { formatDate, formatNumber } from '@/lib/format'
import { gamesOf } from '@/lib/games'
import { isLocale, LOCALE_INFO, LOCALES, otherLocale, TAGS, UI, type Locale } from '@/lib/i18n'
import { getPost, getPosts, hasPost } from '@/lib/posts'
import { blogId, game, gameId, jsonLd, ORGANIZATION_ID, organization } from '@/lib/schema'
import { absoluteUrl } from '@/lib/site'

// Every post of every language is rendered at build time; any other slug is a 404.
export async function generateStaticParams({ params }: { params: { lang: string } }) {
  return isLocale(params.lang) ? getPosts(params.lang).map((post) => ({ slug: post.slug })) : []
}
export const dynamicParams = false

function load(lang: string, slug: string) {
  if (!isLocale(lang)) return undefined
  const post = getPost(lang, slug)
  return post && { post, locale: lang as Locale }
}

export async function generateMetadata({ params }: PageProps<'/[lang]/[slug]'>): Promise<Metadata> {
  const { lang, slug } = await params
  const found = load(lang, slug)
  if (!found) return {}
  const { post, locale } = found
  const languages = Object.fromEntries(LOCALES.filter((l) => hasPost(l, slug)).map((l) => [l, `/${l}/${slug}`]))
  const image = post.cover
    ? { url: post.cover.src, width: 1200, height: 630, alt: post.cover.alt }
    : { url: `/og/default-${locale}.jpg`, width: 1200, height: 630 }
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/${locale}/${slug}`, languages },
    // A page's openGraph replaces the layout's, so the site's name and locale are repeated here.
    openGraph: {
      type: 'article',
      siteName: UI[locale].title,
      locale: LOCALE_INFO[locale].og,
      title: post.title,
      description: post.description,
      url: `/${locale}/${slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [UI[locale].by],
      tags: post.tags.map((tag) => TAGS[tag][locale]),
      images: [image],
    },
  }
}

export default async function PostPage({ params }: PageProps<'/[lang]/[slug]'>) {
  const { lang, slug } = await params
  const found = load(lang, slug)
  if (!found) notFound()
  const { post, locale } = found
  const t = UI[locale]
  const posts = getPosts(locale)
  const index = posts.findIndex((p) => p.slug === slug)
  const newer = posts[index - 1]
  const older = posts[index + 1]
  const url = absoluteUrl(`/${locale}/${slug}`)
  const translated = hasPost(otherLocale(locale), slug)

  const games = gamesOf(post.tags)

  // Structured data: the post, by the studio, about its games (their ids are the studio site's).
  const structured = jsonLd(
    organization(locale),
    ...games.map((g) => game(g, locale)),
    {
      '@type': 'BlogPosting',
      '@id': `${url}#post`,
      headline: post.title,
      description: post.description,
      inLanguage: LOCALE_INFO[locale].intl,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      url,
      mainEntityOfPage: url,
      image: absoluteUrl(post.cover?.src ?? `/og/default-${locale}.jpg`),
      keywords: post.tags.map((tag) => TAGS[tag][locale]),
      author: { '@id': ORGANIZATION_ID },
      publisher: { '@id': ORGANIZATION_ID },
      isPartOf: { '@type': 'Blog', '@id': blogId(locale), name: t.title, url: absoluteUrl(`/${locale}`) },
      ...(games.length > 0 ? { about: games.map((g) => ({ '@id': gameId(g) })) } : {}),
      ...(translated ? { workTranslation: { '@id': `${absoluteUrl(`/${otherLocale(locale)}/${slug}`)}#post` } } : {}),
    },
  )

  return (
    <div className="mx-auto max-w-5xl px-3 pt-8 pb-8 sm:px-4 sm:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structured }} />
      <Breadcrumbs locale={locale} topic={post.tags[0]} />

      <article className="card-3d mt-4 overflow-hidden">
        {post.cover && (
          <div className="p-3 pb-0">
            <Image
              src={post.cover.src}
              alt={post.cover.alt}
              width={1200}
              height={630}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1056px) 1000px, 100vw"
              className="aspect-1200/630 w-full rounded-[1.25rem] border-[3px] border-choco object-cover"
            />
          </div>
        )}
        <header className="px-4 pt-7 sm:px-10">
          <p className="text-base font-bold text-choco-soft">
            <time dateTime={post.date}>{formatDate(locale, post.date)}</time>
            <span aria-hidden="true"> · </span>
            {t.minutes(formatNumber(locale, post.minutes))}
          </p>
          <h1 className="mt-2 text-[2.1rem] leading-[1.4] text-choco sm:text-[2.6rem]">{post.title}</h1>
          <p className="mt-3 text-xl leading-9 text-choco-soft">{post.description}</p>
        </header>
        <div id="post-body" className="prose px-4 pt-6 pb-4 sm:px-10" dangerouslySetInnerHTML={{ __html: post.html }} />
        <ReadTracker slug={slug} />
        <footer className="mx-4 mt-4 mb-8 space-y-5 border-t-[3px] border-dashed border-cream-deep pt-6 sm:mx-10">
          {post.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`/${locale}/tags/${tag}`}
                    className="rounded-full border-[2.5px] border-choco bg-cream-deep/60 px-3 pt-0.5 pb-1 text-base font-bold text-choco transition-colors hover:bg-gold-300"
                  >
                    {TAGS[tag][locale]}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Share url={url} title={post.title} locale={locale} slug={slug} />
        </footer>
      </article>

      {games.map((g) => (
        <GameCard key={g.slug} game={g} locale={locale} place="post" post={slug} className="mt-8" />
      ))}

      {(newer || older) && (
        <nav className="mt-10 grid gap-4 sm:grid-cols-2" aria-label={t.allPosts}>
          {[
            { post: newer, label: t.newer },
            { post: older, label: t.older },
          ].map(({ post: other, label }) =>
            other ? (
              <TrackedLink
                key={other.slug}
                href={`/${locale}/${other.slug}`}
                event="post_open"
                tags={{ post: other.slug, place: 'related' }}
                className="card-3d block px-5 pt-4 pb-5 transition-transform hover:-translate-y-1"
              >
                <span className="text-sm font-bold text-choco-soft">{label}</span>
                <span className="mt-1 block text-xl leading-snug font-extrabold">{other.title}</span>
              </TrackedLink>
            ) : (
              <span key={label} className="hidden sm:block" />
            ),
          )}
        </nav>
      )}
    </div>
  )
}
