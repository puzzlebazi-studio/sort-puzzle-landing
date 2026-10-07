# پازل‌بازی استودیو: blog

The studio's bilingual blog (Persian and English), at **https://blog.puzzlebazi.studio**: news,
guides to the games and behind-the-scenes stories. Posts are Markdown files; every page is rendered
to static HTML at build time and served by a small Next.js server in a Docker image.

This package stands on its own, like `marketing/`: its own `package.json`, lockfile, build and
Docker image, its own copies of the logo, the Lahzeh font and the site's look (`globals.css`
repeats the site's colors, cards and buttons). It never imports from the site.

| Page | Persian | English |
| --- | --- | --- |
| Every post, newest first | `/fa` | `/en` |
| A post | `/fa/<slug>` | `/en/<slug>` |
| The posts on one topic | `/fa/tags/<tag>` | `/en/tags/<tag>` |
| RSS feed | `/fa/rss.xml` | `/en/rss.xml` |

`/` forwards to `/fa`. `/sitemap.xml` lists every page of both languages and `/robots.txt` points
to it. Unknown addresses get a real 404 in both languages.

Next.js 16 (App Router, `output: 'standalone'`), React 19, TypeScript, Tailwind CSS 4.

```bash
pnpm install
pnpm dev            # http://localhost:3200, drafts included
pnpm build          # type-checks, renders every page, assembles .next/standalone
pnpm start          # runs the build as production does, on http://localhost:3200
pnpm typecheck
pnpm docker:build   # the production image, puzzlebazi-blog
pnpm docker:run     # runs it on http://localhost:3200
pnpm deploy:liara   # uploads the source; Liara builds the Dockerfile (see Deploying)
```

## Writing a post

A post is `content/posts/<language>/<slug>.md`. Its translation has the same file name in the
other language's folder; the two pages then link to each other (the language switch, `hreflang`)
and a post without a translation simply has none. The slug is the address, so use short English
words with hyphens, and don't rename a published one.

```markdown
---
title: "راهنمای ۹ چالش ویژه‌ی سورت پازل"
description: "One or two sentences: shown under the title, on cards, in search results and share previews."
date: 2026-10-07          # published; the order of posts, newest first
updated: 2026-11-02       # optional: the last real change, for search engines
tags: [sort-puzzle, guide]
cover: /posts/<slug>/cover-fa.jpg
coverAlt: "What the cover shows"
draft: true               # optional: shown in `pnpm dev` only
---

The post, in Markdown.
```

- **Tags** are ids from `TAGS` in `src/lib/i18n.ts`, which holds each topic's name in both
  languages. A new topic goes there first; the build stops on an unknown tag.
- **Images** go in `public/posts/<slug>/` and are written `![alt text](/posts/<slug>/file.webp)`.
  The cover is 1200 × 630 (it's also the share preview); a post without one uses
  `public/og/default-<language>.jpg` when shared.
- **Markdown** is GitHub's: tables, lists, quotes, links. Raw HTML is not passed through. Headings
  get anchors, links to other sites open in a new tab, and images load lazily.
- **Links to the studio's site happen on their own.** The first time a post mentions a game by
  name («سورت پازل», "Sort Puzzle"), the name links to the game's page on puzzlebazi.studio; the
  first mention of «پازل‌بازی استودیو» / "PuzzleBazi Studio" links to the studio's home page.
  Mentions in headings are skipped, and so is a name whose page the post already links to.
- **To link a section of the studio's site**, write a shortcut; the build turns it into the address
  in the post's language:

  | Write | Links to (in a Persian post) |
  | --- | --- |
  | `[۹ چالش ویژه](game:sort-puzzle#mechanics)` | `https://puzzlebazi.studio/fa/sort-puzzle/#mechanics` |
  | `[سورت پازل](game:sort-puzzle)` | the game's page |
  | `[درباره‌ی ما](studio:#about)` | `https://puzzlebazi.studio/fa/#about` |

  Sort Puzzle's sections: `#features`, `#how` (how to play), `#mechanics` (the 9 challenges),
  `#stages`, `#designs`, `#gallery`, `#studio`, `#download`, `#faq`. The studio's: `#games`,
  `#about`. A misspelt game or section stops the build and lists the right ones. Link a section
  where it answers the sentence, like "if you get stuck" → `#faq`.
- **Store links** to Cafe Bazaar or Myket inside a post are counted (`store_click`, below). Link
  the game's listing, `https://cafebazaar.ir/app/com.sortpuzzle.game` or
  `https://myket.ir/app/com.sortpuzzle.game`.
- Reading time is worked out from the word count; dates show in the Persian calendar on `/fa`.

The words of the interface (titles, buttons, the footer) are in `UI` in `src/lib/i18n.ts`.

## Where things live

| Path | What |
| --- | --- |
| `content/posts/` | The posts |
| `src/app/[lang]/` | The pages: `layout.tsx` (header, footer, fonts, metadata), the home, `[slug]` (a post), `tags/[tag]`, `rss.xml` |
| `src/app/global-not-found.tsx` | The 404 for addresses outside `/fa` and `/en` |
| `src/lib/posts.ts` | Reads the posts and turns Markdown into HTML (at build time only) |
| `src/lib/i18n.ts` | The languages, the topics and every word of the interface |
| `src/lib/site.ts` | The blog's address, the studio's, and the analytics IDs |
| `src/lib/games.ts` | The studio's games, by the topic their posts carry: name, tagline, icon, stores, their page's sections |
| `src/lib/landing.ts` | Links to the studio's site: the `game:`/`studio:` shortcuts and the names linked on first mention |
| `src/lib/schema.ts` | Structured data for search engines, with the studio site's ids |
| `src/components/` | Header, footer, post cards, share buttons, the analytics pieces |
| `public/` | Logo, favicon, default share images, post images |

## Analytics

The same Google Analytics property and Microsoft Clarity project as puzzlebazi.studio, loaded in
production builds only (`pnpm dev` logs the events to the console instead). Every blog session is
tagged `site: blog` in Clarity, so it can be filtered apart from the site's.

| Clarity event | When | Tags |
| --- | --- | --- |
| `post_open` | A post opened from a list | `post`, `place` (home, tag, related) |
| `read_complete` | The reader reached the end of a post | `post` |
| `store_click` | A Cafe Bazaar or Myket link in a post or a game card; the session is kept for recording | `store`, `place` (a card's), `post` |
| `share_click` | A share button | `share` (telegram, whatsapp, x, copy), `post` |
| `language_switch` | The language switch | `language`, `place` |
| `studio_link` | A link to the studio's site or a game's page there | `place` (`header`, `footer`, `breadcrumb`, `post`, and the game card's `game_card_post`, `game_card_tag`, `game_card_home`), `post` |

## Search engines

The blog is on its own subdomain, so it's tied to puzzlebazi.studio on purpose, to send the
studio's site the ranking value the posts earn (the site's README has the same section):

- **Links in the posts' text**, with the game's name as their text: its first mention links to its
  page, and shortcuts link the section a sentence is about (see *Writing a post*). They are plain
  links (search engines follow them) and keep the referrer, so the site's Analytics shows the
  visits the blog sends.
- **The game card**: the game's icon and tagline, a link to its page on the studio's site and its
  stores. It closes every post tagged with a game in `GAMES` (`src/lib/games.ts`), opens that
  game's topic page, and lists the studio's games on the blog's home page.
- **Breadcrumbs** on every post and topic page start at the studio's site: پازل‌بازی استودیو ›
  وبلاگ › the topic. Phones see no studio link in the header, so this is theirs.
- The header and footer link the studio's site and Sort Puzzle's page.
- **One studio, one game.** The structured data (`src/lib/schema.ts`) names the studio and its
  games by the `@id`s the site gives them (`https://puzzlebazi.studio/#organization`,
  `https://puzzlebazi.studio/#sort-puzzle`). Each post is a `BlogPosting` written and published by
  the studio and `about` its game; the home page describes the `Blog`. Keep the ids and the
  studio's details in step with the site's `src/lib/schema.ts`.

In Google Search Console, the **Domain** property for `puzzlebazi.studio` covers the blog too;
submit `https://blog.puzzlebazi.studio/sitemap.xml` there next to the site's.

## Deploying

`pnpm build` writes a self-contained server to `.next/standalone/` and copies `public/` and the
static assets into it. The `Dockerfile` runs that same build and ships only the result: a
Node 24 Alpine image with no `node_modules`, listening on port 3000. It works on any host that
runs containers.

```bash
docker build -t puzzlebazi-blog .
docker run --rm -p 3200:3000 puzzlebazi-blog
```

### Liara

The blog runs on a **Docker** app, `puzzlebazi-blog`, next to the site's static app
(`puzzlebazi`). `liara.json` holds its settings: the app, the platform, port 3000, and builds in
Germany, where the npm registry is fast. Liara builds the image from the `Dockerfile` itself, so a
deploy uploads only the source (`.dockerignore` keeps `node_modules` and `.next` out).

Once, to set it up:

1. Create the app: `liara app create --app puzzlebazi-blog --platform docker --plan small-g2`
   (or in the console). The blog serves prebuilt pages, so the smallest plan is plenty.
2. `pnpm deploy:liara`
3. In the console, under the app's **Domains**, add `blog.puzzlebazi.studio`. Then, where
   `puzzlebazi.studio`'s DNS is managed, add the `CNAME` record Liara shows for it, and turn on
   SSL for the domain once it's verified.

After that, `pnpm deploy:liara` publishes changes: a new post is a new deploy.

The blog's address is `BLOG_URL` in `src/lib/site.ts`; canonical links, the sitemap, the feeds and
share previews are built from it.
