import { LOCALE_INFO, type Locale } from './i18n'

const numbers = { fa: new Intl.NumberFormat('fa-IR'), en: new Intl.NumberFormat('en-US') }

/** 4 → «۴» in Persian, "4" in English. */
export const formatNumber = (locale: Locale, value: number) => numbers[locale].format(value)

const dates = {
  // The Persian calendar, as Iranian readers expect: «۱۵ مهر ۱۴۰۵».
  fa: new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Tehran' }),
  en: new Intl.DateTimeFormat(LOCALE_INFO.en.intl, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Tehran' }),
}

/** A YYYY-MM-DD date in the reader's calendar. */
export const formatDate = (locale: Locale, iso: string) => dates[locale].format(new Date(`${iso}T12:00:00+03:30`))

export const formatYear = (locale: Locale) =>
  new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR-u-ca-persian' : 'en-US', { year: 'numeric' }).format(new Date())
