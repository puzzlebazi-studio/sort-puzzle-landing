import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Reveal } from '../../../components/Reveal'
import { SectionHeading } from '../../../components/SectionHeading'
import { formatNumber } from '../../../i18n/format'
import { LOCALE_INFO } from '../../../i18n/locales'
import { PourScene, SelectScene, SortedScene } from '../components/tube/Scenes'
import { useContent } from '../content'

const SCENES = [SelectScene, PourScene, SortedScene]

export function HowToPlay() {
  const { locale, t } = useContent()
  // Points from each step to the next, which sits on the left in Persian and on the right in English.
  const Next = LOCALE_INFO[locale].dir === 'rtl' ? ChevronLeft : ChevronRight
  const steps = t.howTo.steps

  return (
    <section id="how" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow={t.howTo.eyebrow} tone="aqua" title={t.howTo.title} subtitle={t.howTo.subtitle} />
        <ol className="grid gap-12 lg:grid-cols-3 lg:gap-10">
          {steps.map((step, i) => {
            const Scene = SCENES[i]
            const n = formatNumber(locale, i + 1)
            return (
              <li key={step.title} className="relative">
                <Reveal delay={i * 130} className="h-full">
                  <article className="card-3d flex h-full flex-col p-4 pb-7 text-center">
                    <span
                      className="icon-3d tone-gold absolute -top-5 z-10 size-14 text-2xl text-white text-outline-sm [inset-inline-start:-0.9rem]"
                      style={{ fontSize: 14 }}
                      aria-hidden="true"
                    >
                      <span className="relative text-[1.7rem] leading-none">{n}</span>
                    </span>
                    <div className="relative overflow-hidden rounded-[1.25rem] border-[3px] border-choco bg-[radial-gradient(circle_at_50%_30%,#8a74f5,#5540c8_70%)] shadow-[inset_0_-6px_0_rgb(0_0_0/0.18)]">
                      <div aria-hidden="true" className="absolute inset-0 [background-image:var(--pattern)] [background-size:180px]" />
                      <Scene className="relative mx-auto block h-60 w-full max-w-72" />
                    </div>
                    <h3 className="mt-6 text-2xl">
                      <span className="sr-only">{t.howTo.step(n)}</span>
                      {step.title}
                    </h3>
                    <p className="mt-2 text-lg leading-8 text-choco-soft">{step.text}</p>
                  </article>
                </Reveal>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="icon-3d tone-pink absolute top-1/2 -inset-e-8 z-10 hidden size-12 -translate-y-1/2 lg:inline-grid"
                    style={{ fontSize: 12 }}
                  >
                    <Next strokeWidth={6.5} />
                    <Next strokeWidth={3.2} />
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
