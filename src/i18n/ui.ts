import type { Localized } from './locales'

/** Words the shared parts of the site use on every page. */
export const UI: Localized<{
  skipToContent: string
  pageSections: string
  openMenu: string
  closeMenu: string
  /** Label of the language switch, read in the language it leads to. */
  readIn: string
  soon: string
  rights: string
  madeWith: string
  love: string
  by: string
  backHome: string
  notFound: { title: string; text: string }
  error: { title: string; text: string }
}> = {
  fa: {
    skipToContent: 'پرش به محتوا',
    pageSections: 'بخش‌های صفحه',
    openMenu: 'باز کردن منو',
    closeMenu: 'بستن منو',
    readIn: 'این صفحه به فارسی',
    soon: 'به‌زودی',
    rights: 'همه حقوق محفوظ است.',
    madeWith: 'ساخته‌شده با',
    love: 'عشق',
    by: 'توسط',
    backHome: 'بازگشت به خانه',
    notFound: {
      title: 'این صفحه پیدا نشد',
      text: 'صفحه‌ای که دنبالش بودی وجود ندارد یا جابه‌جا شده است.',
    },
    error: {
      title: 'یک مشکلی پیش آمد',
      text: 'صفحه درست باز نشد. دوباره امتحان کن یا به خانه برگرد.',
    },
  },
  en: {
    skipToContent: 'Skip to content',
    pageSections: 'Page sections',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    readIn: 'Read this page in English',
    soon: 'Soon',
    rights: 'All rights reserved.',
    madeWith: 'Made with',
    love: 'love',
    by: 'by',
    backHome: 'Back to home',
    notFound: {
      title: 'Page not found',
      text: 'The page you’re looking for doesn’t exist or has moved.',
    },
    error: {
      title: 'Something went wrong',
      text: 'This page didn’t load properly. Try again, or head back home.',
    },
  },
}
