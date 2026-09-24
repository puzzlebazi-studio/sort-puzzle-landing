import { SectionHeading } from '../components/SectionHeading'
import { TALL_BOTTLE } from '../components/tube/shapes'
import { TubeArt } from '../components/tube/TubeArt'
import { TIERS, type Tier } from '../data/content'
import { useInView } from '../hooks/useInView'
import { cn } from '../lib/cn'
import { faNumber } from '../lib/fa'

const TONE_TEXT: Record<string, string> = {
  leaf: 'text-[#8ff06a]',
  aqua: 'text-aqua-300',
  sky: 'text-[#9cc2ff]',
  grape: 'text-grape-200',
  pink: 'text-berry-400',
  orange: 'text-[#ffbe73]',
  red: 'text-[#ff8a90]',
}

export function Stages() {
  const [ref, inView] = useInView<HTMLOListElement>('0px 0px -20% 0px')

  return (
    <section id="stages" className="relative py-20 md:py-28">
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 h-80 w-[60rem] max-w-full -translate-1/2 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="مرحله‌ها"
          tone="gold"
          title="۷ پله تا استادی"
          subtitle="هر سطح رنگ‌ها و بطری‌های بیشتری دارد. هر دهمین مرحله یک چالش ویژه است و هر سطح با یک مرحله نفس‌تازه‌کن شروع می‌شود."
        />
      </div>
      <ol
        ref={ref}
        className="mx-auto flex max-w-6xl snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-2 pb-8 [scrollbar-width:none] lg:grid lg:grid-cols-7 lg:gap-3 lg:overflow-visible"
      >
        {TIERS.map((tier, i) => (
          <li key={tier.name} className="w-44 shrink-0 snap-center lg:w-auto">
            <TierCard tier={tier} index={i} filled={inView} />
          </li>
        ))}
      </ol>
      <p className="mt-2 px-4 text-center text-base text-grape-200 lg:hidden" aria-hidden="true">
        برای دیدن همه سطح‌ها بکش ←
      </p>
    </section>
  )
}

function TierCard({ tier, index, filled }: { tier: Tier; index: number; filled: boolean }) {
  const colors = Array.from({ length: tier.maxColors }, (_, k) => k)
  return (
    <article className="panel-3d group flex h-full flex-col items-center px-3 pt-4 pb-5 text-center transition-transform duration-300 hover:-translate-y-2">
      <span className="rounded-full bg-black/20 px-3 pb-0.5 text-sm text-grape-100">سطح {faNumber(index + 1)}</span>
      <div className="mt-3 transition-transform duration-300 ease-[cubic-bezier(.3,1.7,.5,1)] group-hover:-rotate-6">
        <TubeArt
          colors={colors}
          shape={TALL_BOTTLE}
          filled={filled}
          fillDelay={index * 150}
          cork={tier.maxColors === 10}
          corkSpace
          className="w-10 lg:w-14"
          label={`${faNumber(tier.maxColors)} رنگ`}
        />
      </div>
      <h3 className={cn('mt-3 text-2xl text-outline-sm', TONE_TEXT[tier.tone])}>{tier.name}</h3>
      <p className="text-sm text-grape-100">مرحله {tier.stages}</p>
      <dl className="mt-3 w-full space-y-1.5 rounded-2xl bg-black/20 px-3 py-2 text-sm">
        <Row term="رنگ" value={tier.colors} />
        <Row term="بطری" value={tier.bottles} />
        <Row term="حرکت" value={`≈ ${tier.moves}`} />
      </dl>
      <div className="mt-3 flex gap-1" aria-label={`سختی ${faNumber(index + 1)} از ${faNumber(TIERS.length)}`} role="img">
        {TIERS.map((_, k) => (
          <span
            key={k}
            className={cn('h-2.5 w-3 rounded-full border border-choco/60', k <= index ? 'bg-gold-400' : 'bg-white/15')}
          />
        ))}
      </div>
    </article>
  )
}

function Row({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="text-grape-200">{term}</dt>
      <dd>{value}</dd>
    </div>
  )
}
