'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { otherLocale, UI, type Locale } from '@/lib/i18n'
import { track } from '@/lib/analytics'

interface LanguageSwitchProps {
  locale: Locale
  /** Every address that exists in the other language, so a post without a translation links to the blog's home. */
  available: string[]
  place: 'header' | 'footer'
}

/** The same page in the other language when it exists, else that language's blog home. */
export function LanguageSwitch({ locale, available, place }: LanguageSwitchProps) {
  const pathname = usePathname()
  const target = otherLocale(locale)
  const same = pathname.replace(/^\/(fa|en)(?=\/|$)/, `/${target}`).replace(/\/$/, '') || `/${target}`
  const href = available.includes(same) ? same : `/${target}`
  return (
    <Link
      href={href}
      hrefLang={target}
      lang={target}
      title={UI[target].readIn}
      onClick={() => track('language_switch', { language: target, place })}
      className="inline-flex shrink-0 items-center rounded-full border-2 border-white/25 bg-white/10 px-3.5 pt-1 pb-1.5 text-base font-bold text-white transition-colors hover:border-white/40 hover:bg-white/20"
    >
      {UI[locale].switchTo}
    </Link>
  )
}
