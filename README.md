# سورت پازل: landing page

The Persian (RTL) landing page for **سورت پازل** (Sort Factory), the color-sorting puzzle in
`../sorting-puzzle`. It only introduces the game; nothing on the page is playable.

React 19, TypeScript, Tailwind CSS 4 and Vite. Every word on the page is set in Lalezar.

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # type-checks, then writes the static site to dist/
pnpm preview    # serves dist/
pnpm lint
```

`dist/` is a plain static site, so any static host works (Netlify, Vercel, Cloudflare Pages,
Liara, an nginx folder).

## Before publishing

| What | Where |
|---|---|
| Cafe Bazaar and Myket links: they use the placeholder package `com.sortfactory.game` from Player Settings | `PACKAGE_NAME` in `src/data/site.ts` |
| Myket is shown as «به‌زودی». In-app purchases use Bazaar's Poolakey SDK, so Myket needs its own billing first | `comingSoon` on the Myket entry in `STORES` |
| Direct download: put the signed release APK at `public/downloads/sort-puzzle.apk` | the `apk` entry in `STORES` |
| Studio name, role, bio and links (Telegram, Instagram…). Set `avatar` to show the studio's logo instead of the initial | `STUDIO` in `src/data/site.ts` |
| Share preview: `og:image` must be an absolute URL once the site has a domain | `index.html` |

The store buttons are the official badges in `public/` (`cafebazaar-logo-badge.png`,
`myket-logo-badge.png`). Both are cropped to their edges, so they share the same 421:125
proportions and line up at one height. To replace one, crop the new badge to its edges the same
way and update its `width` and `height` in `STORES`.

## Where things live

- `src/data/site.ts`: store links and badges, the APK and the studio.
- `src/data/content.ts`: all other copy (features, how to play, the four special mechanics, the
  seven difficulty tiers, screenshots, FAQ). Tier and mechanic numbers come from the game's
  production stage data (`Assets/SortFactory/Levels/Production/StageDatabase.asset`).
- `src/sections/`: one component per section, in page order in `src/App.tsx`.
- `src/components/`: the game-style pieces: `Button3D`, `Title3D` (extruded gold lettering),
  `GameIcon` (round glossy badge), `TiltCard`, `Coin3D`, `Wave`, `StoreBadge`, `PhoneFrame`.
- `src/components/tube/`: the SVG bottles. `lib/liquid.ts` works out each liquid layer for any
  tilt with its area kept constant, like the game's liquid shader. That is how the "pour"
  illustration shows a level surface.
- `src/index.css`: design tokens (`@theme`), and the component classes that copy the game's
  art: the chocolate outline `#3A1500`, glossy faces with a darker lip, cream panels.

## Assets

Taken from the Unity project and converted for the web:

- `src/assets/img/logo-title.webp`, `star-full.webp`: `Assets/SortFactory/Art/UI` (lossless WebP).
- `src/assets/img/shots/*.webp`: captured at 1080×1920 from the real Game scene in Unity
  PlayMode (the same way as `GameViewTests`' screenshots), for a player at stage 128 and on
  stages 725, 926 and 956, then scaled to 720×1280.
- `src/assets/img/mechanics/*.webp`: close-ups cropped from those captures.
- `public/fonts/Lalezar-Regular.woff2`: the supplied Lalezar TTF, compressed to WOFF2 with every
  glyph and OpenType feature kept. Lalezar is licensed under the SIL Open Font License 1.1.
- `public/og-image.jpg` and `public/apple-touch-icon.png` were rendered from the page itself.
  Re-render them if the hero changes.
