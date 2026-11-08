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
site, Persian and English, is set in Lahzeh, the game's own type; so are the share images, banners
and ads. The studio's pages were designed in Lalezar, so there Lahzeh stands in for it at the same
measure ("Lahzeh Studio" in `index.css`: a weight heavier and set at 80%); Sort Puzzle's page uses
Lahzeh as is. The ads are made in `marketing/`, a separate package (see *Ads and banners*).

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
Cloudflare Pages, GitHub Pages, an nginx folder). Each page is its own `index.html` (`fa/index.html`,
`en/sort-puzzle/index.html`…) with its own title, description and share preview, so links shared
on Telegram or Instagram show the right page in the right language.

`404.html` is the "page not found" screen. Most hosts serve it for unknown paths on their own;
nginx needs `error_page 404 /404.html;`. React Router builds in `.react-router/build/` first
(pre-rendering needs a server build); the build keeps only the site and moves it to `dist/`.

### GitHub Pages

`.github/workflows/deploy.yml` builds the site and publishes `dist/` to GitHub Pages on every push
to `main` (pushes that only touch `marketing/`, `brand/` or Markdown are skipped). Run it
by hand from the repo's **Actions** tab. GitHub Pages serves `fa/index.html` at `/fa/`, redirects
`/fa` to `/fa/`, and serves `404.html` for unknown paths, so it needs no extra config.

One-time setup, in the repo's **Settings → Pages**:

1. **Source**: GitHub Actions.
2. **Custom domain**: `puzzlebazi.studio`. (With an Actions deployment, a `CNAME` file in the site
   is ignored, so the domain lives in this setting only.)
3. **Enforce HTTPS**, once GitHub has issued the certificate.

DNS for `puzzlebazi.studio` (the apex):

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| CNAME | `www` | `alirezahematidev.github.io` |

GitHub Pages caches every file for 10 minutes and its cache can't be configured, so the build's
content-hashed `assets/` no longer get a year-long browser cache.

## Search engines

The build writes `dist/sitemap.xml` (every page in both languages, each with its translations)
and `dist/robots.txt`, which points to it, from `LOCALES` and `GAME_ROUTES`: a new game is in the
sitemap with no extra step.

Each page also describes itself as structured data (schema.org JSON-LD, `src/lib/schema.ts`): the
studio as an `Organization` and the site as a `WebSite` on the studio's page, the game as a
`MobileApplication` (free, Android, its store listings as `sameAs`) on its page.

Add the domain to Google Search Console as a **Domain** property (`puzzlebazi.studio`, verified
with a DNS record). Submit `https://puzzlebazi.studio/sitemap.xml` there.

## Before publishing

| What | Where |
| --- | --- |
| The site's address, `https://puzzlebazi.studio`. Share previews need it for absolute image URLs, and it adds canonical and language links for search engines. Change it if the domain changes | `SITE_URL` in `src/site.ts` |
| Cafe Bazaar and Myket links use the game's package, `com.sortpuzzle.game`. They show «یافت نشد» until the listing is published | `PACKAGE_NAME` in `src/games/sort-puzzle/stores.ts` |
| The studio's links (Telegram, Instagram, website…), shown on its card and in the footer | `STUDIO` in `src/studio/studio.ts` |
| Google Analytics' measurement ID. Only the built site has the tag, so visits to `pnpm dev` aren't counted | `GA_MEASUREMENT_ID` in `src/site.ts` |
| Microsoft Clarity's project ID (`ytfpq93ggd`). Like Analytics, only the built site loads it; see *Analytics* for what it reports | `CLARITY_PROJECT_ID` in `src/site.ts` |

The store badges are the official ones in `public/`, one per language: `cafebazaar-logo-badge-fa.png`
and `-en.png`, `myket-logo-badge-fa.png` and `-en.png`. Each page shows its own language's. All are
cropped to their edges, so they share the same 421:125 proportions and line up at one height. To
replace or add one, crop it the same way and set its `width` and `height` in `STORES`.

## Adding a game

1. Make a folder for it next to `src/games/sort-puzzle/`: its page (`route.tsx`, with its `meta`
   and icons), its sections, its words in both languages and its images.
2. Add its page to `GAME_ROUTES` in `src/games/routes.ts`. That gives it `/fa/<slug>/` and
   `/en/<slug>/`, and the build renders both.
3. Add its card (`Game` in `src/games/types.ts`: name, tagline, summary, icon, screenshot, store)
   to `GAMES` in `src/games/registry.ts`. The studio's home page and footer list it from there.
4. Put its share images at `public/og/<slug>-fa.jpg` and `-en.jpg` (1200 × 630), and its icons in
   `public/<slug>/`.

The sitemap and the game's structured data come from the steps above.

The shared building blocks are in `src/components/`: the navbar, footer and language switch, the
game-style buttons and cards, the studio's icon, logotype and card, and the store badges.

## Where things live

- `src/routes.ts`: the pages. `src/root.tsx` is the HTML document: it sets `lang` and `dir` from
  the address and holds the site's default icons and the Google Analytics tag.
- `src/i18n/`: the languages (`locales.ts`), number and year formatting (`format.ts`), words shared
  by every page (`ui.ts`) and each page's head tags (`meta.ts`).
- `src/studio/`: the studio's name, intro and links (`studio.ts`), its home page's words in both
  languages (`content.ts`), its logotypes (`assets/`) and sections.
- `src/games/sort-puzzle/`:
  - `content/fa.ts` and `content/en.ts`: every word on the page, one file per language, both
    checked against the same type. `content/index.ts` holds what the languages share: icons,
    colors, images and the numbers of the seven difficulty tiers and the nine special mechanics
    (the stage that introduces each), which come from the game's production stage data
    (`Assets/SortFactory/Levels/Production/StageDatabase.asset`), and the ten worlds.
  - `game.ts`: its card on the studio's home page. `stores.ts`: store links.
  - `sections/`: one component per section, in page order in `route.tsx`.
  - `components/art/`: the game's flat art drawn in SVG: the bottle with every mechanic's prop
    (`Bottle.tsx`, sizes from the game's 1080 × 1920 sprites), the ten bottle forms of the designs
    shop (`Forms.tsx`), coins, stars, the chest and sparkles (`Decor.tsx`), and the how-to-play
    scenes (`Scenes.tsx`). `lib/liquid.ts` works out each liquid layer for any tilt with its area
    kept constant, like the game's liquid shader: that is how a pouring bottle keeps a level
    surface that just reaches its lip. `lib/palette.ts`: the ten liquids and the plum ink.
- `src/index.css`: design tokens (`@theme`) and two sets of component classes. The studio's pages
  keep the glossy look (`.btn-3d`, `.card-3d`… with the chocolate outline `#3A1500`). Sort Puzzle's
  page wears the game's art direction 2.0, flat and pastel (`.sticker`, `.flat-btn`, `.flat-round`,
  `.flat-chip`, `.stroke-text`, `.sunburst` with `.sun-*`, `.face-*`): one plum outline (`#2E2545`),
  a hard shadow straight down with no blur, and the store banners' sunbursts. Its route declares
  `handle: { look: 'flat' }`, so `root.tsx` gives the body the light ground and theme color from the
  first paint, and the shared navbar, footer and language switch take `look="flat"`.

Persian pages are right to left and English ones left to right; sections that point somewhere
(the carousel, the arrows between the how-to-play steps) follow the page's direction.

## The logo

The studio has an icon and a logotype.

The icon is «پ», the first letter of پازل‌بازی, in the extruded gold of the titles, with its three
dots as candy balls (pink, aqua and leaf). On the site it is `StudioLogo`
(`src/components/StudioLogo.tsx`): the studio page's navbar (`StudioMark`), the picture on the
studio's card and the site's icons. Its dots are `Ball`s from `CandyBall.tsx`, which also float
around the studio's hero.

The logotype is the studio's name, drawn for each language: پازل‌بازی with candy balls for dots and
a small "studio" under its end, or "PUZZLE BAZI Studio". `StudioLogotype`
(`src/components/StudioLogotype.tsx`) shows it as the studio's hero, in its footer and on its card,
and the studio's share previews and Aparat cover have it too. Its small word is black, for light
backgrounds like the card. Everywhere else is violet, so the site also has copies with the small
word in white (`src/studio/assets/*-on-dark.svg`). After changing a logotype in `brand/`, copy it
again and remake its white copy (the small word is the only thing filled black; the outlines are
strokes):

```bash
cp brand/puzzlebazi-logotype-fa.svg src/studio/assets/logotype-fa.svg
sed 's/fill="black"/fill="white"/g' brand/puzzlebazi-logotype-fa.svg > src/studio/assets/logotype-fa-on-dark.svg
```

`brand/` holds them as files for use off the site (nothing there is deployed):

| File | Use |
| --- | --- |
| `puzzlebazi-logo-512.png` | Profile picture for Telegram, Instagram and the like: the icon on the studio's violet, edge to edge, inside the circle those sites crop to |
| `puzzlebazi-mark-512.png` | The icon alone on a transparent background, for posts and videos |
| `puzzlebazi-logo.svg`, `puzzlebazi-mark.svg` | Their sources |
| `puzzlebazi-logotype-fa.svg`, `puzzlebazi-logotype-en.svg` | The logotype in each language, for light backgrounds |
| `aparat-cover-2200x245.png` | The Aparat channel's cover (9:1, under Aparat's 4 MB limit): the logotype and tagline in the middle, where phones keep it |

The icon's two SVGs and `public/favicon.svg` repeat the shapes in `StudioLogo.tsx`, so change them
together. The Aparat cover is the studio's hero, captured like its share previews (see *Assets*).
For a PNG of the icon at another size, set the SVG's `width` and `height` to it and screenshot the
SVG in Chrome at that window size (add `--default-background-color=00000000` for the transparent one):

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --force-device-scale-factor=1 \
  --window-size=512,512 --screenshot="$PWD/brand/puzzlebazi-logo-512.png" "file://$PWD/brand/puzzlebazi-logo.svg"
```

## Assets

Taken from the Unity project and converted for the web:

- `src/games/sort-puzzle/assets/logo-title.webp`: `Assets/SortFactory/Art/UI/Home/logo_title.png`
  (lossless WebP), the flat «سورت پازل» of the redesign. It spells the Persian name, so the English
  page sets "Sort Puzzle" in the same stroked type instead (butter and coral, plum outline).
- `src/games/sort-puzzle/assets/icon.svg`: the game's icon, `ArtSource/Icon/app_icon.svg`. The page
  shows it in the middle of its QR code, in its tab (`public/sort-puzzle/favicon.svg`: the same art
  clipped to a rounded tile) and on phones' home screens (`public/sort-puzzle/apple-touch-icon.png`:
  `ArtSource/Icon/icon_store_512.png` at 180 × 180).
- `src/games/sort-puzzle/assets/shots/*.webp`: the redesigned game (art direction 2.0, with the
  pastel liquids and flat narrow-neck tops of 2026-10-06), captured at 1080×1920 by its PlayMode suite (`Tools/run-tests.sh playmode --screenshots <dir>`)
  and scaled to 720×1280: home, the map, the result, the daily reward, achievements, the bottle
  shop, and stages 11 (limited moves), 14 (frozen), 18 (locked), 30 (vase bottles), 37 (bombs) and
  221 (hidden layers, a narrow neck and a stone). The file names carry the stage numbers the
  captions quote. Retake them the same way when the game's look changes.
- The page's other bottles, mechanics, forms and props are the redesign canvas's art (the flat
  bottle component, the UI kit and the store banners), redrawn in SVG in `components/art/`.
- `public/fonts/Lahzeh-{Regular,Bold,ExtraBold}.woff2`: the Lahzeh family from the supplied
  "Lahzeh Eco 2" kit (its `Lahzeh Webfonts`: Persian and Latin letters, Persian digits on Persian
  code points and Latin ones on Latin), the same type as the game, whose own copy is the FaNum cut.
- `public/og/sort-puzzle-*.jpg` (Sort Puzzle's share previews) are Remotion stills from
  `marketing/` (`pnpm render stills`, then copy `out/stills/sort-puzzle-share-*.jpg` here).
  `public/og/studio-*.jpg` and `brand/aparat-cover-2200x245.png` were rendered from the site's own
  components: a temporary route (not committed) that lays out the hero's logotype, tagline, candy
  balls and coins at share size, screenshotted with reduced motion. Re-render them if a hero
  changes.
- `public/favicon.svg` is the studio's icon on a violet tile, and `public/apple-touch-icon.png` is
  `brand/puzzlebazi-logo.svg` at 180 × 180.

## Analytics

Google Analytics counts visits. Microsoft Clarity (`@microsoft/clarity`, started in `root.tsx`)
records sessions and heatmaps and receives the custom events in `src/lib/analytics.ts`. Both run
only on the built site; in `pnpm dev` each event is logged to the console as `[clarity] …`
instead. Clarity events carry no values, so an event's details are set as session tags; every page
view is tagged with its `page` (`studio`, `sort-puzzle`) and `language` (`fa`, `en`).

| Event | When | Tags |
| --- | --- | --- |
| `store_click` | A Cafe Bazaar or Myket badge or link. Clarity keeps these sessions' recordings (`upgrade`) | `store` (`bazaar`, `myket`), `place` (`hero`, `download`, `footer`, `games`) |
| `view_<section>` | A section reaches the middle of the screen, once per page view (`view_download`: who reached the call to action) | |
| `how_to_play_click` | The hero's "how to play" button on Sort Puzzle's page | |
| `nav_click` | A section link in the navbar or its menu | `section`, `place` (`navbar`, `menu`) |
| `menu_open` | The navbar's menu, on phones and tablets | |
| `language_switch` | The language switch | `language` (the one chosen), `place` (`navbar`, `menu`, `footer`, `message`) |
| `faq_open` | A question opened | `faq` (its number) |
| `gallery_browse` | A screenshot chosen in the gallery (not the autoplay) | `shot`, `how` (`arrow`, `dot`, `swipe`, `tap`) |
| `studio_visit` | From a game's page to the studio's | |
| `game_open` | From the studio's page to a game's | `game`, `place` (`games`, `footer`) |

In Clarity's dashboard, filter recordings by these under *Custom events* and *Custom tags*. Visitors
from the EEA, the UK and Switzerland need a consent signal (`Clarity.consentV2`) before Clarity
may set cookies there; the site has no consent banner, like its Analytics setup.

## Ads and banners

`marketing/` holds the studio's ads, made in code with Remotion and rendered to MP4: an
independent package with its own `package.json` and lockfile, kept out of the site's build,
typecheck and lint. It has its own copies of the game's flat art and the Lahzeh fonts, so it never
imports from `src/`. See `marketing/README.md`.

```bash
cd marketing
pnpm install
pnpm studio          # preview and scrub every ad in Remotion Studio
pnpm render          # renders every ad to out/*.mp4 (and pnpm render stills for the banners)
```

