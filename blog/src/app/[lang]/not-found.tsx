'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { isLocale, UI } from '@/lib/i18n'

/** An unknown post or topic inside /fa or /en. `not-found` gets no params, so the language comes from the address. */
export default function NotFound() {
  const segment = usePathname().split('/')[1]
  const locale = isLocale(segment) ? segment : 'fa'
  const t = UI[locale]
  return (
    <div className="mx-auto max-w-lg px-4 py-20">
      <div className="card-3d px-8 py-10 text-center">
        <p className="text-7xl font-extrabold text-grape-500">{locale === 'fa' ? '۴۰۴' : '404'}</p>
        <h1 className="mt-4 text-3xl">{t.notFound.title}</h1>
        <p className="mt-2 text-lg leading-8 text-choco-soft">{t.notFound.text}</p>
        <Link href={`/${locale}`} className="btn-3d tone-gold mt-6">
          <span>{t.backToBlog}</span>
        </Link>
      </div>
    </div>
  )
}
