import { Button3D } from '../components/Button3D'
import { GameIcon } from '../components/GameIcon'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SocialIcon } from '../components/SocialIcon'
import { Sparkle } from '../components/Sparkle'
import { Title3D } from '../components/Title3D'
import { TubeArt } from '../components/tube/TubeArt'
import { PIPELINE, type Tone } from '../data/content'
import { DEVELOPER } from '../data/site'

const LINK_TONES: Tone[] = ['grape', 'aqua', 'pink', 'orange', 'sky']
const SKILL_TONES: Tone[] = ['leaf', 'aqua', 'pink', 'orange']

export function Developer() {
  return (
    <section id="developer" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="سازنده"
          tone="orange"
          title="پشت صحنه سورت پازل"
          subtitle="یک بازی مستقل و ایرانی؛ از طراحی مرحله‌ها تا آخرین انیمیشن، با وسواس ساخته شده است."
        />
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <Reveal>
            <DeveloperCard />
          </Reveal>
          <Reveal delay={150}>
            <Pipeline />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function DeveloperCard() {
  return (
    <article className="card-3d px-6 pt-8 pb-8 sm:px-8">
      <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:text-start">
        <div className="relative shrink-0">
          <div className="grid size-32 place-items-center rounded-full border-[3px] border-choco bg-[conic-gradient(#ff3b47,#ff8a1f,#ffd83a,#3ddc4a,#22d3ee,#2f7bff,#a45cff,#ff5fb2,#ff3b47)] p-2 shadow-[0_6px_0_rgb(58_21_0/0.35),0_14px_24px_rgb(12_4_40/0.3)]">
            <div className="grid size-full place-items-center overflow-hidden rounded-full border-[3px] border-choco bg-[radial-gradient(circle_at_50%_30%,#8a74f5,#4331ae)]">
              {DEVELOPER.avatar ? (
                <img src={DEVELOPER.avatar} alt={DEVELOPER.name} className="size-full object-cover" />
              ) : (
                <Title3D as="span" className="text-6xl leading-none">
                  {DEVELOPER.initial}
                </Title3D>
              )}
            </div>
          </div>
          <TubeArt colors={[2, 2, 2, 2]} cork className="absolute -right-3 -bottom-2 w-9 rotate-12" />
          <Sparkle size={22} className="absolute -top-1 right-0" />
        </div>
        <div>
          <Title3D as="h3" className="text-4xl">
            {DEVELOPER.name}
          </Title3D>
          <p className="mt-1 text-lg text-choco-soft">{DEVELOPER.role}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3 text-[1.1rem] leading-9 text-choco-soft">
        {DEVELOPER.bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <ul className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start" aria-label="ابزارها">
        {DEVELOPER.skills.map((skill, i) => (
          <li
            key={skill}
            dir="ltr"
            className={`eyebrow tone-${SKILL_TONES[i % SKILL_TONES.length]} text-[0.95rem]`}
          >
            {skill}
          </li>
        ))}
      </ul>

      {DEVELOPER.links.length > 0 && (
        <div className="mt-7 flex flex-wrap justify-center gap-3 sm:justify-start">
          {DEVELOPER.links.map((link, i) => (
            <Button3D
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              tone={LINK_TONES[i % LINK_TONES.length]}
              icon={<SocialIcon kind={link.kind} className="size-5 drop-shadow-[0_2px_0_#3a1500]" />}
            >
              {link.label}
            </Button3D>
          ))}
        </div>
      )}
    </article>
  )
}

function Pipeline() {
  return (
    <div className="panel-3d px-5 pt-7 pb-6 sm:px-7">
      <h3 className="text-2xl text-gold-300 text-outline-sm">هر مرحله چطور ساخته شد؟</h3>
      <p className="mt-1 text-base leading-8 text-grape-100">پیش از رسیدن به دست تو، هر مرحله از این مسیر گذشته است:</p>
      <ol className="relative mt-6 space-y-4">
        <span
          aria-hidden="true"
          className="absolute top-8 bottom-8 w-3 rounded-full border-2 border-choco bg-[linear-gradient(180deg,#22d3ee,#ff5fb2,#ffd83a,#3ddc4a)] bg-[length:100%_200%] animate-[pipe_3s_linear_infinite] [inset-inline-start:calc(0.5rem+22px)]"
        />
        {PIPELINE.map((step) => (
          <li key={step.label} className="relative flex items-center gap-4 rounded-2xl bg-black/20 py-3 ps-2 pe-4">
            <GameIcon icon={step.icon} tone={step.tone} size={56} />
            <div>
              <p className="text-3xl leading-tight text-white text-outline-sm">
                {step.value}
              </p>
              <p className="text-base text-grape-100">{step.label}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
