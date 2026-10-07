import { House } from 'lucide-react'
import { Link } from 'react-router'
import { Reveal } from '../../../components/Reveal'
import { SocialIcon } from '../../../components/SocialIcon'
import { StudioLogo } from '../../../components/StudioLogo'
import { StudioLogotype } from '../../../components/StudioLogotype'
import { localePath } from '../../../i18n/locales'
import { track } from '../../../lib/analytics'
import { cn } from '../../../lib/cn'
import { STUDIO } from '../../../studio/studio'
import { FlatHeading } from '../components/FlatHeading'
import { useContent } from '../content'

const LINK_FACES = ['face-lilac', 'face-sky', 'face-pink', 'face-peach', 'face-mint']

/** The studio's card in the page's flat look: its icon, logotype, a few words and its links. */
export function Studio() {
  const { locale, t } = useContent()
  return (
    <section id="studio" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <FlatHeading eyebrow={t.studio.eyebrow} face="peach" title={t.studio.title} subtitle={t.studio.subtitle} />
        <Reveal className="mx-auto max-w-3xl">
          <article className="sticker sticker--lg px-6 pt-8 pb-8 sm:px-10 sm:pt-10 sm:pb-10">
            <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:gap-7 sm:text-start">
              <div className="sunburst sun-violet grid size-32 shrink-0 place-items-center rounded-full border-[3px] border-plum shadow-[0_5px_0_var(--color-plum)]">
                <StudioLogo className="mt-1 w-16" />
              </div>
              <div>
                <h3>
                  <StudioLogotype size="card" onLight className="mx-auto sm:mx-0" />
                </h3>
                <p className="mt-2 text-lg font-bold text-plum-soft">{t.studio.role}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-[1.1rem] leading-9 text-plum-soft">
              <p>{STUDIO.intro[locale]}</p>
              <p>{t.studio.story}</p>
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-3 sm:justify-start">
              <Link
                to={`${localePath(locale)}#about`}
                prefetch="intent"
                className="flat-btn flat-btn--sm face-butter"
                onClick={() => track('studio_visit')}
              >
                <House className="size-5" strokeWidth={2.6} aria-hidden="true" />
                {t.studio.visit}
              </Link>
              {STUDIO.links.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn('flat-btn flat-btn--sm', LINK_FACES[i % LINK_FACES.length])}
                >
                  <SocialIcon kind={link.kind} className="size-5" />
                  {link.label[locale]}
                </a>
              ))}
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
