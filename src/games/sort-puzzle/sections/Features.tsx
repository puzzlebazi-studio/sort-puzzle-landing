import { GameIcon } from '../../../components/GameIcon'
import { Reveal } from '../../../components/Reveal'
import { SectionHeading } from '../../../components/SectionHeading'
import { TiltCard } from '../../../components/TiltCard'
import { FEATURES, useContent } from '../content'

export function Features() {
  const { t } = useContent()
  return (
    <section id="features" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow={t.features.eyebrow} tone="pink" title={t.features.title} subtitle={t.features.subtitle} />
        <ul className="grid gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-14 sm:pt-6 lg:grid-cols-4">
          {FEATURES.map((feature, i) => {
            const item = t.features.items[feature.id]
            return (
              <li key={feature.id}>
                <Reveal delay={(i % 4) * 90} className="h-full">
                  <TiltCard className="h-full">
                    <article className="card-3d flex h-full items-start gap-4 px-4 py-5 sm:flex-col sm:items-center sm:gap-0 sm:px-5 sm:pt-12 sm:pb-7 sm:text-center">
                      <GameIcon
                        icon={feature.icon}
                        tone={feature.tone}
                        size={68}
                        className="sm:absolute sm:-top-9 sm:left-1/2 sm:-translate-x-1/2"
                      />
                      <div>
                        <h3 className="text-[1.4rem] leading-snug">{item.title}</h3>
                        <p className="mt-1.5 text-[1.05rem] leading-8 text-choco-soft sm:mt-2">{item.text}</p>
                      </div>
                    </article>
                  </TiltCard>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
