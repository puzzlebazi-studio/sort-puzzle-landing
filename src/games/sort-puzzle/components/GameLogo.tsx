import { cn } from '../../../lib/cn'
import logo from '../assets/logo-title.webp'
import { useContent } from '../content'

const SIZES = {
  nav: { image: 'h-10 w-auto sm:h-11', text: 'text-[1.6rem] leading-none sm:text-[1.85rem]' },
  footer: { image: 'h-16 w-auto', text: 'text-[2.4rem] leading-none' },
  hero: { image: 'w-full', text: 'text-[3.9rem] leading-[1.1] sm:text-[5.4rem] lg:text-[5.2rem] xl:text-[6.2rem]' },
}

interface GameLogoProps {
  size: keyof typeof SIZES
  /** Load right away: the logo is the first thing on screen. */
  priority?: boolean
  className?: string
}

/**
 * The game's logo (logo_title in the game): «سورت» in butter and «پازل» in coral, outlined in
 * plum. The artwork spells the Persian name, so other languages get the name set the same way.
 */
export function GameLogo({ size, priority, className }: GameLogoProps) {
  const { locale, name } = useContent()
  if (locale !== 'fa') {
    const [first, ...rest] = name.split(' ')
    return (
      <span className={cn('stroke-text inline-block whitespace-nowrap', SIZES[size].text, className)}>
        <span className="text-butter">{first}</span> <span className="text-coral">{rest.join(' ')}</span>
      </span>
    )
  }
  return (
    <img
      src={logo}
      alt={name}
      width={920}
      height={344}
      loading={priority || size === 'nav' ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      className={cn(SIZES[size].image, className)}
    />
  )
}
