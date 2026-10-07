export const LOCALES = ['fa', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'fa'

export const isLocale = (value: string | undefined): value is Locale => (LOCALES as readonly string[]).includes(value ?? '')

export const LOCALE_INFO: Record<Locale, { name: string; dir: 'rtl' | 'ltr'; intl: string; og: string }> = {
  fa: { name: 'فارسی', dir: 'rtl', intl: 'fa-IR', og: 'fa_IR' },
  en: { name: 'English', dir: 'ltr', intl: 'en-US', og: 'en_US' },
}

export const otherLocale = (locale: Locale): Locale => (locale === 'fa' ? 'en' : 'fa')

/** Topics, by id in each post's front matter; their names per language. */
export const TAGS = {
  studio: { fa: 'استودیو', en: 'Studio' },
  news: { fa: 'خبر', en: 'News' },
  'sort-puzzle': { fa: 'سورت پازل', en: 'Sort Puzzle' },
  guide: { fa: 'راهنما', en: 'Guide' },
  'behind-the-scenes': { fa: 'پشت صحنه', en: 'Behind the scenes' },
} as const satisfies Record<string, Record<Locale, string>>

export type TagId = keyof typeof TAGS
export const isTag = (value: string): value is TagId => value in TAGS

/** Every word of the blog's interface in one language. */
export const UI = {
  fa: {
    blog: 'وبلاگ',
    title: 'وبلاگ پازل‌بازی',
    description: 'خبرها، راهنمای بازی‌ها و پشت صحنه‌ی ساخت بازی‌های پازل‌بازی استودیو.',
    eyebrow: 'وبلاگ پازل‌بازی استودیو',
    heroTitle: 'یادداشت‌های پازل‌بازی',
    allPosts: 'همه‌ی نوشته‌ها',
    latest: 'تازه‌ترین نوشته‌ها',
    topics: 'موضوع‌ها',
    studioSite: 'سایت استودیو',
    sortPuzzle: 'سورت پازل',
    readMore: 'بخوان',
    minutes: (n: string) => `${n} دقیقه مطالعه`,
    backToBlog: 'بازگشت به وبلاگ',
    tagged: (name: string) => `نوشته‌های «${name}»`,
    taggedCount: (n: string) => `${n} نوشته`,
    newer: 'نوشته‌ی تازه‌تر',
    older: 'نوشته‌ی قدیمی‌تر',
    share: 'اشتراک‌گذاری',
    copyLink: 'کپی پیوند',
    copied: 'کپی شد!',
    readIn: 'این صفحه به فارسی',
    switchTo: 'English',
    rss: 'خوراک RSS',
    skip: 'پرش به محتوا',
    by: 'پازل‌بازی استودیو',
    rights: 'همه حقوق محفوظ است.',
    footer: 'بازی‌های فکری و رنگی برای موبایل.',
    empty: 'هنوز نوشته‌ای اینجا نیست.',
    game: {
      eyebrow: { post: 'بازی این نوشته', tag: 'بازی این موضوع', home: 'از پازل‌بازی استودیو' },
      about: (name: string) => `همه‌چیز درباره‌ی ${name}`,
      getOn: 'دریافت از',
    },
    ourGames: 'بازی‌های ما',
    breadcrumbs: 'مسیر صفحه',
    notFound: { title: 'این صفحه پیدا نشد', text: 'نوشته‌ای که دنبالش بودی وجود ندارد یا جابه‌جا شده است.' },
  },
  en: {
    blog: 'Blog',
    title: 'PuzzleBazi Blog',
    description: 'News, game guides and behind-the-scenes stories from PuzzleBazi Studio.',
    eyebrow: 'The PuzzleBazi Studio blog',
    heroTitle: 'Notes from PuzzleBazi',
    allPosts: 'All posts',
    latest: 'Latest posts',
    topics: 'Topics',
    studioSite: 'Studio site',
    sortPuzzle: 'Sort Puzzle',
    readMore: 'Read',
    minutes: (n: string) => `${n} min read`,
    backToBlog: 'Back to the blog',
    tagged: (name: string) => `Posts about “${name}”`,
    taggedCount: (n: string) => `${n} posts`,
    newer: 'Newer post',
    older: 'Older post',
    share: 'Share',
    copyLink: 'Copy link',
    copied: 'Copied!',
    readIn: 'Read this page in English',
    switchTo: 'فارسی',
    rss: 'RSS feed',
    skip: 'Skip to content',
    by: 'PuzzleBazi Studio',
    rights: 'All rights reserved.',
    footer: 'Colorful puzzle games for mobile.',
    empty: 'No posts here yet.',
    game: {
      eyebrow: { post: 'The game in this post', tag: 'The game behind these posts', home: 'By PuzzleBazi Studio' },
      about: (name: string) => `All about ${name}`,
      getOn: 'Get it on',
    },
    ourGames: 'Our games',
    breadcrumbs: 'Breadcrumb',
    notFound: { title: 'Page not found', text: 'The post you’re looking for doesn’t exist or has moved.' },
  },
} satisfies Record<Locale, unknown>

export type Words = (typeof UI)[Locale]
