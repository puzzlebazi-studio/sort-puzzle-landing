import type { LucideIcon } from "lucide-react";
import { EyeOff, Gift, Lightbulb, Lock, Save, Snowflake, Sparkles, Star, Timer, Trophy, Undo2, WifiOff } from "lucide-react";
import frozenImage from "../assets/img/mechanics/frozen.webp";
import hiddenImage from "../assets/img/mechanics/hidden.webp";
import lockedImage from "../assets/img/mechanics/locked.webp";
import movesImage from "../assets/img/mechanics/moves.webp";
import achievementsShot from "../assets/img/shots/achievements.webp";
import challengeShot from "../assets/img/shots/challenge-725.webp";
import dailyShot from "../assets/img/shots/daily.webp";
import homeShot from "../assets/img/shots/home.webp";
import lockedShot from "../assets/img/shots/locked-926.webp";
import mapShot from "../assets/img/shots/map.webp";
import pourShot from "../assets/img/shots/pour-956.webp";
import resultShot from "../assets/img/shots/result-956.webp";

export type Tone = "leaf" | "gold" | "aqua" | "pink" | "orange" | "red" | "grape" | "sky" | "cream";

export const NAV_LINKS = [
  { href: "#features", label: "ویژگی‌ها" },
  { href: "#how", label: "چطور بازی کنم؟" },
  { href: "#mechanics", label: "چالش‌ها" },
  { href: "#stages", label: "مرحله‌ها" },
  { href: "#gallery", label: "تصاویر" },
  { href: "#studio", label: "سازنده" },
  { href: "#faq", label: "سوال‌ها" },
];

export const HERO_STATS = [
  { value: "۱٬۰۰۰+", label: "مرحله" },
  { value: "۷", label: "سطح سختی" },
  { value: "۴", label: "چالش تازه" },
  { value: "رایگان", label: "برای اندروید" },
];

export interface Feature {
  icon: LucideIcon;
  tone: Tone;
  title: string;
  text: string;
}

export const FEATURES: Feature[] = [
  {
    icon: Sparkles,
    tone: "leaf",
    title: "چالش‌های تازه",
    text: "لایه‌های پنهان، بطری‌های یخ‌زده و قفل‌دار و مرحله‌های با حرکت محدود؛ هرچه جلوتر بروی، غافلگیری‌ها بیشتر می‌شود.",
  },
  {
    icon: Lightbulb,
    tone: "gold",
    title: "راهنمای هوشمند",
    text: "گیر کردی؟ راهنما حرکت درست بعدی را نشانت می‌دهد؛ اگر راه بسته باشد، رایگان می‌گوید برگردی یا از اول شروع کنی.",
  },
  {
    icon: Undo2,
    tone: "aqua",
    title: "برگشت و بطری اضافه",
    text: "در هر تلاش ۵ برگشت رایگان داری و برای لحظه‌های سخت، یک بطری اضافه.",
  },
  {
    icon: Star,
    tone: "orange",
    title: "ستاره و سکه",
    text: "با حرکت‌های کمتر سه ستاره بگیر و سکه جمع کن؛ مرحله‌های سخت‌تر سکه بیشتری می‌دهند.",
  },
  {
    icon: Gift,
    tone: "pink",
    title: "جایزه روزانه",
    text: "هر روز سر بزن و جایزه بگیر؛ هفت روز پشت سر هم، و روز هفتم ۱۰۰۰ سکه!",
  },
  {
    icon: Trophy,
    tone: "red",
    title: "۸ دستاورد",
    text: "از «اولین مرتب‌سازی» تا «افسانه کارخانه»؛ هر دستاورد جایزه سکه دارد.",
  },
  {
    icon: WifiOff,
    tone: "grape",
    title: "بدون اینترنت",
    text: "هر جا و هر وقت بازی کن؛ مرحله‌ها داخل خود بازی‌اند و به اینترنت نیاز نداری.",
  },
  {
    icon: Save,
    tone: "sky",
    title: "ذخیره خودکار",
    text: "پیشرفتت خودکار ذخیره می‌شود؛ حتی اگر وسط مرحله بازی بسته شود، از همان‌جا ادامه می‌دهی.",
  },
];

export const HOW_TO = [
  { title: "روی یک بطری بزن", text: "بطری بالا می‌آید و آماده ریختن است." },
  { title: "روی بطری مقصد بزن", text: "رنگ فقط روی همان رنگ یا داخل بطری خالی ریخته می‌شود." },
  { title: "هر رنگ در یک بطری", text: "وقتی همه بطری‌ها یک‌رنگ شدند، مرحله را بردی!" },
];

export type MechanicId = "hidden" | "moves" | "frozen" | "locked";

export interface Mechanic {
  id: MechanicId;
  icon: LucideIcon;
  tone: Tone;
  title: string;
  text: string;
  /** The first stage that uses it. */
  from: number;
  /** A close-up from a late stage of the game. */
  image: string;
  alt: string;
}

// From the production stage data, in the order the campaign introduces them.
export const MECHANICS: Mechanic[] = [
  {
    id: "hidden",
    icon: EyeOff,
    tone: "grape",
    title: "لایه‌های پنهان",
    text: "لایه‌های پایینی بعضی بطری‌ها «؟» هستند و رنگشان فقط وقتی رو بیایند معلوم می‌شود. با اطلاعات ناقص نقشه بکش!",
    from: 31,
    image: hiddenImage,
    alt: "بطری‌ای با سه لایه خاکستری «؟» میان بطری‌های رنگی، در مرحله ۹۵۶",
  },
  {
    id: "moves",
    icon: Timer,
    tone: "red",
    title: "حرکت محدود",
    text: "هر مرحله‌ای که شماره‌اش به ۵ ختم شود، مرحله چالشی است و حرکت‌هایت شمرده می‌شود. حرکت کم آوردی؟ ۵ حرکت اضافه بگیر.",
    from: 45,
    image: movesImage,
    alt: "شمارنده «۴۷ حرکت» با نشان کرنومتر بالای بطری‌ها، در مرحله چالشی ۷۲۵",
  },
  {
    id: "frozen",
    icon: Snowflake,
    tone: "aqua",
    title: "بطری یخ‌زده",
    text: "با هر حرکت کمی از یخ آب می‌شود. تا شمارنده‌اش به صفر نرسد، نه چیزی در آن می‌ریزد و نه چیزی از آن برمی‌داری.",
    from: 61,
    image: frozenImage,
    alt: "دو بطری در یخ با شمارنده‌های ۷ و ۸، در مرحله ۹۵۶",
  },
  {
    id: "locked",
    icon: Lock,
    tone: "gold",
    title: "بطری قفل‌دار",
    text: "رنگ قفل را ببین: یک بطری را با همان رنگ کامل کن تا قفل باز شود و بطری دوباره در دسترس باشد.",
    from: 121,
    image: lockedImage,
    alt: "دو بطری با قفل بنفش و قفل سبز، در مرحله ۹۲۶",
  },
];

export interface Tier {
  name: string;
  stages: string;
  colors: string;
  bottles: string;
  /** Colors stacked in the tier's bottle, from the game's palette. */
  maxColors: number;
  /** Average of the stages' minimum move counts. */
  moves: string;
  /** Special mechanics that appear in the tier. */
  mechanics: MechanicId[];
  tone: Tone;
}

const ALL_MECHANICS: MechanicId[] = ["hidden", "moves", "frozen", "locked"];

// From the production stage data (Levels/Production/StageDatabase.asset in the game).
export const TIERS: Tier[] = [
  { name: "آموزشی", stages: "۱ تا ۵", colors: "۲", bottles: "۳ تا ۴", maxColors: 2, moves: "۴", mechanics: [], tone: "leaf" },
  { name: "آسان", stages: "۶ تا ۲۰", colors: "۳ تا ۴", bottles: "۵ تا ۶", maxColors: 4, moves: "۱۰", mechanics: [], tone: "aqua" },
  { name: "متوسط", stages: "۲۱ تا ۸۳", colors: "۴ تا ۶", bottles: "۶ تا ۸", maxColors: 6, moves: "۱۷", mechanics: ["hidden", "moves", "frozen"], tone: "sky" },
  { name: "سخت", stages: "۸۴ تا ۲۵۱", colors: "۵ تا ۸", bottles: "۶ تا ۱۰", maxColors: 8, moves: "۲۲", mechanics: ALL_MECHANICS, tone: "grape" },
  { name: "خیلی سخت", stages: "۲۵۲ تا ۳۹۹", colors: "۷ تا ۹", bottles: "۸ تا ۱۱", maxColors: 9, moves: "۲۶", mechanics: ALL_MECHANICS, tone: "pink" },
  { name: "حرفه‌ای", stages: "۴۰۰ تا ۷۰۰", colors: "۸ تا ۱۰", bottles: "۹ تا ۱۲", maxColors: 10, moves: "۳۰", mechanics: ALL_MECHANICS, tone: "orange" },
  { name: "استاد", stages: "۷۰۱ به بعد", colors: "۸ تا ۱۰", bottles: "۹ تا ۱۲", maxColors: 10, moves: "۳۲", mechanics: ALL_MECHANICS, tone: "red" },
];

export const SCREENSHOTS = [
  { src: homeShot, title: "صفحه اصلی", text: "بازی، نقشه مرحله‌ها، جایزه روزانه و دستاوردها." },
  { src: pourShot, title: "ریختن رنگ", text: "مرحله ۹۵۶: ده رنگ، لایه‌های پنهان و دو بطری یخ‌زده." },
  { src: lockedShot, title: "بطری‌های قفل‌دار", text: "مرحله ۹۲۶: رنگ قفل را کامل کن تا باز شود." },
  { src: challengeShot, title: "مرحله چالشی", text: "مرحله ۷۲۵: فقط ۴۷ حرکت فرصت داری!" },
  { src: resultShot, title: "ستاره و سکه", text: "حرکت کمتر، ستاره بیشتر." },
  { src: mapShot, title: "نقشه مرحله‌ها", text: "همه مرحله‌ها روی یک مسیر پیچ‌درپیچ." },
  { src: dailyShot, title: "جایزه روزانه", text: "هر روز سر بزن؛ روز هفتم ۱۰۰۰ سکه!" },
  { src: achievementsShot, title: "دستاوردها", text: "هشت دستاورد، هرکدام با جایزه سکه." },
];

export const FAQ = [
  {
    q: "سورت پازل رایگان است؟",
    a: "بله! بازی رایگان است و همه مرحله‌ها فقط با بازی‌کردن باز می‌شوند. خرید سکه، بسته شروع و حذف تبلیغات کاملاً اختیاری است.",
  },
  {
    q: "برای بازی به اینترنت نیاز دارم؟",
    a: "نه. مرحله‌ها داخل خود بازی هستند و بدون اینترنت هم بازی می‌کنی. فقط برای خرید درون‌برنامه‌ای به اینترنت و کافه‌بازار نیاز داری.",
  },
  {
    q: "بطری یخ‌زده و قفل‌دار دیگر چیست؟",
    a: "از مرحله ۳۱ به بعد چالش‌های تازه‌ای سر راهت سبز می‌شوند: لایه‌های پنهانی که رنگشان وقتی رو بیایند معلوم می‌شود، مرحله‌های چالشی با حرکت محدود، بطری یخ‌زده که با هر حرکت آب می‌شود و بطری قفل‌داری که با کامل کردن رنگ قفل باز می‌شود. اولین بار که هرکدام را ببینی، بازی توضیحش می‌دهد.",
  },
  {
    q: "گیر کردم؛ چه کار کنم؟",
    a: "در هر تلاش ۵ برگشت رایگان داری. راهنما حرکت بعدی را نشانت می‌دهد، بطری اضافه یک جای خالی به تو می‌دهد و همیشه می‌توانی مرحله را از اول شروع کنی. در مرحله‌های چالشی هم اگر حرکت کم بیاوری، می‌توانی ۵ حرکت اضافه بگیری.",
  },
  {
    q: "پیشرفتم ذخیره می‌شود؟",
    a: "بله، خودکار. حتی اگر وسط مرحله گوشی خاموش شود یا بازی بسته شود، دفعه بعد از همان‌جا ادامه می‌دهی.",
  },
  {
    q: "تبلیغ هم دارد؟",
    a: "تبلیغ‌ها فقط بین مرحله‌ها و با فاصله نشان داده می‌شوند، هیچ‌وقت وسط بازی. با خرید «حذف تبلیغات» برای همیشه حذف می‌شوند.",
  },
  {
    q: "اگر بازی را دوباره نصب کنم، خریدهایم چه می‌شوند؟",
    a: "«حذف تبلیغات» و «بسته شروع» به حساب کافه‌بازارت وصل‌اند و بعد از نصب دوباره، خودکار برمی‌گردند.",
  },
  {
    q: "روی چه گوشی‌هایی اجرا می‌شود؟",
    a: "روی همه گوشی‌ها و تبلت‌های اندروید ۸ به بالا.",
  },
];
