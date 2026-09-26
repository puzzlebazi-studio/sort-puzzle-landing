import { Title3D } from '../../../components/Title3D'
import { cn } from '../../../lib/cn'
import logo from '../assets/logo-title.webp'
import { useContent } from '../content'

const SIZES = {
  nav: { image: 'h-10 w-auto sm:h-11', text: 'text-[1.45rem] leading-none sm:text-[1.75rem]' },
  footer: { image: 'h-14 w-auto', text: 'text-[2.3rem] leading-none' },
  hero: { image: 'w-full', text: 'text-[4.2rem] leading-[1.25] sm:text-8xl md:text-[7.5rem]' },
}

interface GameLogoProps {
  size: keyof typeof SIZES
  /** Load right away: the logo is the first thing on screen. */
  priority?: boolean
  className?: string
}

/**
 * The game's logo. The artwork spells the Persian name, so other languages get the name in the
 * same extruded gold lettering.
 */
export function GameLogo({ size, priority, className }: GameLogoProps) {
  const { locale, name } = useContent()
  if (locale !== 'fa') {
    return (
      <Title3D as="span" className={cn(SIZES[size].text, className)}>
        {name}
      </Title3D>
    )
  }
  return (
    <img
      src={logo}
      alt={name}
      width={912}
      height={304}
      loading={priority || size === 'nav' ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      className={cn(SIZES[size].image, className)}
    />
  )
}
