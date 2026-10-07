import { Heart } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { formatYear } from '../i18n/format'
import { localePath } from '../i18n/locales'
import { UI } from '../i18n/ui'
import { useLocale } from '../i18n/useLocale'
import { cn } from '../lib/cn'
import { STUDIO } from '../studio/studio'
import { LanguageSwitch } from './LanguageSwitch'
import { SocialIcon } from './SocialIcon'
import { Wave } from './Wave'

export interface FooterLink {
  label: string
  /** A section of this page ("#faq") or another site. */
  href?: string
  /** A page of this site. */
  to?: string
  /** Shown greyed out with "soon", not as a link. */
  soon?: boolean
  /** Runs on click, e.g. to report it to analytics. */
  onClick?: () => void
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
  /** Two columns of links, for long lists. */
  wide?: boolean
}

interface SiteFooterProps {
  brand: ReactNode
  blurb: string
  columns: FooterColumn[]
  /** The name after ©. */
  owner: string
  /** Credit the studio, for pages that belong to one of its games. */
  credit?: boolean
  /** The flat art of Sort Puzzle 2.0: plum, with butter headings and no waves. */
  look?: 'flat'
}

const LINK = 'text-lg text-grape-200 transition-colors hover:text-white'
const FLAT_LINK = 'text-lg text-ground transition-colors hover:text-butter'

export function SiteFooter({ brand, blurb, columns, owner, credit, look }: SiteFooterProps) {
  const locale = useLocale()
  const ui = UI[locale]
  const flat = look === 'flat'
  const link = flat ? FLAT_LINK : LINK

  return (
    <footer className={cn('relative', flat ? 'border-t-4 border-plum bg-plum' : 'bg-grape-950')}>
      {!flat && (
        <Wave
          className="absolute inset-x-0 bottom-full"
          layers={[
            { color: '#a45cff', opacity: 0.45, speed: 16, offset: -18 },
            { color: '#160e4b', speed: -11, offset: 6 },
          ]}
        />
      )}
      <div className={cn('mx-auto grid max-w-6xl gap-10 px-4 pb-10 md:grid-cols-[1.4fr_1fr_1fr]', flat ? 'pt-12' : 'pt-8')}>
        <div>
          {brand}
          <p className={cn('mt-3 max-w-sm text-lg leading-9', flat ? 'text-ground' : 'text-grape-200')}>{blurb}</p>
        </div>

        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className={cn('text-xl', flat ? 'text-butter' : 'text-gold-300')}>{column.title}</h2>
            <ul className={cn('mt-3', column.wide ? 'grid grid-cols-2 gap-x-4 gap-y-2' : 'space-y-2')}>
              {column.links.map((item) => (
                <li key={item.label}>
                  <FooterItem link={item} soon={ui.soon} className={link} soonClassName={flat ? 'text-ground-dot' : 'text-grape-300'} />
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className={cn('border-t', flat ? 'border-white/15' : 'border-white/10')}>
        <div
          className={cn(
            'mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-5 text-base sm:flex-row',
            flat ? 'text-ground-dot' : 'text-grape-300',
          )}
        >
          <p>
            © <span suppressHydrationWarning>{formatYear(locale)}</span> {owner}. {ui.rights}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
            {credit && (
              <p className="flex items-center gap-1.5">
                {ui.madeWith}
                <Heart className="size-4 fill-flame-500 text-flame-500" aria-hidden="true" />
                <span className="sr-only">{ui.love}</span>
                {ui.by}
                <Link
                  to={localePath(locale)}
                  className={cn(
                    'underline-offset-4 transition-colors hover:underline',
                    flat ? 'text-paper hover:text-butter' : 'text-grape-200 hover:text-white',
                  )}
                >
                  {STUDIO.name[locale]}
                </Link>
              </p>
            )}
            {STUDIO.links.length > 0 && (
              <ul className="flex items-center gap-3">
                {STUDIO.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label[locale]}
                      className={cn('transition-colors', flat ? 'text-ground hover:text-butter' : 'text-grape-200 hover:text-white')}
                    >
                      <SocialIcon kind={link.kind} className="size-5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <LanguageSwitch size="sm" look={look} place="footer" />
          </div>
        </div>
      </div>
    </footer>
  )
}

interface FooterItemProps {
  link: FooterLink
  soon: string
  className: string
  soonClassName: string
}

function FooterItem({ link, soon, className, soonClassName }: FooterItemProps) {
  if (link.soon) {
    return (
      <span className={cn('text-lg', soonClassName)}>
        {link.label} ({soon})
      </span>
    )
  }
  if (link.to) {
    return (
      <Link to={link.to} className={className} onClick={link.onClick}>
        {link.label}
      </Link>
    )
  }
  const external = link.href?.startsWith('http')
  return (
    <a
      href={link.href}
      className={className}
      onClick={link.onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {link.label}
    </a>
  )
}
