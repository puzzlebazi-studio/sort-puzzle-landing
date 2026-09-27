import type { SortPuzzleContent } from './types'

export const en: SortPuzzleContent = {
  meta: {
    title: 'Sort Puzzle | A color-sorting puzzle game for Android',
    description:
      'Sort Puzzle is a colorful brain teaser: pour liquids between bottles until each one holds a single color. 1,000+ stages, frozen and locked bottles, smart hints and daily rewards. Free on Cafe Bazaar and Myket.',
    ogTitle: 'Sort Puzzle | Pour, sort, win!',
    ogDescription: 'A color-sorting puzzle game with 1,000+ stages and four fresh challenges. Free for Android.',
  },

  nav: {
    features: 'Features',
    how: 'How to play',
    mechanics: 'Challenges',
    stages: 'Stages',
    gallery: 'Screenshots',
    studio: 'Studio',
    faq: 'FAQ',
  },

  hero: {
    eyebrow: 'A colorful puzzle game for Android',
    text: 'Move the colored liquids between bottles until every bottle holds just one color. It starts simple, but there are plenty of stages to become a sorting master, and new ones keep arriving.',
    howTo: 'How to play',
    stats: [
      { value: '1,000+', label: 'Stages' },
      { value: '7', label: 'Difficulty tiers' },
      { value: '4', label: 'Fresh challenges' },
      { value: 'Free', label: 'For Android' },
    ],
  },

  features: {
    eyebrow: 'Features',
    title: 'Why Sort Puzzle?',
    subtitle: 'A calm, brainy game you can come back to for a few minutes every day, full of little details that make it even sweeter.',
    items: {
      challenges: {
        title: 'Fresh challenges',
        text: 'Hidden layers, frozen and locked bottles, and stages with limited moves: the further you go, the more surprises you find.',
      },
      hints: {
        title: 'Smart hints',
        text: 'Stuck? A hint shows you the right next move. If you have hit a dead end, it tells you for free to undo or start over.',
      },
      undo: {
        title: 'Undo and an extra bottle',
        text: 'You get 5 free undos on every attempt, plus an extra bottle for the tough moments.',
      },
      stars: {
        title: 'Stars and coins',
        text: 'Win three stars with fewer moves and collect coins. Harder stages pay out more.',
      },
      daily: {
        title: 'Daily rewards',
        text: 'Drop by every day for a reward: seven days in a row, with 1,000 coins on day seven!',
      },
      achievements: {
        title: '8 achievements',
        text: 'From “First Sort” to “Factory Legend”, every achievement comes with a coin reward.',
      },
      offline: {
        title: 'No internet needed',
        text: 'Play anywhere, anytime: the stages live inside the game, so you never need a connection.',
      },
      autosave: {
        title: 'Auto-save',
        text: 'Your progress saves itself. Even if the game closes mid-stage, you pick up right where you left off.',
      },
    },
  },

  howTo: {
    eyebrow: 'How to play',
    title: 'Three easy steps',
    subtitle: 'The rule is so simple you learn it in seconds, but the later stages will really get your brain working.',
    step: (n) => `Step ${n}: `,
    steps: [
      { title: 'Tap a bottle', text: 'It lifts up, ready to pour.' },
      { title: 'Tap the target bottle', text: 'Liquid only pours onto the same color or into an empty bottle.' },
      { title: 'One color per bottle', text: 'When every bottle holds a single color, you win the stage!' },
    ],
  },

  mechanics: {
    eyebrow: 'Challenges',
    title: 'Four fresh challenges',
    subtitle: 'From stage 31 on, stages don’t just get longer: new rules join the game. The first time you meet each one, the game explains it.',
    fromStage: (n) => `From stage ${n}`,
    items: {
      hidden: {
        title: 'Hidden layers',
        text: 'The lower layers of some bottles show a “?”, and their color only appears once they reach the top. Plan ahead with half the picture!',
        alt: 'A bottle with three gray “?” layers among colorful bottles, in stage 956',
      },
      moves: {
        title: 'Limited moves',
        text: 'Every stage whose number ends in 5 is a challenge stage, and your moves are counted. Running out? Get 5 extra moves.',
        alt: 'A “47 moves” counter with a stopwatch badge above the bottles, in challenge stage 725',
      },
      frozen: {
        title: 'Frozen bottle',
        text: 'Every move melts a little of the ice. Until its counter reaches zero, you can’t pour anything in or take anything out.',
        alt: 'Two bottles in ice with counters of 7 and 8, in stage 956',
      },
      locked: {
        title: 'Locked bottle',
        text: 'Check the lock’s color: fill a bottle with that color to open the lock and use the bottle again.',
        alt: 'Two bottles with a purple lock and a green lock, in stage 926',
      },
    },
  },

  stages: {
    eyebrow: 'Stages',
    title: '7 steps to mastery',
    subtitle:
      'Each tier brings more colors and bottles. Every tenth stage is tougher than the rest, every ten stages open with a breather, and from Medium on, fresh challenges join in.',
    tiers: {
      tutorial: 'Tutorial',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      veryHard: 'Very hard',
      pro: 'Pro',
      master: 'Master',
    },
    tier: (n) => `Tier ${n}`,
    stageRange: (range) => `Stages ${range}`,
    colors: 'Colors',
    bottles: 'Bottles',
    moves: 'Moves',
    colorCount: (n) => `${n} colors`,
    noChallenges: 'No special challenges',
    challenges: (names) => `Challenges: ${names.join(', ')}`,
    challengesLegend: 'Challenges in each tier',
    difficulty: (n, total) => `Difficulty ${n} of ${total}`,
  },

  gallery: {
    eyebrow: 'Screenshots',
    title: 'A look at the game',
    subtitle: 'Bright, colorful graphics, smooth pouring animations and screens that come alive like a cartoon.',
    label: 'Game screenshots',
    carousel: 'carousel',
    show: (title) => `Show screenshot: ${title}`,
    previous: 'Previous screenshot',
    next: 'Next screenshot',
    position: (n, total) => `Screenshot ${n} of ${total}`,
    shots: {
      home: { title: 'Home screen', text: 'Play, the stage map, daily rewards and achievements.' },
      pour: { title: 'Pouring colors', text: 'Stage 956: ten colors, hidden layers and two frozen bottles.' },
      locked: { title: 'Locked bottles', text: 'Stage 926: complete the lock’s color to open it.' },
      challenge: { title: 'Challenge stage', text: 'Stage 725: you only have 47 moves!' },
      result: { title: 'Stars and coins', text: 'Fewer moves, more stars.' },
      map: { title: 'Stage map', text: 'Every stage along one winding path.' },
      daily: { title: 'Daily rewards', text: 'Drop by every day: 1,000 coins on day seven!' },
      achievements: { title: 'Achievements', text: 'Eight achievements, each with a coin reward.' },
    },
  },

  studio: {
    eyebrow: 'Studio',
    title: 'Behind Sort Puzzle',
    subtitle: 'An independent Iranian game, crafted with care from stage design to the very last animation.',
    role: 'The makers of Sort Puzzle',
    story:
      'We made Sort Puzzle to relax you and challenge your mind at the same time. From laying out the stages to the sound of pouring colors, we put time into every detail.',
    visit: 'Meet the studio',
  },

  download: {
    nav: 'Download',
    eyebrow: 'Free for Android',
    title: 'Ready? Download it!',
    text: 'Install Sort Puzzle for free from Cafe Bazaar or Myket right now and start your first stage in seconds!',
    android: (version) => `Android ${version} or later`,
    free: 'Free',
    offline: 'No internet needed',
    scan: 'Scan with your phone camera',
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Common questions',
    items: [
      {
        q: 'Is Sort Puzzle free?',
        a: 'Yes! The game is free, and every stage unlocks just by playing. Buying coins, the Starter Pack and Remove Ads are all completely optional.',
      },
      {
        q: 'Do I need the internet to play?',
        a: 'No. The stages live inside the game, so you can play offline. You only need the internet and the store you installed it from (Cafe Bazaar or Myket) for in-app purchases.',
      },
      {
        q: 'What are frozen and locked bottles?',
        a: 'From stage 31 on, fresh challenges show up: hidden layers whose color appears once they reach the top, challenge stages with limited moves, frozen bottles that melt a little with every move, and locked bottles that open when you complete the lock’s color. The first time you meet each one, the game explains it.',
      },
      {
        q: 'I’m stuck. What can I do?',
        a: 'You get 5 free undos on every attempt. A hint shows your next move, the extra bottle gives you an empty spot, and you can always restart the stage. In challenge stages, if you run out of moves, you can get 5 extra.',
      },
      {
        q: 'Is my progress saved?',
        a: 'Yes, automatically. Even if your phone turns off or the game closes mid-stage, you continue from the same spot next time.',
      },
      {
        q: 'Are there ads?',
        a: 'Ads only appear between stages, spaced out, and never during play. Buy “Remove Ads” to get rid of them for good.',
      },
      {
        q: 'What happens to my purchases if I reinstall the game?',
        a: '“Remove Ads” and the “Starter Pack” are tied to your account on the store you bought them from (Cafe Bazaar or Myket) and come back automatically when you reinstall from that store.',
      },
      {
        q: 'Which phones does it run on?',
        a: 'Any Android phone or tablet running Android 8 or later.',
      },
      {
        q: 'What language is the game in?',
        a: 'The game’s text is in Persian.',
      },
    ],
  },

  footer: {
    blurb: 'Pour, sort, win! A color-sorting puzzle game with four fresh challenges.',
    sections: 'Sections',
    download: 'Download',
  },
}
