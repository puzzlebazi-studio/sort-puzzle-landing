import type { SortPuzzleContent } from './types'

export const en: SortPuzzleContent = {
  meta: {
    title: 'Sort Puzzle | A color-sorting puzzle game for Android',
    description:
      'Sort Puzzle is a colorful brain teaser: pour colored water between bottles until each one holds a single color. 1,000+ stages across 10 worlds, 9 special challenges like frozen bottles, locks and bombs, dozens of bottle designs and daily rewards. Free on Cafe Bazaar and Myket.',
    ogTitle: 'Sort Puzzle | Pour, sort, win!',
    ogDescription: 'A color-sorting puzzle game with 1,000+ stages, 9 special challenges and dozens of bottle designs. Free for Android.',
  },

  nav: {
    features: 'Features',
    how: 'How to play',
    mechanics: 'Challenges',
    stages: 'Stages',
    designs: 'Designs',
    gallery: 'Screenshots',
    studio: 'Studio',
    faq: 'FAQ',
  },

  hero: {
    eyebrow: 'A colorful puzzle game for Android',
    text: 'Pour colored water from bottle to bottle until each one holds just one color. It starts simple, but with special challenges and ten colorful worlds it keeps your mind busy for ages, and new stages keep arriving.',
    howTo: 'How to play',
    stats: [
      { value: '1,000+', label: 'Stages' },
      { value: '9', label: 'Special challenges' },
      { value: '10', label: 'Colorful worlds' },
      { value: 'Free', label: 'For Android' },
    ],
    shot: 'Sort Puzzle’s home screen: the Play button and colorful bottles',
  },

  features: {
    eyebrow: 'Features',
    title: 'Why Sort Puzzle?',
    subtitle: 'A calm, brainy game you can come back to for a few minutes every day, full of little details that make it even sweeter.',
    items: {
      challenges: {
        title: 'Special challenges',
        text: 'Hidden layers, ice, locks, bombs, stones and more surprises, sometimes two or three of them in one stage.',
      },
      hints: {
        title: 'Hints',
        text: 'Stuck? A hint shows you the right next move.',
      },
      undo: {
        title: 'Undo and an extra bottle',
        text: 'You start with 5 free undos, and there’s an extra bottle for the really tricky moments.',
      },
      stars: {
        title: 'Stars and coins',
        text: 'Use fewer moves to earn three stars and collect coins.',
      },
      daily: {
        title: 'Daily rewards',
        text: 'Drop by every day for a gift: seven days in a row, with 1,000 coins on day seven!',
      },
      achievements: {
        title: '40 achievements',
        text: 'From “First Step” to “Puzzle Legend”, every achievement comes with a coin reward.',
      },
      offline: {
        title: 'Plays offline',
        text: 'Play anywhere, anytime: the stages live inside the game, so you never need the internet.',
      },
      autosave: {
        title: 'Autosave',
        text: 'Your progress saves itself. Even if the game closes mid-stage, you pick up right where you left off.',
      },
    },
  },

  howTo: {
    eyebrow: 'How to play',
    title: 'Three simple steps',
    subtitle: 'The rule is so simple you’ll learn it in seconds, but the later stages will really get your brain working.',
    step: (n) => `Step ${n}: `,
    steps: [
      { title: 'Tap a bottle', text: 'It lifts up, ready to pour.' },
      { title: 'Tap where it goes', text: 'Color only pours onto the same color or into an empty bottle.' },
      { title: 'One color per bottle', text: 'Once every bottle holds a single color, you win the stage!' },
    ],
  },

  mechanics: {
    eyebrow: 'Challenges',
    title: '9 special challenges',
    subtitle:
      'Every few stages a new rule comes along, then shows up again and again, sometimes two or three at once. The first time you meet each one, the game explains it.',
    fromStage: (n) => `From stage ${n}`,
    moves: (n) => `${n} moves`,
    items: {
      hidden: {
        title: 'Hidden layers',
        text: 'Each bottle shows only its top layer; the colors underneath appear as they come to the top.',
      },
      moves: {
        title: 'Limited moves',
        text: 'On challenge stages your moves are counted. Ran out? Grab 5 more.',
      },
      frozen: {
        title: 'Frozen bottle',
        text: 'Its ice melts a little with every move; until its counter hits zero, nothing goes in or out.',
      },
      locked: {
        title: 'Locked bottle',
        text: 'Complete a bottle in the lock’s color to open it up again.',
      },
      ring: {
        title: 'Color ring',
        text: 'It only takes its ring’s color, but any color can be poured out of it.',
      },
      neck: {
        title: 'Narrow neck',
        text: 'A narrow neck pours just one layer per move.',
      },
      stones: {
        title: 'Stones',
        text: 'Stones fill a bottle’s bottom for good, leaving less room for colors.',
      },
      bomb: {
        title: 'Bomb',
        text: 'Complete or empty the bomb’s bottle before its fuse runs out!',
      },
      tight: {
        title: 'Tight stage',
        text: 'Only one empty bottle, and no extra bottle to help.',
      },
    },
  },

  stages: {
    eyebrow: 'Stages',
    title: '10 worlds, 7 steps to mastery',
    subtitle:
      'Stages wind across a map from one world to the next. Every tier brings more colors and bottles, and the special challenges arrive in the very first world.',
    worldsTitle: 'Ten colorful worlds',
    worlds: [
      'Color Meadow',
      'Candy Land',
      'Space Trip',
      'Neon City',
      'Toy World',
      'Ocean Deep',
      'Cyber City',
      'Magic Lab',
      'Volcano Mountain',
      'Heroes’ Peak',
    ],
    tiersTitle: 'Seven difficulty tiers',
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
    someChallenges: (n) => `${n} special challenges`,
    allChallenges: (n) => `All ${n} challenges`,
    difficulty: (n, total) => `Difficulty ${n} of ${total}`,
  },

  designs: {
    eyebrow: 'Designs',
    title: 'Dozens of bottle designs',
    subtitle: 'From stage rewards to rare, epic and legendary designs: pick the bottles you like best.',
    rarities: { rare: 'Rare', epic: 'Epic', legendary: 'Legendary' },
    forms: (n) => `${n} different shapes`,
    reward: (n) => `A new shape every ${n} stages`,
    shelf: 'Ten bottle shapes on two shelves: tube, slim, fat jar, flask, potion, hourglass, vase, tumbler, barrel and shoulders',
  },

  gallery: {
    eyebrow: 'Screenshots',
    title: 'A look inside',
    subtitle: 'Bright, cheerful art, smooth pouring animations and screens that come alive like a cartoon.',
    label: 'Game screenshots',
    carousel: 'carousel',
    show: (title) => `Show screenshot: ${title}`,
    previous: 'Previous screenshot',
    next: 'Next screenshot',
    position: (n, total) => `Screenshot ${n} of ${total}`,
    shots: {
      home: { title: 'Home screen', text: 'Play, the stage map, daily rewards and achievements.' },
      board: { title: 'Challenges combined', text: 'Stage 221: hidden layers, a narrow neck and a stone.' },
      frozen: { title: 'Frozen bottle', text: 'Stage 14: the ice melts with every move.' },
      locked: { title: 'Locked bottle', text: 'Stage 18: complete the lock’s color to open it.' },
      bombs: { title: 'Bomb', text: 'Stage 37: complete or empty the bottle before the fuse runs out.' },
      challenge: { title: 'Challenge stage', text: 'Stage 11: only 14 moves to spare!' },
      designs: { title: 'Bottle designs', text: 'Stage 30 with vase-shaped bottles.' },
      result: { title: 'Stars and coins', text: 'Fewer moves, more stars.' },
      map: { title: 'Stage map', text: 'Every stage along one winding path.' },
      daily: { title: 'Daily reward', text: 'Drop by daily; day seven pays 1,000 coins!' },
      achievements: { title: 'Achievements', text: '40 achievements, each with a coin reward.' },
      shop: { title: 'Bottle shop', text: 'Earn new shapes as you clear stages.' },
    },
  },

  studio: {
    eyebrow: 'Studio',
    title: 'Behind Sort Puzzle',
    subtitle: 'An independent Iranian game, crafted with care, from designing the stages to the very last animation.',
    role: 'The makers of Sort Puzzle',
    story:
      'We made Sort Puzzle to calm you down and challenge your mind at the same time. From laying out the stages to the sound of pouring colors, we took our time over every detail.',
    visit: 'Meet the studio',
  },

  download: {
    eyebrow: 'Free for Android',
    title: 'Ready? Get it now!',
    text: 'Install Sort Puzzle for free from Cafe Bazaar or Myket and start your first stage in seconds!',
    android: (version) => `Android ${version} and up`,
    free: 'Free',
    offline: 'No internet needed',
    scan: 'Scan with your phone’s camera',
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    items: [
      {
        q: 'Is Sort Puzzle free?',
        a: 'Yes! The game is free, and every stage unlocks just by playing. Buying coins or Remove Ads is completely optional.',
      },
      {
        q: 'Do I need the internet to play?',
        a: 'No. The stages live inside the game, so you can play offline. You only need the internet, and the store you installed the game from (Cafe Bazaar or Myket), for in-app purchases.',
      },
      {
        q: 'What are the special challenges?',
        a: 'From stage 7 on, a new rule turns up every few stages: hidden layers, limited moves, frozen bottles, locked bottles, color rings, narrow necks, stones, bombs and tight stages. After that each one keeps coming back, and sometimes two or three meet in one stage. The first time you see each one, the game explains it.',
      },
      {
        q: 'I’m stuck. What can I do?',
        a: 'You start with 5 free undos; after that, each undo costs a short video or a few coins. A hint shows the next move, an extra bottle gives you an empty spot, and you can always restart the stage. On challenge stages, if you run out of moves, you can get 5 more.',
      },
      {
        q: 'How do I get bottle designs?',
        a: 'Every 50 stages you earn a new bottle shape. Rare, epic and legendary designs can be bought with coins in the game’s shop.',
      },
      {
        q: 'Is my progress saved?',
        a: 'Yes, automatically. Even if your phone switches off or the game closes mid-stage, you carry on from the same spot next time.',
      },
      {
        q: 'Are there ads?',
        a: 'Every so often a short ad plays between stages, never in the middle of one. Rewarded videos only play when you choose to watch them. Buying Remove Ads gets rid of the ads between stages for good.',
      },
      {
        q: 'If I reinstall the game, what happens to Remove Ads?',
        a: 'Remove Ads, whether bought on its own or with a coin bundle, is tied to your account in the store you bought it from (Cafe Bazaar or Myket), so it comes back automatically when you reinstall from there.',
      },
      {
        q: 'Which phones does it run on?',
        a: 'Any Android phone or tablet running Android 8 or later.',
      },
    ],
  },

  footer: {
    blurb: 'Pour, sort, win! A color-sorting puzzle game with 9 special challenges and dozens of bottle designs.',
    sections: 'Sections',
    download: 'Download',
  },
}
