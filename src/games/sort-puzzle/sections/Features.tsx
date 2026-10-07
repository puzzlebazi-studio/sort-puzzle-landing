import { Reveal } from '../../../components/Reveal'
import { cn } from '../../../lib/cn'
import { FlatHeading } from '../components/FlatHeading'
import { FEATURES, useContent } from '../content'

export function Features() {
  const { t } = useContent()
  return (
    <section id="features" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <FlatHeading eyebrow={t.features.eyebrow} face="pink" title={t.features.title} subtitle={t.features.subtitle} />
        <ul className="grid gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-14 sm:pt-6 lg:grid-cols-4">
          {FEATURES.map((feature, i) => {
            const item = t.features.items[feature.id]
            const Icon = feature.icon
            return (
              <li key={feature.id}>
                <Reveal delay={(i % 4) * 90} className="h-full">
                  <article className="sticker flex h-full items-start gap-4 px-4 py-5 transition-transform duration-300 hover:-translate-y-1.5 sm:flex-col sm:items-center sm:gap-0 sm:px-5 sm:pt-12 sm:pb-7 sm:text-center">
                    <span
                      className={cn(
                        'flat-round size-16 shrink-0 sm:absolute sm:-top-8 sm:left-1/2 sm:-translate-x-1/2',
                        `face-${feature.face}`,
                      )}
                      aria-hidden="true"
                    >
                      <Icon className="size-8" strokeWidth={2.4} />
                    </span>
                    <div>
                      <h3 className="text-[1.35rem] leading-snug">{item.title}</h3>
                      <p className="mt-1.5 text-[1.05rem] leading-8 text-plum-soft sm:mt-2">{item.text}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
