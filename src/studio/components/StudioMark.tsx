import { StudioLogo } from '../../components/StudioLogo'
import { useLocale } from '../../i18n/useLocale'
import { STUDIO } from '../studio'

/** The studio's logo icon, «پ», for the navbar; screen readers hear the studio's name. */
export function StudioMark() {
  const locale = useLocale()
  return (
    <>
      <StudioLogo className="block w-10 drop-shadow-[0_4px_4px_rgba(12,4,40,0.35)]" />
      <span className="sr-only">{STUDIO.name[locale]}</span>
    </>
  )
}
