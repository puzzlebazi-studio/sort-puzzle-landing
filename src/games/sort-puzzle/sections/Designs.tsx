import { Gift, Shapes } from 'lucide-react'
import { Reveal } from '../../../components/Reveal'
import { formatNumber } from '../../../i18n/format'
import { cn } from '../../../lib/cn'
import { FlatSparkle } from '../components/art/Decor'
import { BottleForm } from '../components/art/Forms'
import { FlatHeading } from '../components/FlatHeading'
import { DESIGN_REWARD_INTERVAL, FORM_COUNT, SHELVES, useContent } from '../content'
import type { RarityId } from '../content/types'

const RIBBON: Record<RarityId, { face: string; tilt: string }> = {
  rare: { face: 'face-sky', tilt: '-rotate-6' },
  epic: { face: 'face-lilac', tilt: 'rotate-6' },
  legendary: { face: 'face-butter', tilt: '-rotate-6' },
}

/** The designs shop's bottle forms on two shelves, like the "ده‌ها طرح بطری" store banner. */
export function Designs() {
  const { locale, t } = useContent()
  return (
    <section id="designs" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <div className="sticker sticker--lg sunburst sun-pink overflow-hidden px-4 pt-12 pb-12 sm:px-8 md:pt-16 lg:px-14">
          <FlatHeading
            eyebrow={t.designs.eyebrow}
            face="butter"
            title={t.designs.title}
            subtitle={t.designs.subtitle}
            titleClassName="text-paper"
            className="[&_p]:text-plum"
          />
          <Reveal>
            <div role="img" aria-label={t.designs.shelf} className="relative mx-auto max-w-3xl space-y-12">
              {SHELVES.map((shelf, row) => (
                <div key={row} className="relative">
                  <ul className="relative z-10 flex items-end justify-around gap-2 px-2 sm:px-6">
                    {shelf.map((design, i) => (
                      <li key={design.form} className="group relative flex w-[17%] flex-col items-center">
                        {design.rarity && (
                          <span
                            className={cn(
                              'flat-chip absolute -top-9 z-10 px-2.5 text-xs sm:text-sm',
                              RIBBON[design.rarity].face,
                              RIBBON[design.rarity].tilt,
                            )}
                          >
                            {t.designs.rarities[design.rarity]}
                          </span>
                        )}
                        <div className="animate-bob transition-transform duration-300 group-hover:-translate-y-3" style={{ animationDelay: `${-(row * 5 + i) * 0.4}s` }}>
                          <BottleForm form={design.form} color={design.color} pattern={design.pattern} className="h-auto w-full" />
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="relative -mt-1 h-5 rounded-full border-[3px] border-plum bg-peach shadow-[0_6px_0_var(--color-plum)] sm:h-6" />
                </div>
              ))}
              <FlatSparkle size={34} className="absolute -top-10 left-[46%]" />
              <FlatSparkle size={22} gold className="absolute top-[46%] -left-2" style={{ animationDelay: '0.8s' }} />
            </div>
          </Reveal>
          <ul className="mt-12 flex flex-wrap justify-center gap-4">
            <li className="flat-chip px-4 py-1.5 text-lg">
              <Shapes className="size-5" strokeWidth={2.4} aria-hidden="true" />
              {t.designs.forms(formatNumber(locale, FORM_COUNT))}
            </li>
            <li className="flat-chip px-4 py-1.5 text-lg">
              <Gift className="size-5" strokeWidth={2.4} aria-hidden="true" />
              {t.designs.reward(formatNumber(locale, DESIGN_REWARD_INTERVAL))}
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
