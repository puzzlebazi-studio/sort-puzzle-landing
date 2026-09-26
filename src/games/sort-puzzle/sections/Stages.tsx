import { GameIcon } from '../../../components/GameIcon'
import { SectionHeading } from '../../../components/SectionHeading'
import { useInView } from '../../../hooks/useInView'
import { formatNumber, formatRange } from '../../../i18n/format'
import { cn } from '../../../lib/cn'
import { TALL_BOTTLE } from '../components/tube/shapes'
import { TubeArt } from '../components/tube/TubeArt'
import { MECHANICS, TIERS, useContent, type Tier } from '../content'

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
  const { t } = useContent()
  const [ref, inView] = useInView<HTMLOListElement>('0px 0px -20% 0px')

  return (
    <section id="stages" className="relative py-20 md:py-28">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -z-10 h-80 w-[60rem] max-w-full -translate-1/2 rounded-full bg-gold-500/10 blur-3xl"
      />
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow={t.stages.eyebrow} tone="gold" title={t.stages.title} subtitle={t.stages.subtitle} />
      </div>
      <ol
        ref={ref}
        className="mx-auto flex max-w-6xl snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-2 pb-8 [scrollbar-width:none] lg:grid lg:grid-cols-7 lg:gap-3 lg:overflow-visible"
      >
        {TIERS.map((tier, i) => (
          <li key={tier.id} className="w-44 shrink-0 snap-center lg:w-auto">
            <TierCard tier={tier} index={i} filled={inView} />
          </li>
        ))}
      </ol>
      <ul
        className="mx-auto mt-6 flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-3 px-4"
        aria-label={t.stages.challengesLegend}
      >
        {MECHANICS.map((mechanic) => (
          <li key={mechanic.id} className="flex items-center gap-2 text-base text-grape-100">
            <GameIcon icon={mechanic.icon} tone={mechanic.tone} size={28} />
            {t.mechanics.items[mechanic.id].title}
          </li>
        ))}
      </ul>
    </section>
  )
}

function TierCard({ tier, index, filled }: { tier: Tier; index: number; filled: boolean }) {
  const { locale, t } = useContent()
  const colors = Array.from({ length: tier.maxColors }, (_, k) => k)
  const range = (value: Tier['stages']) => formatRange(locale, ...value)
  return (
    <article className="panel-3d group flex h-full flex-col items-center px-3 pt-4 pb-5 text-center transition-transform duration-300 hover:-translate-y-2 lg:px-2">
      <span className="rounded-full bg-black/20 px-3 pb-0.5 text-sm text-grape-100">{t.stages.tier(formatNumber(locale, index + 1))}</span>
      <div className="mt-3 transition-transform duration-300 ease-[cubic-bezier(.3,1.7,.5,1)] group-hover:-rotate-6">
        <TubeArt
          colors={colors}
          shape={TALL_BOTTLE}
          filled={filled}
          fillDelay={index * 150}
          cork={tier.maxColors === 10}
          corkSpace
          className="w-10 lg:w-14"
          label={t.stages.colorCount(formatNumber(locale, tier.maxColors))}
        />
      </div>
      <h3 className={cn('mt-3 text-2xl text-outline-sm', TONE_TEXT[tier.tone])}>{t.stages.tiers[tier.id]}</h3>
      <p className="text-sm text-grape-100">{t.stages.stageRange(range(tier.stages))}</p>
      <dl className="mt-3 w-full space-y-1.5 rounded-2xl bg-black/20 px-3 py-2 text-sm">
        <Row term={t.stages.colors} value={range(tier.colors)} />
        <Row term={t.stages.bottles} value={range(tier.bottles)} />
        <Row term={t.stages.moves} value={`≈ ${formatNumber(locale, tier.moves)}`} />
      </dl>
      <TierMechanics tier={tier} />
      <div
        className="mt-3 flex gap-1"
        aria-label={t.stages.difficulty(formatNumber(locale, index + 1), formatNumber(locale, TIERS.length))}
        role="img"
      >
        {TIERS.map((_, k) => (
          <span key={k} className={cn('h-2.5 w-3 rounded-full border border-choco/60', k <= index ? 'bg-gold-400' : 'bg-white/15')} />
        ))}
      </div>
    </article>
  )
}

/** The special mechanics a tier uses, as small badges; classic tiers say so. */
function TierMechanics({ tier }: { tier: Tier }) {
  const { t } = useContent()
  const used = MECHANICS.filter((mechanic) => tier.mechanics.includes(mechanic.id))
  if (used.length === 0) return <p className="mt-3 flex h-7 items-center text-sm text-grape-200">{t.stages.noChallenges}</p>
  const title = (id: (typeof used)[number]['id']) => t.mechanics.items[id].title
  return (
    <ul className="mt-3 flex h-7 items-center justify-center gap-px" aria-label={t.stages.challenges(used.map((mechanic) => title(mechanic.id)))}>
      {used.map((mechanic) => (
        <li key={mechanic.id} title={title(mechanic.id)}>
          <GameIcon icon={mechanic.icon} tone={mechanic.tone} size={26} />
        </li>
      ))}
    </ul>
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
