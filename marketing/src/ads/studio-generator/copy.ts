/**
 * Every word in the generator reel (Persian, colloquial, for Instagram). The facts are the game's
 * stage pipeline (sorting-puzzle/README.md): about 450,000 random layouts tried, 15,000+ accepted
 * candidates, the shipped stages picked from those, so about one in 450. Sorted-looking,
 * out-of-range and duplicate layouts are dropped; a duplicate is the same layout up to its colors.
 * The ads' rules hold: no promise that every stage is solvable, and no stage count but "+۱۰۰۰".
 */
export const COPY = {
  hook: {
    title: '۱ از ۴۵۰',
    count: 450_000,
    unit: 'چیدمان',
    caption: 'از هر ۴۵۰تا که ساختیم، فقط یکی موند.',
  },
  filter: {
    rejected: 449,
    title: 'تا کنار رفت',
    survivor: 'یکی موند',
    caption: 'بقیه رو برنامه‌ای که خودمون نوشتیم، یکی‌یکی امتحان کرد و ۴۴۹تاش رو کنار گذاشت.',
  },
  sorted: {
    title: ['از اول مرتب؟'],
    stamp: 'حذف',
    caption: 'از اول مرتب به نظر می‌رسید؟ حذف.',
  },
  range: {
    title: ['مرحله‌ی ۸؟', 'سختیِ ۸۰۰؟'],
    stamp: 'حذف',
    hard: 'مرحله‌ی ۱۰۰۰',
    place: 'جاش: ۸',
    level: 'سختیش: ۸۰۰',
    caption: 'مرحله‌ی ۸، با سختیِ مرحله‌ی ۸۰۰؟ حذف.',
  },
  duplicate: {
    title: ['فقط رنگ', 'عوض شده؟'],
    stamp: 'تکراری',
    caption: 'همون چیدمان با رنگ‌های دیگه؟ تکراری، حذف.',
  },
  funnel: {
    from: 450_000,
    fromUnit: 'چیدمان',
    to: 15_000,
    toUnit: 'موند',
    caption: 'از ۴۵۰ هزارتا، ۱۵ هزارتا موند.',
  },
  end: {
    lines: ['از هر ۴۵۰تا،', 'همون یکی'],
    link: 'لینک توی بیو',
  },
}
