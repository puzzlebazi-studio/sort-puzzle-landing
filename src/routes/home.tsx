import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { DEFAULT_LOCALE, localePath } from '../i18n/locales'
import { STUDIO } from '../studio/studio'
import type { Route } from './+types/home'

const TARGET = localePath(DEFAULT_LOCALE)

// "/" is written out as a page that forwards to the default language at once. The refresh works
// without scripts and tells search engines the page lives at /fa/.
export const meta: Route.MetaFunction = () => [
  { title: STUDIO.name[DEFAULT_LOCALE] },
  { httpEquiv: 'refresh', content: `0; url=${TARGET}` },
  { name: 'robots', content: 'noindex' },
]

export default function Home() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(TARGET, { replace: true })
  }, [navigate])
  return (
    <main className="grid min-h-dvh place-items-center">
      <a href={TARGET} className="text-xl text-grape-100 underline underline-offset-8">
        {STUDIO.name[DEFAULT_LOCALE]}
      </a>
    </main>
  )
}
