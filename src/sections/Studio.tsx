import { Button3D } from '../components/Button3D'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SocialIcon } from '../components/SocialIcon'
import { Sparkle } from '../components/Sparkle'
import { Title3D } from '../components/Title3D'
import { TubeArt } from '../components/tube/TubeArt'
import type { Tone } from '../data/content'
import { STUDIO } from '../data/site'

const LINK_TONES: Tone[] = ['grape', 'aqua', 'pink', 'orange', 'sky']

export function Studio() {
  return (
    <section id="studio" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="سازنده"
          tone="orange"
          title="پشت صحنه سورت پازل"
          subtitle="یک بازی مستقل و ایرانی؛ از طراحی مرحله‌ها تا آخرین انیمیشن، با وسواس ساخته شده است."
        />
        <Reveal className="mx-auto max-w-3xl">
          <StudioCard />
        </Reveal>
      </div>
    </section>
  )
}

function StudioCard() {
  return (
    <article className="card-3d px-6 pt-8 pb-8 sm:px-10 sm:pt-10 sm:pb-10">
      <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:gap-7 sm:text-start">
        <div className="relative shrink-0">
          <div className="grid size-32 place-items-center rounded-full border-[3px] border-choco bg-[conic-gradient(#ff3b47,#ff8a1f,#ffd83a,#3ddc4a,#22d3ee,#2f7bff,#a45cff,#ff5fb2,#ff3b47)] p-2 shadow-[0_6px_0_rgb(58_21_0/0.35),0_14px_24px_rgb(12_4_40/0.3)]">
            <div className="grid size-full place-items-center overflow-hidden rounded-full border-[3px] border-choco bg-[radial-gradient(circle_at_50%_30%,#8a74f5,#4331ae)]">
              {STUDIO.avatar ? (
                <img src={STUDIO.avatar} alt={STUDIO.name} className="size-full object-cover" />
              ) : (
                <Title3D as="span" className="text-6xl leading-none">
                  {STUDIO.initial}
                </Title3D>
              )}
            </div>
          </div>
          <TubeArt colors={[2, 2, 2, 2]} cork className="absolute -right-3 -bottom-2 w-9 rotate-12" />
          <Sparkle size={22} className="absolute -top-1 right-0" />
        </div>
        <div>
          <Title3D as="h3" className="text-4xl">
            {STUDIO.name}
          </Title3D>
          <p className="mt-1 text-lg text-choco-soft">{STUDIO.role}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3 text-[1.1rem] leading-9 text-choco-soft">
        {STUDIO.bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {STUDIO.links.length > 0 && (
        <div className="mt-7 flex flex-wrap justify-center gap-3 sm:justify-start">
          {STUDIO.links.map((link, i) => (
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
