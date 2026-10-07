import { Play } from 'lucide-react'
import type { CSSProperties } from 'react'
import { StoreBadge } from '../../../components/StoreBadge'
import { track } from '../../../lib/analytics'
import { cn } from '../../../lib/cn'
import homeShot from '../assets/shots/home.webp'
import { BottleArt } from '../components/art/Bottle'
import { BOTTLE_WIDTH, bottleHeight } from '../components/art/geometry'
import { Coin, FlatSparkle } from '../components/art/Decor'
import { Pour } from '../components/art/Scenes'
import { GameLogo } from '../components/GameLogo'
import { useContent, type Face } from '../content'
import { STORES } from '../stores'

const STAT_FACES: Face[] = ['butter', 'mint', 'pink', 'sky']

export function Hero() {
  const { t, tagline } = useContent()

  return (
    <section id="top" className="sunburst sun-violet relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 md:pb-24" style={{ '--sun-at': '70% 55%' } as CSSProperties}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-[1.1fr_1fr] lg:gap-6">
        <div className="relative z-10 text-center lg:text-start">
          <span className="flat-chip animate-pop-in">
            <FlatSparkle size={16} gold twinkle={false} />
            {t.hero.eyebrow}
          </span>

          <h1 className="relative mx-auto mt-6 w-[min(88vw,560px)] lg:mx-0">
            <GameLogo size="hero" priority className="block animate-bob-slow" />
          </h1>

          <p className="mt-6 inline-block rounded-full border-[3px] border-plum bg-plum px-6 pt-2 pb-2.5 text-xl font-extrabold text-paper shadow-[0_5px_0_rgb(46_37_69/0.35)] sm:text-2xl">
            {tagline}
          </p>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-9 text-plum sm:text-xl sm:leading-10 lg:mx-0">{t.hero.text}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            {STORES.map((store) => (
              <StoreBadge key={store.id} store={store} height="3.75rem" place="hero" />
            ))}
            <a href="#how" className="flat-btn face-sky" onClick={() => track('how_to_play_click')}>
              <Play className="size-5 fill-plum" strokeWidth={2.4} aria-hidden="true" />
              {t.hero.howTo}
            </a>
          </div>

          <ul className="mx-auto mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4 lg:mx-0">
            {t.hero.stats.map((stat, i) => (
              <li
                key={stat.label}
                className={cn('sticker sticker--sm animate-pop-in flex flex-col items-center px-2 pt-2 pb-2.5', `face-${STAT_FACES[i]}`)}
                style={{ animationDelay: `${250 + i * 90}ms` }}
              >
                <span className="text-[1.7rem] leading-tight font-extrabold">{stat.value}</span>
                <span className="text-sm font-bold">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <HeroArt alt={t.hero.shot} />
      </div>
    </section>
  )
}

/** The game's home screen on a phone, with a pour in front of it like the store banner. */
function HeroArt({ alt }: { alt: string }) {
  const height = bottleHeight(4)
  return (
    <div className="relative mx-auto w-full max-w-[30rem]">
      <div className="relative mx-auto w-[62%] -rotate-4 animate-bob-slow">
        <div className="flat-phone">
          <div className="flat-phone__screen">
            <img src={homeShot} alt={alt} width={720} height={1280} fetchPriority="high" />
          </div>
        </div>
      </div>

      <svg
        viewBox={`-30 -330 ${4 * BOTTLE_WIDTH + 100} ${height + 380}`}
        className="pointer-events-none absolute inset-x-0 -bottom-6 w-full overflow-visible"
        aria-hidden="true"
      >
        <g transform="translate(0 0)">
          <BottleArt layers={[0, 0, 0, 0]} done />
        </g>
        <g transform={`translate(${3 * BOTTLE_WIDTH + 70} 0)`}>
          <BottleArt layers={[4, 2, 2]} />
        </g>
        <Pour from={[3, 2]} into={{ x: 3 * BOTTLE_WIDTH + 70 + BOTTLE_WIDTH / 2, y: 0 }} />
      </svg>

      <Coin className="absolute top-[6%] left-[2%] w-14 animate-float" />
      <Coin className="absolute top-[38%] right-[0%] w-10 animate-float [animation-delay:-2s]" />
      <FlatSparkle size={34} className="absolute top-[2%] right-[14%]" />
      <FlatSparkle size={24} gold className="absolute top-[28%] left-[10%]" style={{ animationDelay: '1.1s' }} />
      <FlatSparkle size={20} className="absolute top-[58%] right-[6%]" style={{ animationDelay: '0.5s' }} />
    </div>
  )
}
