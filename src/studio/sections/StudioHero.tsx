import { Gamepad2, Heart } from 'lucide-react'
import { useRef, type CSSProperties } from 'react'
import { Button3D } from '../../components/Button3D'
import { CandyBall } from '../../components/CandyBall'
import { Coin3D } from '../../components/Coin3D'
import { Depth } from '../../components/Depth'
import { Sparkle } from '../../components/Sparkle'
import { StudioLogo } from '../../components/StudioLogo'
import { Title3D } from '../../components/Title3D'
import { Wave } from '../../components/Wave'
import { usePointerParallax } from '../../hooks/usePointerParallax'
import { useStudioContent } from '../content'
import { STUDIO } from '../studio'

export function StudioHero() {
  const { locale, t } = useStudioContent()
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

      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-14 text-center sm:pb-20">
        <span className="eyebrow tone-aqua animate-pop-in">
          <Sparkle size={14} className="animate-none" />
          {t.hero.eyebrow}
        </span>

        <StudioLogo lively className="mx-auto mt-8 block w-28 animate-bob-slow drop-shadow-[0_18px_22px_rgba(20,8,60,0.45)] sm:w-32" />

        <Title3D as="h1" className="mt-5 block text-[3.2rem] leading-[1.3] sm:text-7xl md:text-[5.5rem]">
          {STUDIO.name[locale]}
        </Title3D>

        <Title3D as="p" tone="white" className="mt-2 text-2xl sm:text-3xl md:text-4xl">
          {t.hero.tagline}
        </Title3D>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-9 text-grape-100 sm:text-xl sm:leading-10">{t.hero.text}</p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button3D href="#games" tone="gold" size="lg" icon={<Gamepad2 className="size-7" strokeWidth={2.5} aria-hidden="true" />}>
            {t.hero.games}
          </Button3D>
          <Button3D href="#about" tone="aqua" size="lg" icon={<Heart className="size-6 fill-white" strokeWidth={2.5} aria-hidden="true" />}>
            {t.hero.about}
          </Button3D>
        </div>
      </div>

      <Wave
        className="relative"
        layers={[
          { color: '#ff5fb2', opacity: 0.8, speed: 19, offset: -30 },
          { color: '#22d3ee', opacity: 0.85, speed: -13, offset: -12 },
          { color: '#3a2aa5', speed: 9, offset: 8 },
        ]}
      />
    </section>
  )
}

/** Candy balls like the logo's dots, coins and sparkles floating around the title, drifting with the pointer. */
function HeroDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      <Depth depth={-26} className="top-[20%] left-[5%] hidden md:block">
        <div className="animate-float" style={{ '--r': '-16deg' } as CSSProperties}>
          <CandyBall tone="pink" className="w-16 lg:w-[4.5rem]" />
        </div>
      </Depth>
      <Depth depth={30} className="top-[15%] right-[7%] hidden md:block">
        <div className="animate-float" style={{ '--r': '14deg', animationDelay: '-3s' } as CSSProperties}>
          <CandyBall tone="aqua" className="w-12 lg:w-14" />
        </div>
      </Depth>
      <Depth depth={18} className="top-[50%] right-[4%] hidden lg:block">
        <div className="animate-float" style={{ '--r': '-10deg', animationDelay: '-1.5s' } as CSSProperties}>
          <CandyBall tone="leaf" className="w-11" />
        </div>
      </Depth>
      <Depth depth={-38} className="top-[55%] left-[8%] hidden lg:block">
        <div className="animate-float" style={{ '--r': '22deg', animationDelay: '-4.5s' } as CSSProperties}>
          <CandyBall tone="orange" className="w-10" />
        </div>
      </Depth>
      <Depth depth={24} className="top-[34%] right-[20%] hidden xl:block">
        <Coin3D size={52} speed={4.2} />
      </Depth>
      <Depth depth={-16} className="top-[40%] left-[21%] hidden xl:block">
        <Coin3D size={38} speed={3.4} phase={0.5} />
      </Depth>

      <Depth depth={10} className="inset-0">
        {[
          ['12%', '24%', 18, 0],
          ['28%', '9%', 12, 1.2],
          ['58%', '15%', 16, 0.4],
          ['20%', '82%', 14, 2.1],
          ['42%', '92%', 20, 0.9],
          ['72%', '86%', 12, 1.7],
          ['8%', '64%', 10, 2.6],
          ['76%', '28%', 14, 0.2],
        ].map(([top, left, size, delay], i) => (
          <Sparkle key={i} size={size as number} className="absolute" style={{ top, left, animationDelay: `${delay}s` } as CSSProperties} />
        ))}
      </Depth>
    </div>
  )
}
