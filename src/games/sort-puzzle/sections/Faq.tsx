import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Reveal } from '../../../components/Reveal'
import { track } from '../../../lib/analytics'
import { cn } from '../../../lib/cn'
import { FlatHeading } from '../components/FlatHeading'
import { useContent } from '../content'

export function Faq() {
  const { t } = useContent()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4">
        <FlatHeading eyebrow={t.faq.eyebrow} face="lilac" title={t.faq.title} />
        <div className="space-y-5">
          {t.faq.items.map((item, i) => {
            const expanded = open === i
            const id = `faq-${i}`
            return (
              <Reveal key={item.q} delay={Math.min(i, 4) * 60}>
                <div className={cn('sticker sticker--sm transition-colors', expanded ? 'face-butter' : 'face-paper')}>
                  <h3>
                    <button
                      type="button"
                      id={`${id}-button`}
                      aria-expanded={expanded}
                      aria-controls={`${id}-panel`}
                      onClick={() => {
                        if (!expanded) track('faq_open', { faq: String(i + 1) })
                        setOpen(expanded ? null : i)
                      }}
                      className="flex w-full cursor-pointer items-center gap-4 px-5 pt-4 pb-5 text-start text-xl sm:px-6 sm:text-[1.3rem]"
                    >
                      <span className="flex-1">{item.q}</span>
                      <span
                        className={cn('flat-round size-10 transition-transform duration-300', expanded ? 'face-paper rotate-45' : 'face-sky')}
                        aria-hidden="true"
                      >
                        <Plus className="size-5" strokeWidth={3} />
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
                      <p className="px-5 pb-6 text-lg leading-9 sm:px-6">{item.a}</p>
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
