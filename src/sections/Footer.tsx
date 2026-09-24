import { Heart } from 'lucide-react'
import logo from '../assets/img/logo-title.webp'
import { SocialIcon } from '../components/SocialIcon'
import { Wave } from '../components/Wave'
import { NAV_LINKS } from '../data/content'
import { DEVELOPER, SITE, STORES } from '../data/site'
import { faYear } from '../lib/fa'

export function Footer() {
  return (
    <footer className="relative bg-grape-950">
      <Wave
        className="absolute inset-x-0 bottom-full"
        layers={[
          { color: '#a45cff', opacity: 0.45, speed: 16, offset: -18 },
          { color: '#160e4b', speed: -11, offset: 6 },
        ]}
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-8 pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src={logo} alt={SITE.name} width={912} height={304} loading="lazy" className="h-14 w-auto" />
          <p className="mt-3 max-w-sm text-lg leading-9 text-grape-200">{SITE.tagline} بازی پازل مرتب‌سازی رنگ‌ها با ۱۰۰۰ مرحله قابل حل.</p>
        </div>

        <nav aria-label="پیوندهای پایین صفحه">
          <h2 className="text-xl text-gold-300">بخش‌ها</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-lg text-grape-200 transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xl text-gold-300">دانلود</h2>
          <ul className="mt-3 space-y-2">
            {STORES.map((store) => (
              <li key={store.id}>
                {store.comingSoon ? (
                  <span className="text-lg text-grape-300">{store.name} (به‌زودی)</span>
                ) : (
                  <a
                    href={store.href}
                    className="text-lg text-grape-200 transition-colors hover:text-white"
                    {...(store.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : { download: '' })}
                  >
                    {store.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-base text-grape-300 sm:flex-row">
          <p>
            © {faYear()} {SITE.name}. همه حقوق محفوظ است.
          </p>
          <p className="flex items-center gap-1.5">
            ساخته‌شده با
            <Heart className="size-4 fill-flame-500 text-flame-500" aria-hidden="true" />
            <span className="sr-only">عشق</span>
            توسط {DEVELOPER.name}
            {DEVELOPER.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="ms-1 text-grape-200 transition-colors hover:text-white"
              >
                <SocialIcon kind={link.kind} className="size-5" />
              </a>
            ))}
          </p>
        </div>
      </div>
    </footer>
  )
}
