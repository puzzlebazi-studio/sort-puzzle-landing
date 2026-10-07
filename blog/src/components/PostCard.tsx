import Image from 'next/image'
import Link from 'next/link'
import { formatDate, formatNumber } from '@/lib/format'
import { TAGS, UI, type Locale } from '@/lib/i18n'
import type { PostMeta } from '@/lib/posts'
import { TrackedLink } from './TrackedLink'

/** A post in a list: its cover, date and reading time, title, summary and topics. */
export function PostCard({ post, locale, place, featured }: { post: PostMeta; locale: Locale; place: 'home' | 'tag'; featured?: boolean }) {
  const t = UI[locale]
  const href = `/${locale}/${post.slug}`
  return (
    <article className={`card-3d group flex h-full flex-col overflow-hidden p-3 ${featured ? 'md:flex-row md:items-center md:gap-6' : ''}`}>
      {post.cover && (
        <TrackedLink
          href={href}
          event="post_open"
          tags={{ post: post.slug, place }}
          tabIndex={-1}
          aria-hidden="true"
          className={`block shrink-0 overflow-hidden rounded-[1.25rem] border-[3px] border-choco ${featured ? 'md:w-[55%]' : ''}`}
        >
          <Image
            src={post.cover.src}
            alt=""
            width={1200}
            height={630}
            sizes={featured ? '(min-width: 768px) 600px, 100vw' : '(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw'}
            className="aspect-1200/630 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </TrackedLink>
      )}
      <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
        <p className="text-sm font-bold text-choco-soft">
          <time dateTime={post.date}>{formatDate(locale, post.date)}</time>
          <span aria-hidden="true"> · </span>
          {t.minutes(formatNumber(locale, post.minutes))}
        </p>
        <h2 className={`mt-1.5 leading-snug text-choco ${featured ? 'text-3xl' : 'text-2xl'}`}>
          <TrackedLink href={href} event="post_open" tags={{ post: post.slug, place }} className="transition-colors hover:text-grape-600">
            {post.title}
          </TrackedLink>
        </h2>
        <p className="mt-2 text-lg leading-8 text-choco-soft">{post.description}</p>
        {post.tags.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-2 pt-4">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/${locale}/tags/${tag}`}
                  className="rounded-full border-[2.5px] border-choco bg-cream-deep/60 px-3 pt-0.5 pb-1 text-sm font-bold text-choco transition-colors hover:bg-gold-300"
                >
                  {TAGS[tag][locale]}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
