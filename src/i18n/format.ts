import { LOCALE_INFO, type Locale, type Localized } from './locales'

const numberFormats: Localized<Intl.NumberFormat> = {
  fa: new Intl.NumberFormat(LOCALE_INFO.fa.intl),
  en: new Intl.NumberFormat(LOCALE_INFO.en.intl),
}

/** 1000 → "۱٬۰۰۰" in Persian, "1,000" in English. */
export const formatNumber = (locale: Locale, value: number) => numberFormats[locale].format(value)

/**
 * A range of numbers: "۶ تا ۲۰" / "6–20", a single number when both ends match, and
 * "۷۰۱ به بعد" / "701+" when it has no end.
 */
export function formatRange(locale: Locale, from: number, to?: number) {
  const a = formatNumber(locale, from)
  if (to === undefined) return locale === 'fa' ? `${a} به بعد` : `${a}+`
  if (to === from) return a
  const b = formatNumber(locale, to)
  return locale === 'fa' ? `${a} تا ${b}` : `${a}–${b}`
}

/** The current year: "۱۴۰۵" on the Persian calendar, "2026" in English. */
export const formatYear = (locale: Locale) =>
  new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR-u-ca-persian' : LOCALE_INFO.en.intl, { year: 'numeric' }).format(new Date())
