import Image from 'next/image'
import { gamePage, type Game } from '@/lib/games'
import { UI, type Locale } from '@/lib/i18n'
import { TrackedLink } from './TrackedLink'

interface GameCardProps {
  game: Game
  locale: Locale
  /** Where it's shown: at the end of a post about the game, on the game's topic page, on the blog's home page. */
  place: 'post' | 'tag' | 'home'
  /** The post it closes. */
  post?: string
  className?: string
}

/**
 * A game, with a link to its page on the studio's site (named after the game, so search engines
 * learn what that page is about) and its stores.
 */
export function GameCard({ game, locale, place, post, className = '' }: GameCardProps) {
  const t = UI[locale]
  const name = game.name[locale]
  return (
    <aside aria-label={name} className={`card-3d flex flex-col items-center gap-5 px-5 py-6 text-center sm:flex-row sm:px-8 sm:text-start ${className}`}>
      <Image src={game.icon} alt="" width={88} height={88} className="size-20 shrink-0 rounded-[1.25rem] border-[3px] border-choco" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-choco-soft">{t.game.eyebrow[place]}</p>
        <p className="mt-0.5 text-2xl font-extrabold text-choco">{name}</p>
        <p className="mt-1 text-lg text-choco-soft">{game.tagline[locale]}</p>
      </div>
      <div className="flex shrink-0 flex-col items-center gap-3 sm:items-end">
        <TrackedLink href={gamePage(game, locale)} event="studio_link" tags={{ place: `game_card_${place}`, post }} className="btn-3d btn-3d--sm tone-gold">
          <span>{t.game.about(name)}</span>
        </TrackedLink>
        <p className="text-base text-choco-soft">
          {t.game.getOn}{' '}
          {game.stores.map((store, i) => (
            <span key={store.id}>
              {i > 0 && <span aria-hidden="true"> · </span>}
              <TrackedLink
                href={store.href}
                event="store_click"
                tags={{ store: store.id, place: `game_card_${place}`, post }}
                className="font-bold text-grape-700 underline decoration-2 underline-offset-4 hover:text-grape-500"
              >
                {store.name[locale]}
              </TrackedLink>
            </span>
          ))}
        </p>
      </div>
    </aside>
  )
}
