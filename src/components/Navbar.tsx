import { Menu, X } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { UI } from '../i18n/ui'
import { useLocale } from '../i18n/useLocale'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { track } from '../lib/analytics'
import { cn } from '../lib/cn'
import { LanguageSwitch } from './LanguageSwitch'

export interface NavLink {
  /** A section of the page, like "#features". */
  href: string
  label: string
}

interface NavbarProps {
  /** The logo at the start of the bar; it links back to the top of the page. */
  brand: ReactNode
  links: NavLink[]
  /** The flat art of Sort Puzzle 2.0: a cream bar with a plum outline and a hard shadow. */
  look?: 'flat'
}

export function Navbar({ brand, links, look }: NavbarProps) {
  const flat = look === 'flat'
  const ui = UI[useLocale()]
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useScrollSpy(links.map((link) => link.href.slice(1)))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)
  const toggle = () => {
    if (!open) track('menu_open')
    setOpen(!open)
  }
  const section = (link: NavLink) => link.href.replace(/^#/, '')
  // Long menus only fit in the bar on wide screens (English labels run longer).
  const inline = links.length > 4 ? { show: 'xl:flex', hide: 'xl:hidden' } : { show: 'lg:flex', hide: 'lg:hidden' }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label={ui.pageSections}
        className={cn(
          'mx-auto flex max-w-6xl items-center gap-3 rounded-[1.6rem] border-[3px] px-3 py-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 sm:px-4',
          !(scrolled || open)
            ? 'border-transparent'
            : flat
              ? 'border-plum bg-paper/95 shadow-[0_5px_0_var(--color-plum)] backdrop-blur-md'
              : 'border-choco bg-grape-700/85 shadow-[inset_0_2px_0_rgb(255_255_255/0.15),0_6px_0_rgb(34_21_106/0.9),0_14px_30px_rgb(10_4_36/0.45)] backdrop-blur-md',
        )}
      >
        <a href="#top" className="shrink-0 transition-transform hover:scale-105 hover:-rotate-2" onClick={close}>
          {brand}
        </a>

        <ul className={cn('ms-4 hidden items-center gap-1', inline.show)}>
          {links.map((link) => {
            const current = active === link.href.slice(1)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={current ? 'true' : undefined}
                  onClick={() => track('nav_click', { section: section(link), place: 'navbar' })}
                  className={cn(
                    'rounded-full pt-1 pb-1.5 whitespace-nowrap transition-colors',
                    // Long menus get a size smaller so they still fit in the bar.
                    links.length > 6 ? 'px-3 text-base' : 'px-3.5 text-lg',
                    flat
                      ? current
                        ? 'bg-butter font-extrabold text-plum shadow-[inset_0_0_0_2.5px_var(--color-plum)]'
                        : 'font-bold text-plum/80 hover:bg-plum/10 hover:text-plum'
                      : current
                        ? 'bg-white/15 text-gold-300'
                        : 'text-white/85 hover:bg-white/10 hover:text-white',
                  )}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="ms-auto flex items-center gap-2">
          {/* On phones it moves into the menu. */}
          <div className="hidden sm:block">
            <LanguageSwitch look={look} place="navbar" />
          </div>
          {flat ? (
            <button
              type="button"
              className={cn('flat-round face-sky size-11', inline.hide)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? ui.closeMenu : ui.openMenu}
              onClick={toggle}
            >
              {open ? <X className="size-6" strokeWidth={2.8} /> : <Menu className="size-6" strokeWidth={2.8} />}
            </button>
          ) : (
            <button
              type="button"
              className={cn('icon-3d tone-grape size-11 cursor-pointer', inline.hide)}
              style={{ fontSize: 11 }}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? ui.closeMenu : ui.openMenu}
              onClick={toggle}
            >
              {open ? <X strokeWidth={6} /> : <Menu strokeWidth={6} />}
              {open ? <X strokeWidth={3} /> : <Menu strokeWidth={3} />}
            </button>
          )}
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className={cn(
            'mx-auto mt-3 max-w-6xl animate-pop-in p-3 backdrop-blur-md',
            flat ? 'sticker sticker--sm' : 'panel-3d bg-grape-800',
            inline.hide,
          )}
          style={{ animationDuration: '0.35s' }}
        >
          <ul className="grid grid-cols-2 gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => {
                    track('nav_click', { section: section(link), place: 'menu' })
                    close()
                  }}
                  className={cn(
                    'block rounded-2xl px-4 pt-2.5 pb-3 text-center text-lg transition-colors',
                    flat ? 'bg-ground font-bold text-plum hover:bg-ground-dot' : 'bg-white/10 hover:bg-white/20',
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-2 sm:hidden">
            <LanguageSwitch block size="lg" look={look} place="menu" onClick={close} />
          </div>
        </div>
      )}
    </header>
  )
}
