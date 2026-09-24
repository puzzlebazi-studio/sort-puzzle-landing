import { ChevronLeft } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { PourScene, SelectScene, SortedScene } from '../components/tube/Scenes'
import { HOW_TO } from '../data/content'
import { faNumber } from '../lib/fa'

const SCENES = [SelectScene, PourScene, SortedScene]

export function HowToPlay() {
  return (
    <section id="how" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="چطور بازی کنم؟"
          tone="aqua"
          title="در سه قدم ساده"
          subtitle="قانون بازی آن‌قدر ساده است که در چند ثانیه یادش می‌گیری؛ ولی مرحله‌های بعدی حسابی ذهنت را درگیر می‌کنند."
        />
        <ol className="grid gap-12 lg:grid-cols-3 lg:gap-10">
          {HOW_TO.map((step, i) => {
            const Scene = SCENES[i]
            return (
              <li key={step.title} className="relative">
                <Reveal delay={i * 130} className="h-full">
                  <article className="card-3d flex h-full flex-col p-4 pb-7 text-center">
                    <span
                      className="icon-3d tone-gold absolute -top-5 z-10 size-14 text-2xl text-white text-outline-sm [inset-inline-start:-0.9rem]"
                      style={{ fontSize: 14 }}
                      aria-hidden="true"
                    >
                      <span className="relative text-[1.7rem] leading-none">{faNumber(i + 1)}</span>
                    </span>
                    <div className="relative overflow-hidden rounded-[1.25rem] border-[3px] border-choco bg-[radial-gradient(circle_at_50%_30%,#8a74f5,#5540c8_70%)] shadow-[inset_0_-6px_0_rgb(0_0_0/0.18)]">
                      <div aria-hidden="true" className="absolute inset-0 [background-image:var(--pattern)] [background-size:180px]" />
                      <Scene className="relative mx-auto block h-60 w-full max-w-72" />
                    </div>
                    <h3 className="mt-6 text-2xl">
                      <span className="sr-only">قدم {faNumber(i + 1)}: </span>
                      {step.title}
                    </h3>
                    <p className="mt-2 text-lg leading-8 text-choco-soft">{step.text}</p>
                  </article>
                </Reveal>
                {i < HOW_TO.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="icon-3d tone-pink absolute top-1/2 -left-8 z-10 hidden size-12 -translate-y-1/2 lg:inline-grid"
                    style={{ fontSize: 12 }}
                  >
                    <ChevronLeft strokeWidth={6.5} />
                    <ChevronLeft strokeWidth={3.2} />
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
