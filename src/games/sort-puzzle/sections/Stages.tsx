import { Reveal } from '../../../components/Reveal'
import { formatNumber, formatRange } from '../../../i18n/format'
import { cn } from '../../../lib/cn'
import { Bottle } from '../components/art/Bottle'
import { Star } from '../components/art/Decor'
import { FlatHeading } from '../components/FlatHeading'
import { MECHANIC_COUNT, TIERS, useContent, WORLD_FACES, type Tier } from '../content'

export function Stages() {
  const { t } = useContent()
  return (
    <section id="stages" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <FlatHeading eyebrow={t.stages.eyebrow} face="mint" title={t.stages.title} subtitle={t.stages.subtitle} />
        <Worlds />
        <h3 className="mt-20 text-center text-3xl">{t.stages.tiersTitle}</h3>
      </div>
      <ol className="mx-auto mt-10 flex max-w-6xl snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-2 pb-8 scrollbar-none lg:grid lg:grid-cols-7 lg:gap-3 lg:overflow-visible">
        {TIERS.map((tier, i) => (
          <li key={tier.id} className="w-44 shrink-0 snap-center lg:w-auto">
            <Reveal delay={i * 70} className="h-full">
              <TierCard tier={tier} index={i} />
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}

/** The ten worlds as the stage map's pills, zigzagging like its path. */
function Worlds() {
  const { locale, t } = useContent()
  return (
    <Reveal>
      <div className="sticker sticker--lg sunburst sun-mint overflow-hidden px-4 pt-8 pb-10 sm:px-8">
        <div className="mb-3 flex items-center justify-center gap-1" aria-hidden="true">
          <Star className="w-9 -rotate-12" />
          <Star className="-mt-4 w-12" />
          <Star className="w-9 rotate-12" />
        </div>
        <h3 className="stroke-text stroke-text--thin mb-8 text-center text-3xl text-paper sm:text-4xl">{t.stages.worldsTitle}</h3>
        <ol className="mx-auto grid max-w-sm grid-cols-1 gap-x-5 gap-y-4 min-[440px]:max-w-none min-[440px]:grid-cols-2 lg:grid-cols-5 lg:gap-y-5">
          {t.stages.worlds.map((world, i) => (
            <li key={world}>
              <span
                className={cn(
                  'sticker sticker--sm flex items-center gap-2.5 rounded-full px-2 py-1.5 font-extrabold whitespace-nowrap',
                  `face-${WORLD_FACES[i]}`,
                )}
              >
                <span
                  className={cn(
                    'grid size-9 shrink-0 place-items-center rounded-full border-[2.5px] border-plum text-lg',
                    i === 0 ? 'bg-butter' : 'bg-paper',
                  )}
                >
                  {formatNumber(locale, i + 1)}
                </span>
                <span className="text-[1.05rem] leading-tight">{world}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  )
}

function TierCard({ tier, index }: { tier: Tier; index: number }) {
  const { locale, t } = useContent()
  const colors = tier.colors[1] ?? tier.colors[0]
  const range = (value: Tier['stages']) => formatRange(locale, ...value)
  const challenges =
    tier.challenges === 0
      ? t.stages.noChallenges
      : tier.challenges === MECHANIC_COUNT
        ? t.stages.allChallenges(formatNumber(locale, MECHANIC_COUNT))
        : t.stages.someChallenges(formatNumber(locale, tier.challenges))
  return (
    <article className="sticker group flex h-full flex-col items-center px-3 pt-4 pb-5 text-center transition-transform duration-300 hover:-translate-y-1.5 lg:px-2">
      <span className={cn('flat-chip text-sm', `face-${tier.face}`)}>{t.stages.tier(formatNumber(locale, index + 1))}</span>
      <div className="mt-3 flex h-56 items-end transition-transform duration-300 ease-[cubic-bezier(.3,1.7,.5,1)] group-hover:-rotate-6">
        <Bottle
          layers={Array.from({ length: colors }, (_, k) => k)}
          capacity={colors}
          className="w-9 lg:w-10"
          label={t.stages.colorCount(formatNumber(locale, colors))}
        />
      </div>
      <h4 className="mt-3 text-2xl whitespace-nowrap lg:text-xl">{t.stages.tiers[tier.id]}</h4>
      <p className="text-sm font-bold text-plum-soft">{t.stages.stageRange(range(tier.stages))}</p>
      <dl className="mt-3 w-full space-y-1.5 rounded-2xl border-2 border-plum/15 bg-ground px-3 py-2 text-sm">
        <Row term={t.stages.colors} value={range(tier.colors)} />
        <Row term={t.stages.bottles} value={range(tier.bottles)} />
        <Row term={t.stages.moves} value={`≈ ${formatNumber(locale, tier.moves)}`} />
      </dl>
      <p className={cn('mt-3 flex min-h-7 items-center text-sm font-bold', tier.challenges === 0 ? 'text-plum-soft' : 'text-plum')}>{challenges}</p>
      <div
        className="mt-2 flex gap-1"
        aria-label={t.stages.difficulty(formatNumber(locale, index + 1), formatNumber(locale, TIERS.length))}
        role="img"
      >
        {TIERS.map((_, k) => (
          <span key={k} className={cn('h-2.5 w-3 rounded-full border-2 border-plum', k <= index ? 'bg-butter' : 'bg-paper')} />
        ))}
      </div>
    </article>
  )
}

function Row({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="text-plum-soft">{term}</dt>
      <dd className="font-bold">{value}</dd>
    </div>
  )
}
