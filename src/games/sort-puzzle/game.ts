import type { Game } from '../types'
import icon from './assets/icon.webp'
import homeShot from './assets/shots/home.webp'
import { BAZAAR } from './stores'

/** Sort Puzzle's card on the studio's home page; its name and tagline head its own page too. */
export const SORT_PUZZLE: Game = {
  slug: 'sort-puzzle',
  name: { fa: 'سورت پازل', en: 'Sort Puzzle' },
  tagline: { fa: 'رنگ‌ها را بریز، مرتب کن، ببر!', en: 'Pour, sort, win!' },
  summary: {
    fa: 'مایع‌های رنگی را بین بطری‌ها جابه‌جا کن تا هر بطری فقط یک رنگ داشته باشد؛ با چالش‌های تازه، ستاره و سکه و جایزه روزانه.',
    en: 'Move colored liquids between bottles until each one holds a single color, with fresh challenges, stars, coins and daily rewards.',
  },
  tags: { fa: ['پازل', 'اندروید', 'رایگان'], en: ['Puzzle', 'Android', 'Free'] },
  icon,
  screenshot: homeShot,
  tone: 'grape',
  store: BAZAAR,
}
