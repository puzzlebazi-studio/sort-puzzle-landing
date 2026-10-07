'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'
import { startAnalytics, tag } from '@/lib/analytics'
import type { Locale } from '@/lib/i18n'
import { GA_MEASUREMENT_ID } from '@/lib/site'

/** Google Analytics and Microsoft Clarity, in production builds only. */
export function Analytics({ locale }: { locale: Locale }) {
  const pathname = usePathname()

  useEffect(startAnalytics, [])
  useEffect(() => {
    // "home", "post" or "tag", and which post.
    const [, , section] = pathname.split('/')
    const page = !section ? 'home' : section === 'tags' ? 'tag' : 'post'
    tag({ site: 'blog', language: locale, page, post: page === 'post' ? section : undefined })
  }, [pathname, locale])

  if (process.env.NODE_ENV !== 'production') return null
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="gtag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  )
}
