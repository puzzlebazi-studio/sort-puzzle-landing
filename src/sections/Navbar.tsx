import { Download, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import logo from '../assets/img/logo-title.webp'
import { Button3D } from '../components/Button3D'
import { NAV_LINKS } from '../data/content'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { cn } from '../lib/cn'

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1))

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const active = useScrollSpy(SECTION_IDS)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(window.scrollY > 24)
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="بخش‌های صفحه"
        className={cn(
          'relative mx-auto flex max-w-6xl items-center gap-3 rounded-[1.6rem] border-[3px] px-3 py-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 sm:px-4',
          scrolled || open
            ? 'border-choco bg-grape-700/85 shadow-[inset_0_2px_0_rgb(255_255_255/0.15),0_6px_0_rgb(34_21_106/0.9),0_14px_30px_rgb(10_4_36/0.45)] backdrop-blur-md'
            : 'border-transparent',
        )}
      >
        <a href="#top" className="shrink-0 transition-transform hover:scale-105 hover:-rotate-2" onClick={() => setOpen(false)}>
          <img src={logo} alt="سورت پازل" width={912} height={304} className="h-10 w-auto sm:h-11" />
        </a>

        <ul className="ms-4 hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const current = active === link.href.slice(1)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={current ? 'true' : undefined}
                  className={cn(
                    'rounded-full px-3.5 pt-1 pb-1.5 text-lg transition-colors',
                    current ? 'bg-white/15 text-gold-300' : 'text-white/85 hover:bg-white/10 hover:text-white',
                  )}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="ms-auto flex items-center gap-2">
          <Button3D href="#download" size="sm" tone="leaf" icon={<Download className="size-5" strokeWidth={3} aria-hidden="true" />}>
            دانلود
          </Button3D>
          <button
            type="button"
            className="icon-3d tone-grape size-11 cursor-pointer lg:hidden"
            style={{ fontSize: 11 }}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'بستن منو' : 'باز کردن منو'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X strokeWidth={6} /> : <Menu strokeWidth={6} />}
            {open ? <X strokeWidth={3} /> : <Menu strokeWidth={3} />}
          </button>
        </div>

        <span
          aria-hidden="true"
          className="absolute inset-x-5 -bottom-[3px] h-[3px] origin-right rounded-full bg-[linear-gradient(90deg,#ff3b47,#ff8a1f,#ffd83a,#3ddc4a,#22d3ee,#2f7bff,#a45cff)] transition-opacity"
          style={{ transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
        />
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="panel-3d mx-auto mt-3 max-w-6xl animate-pop-in bg-grape-800 p-3 backdrop-blur-md lg:hidden"
          style={{ animationDuration: '0.35s' }}
        >
          <ul className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl bg-white/10 px-4 pt-2.5 pb-3 text-center text-lg transition-colors hover:bg-white/20"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
