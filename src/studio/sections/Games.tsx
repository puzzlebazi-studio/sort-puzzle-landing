import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button3D } from '../../components/Button3D'
import { CandyBall } from '../../components/CandyBall'
import { PhoneFrame } from '../../components/PhoneFrame'
import { Reveal } from '../../components/Reveal'
import { SectionHeading } from '../../components/SectionHeading'
import { Sparkle } from '../../components/Sparkle'
import { StoreBadge } from '../../components/StoreBadge'
import { Title3D } from '../../components/Title3D'
import { GAMES } from '../../games/registry'
import type { Game } from '../../games/types'
import { LOCALE_INFO, localePath } from '../../i18n/locales'
import { track } from '../../lib/analytics'
import { cn } from '../../lib/cn'
import { useStudioContent } from '../content'

export function Games() {
  const { t } = useStudioContent()
  return (
    <section id="games" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading eyebrow={t.games.eyebrow} tone="pink" title={t.games.title} subtitle={t.games.subtitle} />
        <ul className="space-y-12">
          {GAMES.map((game, i) => (
            <li key={game.slug}>
              <Reveal>
                <GameCard game={game} flip={i % 2 === 1} />
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal className="mt-12">
          <div className="flex flex-col items-center gap-4 rounded-[1.75rem] border-[3px] border-dashed border-white/30 bg-white/5 px-6 py-7 text-center sm:flex-row sm:gap-6 sm:px-8 sm:text-start">
            <CandyBall tone="grape" label="?" className="w-16 shrink-0 animate-bob" />
            <div>
              <h3 className="text-2xl text-gold-300 text-outline-sm">{t.games.next.title}</h3>
              <p className="mt-1 text-lg leading-8 text-grape-100">{t.games.next.text}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** A game's screenshot beside its name, a short pitch and the way to its page. */
function GameCard({ game, flip }: { game: Game; flip: boolean }) {
  const { locale, t } = useStudioContent()
  const Arrow = LOCALE_INFO[locale].dir === 'rtl' ? ArrowLeft : ArrowRight
  const name = game.name[locale]

  return (
    <article className="card-3d grid items-center gap-8 p-4 pb-8 sm:p-5 sm:pb-9 md:grid-cols-[0.9fr_1.1fr] md:gap-10 md:p-6">
      <div
        className={cn(
          'relative h-72 overflow-hidden rounded-[1.25rem] border-[3px] border-choco bg-[radial-gradient(circle_at_50%_30%,#8a74f5,#5540c8_70%)] shadow-[inset_0_-6px_0_rgb(0_0_0/0.18)] sm:h-80',
          flip && 'md:order-last',
        )}
      >
        <div aria-hidden="true" className="absolute inset-0 [background-image:var(--pattern)] [background-size:180px]" />
        <div className="relative mx-auto mt-8 w-44 rotate-[-4deg] sm:w-48">
          <PhoneFrame src={game.screenshot} alt="" />
        </div>
        <Sparkle size={24} className="absolute top-6 left-6" />
        <Sparkle size={16} className="absolute top-20 right-7" style={{ animationDelay: '1.4s' }} />
      </div>

      <div className="px-2 text-center md:px-0 md:text-start">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <img
            src={game.icon}
            alt=""
            width={256}
            height={256}
            loading="lazy"
            decoding="async"
            className="size-20 shrink-0 rounded-[24%] border-[3px] border-choco shadow-[0_5px_0_rgb(58_21_0/0.3),0_12px_20px_rgb(12_4_40/0.25)]"
          />
          <div>
            <Title3D as="h3" className="text-4xl sm:text-[2.6rem]">
              {name}
            </Title3D>
            <p className="text-xl text-choco-soft">{game.tagline[locale]}</p>
          </div>
        </div>
        <p className="mt-5 text-lg leading-9 text-choco-soft">{game.summary[locale]}</p>
        <ul className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
          {game.tags[locale].map((tag) => (
            <li key={tag} className="rounded-full border-[2.5px] border-choco bg-cream-deep/60 px-3.5 pt-0.5 pb-1 text-base text-choco">
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <Button3D
            to={localePath(locale, game.slug)}
            prefetch="intent"
            tone={game.tone}
            aria-label={`${t.games.view}: ${name}`}
            onClick={() => track('game_open', { game: game.slug, place: 'games' })}
            icon={<Arrow className="size-5 order-last" strokeWidth={3} aria-hidden="true" />}
          >
            {t.games.view}
          </Button3D>
          {game.store && <StoreBadge store={game.store} height="3.4rem" place="games" />}
        </div>
      </div>
    </article>
  )
}
