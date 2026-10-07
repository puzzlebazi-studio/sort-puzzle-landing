import { Ban, Timer } from 'lucide-react'
import { Reveal } from '../../../components/Reveal'
import { formatNumber } from '../../../i18n/format'
import { Bottle } from '../components/art/Bottle'
import { AddBottle } from '../components/art/Icons'
import { FlatHeading } from '../components/FlatHeading'
import { MECHANIC_COUNTERS, MECHANICS, useContent, type Mechanic } from '../content'

export function Mechanics() {
  const { t } = useContent()
  return (
    <section id="mechanics" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <div className="sticker sticker--lg sunburst sun-sky overflow-hidden px-4 pt-12 pb-10 sm:px-8 md:pt-16 md:pb-14 lg:px-12">
          <FlatHeading eyebrow={t.mechanics.eyebrow} face="paper" title={t.mechanics.title} subtitle={t.mechanics.subtitle} titleClassName="text-butter" className="[&_p]:text-plum" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {MECHANICS.map((mechanic, i) => (
              <li key={mechanic.id}>
                <Reveal delay={(i % 3) * 90} className="h-full">
                  <MechanicCard mechanic={mechanic} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function MechanicCard({ mechanic }: { mechanic: Mechanic }) {
  const { locale, t } = useContent()
  const item = t.mechanics.items[mechanic.id]
  return (
    <article className="sticker flex h-full items-center gap-4 p-4 transition-transform duration-300 hover:-translate-y-1.5 sm:p-5">
      <span className="flat-chip face-butter absolute -top-3.5 z-10 text-sm inset-e-4">
        {t.mechanics.fromStage(formatNumber(locale, mechanic.from))}
      </span>
      <div className="grid h-36 w-24 shrink-0 place-items-center rounded-2xl border-[2.5px] border-plum bg-ground" aria-hidden="true">
        <MechanicArt mechanic={mechanic} />
      </div>
      <div>
        <h3 className="text-[1.35rem] leading-snug">{item.title}</h3>
        <p className="mt-1 text-[1.02rem] leading-7 text-plum-soft">{item.text}</p>
      </div>
    </article>
  )
}

/** The mechanic drawn as its card shows it, like the "۹ چالش ویژه" store banner. */
function MechanicArt({ mechanic }: { mechanic: Mechanic }) {
  const { locale, t } = useContent()
  if ('bottle' in mechanic.art) {
    const counters = {
      frozen: mechanic.id === 'frozen' ? formatNumber(locale, MECHANIC_COUNTERS.frozen) : undefined,
      bomb: mechanic.id === 'bomb' ? formatNumber(locale, MECHANIC_COUNTERS.bomb) : undefined,
    }
    return <Bottle {...mechanic.art.bottle} {...counters} className="h-28 w-auto" />
  }
  if (mechanic.art.badge === 'moves') {
    return (
      <span className="flex flex-col items-center gap-2">
        <span className="flat-round face-pink size-14">
          <Timer className="size-8" strokeWidth={2.4} />
        </span>
        <span className="flat-chip face-pink px-2 text-xs">{t.mechanics.moves(formatNumber(locale, MECHANIC_COUNTERS.moves))}</span>
      </span>
    )
  }
  return (
    <span className="relative">
      <span className="flat-round face-sky size-16">
        <AddBottle className="size-9" strokeWidth={2.4} />
      </span>
      <span className="flat-round face-coral absolute -top-2 -right-2 size-7 shadow-none">
        <Ban className="size-4" strokeWidth={3} />
      </span>
    </span>
  )
}
