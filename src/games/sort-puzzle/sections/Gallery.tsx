import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { PhoneFrame } from '../../../components/PhoneFrame'
import { SectionHeading } from '../../../components/SectionHeading'
import { useReducedMotion } from '../../../hooks/useMediaQuery'
import { formatNumber } from '../../../i18n/format'
import { LOCALE_INFO } from '../../../i18n/locales'
import { cn } from '../../../lib/cn'
import { SHOTS, useContent } from '../content'

const COUNT = SHOTS.length

/** Signed distance from the active slide, wrapped so the carousel loops. */
function offsetOf(index: number, active: number) {
  let offset = index - active
  if (offset > COUNT / 2) offset -= COUNT
  if (offset < -COUNT / 2) offset += COUNT
  return offset
}

export function Gallery() {
  const { locale, t } = useContent()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()
  const dragStart = useRef<number | null>(null)
  const swiped = useRef(false)
  // The next slide waits on the reading side's far end: the left in Persian, the right in English.
  const rtl = LOCALE_INFO[locale].dir === 'rtl'
  const side = rtl ? -1 : 1
  const [Previous, Next] = rtl ? [ChevronRight, ChevronLeft] : [ChevronLeft, ChevronRight]

  const go = (step: number) => setActive((value) => (value + step + COUNT) % COUNT)

  useEffect(() => {
    if (reduced || paused) return
    const timer = window.setInterval(() => setActive((value) => (value + 1) % COUNT), 4500)
    return () => window.clearInterval(timer)
  }, [reduced, paused])

  const shot = t.gallery.shots[SHOTS[active].id]

  return (
    <section id="gallery" className="relative overflow-hidden py-20 md:py-28">
      <div aria-hidden="true" className="absolute top-[55%] left-1/2 -z-10 size-[34rem] -translate-1/2 rounded-full bg-grape-400/30 blur-3xl" />
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow={t.gallery.eyebrow} tone="leaf" title={t.gallery.title} subtitle={t.gallery.subtitle} />

        <div
          className="relative mx-auto h-[min(118vw,520px)] max-w-3xl touch-pan-y select-none [perspective:1400px]"
          role="region"
          aria-roledescription={t.gallery.carousel}
          aria-label={t.gallery.label}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => {
            setPaused(false)
            dragStart.current = null
          }}
          onPointerDown={(event) => {
            dragStart.current = event.clientX
            swiped.current = false
          }}
          onPointerUp={(event) => {
            if (dragStart.current === null) return
            const dx = event.clientX - dragStart.current
            dragStart.current = null
            // Dragging toward the reading direction's start brings in the next slide.
            if (Math.abs(dx) > 40) {
              swiped.current = true
              go(Math.sign(dx) === side ? -1 : 1)
            }
          }}
        >
          {SHOTS.map((item, i) => {
            const offset = offsetOf(i, active)
            const distance = Math.abs(offset)
            const { title, text } = t.gallery.shots[item.id]
            return (
              <button
                key={item.id}
                type="button"
                tabIndex={distance === 1 ? 0 : -1}
                aria-label={t.gallery.show(title)}
                aria-hidden={distance > 1}
                onClick={() => {
                  if (swiped.current) swiped.current = false
                  else setActive(i)
                }}
                className={cn(
                  'absolute top-0 left-1/2 w-[min(58vw,250px)] cursor-pointer transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(.2,.8,.2,1)]',
                  distance > 1 && 'pointer-events-none',
                )}
                style={
                  {
                    zIndex: 10 - distance,
                    opacity: distance > 1 ? 0 : 1,
                    filter: `brightness(${1 - distance * 0.28})`,
                    transform: `translateX(-50%) translateX(${offset * side * 68}%) translateZ(${-distance * 190}px) rotateY(${offset * side * 34}deg)`,
                  } as CSSProperties
                }
              >
                <PhoneFrame src={item.src} alt={`${title}: ${text}`} />
              </button>
            )
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={t.gallery.previous}
            className="icon-3d tone-grape size-12 cursor-pointer transition-transform hover:scale-110 active:scale-95"
            style={{ fontSize: 12 }}
          >
            <Previous strokeWidth={6.5} />
            <Previous strokeWidth={3.2} />
          </button>
          <div className="min-w-48 text-center" aria-live="polite">
            <p key={shot.title} className="animate-pop-in text-2xl text-gold-300 text-outline-sm" style={{ animationDuration: '0.4s' }}>
              {shot.title}
            </p>
            <p className="text-base text-grape-100">{shot.text}</p>
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={t.gallery.next}
            className="icon-3d tone-grape size-12 cursor-pointer transition-transform hover:scale-110 active:scale-95"
            style={{ fontSize: 12 }}
          >
            <Next strokeWidth={6.5} />
            <Next strokeWidth={3.2} />
          </button>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {SHOTS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={t.gallery.position(formatNumber(locale, i + 1), formatNumber(locale, COUNT))}
              aria-current={i === active ? 'true' : undefined}
              className={cn(
                'h-3 cursor-pointer rounded-full border-2 border-choco transition-all duration-300',
                i === active ? 'w-9 bg-gold-400' : 'w-3 bg-white/40 hover:bg-white/70',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
