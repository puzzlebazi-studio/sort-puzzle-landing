import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { UI } from '@/lib/i18n'
import './globals.css'

const lahzeh = localFont({
  src: [
    { path: '../fonts/Lahzeh-Regular.woff2', weight: '400' },
    { path: '../fonts/Lahzeh-ExtraBold.woff2', weight: '800' },
  ],
  variable: '--font-lahzeh',
})

export const metadata: Metadata = { title: `${UI.fa.notFound.title} | ${UI.en.notFound.title}` }

/** Any address outside /fa and /en, in both languages: there is no layout to tell which. */
export default function GlobalNotFound() {
  return (
    <html lang="fa" dir="rtl" className={lahzeh.variable}>
      <body className="page-bg grid min-h-dvh place-items-center px-4 font-sans">
        <main className="card-3d w-full max-w-lg px-8 py-10 text-center">
          <p className="text-7xl font-extrabold text-grape-500">۴۰۴</p>
          <h1 className="mt-4 text-3xl">{UI.fa.notFound.title}</h1>
          <p className="mt-2 text-lg leading-8 text-choco-soft">{UI.fa.notFound.text}</p>
          <a href="/fa" className="btn-3d tone-gold mt-6">
            <span>{UI.fa.backToBlog}</span>
          </a>
          <div lang="en" dir="ltr" className="mt-8 border-t-[3px] border-dashed border-cream-deep pt-6">
            <h2 className="text-2xl">{UI.en.notFound.title}</h2>
            <p className="mt-2 text-lg leading-8 text-choco-soft">{UI.en.notFound.text}</p>
            <a href="/en" className="btn-3d btn-3d--sm tone-aqua mt-5">
              <span>{UI.en.backToBlog}</span>
            </a>
          </div>
        </main>
      </body>
    </html>
  )
}
