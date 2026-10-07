import { Reveal } from '../../../components/Reveal'
import { cn } from '../../../lib/cn'
import type { Face } from '../content'
import { FlatSparkle } from './art/Decor'

interface FlatHeadingProps {
  eyebrow: string
  title: string
  subtitle?: string
  /** The eyebrow chip's face. */
  face?: Face
  /** The title's face: cream on the lavender ground, like the store banners. */
  titleClassName?: string
  className?: string
}

/** A section's heading in the store banners' style: a chip, a stroked title and a line under it. */
export function FlatHeading({ eyebrow, title, subtitle, face = 'butter', titleClassName, className }: FlatHeadingProps) {
  return (
    <Reveal className={cn('mx-auto mb-12 max-w-2xl text-center md:mb-16', className)}>
      <span className={cn('flat-chip', `face-${face}`)}>
        <FlatSparkle size={14} twinkle={false} />
        {eyebrow}
      </span>
      <h2 className={cn('stroke-text mt-5 text-[2.6rem] leading-[1.25] text-paper sm:text-5xl md:text-[3.5rem]', titleClassName)}>{title}</h2>
      {subtitle && <p className="mx-auto mt-5 max-w-xl text-lg leading-9 text-plum-soft sm:text-xl sm:leading-10">{subtitle}</p>}
    </Reveal>
  )
}
