import { House } from 'lucide-react'
import { formatNumber } from '../i18n/format'
import { localePath } from '../i18n/locales'
import { UI } from '../i18n/ui'
import { useLocale } from '../i18n/useLocale'
import { Button3D } from './Button3D'
import { LanguageSwitch } from './LanguageSwitch'
import { PuzzlePiece } from './PuzzlePiece'
import { Sparkle } from './Sparkle'
import { Title3D } from './Title3D'

interface MessagePageProps {
  /** Big lettering above the message, like "۴۰۴". */
  heading: string
  title: string
  text: string
}

/** A whole-page message with a way home, for "page not found" and errors. */
export function MessagePage({ heading, title, text }: MessagePageProps) {
  const locale = useLocale()
  return (
    <main id="main" className="page-bg flex min-h-dvh flex-col items-center justify-center px-4 py-20 text-center">
      <div className="relative">
        <PuzzlePiece tone="grape" label="?" className="w-36 animate-bob drop-shadow-[0_16px_18px_rgba(12,4,40,0.4)]" />
        <Sparkle size={26} className="absolute -top-2 -right-4" />
        <Sparkle size={18} className="absolute bottom-6 -left-6" style={{ animationDelay: '1.3s' }} />
      </div>
      <Title3D as="h1" className="mt-8 text-7xl sm:text-8xl">
        {heading}
      </Title3D>
      <p className="mt-2 text-3xl">{title}</p>
      <p className="mt-3 max-w-md text-lg leading-9 text-grape-100">{text}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Button3D to={localePath(locale)} tone="gold" icon={<House className="size-5" strokeWidth={3} aria-hidden="true" />}>
          {UI[locale].backHome}
        </Button3D>
        <LanguageSwitch size="lg" />
      </div>
    </main>
  )
}

export function NotFoundPage() {
  const locale = useLocale()
  const ui = UI[locale]
  return <MessagePage heading={formatNumber(locale, 404)} title={ui.notFound.title} text={ui.notFound.text} />
}
