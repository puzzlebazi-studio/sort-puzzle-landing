import type { Game } from '../types'
import icon from './assets/icon.svg'
import homeShot from './assets/shots/home.webp'
import { BAZAAR } from './stores'

/** Sort Puzzle's card on the studio's home page; its name and tagline head its own page too. */
export const SORT_PUZZLE: Game = {
  slug: 'sort-puzzle',
  name: { fa: 'سورت پازل', en: 'Sort Puzzle' },
  tagline: { fa: 'رنگ‌ها را بریز، مرتب کن، ببر!', en: 'Pour, sort, win!' },
  summary: {
    fa: 'آب‌های رنگی را بین بطری‌ها جابه‌جا کن تا هر بطری فقط یک رنگ داشته باشد؛ با چالش‌های ویژه، ده‌ها طرح بطری، ستاره و سکه و جایزه روزانه.',
    en: 'Pour colored water between bottles until each one holds a single color, with special challenges, dozens of bottle designs, stars, coins and daily rewards.',
  },
  tags: { fa: ['پازل', 'اندروید', 'رایگان'], en: ['Puzzle', 'Android', 'Free'] },
  icon,
  screenshot: homeShot,
  tone: 'grape',
  store: BAZAAR,
}
