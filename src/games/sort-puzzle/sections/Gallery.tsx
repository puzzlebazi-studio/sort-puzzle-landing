import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useReducedMotion } from '../../../hooks/useMediaQuery'
import { formatNumber } from '../../../i18n/format'
import { LOCALE_INFO } from '../../../i18n/locales'
import { track } from '../../../lib/analytics'
import { cn } from '../../../lib/cn'
import { FlatHeading } from '../components/FlatHeading'
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
  const [Previous, Next] = rtl ? [ArrowRight, ArrowLeft] : [ArrowLeft, ArrowRight]

  /** A visitor's choice (not the autoplay): show slide `index` and report it. */
  const show = (index: number, how: 'arrow' | 'swipe' | 'tap' | 'dot') => {
    const next = (index + COUNT) % COUNT
    setActive(next)
    track('gallery_browse', { shot: SHOTS[next].id, how })
  }
  const go = (step: number, how: 'arrow' | 'swipe') => show(active + step, how)

  useEffect(() => {
    if (reduced || paused) return
    const timer = window.setInterval(() => setActive((value) => (value + 1) % COUNT), 4500)
    return () => window.clearInterval(timer)
  }, [reduced, paused])

  const shot = t.gallery.shots[SHOTS[active].id]

  return (
    <section id="gallery" className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <FlatHeading eyebrow={t.gallery.eyebrow} face="mint" title={t.gallery.title} subtitle={t.gallery.subtitle} />

        <div
          className="relative mx-auto h-[min(118vw,540px)] max-w-3xl touch-pan-y select-none perspective-[1400px]"
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
              go(Math.sign(dx) === side ? -1 : 1, 'swipe')
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
                  else show(i, 'tap')
                }}
                className={cn(
                  'absolute top-0 left-1/2 w-[min(58vw,260px)] cursor-pointer transition-[transform,opacity] duration-700 ease-[cubic-bezier(.2,.8,.2,1)]',
                  distance > 1 && 'pointer-events-none',
                )}
                style={
                  {
                    zIndex: 10 - distance,
                    opacity: distance > 1 ? 0 : distance === 1 ? 0.85 : 1,
                    transform: `translateX(-50%) translateX(${offset * side * 70}%) translateZ(${-distance * 170}px) rotateY(${offset * side * 28}deg)`,
                  } as CSSProperties
                }
              >
                <div className="flat-phone">
                  <div className="flat-phone__screen">
                    <img src={item.src} alt={`${title}: ${text}`} width={720} height={1280} loading="lazy" decoding="async" draggable={false} />
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-5">
          <button type="button" onClick={() => go(-1, 'arrow')} aria-label={t.gallery.previous} className="flat-round face-sky size-12">
            <Previous className="size-6" strokeWidth={2.8} />
          </button>
          <div className="min-w-56 text-center" aria-live="polite">
            <p key={shot.title} className="animate-pop-in text-2xl font-extrabold" style={{ animationDuration: '0.4s' }}>
              {shot.title}
            </p>
            <p className="text-base text-plum-soft">{shot.text}</p>
          </div>
          <button type="button" onClick={() => go(1, 'arrow')} aria-label={t.gallery.next} className="flat-round face-sky size-12">
            <Next className="size-6" strokeWidth={2.8} />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {SHOTS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => show(i, 'dot')}
              aria-label={t.gallery.position(formatNumber(locale, i + 1), formatNumber(locale, COUNT))}
              aria-current={i === active ? 'true' : undefined}
              className={cn(
                'h-3.5 cursor-pointer rounded-full border-2 border-plum transition-all duration-300',
                i === active ? 'w-9 bg-butter' : 'w-3.5 bg-paper hover:bg-ground-dot',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
