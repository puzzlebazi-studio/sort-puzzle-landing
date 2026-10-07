import Link from 'next/link'
import { TAGS, UI, type Locale, type TagId } from '@/lib/i18n'
import { studioPage } from '@/lib/landing'
import { TrackedLink } from './TrackedLink'

const LINK = 'rounded-full px-2 pt-0.5 pb-1 transition-colors hover:bg-white/10 hover:text-white'

/**
 * Where a page sits: the studio's site, the blog, then the post's topic. The trail starts at the
 * studio's site, so every post and topic links back to it.
 */
export function Breadcrumbs({ locale, topic }: { locale: Locale; topic?: TagId }) {
  const t = UI[locale]
  return (
    <nav aria-label={t.breadcrumbs}>
      <ol className="-ms-2 flex flex-wrap items-center gap-y-1 text-lg font-bold text-grape-100">
        <li>
          <TrackedLink href={studioPage(locale)} event="studio_link" tags={{ place: 'breadcrumb' }} className={LINK}>
            {t.by}
          </TrackedLink>
        </li>
        <li className="flex items-center">
          {/* › turns to ‹ in Persian, which reads right to left. */}
          <span aria-hidden="true" className="px-0.5 text-grape-300">
            ›
          </span>
          <Link href={`/${locale}`} className={LINK}>
            {t.blog}
          </Link>
        </li>
        {topic && (
          <li className="flex items-center">
            <span aria-hidden="true" className="px-0.5 text-grape-300">
              ›
            </span>
            <Link href={`/${locale}/tags/${topic}`} className={LINK}>
              {TAGS[topic][locale]}
            </Link>
          </li>
        )}
      </ol>
    </nav>
  )
}
