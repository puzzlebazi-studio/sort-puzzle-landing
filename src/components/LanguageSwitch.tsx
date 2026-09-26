import { Languages } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { LOCALE_INFO, LOCALES, switchLocalePath } from '../i18n/locales'
import { UI } from '../i18n/ui'
import { useLocale } from '../i18n/useLocale'
import { cn } from '../lib/cn'

const SIZES = {
  sm: 'px-3 pt-0.5 pb-1 text-sm',
  md: 'px-3 pt-1 pb-1.5 text-base',
  lg: 'px-4 py-2 text-lg',
}

interface LanguageSwitchProps {
  size?: keyof typeof SIZES
  /** Fill the width, as a row of a menu. */
  block?: boolean
  onClick?: () => void
}

/** Opens the same page in the other language. With more than two languages this would become a menu. */
export function LanguageSwitch({ size = 'md', block, onClick }: LanguageSwitchProps) {
  const locale = useLocale()
  const { pathname } = useLocation()
  const target = LOCALES.find((lang) => lang !== locale) ?? locale
  return (
    <Link
      to={switchLocalePath(pathname, target)}
      hrefLang={target}
      title={UI[target].readIn}
      onClick={onClick}
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-1.5 border-2 border-white/25 bg-white/10 text-white transition-colors hover:border-white/40 hover:bg-white/20',
        SIZES[size],
        block ? 'w-full rounded-2xl' : 'rounded-full',
      )}
    >
      <Languages className="size-[1.15em] shrink-0" strokeWidth={2.4} aria-hidden="true" />
      <span lang={target}>{LOCALE_INFO[target].name}</span>
    </Link>
  )
}
