import Image from 'next/image'
import Link from 'next/link'
import { formatYear } from '@/lib/format'
import { TAGS, UI, type Locale, type TagId } from '@/lib/i18n'
import { STUDIO_URL } from '@/lib/site'
import { LanguageSwitch } from './LanguageSwitch'
import { TrackedLink } from './TrackedLink'

const LINK = 'text-lg text-grape-200 transition-colors hover:text-white'

/** The studio's logotype, the blog's topics, links to the studio and its games, and the feed. */
export function Footer({ locale, available, tags }: { locale: Locale; available: string[]; tags: TagId[] }) {
  const t = UI[locale]
  return (
    <footer className="border-t-[3px] border-choco bg-grape-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-12 pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <TrackedLink href={`${STUDIO_URL}/${locale}/`} event="studio_link" tags={{ place: 'footer' }} className="inline-block">
            {/* Eager, like the home page's hero: the same file, which Next.js tracks by address, so a lazy
                copy here would mark the hero as lazy (an LCP warning). It's small and already loading there. */}
            <Image
              src={`/brand/logotype-${locale}-on-dark.svg`}
              alt={t.by}
              width={locale === 'fa' ? 191 : 286}
              height={80}
              loading="eager"
              className="h-20 w-auto"
            />
          </TrackedLink>
          <p className="mt-3 max-w-sm text-lg leading-9 text-grape-200">{t.description}</p>
        </div>
        <nav aria-label={t.topics}>
          <h2 className="text-xl text-gold-300">{t.topics}</h2>
          <ul className="mt-3 space-y-2">
            {tags.map((tag) => (
              <li key={tag}>
                <Link href={`/${locale}/tags/${tag}`} className={LINK}>
                  {TAGS[tag][locale]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t.by}>
          <h2 className="text-xl text-gold-300">{t.by}</h2>
          <ul className="mt-3 space-y-2">
            <li>
              <TrackedLink href={`${STUDIO_URL}/${locale}/`} event="studio_link" tags={{ place: 'footer' }} className={LINK}>
                {t.studioSite}
              </TrackedLink>
            </li>
            <li>
              <TrackedLink href={`${STUDIO_URL}/${locale}/sort-puzzle/`} event="studio_link" tags={{ place: 'footer' }} className={LINK}>
                {t.sortPuzzle}
              </TrackedLink>
            </li>
            <li>
              <a href={`/${locale}/rss.xml`} className={LINK}>
                {t.rss}
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-5 text-base text-grape-300 sm:flex-row">
          <p>
            © {formatYear(locale)} {t.by}. {t.rights}
          </p>
          <LanguageSwitch locale={locale} available={available} place="footer" />
        </div>
      </div>
    </footer>
  )
}
