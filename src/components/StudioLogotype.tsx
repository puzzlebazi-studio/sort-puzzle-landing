import type { Localized } from '../i18n/locales'
import { useLocale } from '../i18n/useLocale'
import { cn } from '../lib/cn'
import en from '../studio/assets/logotype-en.svg'
import enOnDark from '../studio/assets/logotype-en-on-dark.svg'
import fa from '../studio/assets/logotype-fa.svg'
import faOnDark from '../studio/assets/logotype-fa-on-dark.svg'
import { STUDIO } from '../studio/studio'

/**
 * The logotypes in brand/. Their small "studio" is black, for light backgrounds; the copies for the
 * site's violet have it in white.
 */
const LOGOTYPES: Localized<{ src: string; onDark: string; width: number; height: number }> = {
  fa: { src: fa, onDark: faOnDark, width: 945, height: 395 },
  en: { src: en, onDark: enOnDark, width: 1132, height: 317 },
}

/** The English logotype is wider for its height, so each size is set per language to look alike. */
const SIZES = {
  footer: { fa: 'h-20 w-auto', en: 'h-16 w-auto' },
  card: { fa: 'h-24 w-auto', en: 'h-[4.5rem] w-auto' },
  hero: { fa: 'w-[min(88vw,34rem)]', en: 'w-[min(90vw,40rem)]' },
} satisfies Record<string, Localized<string>>

interface StudioLogotypeProps {
  size: keyof typeof SIZES
  /** On a light background, like a card: the small word stays black. */
  onLight?: boolean
  /** Load right away: the logotype is the first thing on screen. */
  priority?: boolean
  className?: string
}

/** The studio's name as its logotype: پازل‌بازی with candy balls for dots, and a small "studio" under its end. */
export function StudioLogotype({ size, onLight, priority, className }: StudioLogotypeProps) {
  const locale = useLocale()
  const logotype = LOGOTYPES[locale]
  return (
    <img
      src={onLight ? logotype.src : logotype.onDark}
      alt={STUDIO.name[locale]}
      width={logotype.width}
      height={logotype.height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      className={cn('block', SIZES[size][locale], className)}
    />
  )
}
