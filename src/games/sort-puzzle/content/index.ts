import type { LucideIcon } from 'lucide-react'
import { EyeOff, Gift, Lightbulb, Lock, Save, Snowflake, Sparkles, Star, Timer, Trophy, Undo2, WifiOff } from 'lucide-react'
import type { Locale, Localized } from '../../../i18n/locales'
import { useLocale } from '../../../i18n/useLocale'
import type { Tone } from '../../../lib/tone'
import frozenImage from '../assets/mechanics/frozen.webp'
import hiddenImage from '../assets/mechanics/hidden.webp'
import lockedImage from '../assets/mechanics/locked.webp'
import movesImage from '../assets/mechanics/moves.webp'
import achievementsShot from '../assets/shots/achievements.webp'
import challengeShot from '../assets/shots/challenge-725.webp'
import dailyShot from '../assets/shots/daily.webp'
import homeShot from '../assets/shots/home.webp'
import lockedShot from '../assets/shots/locked-926.webp'
import mapShot from '../assets/shots/map.webp'
import pourShot from '../assets/shots/pour-956.webp'
import resultShot from '../assets/shots/result-956.webp'
import { SORT_PUZZLE } from '../game'
import { en } from './en'
import { fa } from './fa'
import type { FeatureId, MechanicId, SectionId, ShotId, SortPuzzleContent, TierId } from './types'

const CONTENT: Localized<SortPuzzleContent> = { fa, en }

/** The page's words in the current language, plus the game's name and tagline. */
export function useContent() {
  const locale = useLocale()
  return { locale, t: CONTENT[locale], name: SORT_PUZZLE.name[locale], tagline: SORT_PUZZLE.tagline[locale] }
}

/** Every language's words, for route `meta` functions (which run outside components). */
export const contentFor = (locale: Locale) => CONTENT[locale]

export const SECTIONS: SectionId[] = ['features', 'how', 'mechanics', 'stages', 'gallery', 'studio', 'faq']

export const FEATURES: { id: FeatureId; icon: LucideIcon; tone: Tone }[] = [
  { id: 'challenges', icon: Sparkles, tone: 'leaf' },
  { id: 'hints', icon: Lightbulb, tone: 'gold' },
  { id: 'undo', icon: Undo2, tone: 'aqua' },
  { id: 'stars', icon: Star, tone: 'orange' },
  { id: 'daily', icon: Gift, tone: 'pink' },
  { id: 'achievements', icon: Trophy, tone: 'red' },
  { id: 'offline', icon: WifiOff, tone: 'grape' },
  { id: 'autosave', icon: Save, tone: 'sky' },
]

export interface Mechanic {
  id: MechanicId
  icon: LucideIcon
  tone: Tone
  /** The first stage that uses it. */
  from: number
  /** A close-up from a late stage of the game. */
  image: string
}

// From the production stage data, in the order the campaign introduces them.
export const MECHANICS: Mechanic[] = [
  { id: 'hidden', icon: EyeOff, tone: 'grape', from: 31, image: hiddenImage },
  { id: 'moves', icon: Timer, tone: 'red', from: 45, image: movesImage },
  { id: 'frozen', icon: Snowflake, tone: 'aqua', from: 61, image: frozenImage },
  { id: 'locked', icon: Lock, tone: 'gold', from: 121, image: lockedImage },
]

/** From, to; the last tier has no end. */
type Range = readonly [from: number, to?: number]

export interface Tier {
  id: TierId
  stages: Range
  colors: Range
  bottles: Range
  /** Colors stacked in the tier's bottle, from the game's palette. */
  maxColors: number
  /** Average of the stages' minimum move counts. */
  moves: number
  /** Special mechanics that appear in the tier. */
  mechanics: MechanicId[]
  tone: Tone
}

const ALL_MECHANICS: MechanicId[] = ['hidden', 'moves', 'frozen', 'locked']

// From the production stage data (Levels/Production/StageDatabase.asset in the game).
export const TIERS: Tier[] = [
  { id: 'tutorial', stages: [1, 5], colors: [2, 2], bottles: [3, 4], maxColors: 2, moves: 4, mechanics: [], tone: 'leaf' },
  { id: 'easy', stages: [6, 20], colors: [3, 4], bottles: [5, 6], maxColors: 4, moves: 10, mechanics: [], tone: 'aqua' },
  { id: 'medium', stages: [21, 83], colors: [4, 6], bottles: [6, 8], maxColors: 6, moves: 17, mechanics: ['hidden', 'moves', 'frozen'], tone: 'sky' },
  { id: 'hard', stages: [84, 251], colors: [5, 8], bottles: [6, 10], maxColors: 8, moves: 22, mechanics: ALL_MECHANICS, tone: 'grape' },
  { id: 'veryHard', stages: [252, 399], colors: [7, 9], bottles: [8, 11], maxColors: 9, moves: 26, mechanics: ALL_MECHANICS, tone: 'pink' },
  { id: 'pro', stages: [400, 700], colors: [8, 10], bottles: [9, 12], maxColors: 10, moves: 30, mechanics: ALL_MECHANICS, tone: 'orange' },
  { id: 'master', stages: [701], colors: [8, 10], bottles: [9, 12], maxColors: 10, moves: 32, mechanics: ALL_MECHANICS, tone: 'red' },
]

export const SHOTS: { id: ShotId; src: string }[] = [
  { id: 'home', src: homeShot },
  { id: 'pour', src: pourShot },
  { id: 'locked', src: lockedShot },
  { id: 'challenge', src: challengeShot },
  { id: 'result', src: resultShot },
  { id: 'map', src: mapShot },
  { id: 'daily', src: dailyShot },
  { id: 'achievements', src: achievementsShot },
]
