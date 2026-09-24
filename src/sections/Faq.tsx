import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { FAQ } from '../data/content'
import { cn } from '../lib/cn'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading eyebrow="سوال‌ها" tone="grape" title="سوال‌های پرتکرار" />
        <div className="space-y-5">
          {FAQ.map((item, i) => {
            const expanded = open === i
            const id = `faq-${i}`
            return (
              <Reveal key={item.q} delay={Math.min(i, 4) * 60}>
                <div className={cn('panel-3d transition-colors', expanded && 'bg-[linear-gradient(180deg,rgb(112_90_235/0.95),rgb(70_50_180/0.95))]')}>
                  <h3>
                    <button
                      type="button"
                      id={`${id}-button`}
                      aria-expanded={expanded}
                      aria-controls={`${id}-panel`}
                      onClick={() => setOpen(expanded ? null : i)}
                      className="flex w-full cursor-pointer items-center gap-4 px-5 pt-4 pb-5 text-start text-xl sm:px-6 sm:text-[1.35rem]"
                    >
                      <span className="flex-1">{item.q}</span>
                      <span
                        className={cn('icon-3d tone-gold size-10 transition-transform duration-300', expanded && 'rotate-45')}
                        style={{ fontSize: 10 }}
                        aria-hidden="true"
                      >
                        <Plus strokeWidth={6.5} />
                        <Plus strokeWidth={3.2} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`${id}-panel`}
                    role="region"
                    aria-labelledby={`${id}-button`}
                    inert={!expanded}
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-6 text-lg leading-9 text-grape-100 sm:px-6">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
