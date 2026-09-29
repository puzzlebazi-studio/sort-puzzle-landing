import type { ReactNode } from 'react'
import { useLocale } from '../i18n/useLocale'
import type { Tone } from '../lib/tone'
import { STUDIO } from '../studio/studio'
import { Button3D } from './Button3D'
import { CandyBall } from './CandyBall'
import { SocialIcon } from './SocialIcon'
import { Sparkle } from './Sparkle'
import { StudioLogo } from './StudioLogo'
import { StudioLogotype } from './StudioLogotype'

const LINK_TONES: Tone[] = ['grape', 'aqua', 'pink', 'orange', 'sky']

interface StudioCardProps {
  /** Under the name, e.g. "The makers of Sort Puzzle". */
  role: string
  /** The second paragraph, after the studio's intro. */
  story: string
  /** A button before the studio's links. */
  action?: ReactNode
}

/** The studio's icon and logotype, a few words about it and its links. */
export function StudioCard({ role, story, action }: StudioCardProps) {
  const locale = useLocale()
  return (
    <article className="card-3d px-6 pt-8 pb-8 sm:px-10 sm:pt-10 sm:pb-10">
      <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:gap-7 sm:text-start">
        <StudioAvatar />
        <div>
          <h3>
            <StudioLogotype size="card" onLight className="mx-auto sm:mx-0" />
          </h3>
          <p className="mt-2 text-lg text-choco-soft">{role}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3 text-[1.1rem] leading-9 text-choco-soft">
        <p>{STUDIO.intro[locale]}</p>
        <p>{story}</p>
      </div>

      {(action || STUDIO.links.length > 0) && (
        <div className="mt-7 flex flex-wrap justify-center gap-3 sm:justify-start">
          {action}
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
              {link.label[locale]}
            </Button3D>
          ))}
        </div>
      )}
    </article>
  )
}

/** The studio's logo in a rainbow ring. */
function StudioAvatar() {
  return (
    <div className="relative shrink-0">
      <div className="grid size-32 place-items-center rounded-full border-[3px] border-choco bg-[conic-gradient(#ff3b47,#ff8a1f,#ffd83a,#3ddc4a,#22d3ee,#2f7bff,#a45cff,#ff5fb2,#ff3b47)] p-2 shadow-[0_6px_0_rgb(58_21_0/0.35),0_14px_24px_rgb(12_4_40/0.3)]">
        <div className="grid size-full place-items-center overflow-hidden rounded-full border-[3px] border-choco bg-[radial-gradient(circle_at_50%_30%,#8a74f5,#4331ae)]">
          <StudioLogo className="mt-1 w-16" />
        </div>
      </div>
      <CandyBall tone="orange" className="absolute right-0 bottom-0.5 w-8" />
      <Sparkle size={22} className="absolute -top-1 right-0" />
    </div>
  )
}
