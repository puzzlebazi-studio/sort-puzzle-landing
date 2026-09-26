import { House } from 'lucide-react'
import { Button3D } from '../../../components/Button3D'
import { Reveal } from '../../../components/Reveal'
import { SectionHeading } from '../../../components/SectionHeading'
import { StudioCard } from '../../../components/StudioCard'
import { localePath } from '../../../i18n/locales'
import { useContent } from '../content'

export function Studio() {
  const { locale, t } = useContent()
  return (
    <section id="studio" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow={t.studio.eyebrow} tone="orange" title={t.studio.title} subtitle={t.studio.subtitle} />
        <Reveal className="mx-auto max-w-3xl">
          <StudioCard
            role={t.studio.role}
            story={t.studio.story}
            action={
              <Button3D
                to={`${localePath(locale)}#about`}
                prefetch="intent"
                size="sm"
                tone="gold"
                icon={<House className="size-5" strokeWidth={3} aria-hidden="true" />}
              >
                {t.studio.visit}
              </Button3D>
            }
          />
        </Reveal>
      </div>
    </section>
  )
}
