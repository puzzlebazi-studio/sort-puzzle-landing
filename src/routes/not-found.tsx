import { NotFoundPage } from '../components/MessagePage'
import { DEFAULT_LOCALE, isLocale } from '../i18n/locales'
import { notFoundMeta } from '../i18n/meta'
import { UI } from '../i18n/ui'
import type { Route } from './+types/not-found'

export const meta: Route.MetaFunction = ({ params }) => notFoundMeta(UI[isLocale(params.lang) ? params.lang : DEFAULT_LOCALE].notFound.title)

export default function NotFound() {
  return <NotFoundPage />
}
