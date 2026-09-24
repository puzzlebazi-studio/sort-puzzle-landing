import type { LucideIcon } from 'lucide-react'
import {
  FlaskConical,
  Gift,
  Layers,
  Lightbulb,
  Save,
  ShieldCheck,
  Shuffle,
  Star,
  TestTubes,
  Trophy,
  Undo2,
  WifiOff,
} from 'lucide-react'
import boardShot from '../assets/img/shots/board-905.webp'
import homeShot from '../assets/img/shots/home.webp'
import pouringShot from '../assets/img/shots/pouring.webp'
import resultShot from '../assets/img/shots/result.webp'

export type Tone = 'leaf' | 'gold' | 'aqua' | 'pink' | 'orange' | 'red' | 'grape' | 'sky' | 'cream'

export const NAV_LINKS = [
  { href: '#features', label: 'ویژگی‌ها' },
  { href: '#how', label: 'چطور بازی کنم؟' },
  { href: '#stages', label: 'مرحله‌ها' },
  { href: '#gallery', label: 'تصاویر' },
  { href: '#developer', label: 'سازنده' },
  { href: '#faq', label: 'سوال‌ها' },
]

export const HERO_STATS = [
  { value: '۱٬۰۰۰', label: 'مرحله' },
  { value: '۷', label: 'سطح سختی' },
  { value: '۱۰۰٪', label: 'قابل حل' },
  { value: 'رایگان', label: 'برای اندروید' },
]

export interface Feature {
  icon: LucideIcon
  tone: Tone
  title: string
  text: string
}

export const FEATURES: Feature[] = [
  {
    icon: ShieldCheck,
    tone: 'leaf',
    title: '۱۰۰۰ مرحله، همه قابل حل',
    text: 'هیچ مرحله‌ای بی‌راه‌حل نیست؛ حل‌کننده خودکار بازی تک‌تک مرحله‌ها را پیش از انتشار حل کرده است.',
  },
  {
    icon: Lightbulb,
    tone: 'gold',
    title: 'راهنمای هوشمند',
    text: 'گیر کردی؟ راهنما بهترین حرکت بعدی را درست از روی حل‌کننده بازی نشانت می‌دهد.',
  },
  {
    icon: Undo2,
    tone: 'aqua',
    title: 'برگشت و بطری اضافه',
    text: 'در هر تلاش ۵ برگشت رایگان داری و برای لحظه‌های سخت، یک بطری اضافه.',
  },
  {
    icon: Star,
    tone: 'orange',
    title: 'ستاره و سکه',
    text: 'با حرکت‌های کمتر سه ستاره بگیر و سکه جمع کن. هر دهمین مرحله یک چالش ویژه است.',
  },
  {
    icon: Gift,
    tone: 'pink',
    title: 'جایزه روزانه',
    text: 'هر روز سر بزن و جایزه بگیر؛ هفت روز پشت سر هم، و روز هفتم ۱۰۰۰ سکه!',
  },
  {
    icon: Trophy,
    tone: 'red',
    title: '۸ دستاورد',
    text: 'از «اولین مرتب‌سازی» تا «افسانه کارخانه»؛ هر دستاورد جایزه سکه دارد.',
  },
  {
    icon: WifiOff,
    tone: 'grape',
    title: 'بدون اینترنت',
    text: 'هر جا و هر وقت بازی کن؛ مرحله‌ها داخل خود بازی‌اند و به اینترنت نیاز نداری.',
  },
  {
    icon: Save,
    tone: 'sky',
    title: 'ذخیره خودکار',
    text: 'پیشرفتت خودکار ذخیره می‌شود؛ حتی اگر وسط مرحله بازی بسته شود، از همان‌جا ادامه می‌دهی.',
  },
]

export const HOW_TO = [
  { title: 'روی یک بطری بزن', text: 'بطری بالا می‌آید و آماده ریختن است.' },
  { title: 'روی بطری مقصد بزن', text: 'رنگ فقط روی همان رنگ یا داخل بطری خالی ریخته می‌شود.' },
  { title: 'هر رنگ در یک بطری', text: 'وقتی همه بطری‌ها یک‌رنگ شدند، مرحله را بردی!' },
]

export interface Tier {
  name: string
  stages: string
  colors: string
  bottles: string
  /** Colors stacked in the tier's bottle, from the game's palette. */
  maxColors: number
  /** Average of the stages' shortest solutions. */
  moves: string
  tone: Tone
}

// From the production stage data (Sort Factory README, "Difficulty per band").
export const TIERS: Tier[] = [
  { name: 'آموزشی', stages: '۱ تا ۲۰', colors: '۲', bottles: '۳ تا ۴', maxColors: 2, moves: '۵', tone: 'leaf' },
  { name: 'آسان', stages: '۲۱ تا ۱۰۰', colors: '۳ تا ۴', bottles: '۵ تا ۶', maxColors: 4, moves: '۹', tone: 'aqua' },
  { name: 'متوسط', stages: '۱۰۱ تا ۲۵۰', colors: '۴ تا ۵', bottles: '۶ تا ۷', maxColors: 5, moves: '۱۴', tone: 'sky' },
  { name: 'سخت', stages: '۲۵۱ تا ۵۰۰', colors: '۵ تا ۶', bottles: '۷ تا ۸', maxColors: 6, moves: '۱۸', tone: 'grape' },
  { name: 'خیلی سخت', stages: '۵۰۱ تا ۷۵۰', colors: '۶ تا ۸', bottles: '۸ تا ۹', maxColors: 8, moves: '۲۱', tone: 'pink' },
  { name: 'حرفه‌ای', stages: '۷۵۱ تا ۹۰۰', colors: '۷ تا ۹', bottles: '۹ تا ۱۰', maxColors: 9, moves: '۲۶', tone: 'orange' },
  { name: 'استاد', stages: '۹۰۱ تا ۱۰۰۰', colors: '۸ تا ۱۰', bottles: '۹ تا ۱۲', maxColors: 10, moves: '۳۱', tone: 'red' },
]

export interface PipelineStep {
  icon: LucideIcon
  tone: Tone
  value: string
  label: string
}

export const PIPELINE: PipelineStep[] = [
  { icon: Shuffle, tone: 'aqua', value: '۴۵۰٬۰۰۰', label: 'چیدمان تصادفی ساخته شد' },
  { icon: FlaskConical, tone: 'pink', value: '+۱۵٬۰۰۰', label: 'چیدمان قابل حل و جذاب ماند' },
  { icon: Layers, tone: 'gold', value: '۱٬۰۰۰', label: 'مرحله روی منحنی سختی چیده شد' },
  { icon: TestTubes, tone: 'leaf', value: '۱۷۲', label: 'تست خودکار پیش از هر نسخه' },
]

export const SCREENSHOTS = [
  { src: homeShot, title: 'صفحه اصلی', text: 'همه‌چیز با یک دکمه شروع می‌شود.' },
  { src: pouringShot, title: 'ریختن رنگ', text: 'بطری را کج کن و رنگ را روی رنگ بریز.' },
  { src: resultShot, title: 'ستاره و سکه', text: 'حرکت کمتر، ستاره بیشتر.' },
  { src: boardShot, title: 'مرحله ۹۰۵', text: 'مرحله‌های آخر، تا ۱۰ رنگ!' },
]

export const FAQ = [
  {
    q: 'سورت پازل رایگان است؟',
    a: 'بله! بازی رایگان است و همه ۱۰۰۰ مرحله فقط با بازی‌کردن باز می‌شوند. خرید سکه، بسته شروع و حذف تبلیغات کاملاً اختیاری است.',
  },
  {
    q: 'برای بازی به اینترنت نیاز دارم؟',
    a: 'نه. مرحله‌ها داخل خود بازی هستند و بدون اینترنت هم بازی می‌کنی. فقط برای خرید درون‌برنامه‌ای به اینترنت و کافه‌بازار نیاز داری.',
  },
  {
    q: 'مطمئنید همه مرحله‌ها راه‌حل دارند؟',
    a: 'کاملاً. هر مرحله پیش از انتشار با حل‌کننده خودکار حل شده و یک حل‌کننده مستقل دوباره بررسی‌اش کرده است. اگر حتی یک مرحله مشکل داشته باشد، اصلاً نسخه جدیدی ساخته نمی‌شود.',
  },
  {
    q: 'گیر کردم؛ چه کار کنم؟',
    a: 'در هر تلاش ۵ برگشت رایگان داری. راهنما حرکت بعدی را نشانت می‌دهد، بطری اضافه یک جای خالی به تو می‌دهد و همیشه می‌توانی مرحله را از اول شروع کنی.',
  },
  {
    q: 'پیشرفتم ذخیره می‌شود؟',
    a: 'بله، خودکار. حتی اگر وسط مرحله گوشی خاموش شود یا بازی بسته شود، دفعه بعد از همان‌جا ادامه می‌دهی.',
  },
  {
    q: 'تبلیغ هم دارد؟',
    a: 'تبلیغ‌ها فقط بین مرحله‌ها و با فاصله نشان داده می‌شوند، هیچ‌وقت وسط بازی. با خرید «حذف تبلیغات» برای همیشه حذف می‌شوند.',
  },
  {
    q: 'اگر بازی را دوباره نصب کنم، خریدهایم چه می‌شوند؟',
    a: '«حذف تبلیغات» و «بسته شروع» به حساب کافه‌بازارت وصل‌اند و بعد از نصب دوباره، خودکار برمی‌گردند.',
  },
  {
    q: 'روی چه گوشی‌هایی اجرا می‌شود؟',
    a: 'روی همه گوشی‌ها و تبلت‌های اندروید ۸ به بالا.',
  },
]
