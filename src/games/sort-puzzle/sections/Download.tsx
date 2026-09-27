import { BadgeCheck, Smartphone, WifiOff } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import type { CSSProperties } from 'react'
import { Coin3D } from '../../../components/Coin3D'
import { PhoneFrame } from '../../../components/PhoneFrame'
import { Reveal } from '../../../components/Reveal'
import { Sparkle } from '../../../components/Sparkle'
import { StoreBadge } from '../../../components/StoreBadge'
import { Title3D } from '../../../components/Title3D'
import { formatNumber } from '../../../i18n/format'
import icon from '../assets/icon.webp'
import homeShot from '../assets/shots/home.webp'
import { useContent } from '../content'
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
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="gold-panel relative isolate overflow-hidden rounded-[2.5rem] px-6 pt-12 pb-12 sm:px-10 lg:px-14">
            <div aria-hidden="true" className="absolute inset-0 -z-10 [background-image:var(--pattern)] [background-size:240px] opacity-80" />
            <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr]">
              <div className="text-center lg:text-start">
                <span className="eyebrow tone-red">{t.download.eyebrow}</span>
                <Title3D tone="cream" className="mt-5 block text-[2.5rem] leading-tight sm:text-5xl lg:text-[3.6rem]">
                  {t.download.title}
                </Title3D>
                <p className="mx-auto mt-4 max-w-lg text-xl leading-9 text-choco lg:mx-0">{t.download.text}</p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                  {STORES.map((store) => (
                    <StoreBadge key={store.id} store={store} height="3.6rem" />
                  ))}
                </div>
                <ul className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
                  {requirements.map(({ icon: Icon, text }) => (
                    <li
                      key={text}
                      className="inline-flex items-center gap-2 rounded-full border-[2.5px] border-choco bg-cream px-3.5 pt-1 pb-1.5 text-base text-choco shadow-[0_3px_0_rgb(58_21_0/0.35)]"
                    >
                      <Icon className="size-4.5" strokeWidth={2.6} aria-hidden="true" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mx-auto hidden h-[27rem] w-full max-w-sm md:block" aria-hidden="true">
                <div className="absolute top-0 left-2 w-52 [transform:perspective(1000px)_rotateY(22deg)_rotateZ(-6deg)]">
                  <PhoneFrame src={homeShot} alt="" />
                </div>
                <div
                  className="card-3d absolute right-0 bottom-4 w-60 animate-float px-5 pt-5 pb-4 text-center"
                  style={{ '--r': '4deg' } as CSSProperties}
                >
                  <div className="rounded-2xl border-[3px] border-choco bg-white p-2.5">
                    <div className="relative">
                      <QRCodeSVG
                        value={BAZAAR.href}
                        size={168}
                        level="H"
                        fgColor="#3a1500"
                        bgColor="#ffffff"
                        marginSize={0}
                        title={`${BAZAAR.name[locale]}: ${name}`}
                        imageSettings={{ src: QR_HOLE, width: 46, height: 46, excavate: true }}
                        className="block h-auto w-full"
                      />
                      <img
                        src={icon}
                        alt=""
                        width={256}
                        height={256}
                        loading="lazy"
                        decoding="async"
                        className="absolute top-1/2 left-1/2 w-1/4 -translate-x-1/2 -translate-y-1/2 rounded-[24%] border-2 border-choco"
                      />
                    </div>
                  </div>
                  <p className="mt-3 text-lg">{t.download.scan}</p>
                </div>
                <Coin3D size={58} speed={4} className="absolute top-[17%] right-3" />
                <Sparkle size={26} className="absolute top-4 right-16" />
                <Sparkle size={18} className="absolute bottom-2 left-10" style={{ animationDelay: '1.2s' }} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
