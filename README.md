# پازل‌بازی استودیو: website

The bilingual (Persian and English) website of **پازل‌بازی استودیو** (PuzzleBazi Studio). The home
page introduces the studio and lists its games; each game has its own page. The first one is
**سورت پازل** (Sort Puzzle), the color-sorting puzzle in `../sorting-puzzle`. The pages only
introduce the games; nothing on them is playable.

| Page | Persian | English |
| --- | --- | --- |
| The studio | `/fa/` | `/en/` |
| Sort Puzzle | `/fa/sort-puzzle/` | `/en/sort-puzzle/` |

`/` forwards to `/fa/`. Every page has a switch to the same page in the other language.

React 19, React Router 8 (framework mode), TypeScript, Tailwind CSS 4 and Vite. Every word on the
site, Persian and English, is set in Lalezar.

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # type-checks, then renders every page to static HTML in dist/
pnpm preview    # serves dist/ the way a static host does
pnpm typecheck
pnpm lint
```

## Deploying

`dist/` is a plain static site: upload that folder to any static host (Netlify, Vercel,
Cloudflare Pages, Liara, an nginx folder). Each page is its own `index.html` (`fa/index.html`,
`en/sort-puzzle/index.html`…) with its own title, description and share preview, so links shared
on Telegram or Instagram show the right page in the right language.

`404.html` is the "page not found" screen. Most hosts serve it for unknown paths on their own;
nginx needs `error_page 404 /404.html;`. React Router builds in `.react-router/build/` first
(pre-rendering needs a server build); the build keeps only the site and moves it to `dist/`.

### Liara

Create a **Static** app on Liara, then build and deploy `dist/` (the same way Liara's docs
deploy other static site generators):

```bash
pnpm build
cd dist
liara deploy --platform=static --app <your-app-id>
```

Or zip the contents of `dist/` (with `index.html` at the top of the zip) and upload it as a
new deployment in the console. Don't deploy the project folder itself: Liara runs no build for
static apps.

`public/liara_nginx.conf` lands at the root of `dist/`, where Liara looks for it. It
replaces Liara's default nginx rules, which answer every unknown address with `/index.html` (here,
the redirect to `/fa/`): unknown addresses get `404.html` instead, and it turns on gzip and browser
caching (a year for the build's content-hashed `assets/`).

## Before publishing

| What | Where |
| --- | --- |
| The site's address, `https://puzzlebazi.studio`. Share previews need it for absolute image URLs, and it adds canonical and language links for search engines. Change it if the domain changes | `SITE_URL` in `src/site.ts` |
| Cafe Bazaar and Myket links use the game's package, `com.sortpuzzle.game`. They show «یافت نشد» until the listing is published | `PACKAGE_NAME` in `src/games/sort-puzzle/stores.ts` |
| Myket is shown as «به‌زودی». In-app purchases use Bazaar's Poolakey SDK, so Myket needs its own billing first | `comingSoon` on the Myket entry in `STORES` |
| Direct download: the signed release APK lives at `public/downloads/sort-puzzle.apk` (1.0.1 now). The folder is gitignored, so copy each new release there before building | the `apk` entry in `STORES` |
| The studio's links (Telegram, Instagram, website…), shown on its card and in the footer. Set `logo` to show the studio's logo instead of the puzzle piece | `STUDIO` in `src/studio/studio.ts` |
| English store badges: the English pages show the Persian ones until you add them | `badge.en` on each store in `STORES` |

The store badges are the official ones in `public/` (`cafebazaar-logo-badge.png`,
`myket-logo-badge.png`). Both are cropped to their edges, so they share the same 421:125
proportions and line up at one height. To replace or add one, crop it the same way and set its
`width` and `height`.

## Adding a game

1. Make a folder for it next to `src/games/sort-puzzle/`: its page (`route.tsx`, with its `meta`
   and icons), its sections, its words in both languages and its images.
2. Add its page to `GAME_ROUTES` in `src/games/routes.ts`. That gives it `/fa/<slug>/` and
   `/en/<slug>/`, and the build renders both.
3. Add its card (`Game` in `src/games/types.ts`: name, tagline, summary, icon, screenshot, store)
   to `GAMES` in `src/games/registry.ts`. The studio's home page and footer list it from there.
4. Put its share images at `public/og/<slug>-fa.jpg` and `-en.jpg` (1200 × 630), and its icons in
   `public/<slug>/`.

The shared building blocks are in `src/components/`: the navbar, footer and language switch, the
game-style buttons and cards, the studio card and the store badges.

## Where things live

- `src/routes.ts`: the pages. `src/root.tsx` is the HTML document: it sets `lang` and `dir` from
  the address and holds the site's default icons.
- `src/i18n/`: the languages (`locales.ts`), number and year formatting (`format.ts`), words shared
  by every page (`ui.ts`) and each page's head tags (`meta.ts`).
- `src/studio/`: the studio's name, intro and links (`studio.ts`), its home page's words in both
  languages (`content.ts`) and sections.
- `src/games/sort-puzzle/`:
  - `content/fa.ts` and `content/en.ts`: every word on the page, one file per language, both
    checked against the same type. `content/index.ts` holds what the languages share: icons,
    colors, images and the numbers of the seven difficulty tiers and four special mechanics, which
    come from the game's production stage data
    (`Assets/SortFactory/Levels/Production/StageDatabase.asset`).
  - `game.ts`: its card on the studio's home page. `stores.ts`: store links and the APK.
  - `sections/`: one component per section, in page order in `route.tsx`.
  - `components/tube/`: the SVG bottles. `lib/liquid.ts` works out each liquid layer for any tilt
    with its area kept constant, like the game's liquid shader. That is how the "pour"
    illustration shows a level surface.
- `src/index.css`: design tokens (`@theme`), and the component classes that copy the game's art:
  the chocolate outline `#3A1500`, glossy faces with a darker lip, cream panels.

Persian pages are right to left and English ones left to right; sections that point somewhere
(the carousel, the arrows between the how-to-play steps) follow the page's direction.

## Assets

Taken from the Unity project and converted for the web:

- `src/games/sort-puzzle/assets/logo-title.webp`, `star-full.webp`: `Assets/SortFactory/Art/UI`
  (lossless WebP). The logo spells the Persian name, so the English page sets "Sort Puzzle" in the
  same gold lettering instead.
- `src/games/sort-puzzle/assets/icon.webp`: the store icon (`ArtSource/Icon/icon_store_512.png`) at
  256 × 256.
- `src/games/sort-puzzle/assets/shots/*.webp`: captured at 1080×1920 from the real Game scene in
  Unity PlayMode (the same way as `GameViewTests`' screenshots), for a player at stage 128 and on
  stages 725, 926 and 956, then scaled to 720×1280.
- `src/games/sort-puzzle/assets/mechanics/*.webp`: close-ups cropped from those captures.
- `public/fonts/Lalezar-Regular.woff2`: the supplied Lalezar TTF, compressed to WOFF2 with every
  glyph and OpenType feature kept. Lalezar is licensed under the SIL Open Font License 1.1.
- `public/og/*.jpg` (share previews), `public/apple-touch-icon.png` and
  `public/sort-puzzle/apple-touch-icon.png` were rendered from the site's own components. Re-render
  them if a hero changes.
- `public/favicon.svg` is the studio's puzzle piece; `public/sort-puzzle/favicon.svg` is the
  game's bottle.
