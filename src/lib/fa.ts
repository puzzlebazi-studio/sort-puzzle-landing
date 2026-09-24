const numberFormat = new Intl.NumberFormat('fa-IR')

/** Persian digits with Persian separators, e.g. 1000 → "۱٬۰۰۰". */
export const faNumber = (value: number) => numberFormat.format(value)

/** The current year in the Persian calendar, e.g. "۱۴۰۵". */
export const faYear = () => new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric' }).format(new Date())
