import { PuzzlePiece } from '../../components/PuzzlePiece'
import { Title3D } from '../../components/Title3D'
import { useLocale } from '../../i18n/useLocale'
import { cn } from '../../lib/cn'
import { STUDIO } from '../studio'

/** The studio's logo (or puzzle piece) beside its short name, for the navbar and footer. */
export function StudioMark({ large }: { large?: boolean }) {
  const locale = useLocale()
  return (
    <span className="flex items-center gap-2">
      {STUDIO.logo ? (
        <img src={STUDIO.logo} alt="" className={large ? 'h-14 w-auto' : 'h-10 w-auto'} />
      ) : (
        <PuzzlePiece className={cn('-rotate-6 drop-shadow-[0_4px_4px_rgba(12,4,40,0.35)]', large ? 'w-14' : 'w-10')} />
      )}
      <Title3D as="span" className={cn('leading-none', large ? 'text-[2.3rem]' : 'text-[1.75rem]')}>
        {STUDIO.shortName[locale]}
      </Title3D>
    </span>
  )
}
