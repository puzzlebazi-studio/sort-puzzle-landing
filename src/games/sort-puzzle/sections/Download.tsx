import { BadgeCheck, Smartphone, WifiOff } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import type { CSSProperties } from 'react'
import { Reveal } from '../../../components/Reveal'
import { StoreBadge } from '../../../components/StoreBadge'
import { formatNumber } from '../../../i18n/format'
import icon from '../assets/icon.svg'
import homeShot from '../assets/shots/home.webp'
import { Chest, Coin, FlatSparkle } from '../components/art/Decor'
import { useContent } from '../content'
import { PLUM } from '../lib/palette'
import { BAZAAR, MIN_ANDROID, STORES } from '../stores'

/**
 * Clears the middle of the QR code for the game's icon, which is laid on top with rounded corners.
 * An empty image, so nothing downloads where the code is hidden.
 */
const QR_HOLE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"/%3E'

export function Download() {
  const { locale, t, name } = useContent()
  const requirements = [
    { icon: Smartphone, text: t.download.android(formatNumber(locale, MIN_ANDROID)) },
    { icon: BadgeCheck, text: t.download.free },
    { icon: WifiOff, text: t.download.offline },
  ]

  return (
    <section id="download" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <Reveal>
          <div className="sticker sticker--lg sunburst sun-butter relative isolate overflow-hidden px-6 pt-12 pb-12 sm:px-10 lg:px-14" style={{ '--sun-at': '78% 50%' } as CSSProperties}>
            <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr]">
              <div className="text-center lg:text-start">
                <span className="flat-chip face-coral">{t.download.eyebrow}</span>
                <h2 className="stroke-text mt-5 text-[2.6rem] leading-tight text-paper sm:text-5xl lg:text-[3.6rem]">{t.download.title}</h2>
                <p className="mx-auto mt-4 max-w-lg text-xl leading-9 lg:mx-0">{t.download.text}</p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                  {STORES.map((store) => (
                    <StoreBadge key={store.id} store={store} height="3.6rem" place="download" />
                  ))}
                </div>
                <ul className="mt-7 flex flex-wrap justify-center gap-2.5 lg:justify-start">
                  {requirements.map(({ icon: Icon, text }) => (
                    <li key={text} className="flat-chip">
                      <Icon className="size-4.5" strokeWidth={2.6} aria-hidden="true" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mx-auto hidden h-108 w-full max-w-sm md:block" aria-hidden="true">
                <div className="absolute top-0 left-2 w-52 -rotate-6">
                  <div className="flat-phone">
                    <div className="flat-phone__screen">
                      <img src={homeShot} alt="" width={720} height={1280} loading="lazy" decoding="async" />
                    </div>
                  </div>
                </div>
                <div className="sticker absolute right-0 bottom-4 w-60 rotate-4 px-5 pt-5 pb-4 text-center">
                  <div className="rounded-2xl border-[3px] border-plum bg-white p-2.5">
                    <div className="relative">
                      <QRCodeSVG
                        value={BAZAAR.href}
                        size={168}
                        level="H"
                        fgColor={PLUM}
                        bgColor="#ffffff"
                        marginSize={0}
                        title={`${BAZAAR.name[locale]}: ${name}`}
                        imageSettings={{ src: QR_HOLE, width: 46, height: 46, excavate: true }}
                        className="block h-auto w-full"
                      />
                      <img
                        src={icon}
                        alt=""
                        width={512}
                        height={512}
                        loading="lazy"
                        decoding="async"
                        className="absolute top-1/2 left-1/2 w-1/4 -translate-x-1/2 -translate-y-1/2 rounded-[24%] border-2 border-plum"
                      />
                    </div>
                  </div>
                  <p className="mt-3 text-lg font-bold">{t.download.scan}</p>
                </div>
                <Chest className="absolute -top-2 right-4 w-28 rotate-6 animate-float" />
                <Coin className="absolute top-[22%] left-[52%] w-11 animate-float [animation-delay:-1.5s]" />
                <FlatSparkle size={28} className="absolute top-[2%] left-[56%]" />
                <FlatSparkle size={18} className="absolute bottom-2 left-10" style={{ animationDelay: '1.2s' }} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
