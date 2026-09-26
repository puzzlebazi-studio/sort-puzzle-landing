/** The page's sections, in order; each is also the id the menus link to. */
export type SectionId = 'features' | 'how' | 'mechanics' | 'stages' | 'gallery' | 'studio' | 'faq'
export type FeatureId = 'challenges' | 'hints' | 'undo' | 'stars' | 'daily' | 'achievements' | 'offline' | 'autosave'
export type MechanicId = 'hidden' | 'moves' | 'frozen' | 'locked'
export type TierId = 'tutorial' | 'easy' | 'medium' | 'hard' | 'veryHard' | 'pro' | 'master'
export type ShotId = 'home' | 'pour' | 'locked' | 'challenge' | 'result' | 'map' | 'daily' | 'achievements'

interface Heading {
  eyebrow: string
  title: string
  subtitle: string
}

interface Item {
  title: string
  text: string
}

/**
 * Every word on the page in one language. Numbers arrive already formatted for the language,
 * which is why some entries are functions.
 */
export interface SortPuzzleContent {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string }
  /** Section names in the menus. */
  nav: Record<SectionId, string>
  hero: {
    eyebrow: string
    text: string
    howTo: string
    stats: { value: string; label: string }[]
  }
  features: Heading & { items: Record<FeatureId, Item> }
  howTo: Heading & {
    /** Read before each step's title by screen readers. */
    step: (n: string) => string
    steps: [Item, Item, Item]
  }
  mechanics: Heading & {
    fromStage: (n: string) => string
    items: Record<MechanicId, Item & { alt: string }>
  }
  stages: Heading & {
    tiers: Record<TierId, string>
    tier: (n: string) => string
    stageRange: (range: string) => string
    colors: string
    bottles: string
    moves: string
    colorCount: (n: string) => string
    noChallenges: string
    challenges: (names: string[]) => string
    challengesLegend: string
    difficulty: (n: string, total: string) => string
  }
  gallery: Heading & {
    label: string
    carousel: string
    show: (title: string) => string
    previous: string
    next: string
    position: (n: string, total: string) => string
    shots: Record<ShotId, Item>
  }
  studio: Heading & {
    /** The studio's role on its card. */
    role: string
    /** The card's second paragraph, after the studio's intro. */
    story: string
    visit: string
  }
  download: {
    /** The navbar button. */
    nav: string
    eyebrow: string
    title: string
    text: string
    apk: string
    android: (version: string) => string
    free: string
    offline: string
    scan: string
  }
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] }
  footer: { blurb: string; sections: string; download: string }
}
