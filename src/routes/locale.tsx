import { Outlet } from 'react-router'
import { NotFoundPage } from '../components/MessagePage'
import { isLocale } from '../i18n/locales'
import type { Route } from './+types/locale'

/** Guards every page: an unknown language in the address is a missing page. */
export default function LocaleLayout({ params }: Route.ComponentProps) {
  return isLocale(params.lang) ? <Outlet /> : <NotFoundPage />
}
