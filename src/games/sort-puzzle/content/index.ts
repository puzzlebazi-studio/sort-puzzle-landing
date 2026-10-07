import type { LucideIcon } from 'lucide-react'
import { Gift, Lightbulb, Save, Sparkles, Star, Trophy, Undo2, WifiOff } from 'lucide-react'
import type { Locale, Localized } from '../../../i18n/locales'
import { useLocale } from '../../../i18n/useLocale'
import achievementsShot from '../assets/shots/achievements.webp'
import boardShot from '../assets/shots/board-221.webp'
import bombsShot from '../assets/shots/bombs-37.webp'
import challengeShot from '../assets/shots/challenge-11.webp'
import dailyShot from '../assets/shots/daily.webp'
import designsShot from '../assets/shots/designs-30.webp'
import frozenShot from '../assets/shots/frozen-14.webp'
import homeShot from '../assets/shots/home.webp'
import lockedShot from '../assets/shots/locked-18.webp'
import mapShot from '../assets/shots/map.webp'
import resultShot from '../assets/shots/result.webp'
import shopShot from '../assets/shots/shop-bottles.webp'
import type { BottleArtProps } from '../components/art/Bottle'
import type { FormId } from '../components/art/Forms'
import { SORT_PUZZLE } from '../game'
import { en } from './en'
import { fa } from './fa'
import type { FeatureId, MechanicId, RarityId, SectionId, ShotId, SortPuzzleContent, TierId } from './types'

const CONTENT: Localized<SortPuzzleContent> = { fa, en }

/** The page's words in the current language, plus the game's name and tagline. */
export function useContent() {
  const locale = useLocale()
  return { locale, t: CONTENT[locale], name: SORT_PUZZLE.name[locale], tagline: SORT_PUZZLE.tagline[locale] }
}

/** Every language's words, for route `meta` functions (which run outside components). */
export const contentFor = (locale: Locale) => CONTENT[locale]

export const SECTIONS: SectionId[] = ['features', 'how', 'mechanics', 'stages', 'designs', 'gallery', 'studio', 'faq']

/** A face from the flat art's palette (the .face-* classes in index.css). */
export type Face = 'paper' | 'mint' | 'sky' | 'butter' | 'peach' | 'coral' | 'lilac' | 'pink' | 'aqua' | 'lime'

// Colors as the game's UI kit gives them: butter for gold things, pink for gifts, sky for tools.
export const FEATURES: { id: FeatureId; icon: LucideIcon; face: Face }[] = [
  { id: 'challenges', icon: Sparkles, face: 'lilac' },
  { id: 'hints', icon: Lightbulb, face: 'butter' },
  { id: 'undo', icon: Undo2, face: 'sky' },
  { id: 'stars', icon: Star, face: 'butter' },
  { id: 'daily', icon: Gift, face: 'pink' },
  { id: 'achievements', icon: Trophy, face: 'peach' },
  { id: 'offline', icon: WifiOff, face: 'mint' },
  { id: 'autosave', icon: Save, face: 'aqua' },
]

export interface Mechanic {
  id: MechanicId
  /** The stage that introduces it (its tutorial in the campaign). */
  from: number
  /**
   * How its card draws it: a bottle with the mechanic (the frozen bottle's and the bomb's counters
   * are filled in from MECHANIC_COUNTERS), or a round badge.
   */
  art: { bottle: BottleArtProps } | { badge: 'moves' | 'tight' }
}

// From the production stage data (Levels/Production/StageDatabase.asset in the game): every
// mechanic is introduced alone on its tutorial stage, all nine by stage 44.
export const MECHANICS: Mechanic[] = [
  { id: 'hidden', from: 7, art: { bottle: { layers: ['hidden', 'hidden', 'hidden', 0] } } },
  { id: 'moves', from: 11, art: { badge: 'moves' } },
  { id: 'frozen', from: 14, art: { bottle: { layers: [1, 2], frozen: '' } } },
  { id: 'locked', from: 18, art: { bottle: { layers: [0, 3], lock: 7 } } },
  { id: 'ring', from: 23, art: { bottle: { layers: [2], ring: 2 } } },
  { id: 'neck', from: 27, art: { bottle: { layers: [7, 6, 4], neck: true } } },
  { id: 'stones', from: 32, art: { bottle: { layers: ['stone', 'stone', 1] } } },
  { id: 'bomb', from: 37, art: { bottle: { layers: [6, 5], bomb: '' } } },
  { id: 'tight', from: 44, art: { badge: 'tight' } },
]

/** The frozen bottle's and the bomb's counters on their cards. */
export const MECHANIC_COUNTERS = { frozen: 5, bomb: 4, moves: 14 }

/** From, to; the last tier has no end. */
type Range = readonly [from: number, to?: number]

export interface Tier {
  id: TierId
  stages: Range
  colors: Range
  bottles: Range
  /** Average of the stages' minimum move counts. */
  moves: number
  /** How many of the nine special challenges turn up in the tier. */
  challenges: number
  face: Face
}

// From the production stage data (Levels/Production/StageDatabase.asset in the game).
export const TIERS: Tier[] = [
  { id: 'tutorial', stages: [1, 3], colors: [2, 2], bottles: [3, 4], moves: 4, challenges: 0, face: 'mint' },
  { id: 'easy', stages: [4, 15], colors: [3, 4], bottles: [5, 6], moves: 11, challenges: 3, face: 'aqua' },
  { id: 'medium', stages: [16, 56], colors: [4, 6], bottles: [5, 9], moves: 18, challenges: 9, face: 'sky' },
  { id: 'hard', stages: [57, 147], colors: [6, 8], bottles: [7, 10], moves: 24, challenges: 9, face: 'lilac' },
  { id: 'veryHard', stages: [148, 219], colors: [8, 9], bottles: [9, 11], moves: 29, challenges: 9, face: 'pink' },
  { id: 'pro', stages: [220, 650], colors: [8, 10], bottles: [9, 12], moves: 31, challenges: 9, face: 'peach' },
  { id: 'master', stages: [651], colors: [8, 10], bottles: [9, 12], moves: 33, challenges: 9, face: 'coral' },
]

/** The worlds' pills on the stage map, in order (their names are in the content). */
export const WORLD_FACES: Face[] = ['paper', 'pink', 'lilac', 'sky', 'butter', 'aqua', 'peach', 'mint', 'coral', 'lime']

export const MECHANIC_COUNT = MECHANICS.length

/** The designs shop's ten forms on two shelves, with the ribbons the banner gives them. */
export const SHELVES: { form: FormId; color: string; pattern?: 'dots' | 'stripes'; rarity?: RarityId }[][] = [
  [
    { form: 'tube', color: '#FF6F78', pattern: 'dots' },
    { form: 'potion', color: '#B08BF2', pattern: 'stripes', rarity: 'epic' },
    { form: 'hourglass', color: '#6673CC', rarity: 'legendary' },
    { form: 'jar', color: '#FFD45E', pattern: 'stripes' },
    { form: 'slim', color: '#6FD69A' },
  ],
  [
    { form: 'flask', color: '#6FD8E6', pattern: 'dots', rarity: 'rare' },
    { form: 'vase', color: '#FF92C8' },
    { form: 'tumbler', color: '#C2E067', pattern: 'stripes' },
    { form: 'barrel', color: '#FFA35C' },
    { form: 'shoulders', color: '#6FA8F5', pattern: 'dots' },
  ],
]

/** A new form every this many cleared stages (CosmeticContent.StageRewardInterval in the game). */
export const DESIGN_REWARD_INTERVAL = 50
export const FORM_COUNT = 10

export const SHOTS: { id: ShotId; src: string }[] = [
  { id: 'home', src: homeShot },
  { id: 'board', src: boardShot },
  { id: 'frozen', src: frozenShot },
  { id: 'locked', src: lockedShot },
  { id: 'bombs', src: bombsShot },
  { id: 'challenge', src: challengeShot },
  { id: 'designs', src: designsShot },
  { id: 'result', src: resultShot },
  { id: 'map', src: mapShot },
  { id: 'daily', src: dailyShot },
  { id: 'achievements', src: achievementsShot },
  { id: 'shop', src: shopShot },
]
