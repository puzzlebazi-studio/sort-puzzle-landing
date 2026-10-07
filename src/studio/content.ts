import type { LucideIcon } from 'lucide-react'
import { Heart, MapPin, Palette, Puzzle } from 'lucide-react'
import type { Locale, Localized } from '../i18n/locales'
import { useLocale } from '../i18n/useLocale'
import type { Tone } from '../lib/tone'

type ValueId = 'simple' | 'colorful' | 'care' | 'independent'

interface Item {
  title: string
  text: string
}

/** Every word on the studio's home page in one language. */
interface StudioContent {
  meta: { title: string; description: string }
  nav: { games: string; about: string }
  hero: { eyebrow: string; tagline: string; text: string; games: string; about: string }
  games: {
    eyebrow: string
    title: string
    subtitle: string
    view: string
    /** The card after the last game. */
    next: Item
  }
  about: {
    eyebrow: string
    title: string
    subtitle: string
    /** The studio's role on its card. */
    role: string
    /** The card's second paragraph, after the studio's intro. */
    story: string
    values: Record<ValueId, Item>
  }
  footer: { blurb: string; games: string; studio: string; blog: string }
}

/** What the studio cares about, shown under its card. */
export const VALUES: { id: ValueId; icon: LucideIcon; tone: Tone }[] = [
  { id: 'simple', icon: Puzzle, tone: 'aqua' },
  { id: 'colorful', icon: Palette, tone: 'pink' },
  { id: 'care', icon: Heart, tone: 'orange' },
  { id: 'independent', icon: MapPin, tone: 'leaf' },
]

const CONTENT: Localized<StudioContent> = {
  fa: {
    meta: {
      title: 'پازل‌بازی استودیو | بازی‌های فکری و رنگی برای موبایل',
      description: 'پازل‌بازی استودیو یک استودیوی مستقل ایرانی است که بازی‌های فکری و رنگی برای موبایل می‌سازد؛ سازنده سورت پازل.',
    },
    nav: { games: 'بازی‌ها', about: 'درباره ما' },
    hero: {
      eyebrow: 'استودیوی مستقل بازی‌سازی',
      tagline: 'بازی‌های فکری و رنگی برای موبایل',
      text: 'بازی‌هایی می‌سازیم که در چند ثانیه یادشان می‌گیری و مدت‌ها سرگرمت می‌کنند؛ ساده برای شروع و پر از چالش برای ادامه.',
      games: 'بازی‌های ما',
      about: 'درباره ما',
    },
    games: {
      eyebrow: 'بازی‌ها',
      title: 'بازی‌های ما',
      subtitle: 'هر بازی را با حوصله و وسواس می‌سازیم؛ از اولین طرح تا آخرین انیمیشن.',
      view: 'صفحه بازی',
      next: { title: 'بازی بعدی', text: 'بازی‌های تازه‌ی ما همین‌جا اضافه می‌شوند.' },
    },
    about: {
      eyebrow: 'درباره ما',
      title: 'پشت صحنه پازل‌بازی',
      subtitle: 'یک استودیوی مستقل که بازی‌هایش را با عشق و حوصله می‌سازد.',
      role: 'استودیوی مستقل بازی‌سازی',
      story:
        'برای ما جزئیات مهم است: از چیدن مرحله‌ها تا صدای ریختن رنگ‌ها، برای تک‌تک لحظه‌های بازی‌هایمان وقت می‌گذاریم تا هم آرامت کنند و هم ذهنت را به چالش بکشند.',
      values: {
        simple: { title: 'ساده، اما عمیق', text: 'قانون بازی را در چند ثانیه یاد می‌گیری، ولی مرحله‌های بعدی حسابی ذهنت را درگیر می‌کنند.' },
        colorful: { title: 'شاد و رنگی', text: 'گرافیک کارتونی، رنگ‌های شاد و انیمیشن‌های نرم؛ بازی باید از همان نگاه اول حال خوب بدهد.' },
        care: { title: 'ساخته‌شده با وسواس', text: 'از طراحی مرحله‌ها تا آخرین انیمیشن، برای تک‌تک جزئیات وقت می‌گذاریم.' },
        independent: { title: 'مستقل و ایرانی', text: 'بازی‌هایمان را مستقل و در ایران طراحی می‌کنیم و می‌سازیم.' },
      },
    },
    footer: {
      blurb: 'استودیوی مستقل ایرانی که بازی‌های فکری و رنگی برای موبایل می‌سازد.',
      games: 'بازی‌ها',
      studio: 'استودیو',
      blog: 'وبلاگ',
    },
  },
  en: {
    meta: {
      title: 'PuzzleBazi Studio | Colorful puzzle games for mobile',
      description: 'PuzzleBazi Studio is an independent Iranian studio making colorful puzzle games for mobile, and the maker of Sort Puzzle.',
    },
    nav: { games: 'Games', about: 'About' },
    hero: {
      eyebrow: 'Independent game studio',
      tagline: 'Colorful puzzle games for mobile',
      text: 'We make games you learn in seconds and enjoy for ages: simple to start, and full of challenges as you go.',
      games: 'Our games',
      about: 'About us',
    },
    games: {
      eyebrow: 'Games',
      title: 'Our games',
      subtitle: 'We build every game with patience and care, from the first sketch to the last animation.',
      view: 'View game',
      next: { title: 'Next up', text: 'Our new games will land right here.' },
    },
    about: {
      eyebrow: 'About',
      title: 'Behind PuzzleBazi',
      subtitle: 'An independent studio that makes its games with love and patience.',
      role: 'Independent game studio',
      story:
        'Details matter to us. From laying out stages to the sound of pouring colors, we put time into every moment of our games, so they relax you and challenge your mind at the same time.',
      values: {
        simple: { title: 'Simple, yet deep', text: 'You learn the rules in seconds, but the later stages will really get your brain working.' },
        colorful: { title: 'Bright and colorful', text: 'Cartoon graphics, cheerful colors and smooth animations: a game should feel good at first sight.' },
        care: { title: 'Crafted with care', text: 'From stage design to the very last animation, we put time into every detail.' },
        independent: { title: 'Independent and Iranian', text: 'We design and build our games independently, in Iran.' },
      },
    },
    footer: {
      blurb: 'An independent Iranian studio making colorful puzzle games for mobile.',
      games: 'Games',
      studio: 'Studio',
      blog: 'Blog',
    },
  },
}

export const studioContent = (locale: Locale) => CONTENT[locale]

/** The studio page's words in the current language. */
export function useStudioContent() {
  const locale = useLocale()
  return { locale, t: CONTENT[locale] }
}
