import { useParams } from 'react-router'
import { DEFAULT_LOCALE, isLocale, type Locale } from './locales'

/** The language in the URL (/fa/…, /en/…), or the default one outside a language. */
export function useLocale(): Locale {
  const { lang } = useParams()
  return isLocale(lang) ? lang : DEFAULT_LOCALE
}
