import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Reveal } from '../../../components/Reveal'
import { formatNumber } from '../../../i18n/format'
import { LOCALE_INFO } from '../../../i18n/locales'
import { PourScene, SelectScene, SortedScene } from '../components/art/Scenes'
import { FlatHeading } from '../components/FlatHeading'
import { useContent } from '../content'

const SCENES = [SelectScene, PourScene, SortedScene]
const SUNS = ['sun-sky', 'sun-butter', 'sun-mint']

export function HowToPlay() {
  const { locale, t } = useContent()
  // Points from each step to the next, which sits on the left in Persian and on the right in English.
  const Next = LOCALE_INFO[locale].dir === 'rtl' ? ArrowLeft : ArrowRight
  const steps = t.howTo.steps

  return (
    <section id="how" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <FlatHeading eyebrow={t.howTo.eyebrow} face="sky" title={t.howTo.title} subtitle={t.howTo.subtitle} />
        <ol className="grid gap-12 lg:grid-cols-3 lg:gap-10">
          {steps.map((step, i) => {
            const Scene = SCENES[i]
            const n = formatNumber(locale, i + 1)
            return (
              <li key={step.title} className="relative">
                <Reveal delay={i * 130} className="h-full">
                  <article className="sticker flex h-full flex-col p-4 pb-7 text-center">
                    <span
                      className="flat-round face-butter absolute -top-5 z-10 size-14 text-[1.7rem] leading-none font-extrabold [inset-inline-start:-0.9rem]"
                      aria-hidden="true"
                    >
                      {n}
                    </span>
                    <div className={`sunburst ${SUNS[i]} overflow-hidden rounded-[1.25rem] border-[3px] border-plum`}>
                      <Scene className="mx-auto block h-60 w-full max-w-80 px-3 pt-4 pb-2" />
                    </div>
                    <h3 className="mt-6 text-2xl">
                      <span className="sr-only">{t.howTo.step(n)}</span>
                      {step.title}
                    </h3>
                    <p className="mt-2 text-lg leading-8 text-plum-soft">{step.text}</p>
                  </article>
                </Reveal>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="flat-round face-pink absolute top-1/2 -inset-e-8 z-10 hidden size-12 -translate-y-1/2 lg:inline-grid"
                  >
                    <Next className="size-6" strokeWidth={2.8} />
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
