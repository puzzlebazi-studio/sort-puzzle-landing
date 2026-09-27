import { StudioLogo } from '../../components/StudioLogo'
import { Title3D } from '../../components/Title3D'
import { useLocale } from '../../i18n/useLocale'
import { cn } from '../../lib/cn'
import { STUDIO } from '../studio'

/** The studio's logo beside its short name, for the navbar and footer. */
export function StudioMark({ large }: { large?: boolean }) {
  const locale = useLocale()
  return (
    <span className="flex items-center gap-2">
      <StudioLogo className={cn('drop-shadow-[0_4px_4px_rgba(12,4,40,0.35)]', large ? 'w-12' : 'w-9')} />
      <Title3D as="span" className={cn('leading-none', large ? 'text-[2.3rem]' : 'text-[1.75rem]')}>
        {STUDIO.shortName[locale]}
      </Title3D>
    </span>
  )
}
