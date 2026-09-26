import { Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import type { Tone } from '../lib/tone'
import { Reveal } from './Reveal'
import { Title3D } from './Title3D'

interface SectionHeadingProps {
  eyebrow: string
  tone?: Tone
  title: ReactNode
  subtitle?: ReactNode
  id?: string
}

export function SectionHeading({ eyebrow, tone = 'pink', title, subtitle, id }: SectionHeadingProps) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      <span className={cn('eyebrow', `tone-${tone}`)}>
        <Sparkles className="size-4" strokeWidth={2.5} aria-hidden="true" />
        {eyebrow}
      </span>
      <Title3D id={id} className="mt-5 block text-[2.6rem] sm:text-5xl md:text-6xl">
        {title}
      </Title3D>
      {subtitle && <p className="mx-auto mt-4 max-w-xl text-lg leading-9 text-grape-100/85 md:text-xl md:leading-10">{subtitle}</p>}
    </Reveal>
  )
}
