/**
 * Every word in the launch ad (Persian). The same rules as the site's: no promise that every stage
 * is solvable, no «کاملاً فارسی», the stage count only as "+۱۰۰۰" because it keeps growing, and the
 * game only from Cafe Bazaar and Myket.
 */
export const COPY = {
  hook: { lines: ['رنگ‌ها را', 'مرتب کن!'], pill: 'آب رنگی را بریز تا هر بطری یک‌رنگ شود' },
  play: { stage: 'مرحله ۱', coins: 200, caption: 'بزن، بریز، مرتب کن!', win: 'عالی!', reward: 20 },
  stages: {
    count: 1000,
    line: 'مرحله در ۱۰ دنیا',
    worlds: [
      'دشت رنگ‌ها',
      'سرزمین آب‌نبات',
      'سفر فضایی',
      'شهر نئون',
      'دنیای اسباب‌بازی',
      'اعماق اقیانوس',
      'شهر سایبری',
      'آزمایشگاه جادو',
      'کوه آتشفشان',
      'قله قهرمانان',
    ],
  },
  challenges: {
    count: '۹',
    lines: ['چالش', 'ویژه'],
    pill: 'یخ، قفل، بمب، سنگ و لایه‌ی پنهان',
    items: {
      hidden: 'لایه‌ی پنهان',
      frozen: 'بطری یخ‌زده',
      locked: 'بطری قفل',
      ring: 'حلقه‌ی رنگی',
      neck: 'گلوی باریک',
      stones: 'سنگ',
      bomb: 'بمب',
      moves: 'حرکت محدود',
      tight: 'مرحله‌ی سخت',
    },
  },
  designs: {
    lines: ['ده‌ها طرح', 'بطری'],
    pill: '۱۰ شکل مختلف، از کمیاب تا افسانه‌ای',
    rarities: { rare: 'کمیاب', epic: 'حماسی', legendary: 'افسانه‌ای' },
  },
  rewards: {
    lines: ['هر روز', 'جایزه!'],
    pill: 'جایزه‌ی روزانه، ۴۰ دستاورد و سه ستاره',
    day: 'روز ۷',
    dayCoins: 1000,
    achievements: '۴۰',
  },
  cta: {
    tagline: 'رنگ‌ها را بریز، مرتب کن، ببر!',
    free: 'رایگان برای اندروید',
    from: 'از',
  },
}
