import { Play } from 'lucide-react'
import { useRef, type CSSProperties, type ReactNode } from 'react'
import logo from '../assets/img/logo-title.webp'
import starFull from '../assets/img/star-full.webp'
import { Button3D } from '../components/Button3D'
import { Coin3D } from '../components/Coin3D'
import { Sparkle } from '../components/Sparkle'
import { StoreButton } from '../components/StoreButton'
import { Title3D } from '../components/Title3D'
import { TubeArt } from '../components/tube/TubeArt'
import { Wave } from '../components/Wave'
import { HERO_STATS } from '../data/content'
import { BAZAAR, SITE } from '../data/site'
import { usePointerParallax } from '../hooks/usePointerParallax'
import { cn } from '../lib/cn'

/** Like the game's home screen: finished bottles with corks between mixed ones. */
const SHELF = [
  { colors: [0, 0, 0, 0], cork: true, edge: true },
  { colors: [1, 3, 1, 2] },
  { colors: [4, 4, 4, 4], cork: true },
  { colors: [2, 7, 3, 3] },
  { colors: [6, 6, 6, 6], cork: true },
  { colors: [5, 0, 5, 1] },
  { colors: [3, 3, 3, 3], cork: true, edge: true },
]

/** Moves with the pointer by `depth` pixels; nearer objects move more. */
function Depth({ depth, className, children }: { depth: number; className?: string; children: ReactNode }) {
  return (
    <div
      className={cn('absolute transition-transform duration-500 ease-out', className)}
      style={{ transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth * 0.7}px), 0)` }}
    >
      {children}
    </div>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  usePointerParallax(ref)

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate overflow-hidden bg-[radial-gradient(60rem_36rem_at_50%_8rem,#9a84ff_0%,#7560ee_32%,transparent_75%),linear-gradient(180deg,#6650e2_0%,#5540c8_45%,#4432b4_80%,#3b2ba6_100%)] pt-28 sm:pt-32"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 [background-image:var(--pattern)] [background-size:240px]" />
      <div aria-hidden="true" className="absolute top-1/3 -right-24 -z-10 size-96 rounded-full bg-berry-500/25 blur-3xl" />
      <div aria-hidden="true" className="absolute top-10 -left-32 -z-10 size-[28rem] rounded-full bg-aqua-400/20 blur-3xl" />

      <HeroDecor />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <span className="eyebrow tone-aqua animate-pop-in">
          <Sparkle size={14} className="animate-none" />
          بازی پازل رنگی برای اندروید
        </span>

        <h1 className="relative mx-auto mt-5 w-[min(90vw,660px)]">
          <img
            src={logo}
            alt={SITE.name}
            width={912}
            height={304}
            fetchPriority="high"
            className="w-full animate-bob-slow drop-shadow-[0_18px_22px_rgba(20,8,60,0.45)]"
          />
          <Sparkle size={30} className="absolute top-[6%] right-[12%]" style={{ animationDelay: '0.6s' }} />
          <Sparkle size={22} className="absolute bottom-[14%] left-[8%]" style={{ animationDelay: '1.5s' }} />
        </h1>

        <Title3D as="p" tone="white" className="mt-3 text-3xl sm:text-4xl md:text-[2.8rem]">
          {SITE.tagline}
        </Title3D>

        <p className="mx-auto mt-4 max-w-xl text-lg leading-9 text-grape-100 sm:text-xl sm:leading-10">
          مایع‌های رنگی را بین بطری‌ها جابه‌جا کن تا هر بطری فقط یک رنگ داشته باشد. ساده شروع می‌شود، اما ۱۰۰۰ مرحله فرصت داری تا استاد
          مرتب‌سازی شوی.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <StoreButton store={BAZAAR} size="lg" />
          <Button3D href="#how" tone="aqua" size="lg" icon={<Play className="size-6 fill-white" strokeWidth={2.5} aria-hidden="true" />}>
            چطور بازی کنم؟
          </Button3D>
        </div>

        <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {HERO_STATS.map((stat, i) => (
            <li
              key={stat.label}
              className="pill-3d animate-pop-in flex-col justify-center gap-0 rounded-3xl px-3 pt-2 pb-3"
              style={{ animationDelay: `${300 + i * 90}ms` }}
            >
              <span className="text-2xl text-gold-300 text-outline-sm sm:text-3xl">{stat.value}</span>
              <span className="text-sm text-grape-100 sm:text-base">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <Shelf />

      <Wave
        className="relative mt-4"
        layers={[
          { color: '#ff5fb2', opacity: 0.8, speed: 19, offset: -30 },
          { color: '#22d3ee', opacity: 0.85, speed: -13, offset: -12 },
          { color: '#3a2aa5', speed: 9, offset: 8 },
        ]}
      />
    </section>
  )
}

function Shelf() {
  return (
    <div className="relative z-10 mx-auto mt-10 flex max-w-4xl items-end justify-center gap-3 px-4 sm:mt-14 sm:gap-6">
      {SHELF.map((bottle, i) => (
        <div key={i} className={cn('group relative flex flex-col items-center', bottle.edge && 'hidden sm:flex')}>
          <div className="transition-transform duration-300 ease-[cubic-bezier(.3,1.7,.5,1)] group-hover:-translate-y-5">
            <div className="animate-bob" style={{ animationDelay: `${-i * 0.45}s` }}>
              <TubeArt colors={bottle.colors} cork={bottle.cork} bubbles className="w-12 sm:w-[4.6rem]" />
            </div>
          </div>
          <span
            aria-hidden="true"
            className="mt-2 h-3 w-14 rounded-[50%] bg-[#1a0f55]/60 blur-[3px] sm:w-20"
            style={{ animation: `shadow-bob 3.4s ease-in-out ${-i * 0.45}s infinite` }}
          />
        </div>
      ))}
    </div>
  )
}

function HeroDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      <Depth depth={-26} className="top-[18%] left-[5%] hidden lg:block">
        <div className="animate-float" style={{ '--r': '-18deg' } as CSSProperties}>
          <TubeArt colors={[1, 6, 6, 4]} bubbles className="w-20 opacity-95" />
        </div>
      </Depth>
      <Depth depth={34} className="top-[16%] right-[7%] hidden md:block">
        <Coin3D size={78} speed={4.5} />
      </Depth>
      <Depth depth={18} className="top-[47%] right-[4%] hidden lg:block">
        <div className="animate-float" style={{ '--r': '14deg', animationDelay: '-2s' } as CSSProperties}>
          <TubeArt colors={[7, 7, 7, 7]} cork className="w-[4.2rem]" />
        </div>
      </Depth>
      <Depth depth={-40} className="top-[44%] left-[10%] hidden md:block">
        <img src={starFull} alt="" width={184} height={200} className="w-16 animate-float" style={{ '--r': '-12deg' } as CSSProperties} />
      </Depth>
      <Depth depth={22} className="top-[64%] left-[4%] hidden lg:block">
        <Coin3D size={50} speed={3.6} phase={0.4} />
      </Depth>
      <Depth depth={-14} className="top-[8%] right-[30%] hidden xl:block">
        <Coin3D size={36} speed={3.2} phase={0.7} />
      </Depth>

      <Depth depth={10} className="inset-0">
        {[
          ['12%', '22%', 18, 0],
          ['30%', '8%', 12, 1.2],
          ['58%', '16%', 16, 0.4],
          ['20%', '84%', 14, 2.1],
          ['40%', '93%', 20, 0.9],
          ['70%', '88%', 12, 1.7],
          ['8%', '62%', 10, 2.6],
          ['78%', '30%', 14, 0.2],
        ].map(([top, left, size, delay], i) => (
          <Sparkle key={i} size={size as number} className="absolute" style={{ top, left, animationDelay: `${delay}s` } as CSSProperties} />
        ))}
      </Depth>
    </div>
  )
}
