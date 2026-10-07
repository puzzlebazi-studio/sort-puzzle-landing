import Image from 'next/image'
import Link from 'next/link'
import { UI, type Locale } from '@/lib/i18n'
import { STUDIO_URL } from '@/lib/site'
import { LanguageSwitch } from './LanguageSwitch'
import { TrackedLink } from './TrackedLink'

/** The bar on every page: the studio's «پ» icon with the blog's name, the studio's site and the language switch. */
export function Header({ locale, available }: { locale: Locale; available: string[] }) {
  const t = UI[locale]
  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-choco bg-grape-700/90 shadow-[inset_0_-2px_0_rgb(255_255_255/0.08)] backdrop-blur-md">
      <nav aria-label={t.blog} className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5">
        <Link href={`/${locale}`} className="flex shrink-0 items-center gap-2.5 transition-transform hover:-rotate-2">
          <Image src="/brand/mark.svg" alt="" width={44} height={44} loading="eager" className="size-11" />
          <span className="text-xl font-extrabold text-gold-300 sm:text-2xl" style={{ textShadow: 'var(--outline-choco-sm)' }}>
            {t.title}
          </span>
        </Link>
        <div className="ms-auto flex items-center gap-1 sm:gap-2">
          <Link href={`/${locale}`} className="hidden rounded-full px-3.5 pt-1 pb-1.5 text-lg font-bold text-white/85 transition-colors hover:bg-white/10 hover:text-white md:block">
            {t.allPosts}
          </Link>
          <TrackedLink
            href={`${STUDIO_URL}/${locale}/`}
            event="studio_link"
            tags={{ place: 'header' }}
            className="hidden rounded-full px-3.5 pt-1 pb-1.5 text-lg font-bold text-white/85 transition-colors hover:bg-white/10 hover:text-white sm:block"
          >
            {t.studioSite}
          </TrackedLink>
          <LanguageSwitch locale={locale} available={available} place="header" />
        </div>
      </nav>
    </header>
  )
}
