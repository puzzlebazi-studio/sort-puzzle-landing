import { BadgeCheck, Languages, Smartphone, WifiOff } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import type { CSSProperties } from 'react'
import homeShot from '../assets/img/shots/home.webp'
import { Coin3D } from '../components/Coin3D'
import { PhoneFrame } from '../components/PhoneFrame'
import { Reveal } from '../components/Reveal'
import { Sparkle } from '../components/Sparkle'
import { StoreButton } from '../components/StoreButton'
import { Title3D } from '../components/Title3D'
import { BAZAAR, SITE, STORES } from '../data/site'

const REQUIREMENTS = [
  { icon: Smartphone, text: `اندروید ${SITE.minAndroid} به بالا` },
  { icon: BadgeCheck, text: 'رایگان' },
  { icon: WifiOff, text: 'بدون نیاز به اینترنت' },
  { icon: Languages, text: 'کاملاً فارسی' },
]

/** A small bottle badge in the middle of the QR code. */
const QR_BADGE = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect x="1.5" y="1.5" width="37" height="37" rx="10" fill="#ffc93c" stroke="#3a1500" stroke-width="3"/><path d="M15 10h10v17a5 5 0 0 1-10 0z" fill="#fff" stroke="#3a1500" stroke-width="2.5" stroke-linejoin="round"/><path d="M16.3 20h7.4v7a3.7 3.7 0 0 1-7.4 0z" fill="#ff3b47"/><rect x="13" y="8" width="14" height="4" rx="2" fill="#dbeaff" stroke="#3a1500" stroke-width="2"/></svg>',
)}`

export function Download() {
  return (
    <section id="download" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="gold-panel relative isolate overflow-hidden rounded-[2.5rem] px-6 pt-12 pb-12 sm:px-10 lg:px-14">
            <div aria-hidden="true" className="absolute inset-0 -z-10 [background-image:var(--pattern)] [background-size:240px] opacity-80" />
            <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr]">
              <div className="text-center lg:text-start">
                <span className="eyebrow tone-red">رایگان برای اندروید</span>
                <Title3D tone="cream" className="mt-5 block text-[2.5rem] leading-tight sm:text-5xl lg:text-[3.6rem]">
                  آماده‌ای؟ دانلود کن!
                </Title3D>
                <p className="mx-auto mt-4 max-w-lg text-xl leading-9 text-choco lg:mx-0">
                  سورت پازل را همین حالا رایگان از کافه‌بازار نصب کن و اولین مرحله را در چند ثانیه شروع کن. هزار مرحله منتظرت است!
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                  {STORES.map((store) => (
                    <StoreButton key={store.id} store={store} size={store.id === 'bazaar' ? 'lg' : 'md'} />
                  ))}
                </div>
                {STORES.some((store) => store.note) && (
                  <p className="mt-4 text-base text-choco-soft">
                    {STORES.filter((store) => store.note)
                      .map((store) => `${store.name}: ${store.note}`)
                      .join(' · ')}
                  </p>
                )}
                <ul className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
                  {REQUIREMENTS.map(({ icon: Icon, text }) => (
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
                    <QRCodeSVG
                      value={BAZAAR.href}
                      size={168}
                      level="H"
                      fgColor="#3a1500"
                      bgColor="#ffffff"
                      marginSize={0}
                      title={`${BAZAAR.name}: ${SITE.name}`}
                      imageSettings={{ src: QR_BADGE, width: 40, height: 40, excavate: true }}
                      className="h-auto w-full"
                    />
                  </div>
                  <p className="mt-3 text-lg">با دوربین گوشی اسکن کن</p>
                </div>
                <Coin3D size={58} speed={4} className="absolute top-[42%] right-4" />
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
