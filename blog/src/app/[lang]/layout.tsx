import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import { Analytics } from '@/components/Analytics'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { isLocale, LOCALE_INFO, LOCALES, otherLocale, UI } from '@/lib/i18n'
import { getTags, pagesOf } from '@/lib/posts'
import { BLOG_URL } from '@/lib/site'
import '../globals.css'

/** Lahzeh, the type of the studio's games, site, ads and banners. */
const lahzeh = localFont({
  src: [
    { path: '../../fonts/Lahzeh-Regular.woff2', weight: '400' },
    { path: '../../fonts/Lahzeh-Bold.woff2', weight: '700' },
    { path: '../../fonts/Lahzeh-ExtraBold.woff2', weight: '800' },
  ],
  variable: '--font-lahzeh',
  display: 'swap',
})

// /fa and /en; any other first segment is a 404 (app/global-not-found.tsx).
export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }))
export const dynamicParams = false

export const viewport: Viewport = { themeColor: '#5540c8' }

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = UI[lang]
  return {
    metadataBase: new URL(BLOG_URL),
    title: { default: t.title, template: `%s | ${t.title}` },
    description: t.description,
    applicationName: t.title,
    alternates: { types: { 'application/rss+xml': [{ url: `/${lang}/rss.xml`, title: t.title }] } },
    openGraph: { siteName: t.title, locale: LOCALE_INFO[lang].og, type: 'website', images: [{ url: `/og/default-${lang}.jpg`, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image' },
    icons: { icon: { url: '/favicon.svg', type: 'image/svg+xml' }, apple: '/apple-touch-icon.png' },
  }
}

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = UI[lang]
  const available = pagesOf(otherLocale(lang))
  return (
    <html lang={lang} dir={LOCALE_INFO[lang].dir} className={lahzeh.variable}>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-gold-400 px-5 py-2 font-bold text-choco focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-4"
        >
          {t.skip}
        </a>
        <Header locale={lang} available={available} />
        <main id="main" tabIndex={-1} className="page-bg min-h-[70vh] pb-24 outline-none">
          {children}
        </main>
        <Footer locale={lang} available={available} tags={getTags(lang).map(({ tag }) => tag)} />
        <Analytics locale={lang} />
      </body>
    </html>
  )
}
