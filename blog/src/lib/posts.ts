import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Element, ElementContent, Root } from 'hast'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { isTag, type Locale, type TagId } from './i18n'
import { mentions, resolveShortcut } from './landing'
import { STUDIO_URL } from './site'

/**
 * Posts are Markdown files in content/posts/<language>/<slug>.md, read at build time: every page
 * is rendered to static HTML, so the running server never reads them. A post and its translation
 * share a slug.
 */
const ROOT = path.join(process.cwd(), 'content', 'posts')

export interface PostMeta {
  slug: string
  locale: Locale
  title: string
  description: string
  /** Published, as YYYY-MM-DD. */
  date: string
  updated?: string
  tags: TagId[]
  /** An image in public/, shown at the top and in share previews (1200 × 630 works best). */
  cover?: { src: string; alt: string }
  minutes: number
}

export interface Post extends PostMeta {
  html: string
}

interface FrontMatter {
  title?: string
  description?: string
  date?: string | Date
  updated?: string | Date
  tags?: string[]
  cover?: string
  coverAlt?: string
  draft?: boolean
}

const isoDate = (value: string | Date | undefined) =>
  value instanceof Date ? value.toISOString().slice(0, 10) : value ? String(value).slice(0, 10) : undefined

/** Words per minute, roughly the same for Persian and English prose. */
const WPM = 200

function readFile(locale: Locale, file: string): { meta: PostMeta; body: string; draft: boolean } {
  const slug = file.replace(/\.md$/, '')
  const source = fs.readFileSync(path.join(ROOT, locale, file), 'utf8')
  const { data, content } = matter(source)
  const front = data as FrontMatter
  const where = `content/posts/${locale}/${file}`
  if (!front.title || !front.description || !front.date) throw new Error(`${where}: title, description and date are required`)
  const tags = (front.tags ?? []).map((tag) => {
    if (!isTag(tag)) throw new Error(`${where}: unknown tag "${tag}" (add it to TAGS in src/lib/i18n.ts)`)
    return tag
  })
  const words = content.split(/\s+/).filter(Boolean).length
  return {
    meta: {
      slug,
      locale,
      title: front.title,
      description: front.description,
      date: isoDate(front.date)!,
      updated: isoDate(front.updated),
      tags,
      cover: front.cover ? { src: front.cover, alt: front.coverAlt ?? front.title } : undefined,
      minutes: Math.max(1, Math.round(words / WPM)),
    },
    body: content,
    draft: front.draft === true,
  }
}

function load(locale: Locale) {
  const dir = path.join(ROOT, locale)
  if (!fs.existsSync(dir)) return []
  return (
    fs
      .readdirSync(dir)
      .filter((file) => file.endsWith('.md'))
      .map((file) => readFile(locale, file))
      // Drafts show in `pnpm dev` only.
      .filter((post) => !post.draft || process.env.NODE_ENV === 'development')
      .sort((a, b) => b.meta.date.localeCompare(a.meta.date) || a.meta.slug.localeCompare(b.meta.slug))
  )
}

/** A language's posts, newest first. */
export const getPosts = (locale: Locale): PostMeta[] => load(locale).map((post) => post.meta)

export function getPost(locale: Locale, slug: string): Post | undefined {
  const found = load(locale).find((post) => post.meta.slug === slug)
  if (!found) return undefined
  return { ...found.meta, html: render(locale, found.body, `content/posts/${locale}/${slug}.md`) }
}

/** The same post in the other language, if it has been translated. */
export const hasPost = (locale: Locale, slug: string) => load(locale).some((post) => post.meta.slug === slug)

/** The topics a language's posts use, most used first. */
export function getTags(locale: Locale): { tag: TagId; count: number }[] {
  const counts = new Map<TagId, number>()
  for (const post of getPosts(locale)) for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  return [...counts].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count)
}

/**
 * Images load lazily; links to other sites open in a new tab. Links to the studio's site keep the
 * referrer, so its analytics count the visits the blog sends it.
 */
function polish() {
  return (tree: Root) => {
    const walk = (node: Root | Element) => {
      for (const child of node.children) {
        if (child.type !== 'element') continue
        if (child.tagName === 'img') Object.assign(child.properties, { loading: 'lazy', decoding: 'async' })
        const href = String(child.properties.href ?? '')
        if (child.tagName === 'a' && /^https?:\/\//.test(href)) {
          const studio = href.startsWith(`${STUDIO_URL}/`)
          Object.assign(child.properties, { target: '_blank', rel: studio ? 'noopener' : 'noopener noreferrer' })
        }
        walk(child)
      }
    }
    walk(tree)
  }
}

/** Not linked automatically: the text of links, headings and code. */
const NO_LINKS = new Set(['a', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
/** A name as a whole word: not inside a longer Persian or English word. */
const wholeWord = (name: string) => new RegExp(`(?<![\\p{L}\\p{N}\\u200c])${escapeRegExp(name)}(?![\\p{L}\\p{N}\\u200c])`, 'u')

/**
 * Links to the studio's site (see lib/landing.ts). `game:` and `studio:` shortcuts become its
 * addresses in the post's language. Then the first mention of each game's name, and of the
 * studio's, in the post's text links to its page there, unless the post already links to that
 * page itself.
 */
function linkStudio(locale: Locale, where: string) {
  return (tree: Root) => {
    const linked = new Set<string>()
    const resolve = (node: Root | Element) => {
      for (const child of node.children) {
        if (child.type !== 'element') continue
        if (child.tagName === 'a') {
          try {
            child.properties.href = resolveShortcut(String(child.properties.href ?? ''), locale)
          } catch (error) {
            throw new Error(`${where}: ${(error as Error).message}`)
          }
          linked.add(String(child.properties.href))
        }
        resolve(child)
      }
    }
    resolve(tree)

    const pending = mentions(locale).filter(({ href }) => !linked.has(href))
    const link = (node: Root | Element) => {
      for (let i = 0; i < node.children.length && pending.length > 0; i++) {
        const child = node.children[i]
        if (child.type === 'element' && !NO_LINKS.has(child.tagName)) link(child)
        if (child.type !== 'text') continue
        // The mention that comes first in this text.
        const found = pending
          .map((mention) => ({ mention, at: wholeWord(mention.name).exec(child.value)?.index ?? -1 }))
          .filter(({ at }) => at >= 0)
          .sort((a, b) => a.at - b.at)[0]
        if (!found) continue
        const { mention, at } = found
        const before = child.value.slice(0, at)
        const after = child.value.slice(at + mention.name.length)
        const anchor: Element = { type: 'element', tagName: 'a', properties: { href: mention.href }, children: [{ type: 'text', value: mention.name }] }
        const parts: ElementContent[] = [...(before ? [{ type: 'text' as const, value: before }] : []), anchor, ...(after ? [{ type: 'text' as const, value: after }] : [])]
        node.children.splice(i, 1, ...parts)
        pending.splice(pending.indexOf(mention), 1)
        // Carry on from the text after the link, which may mention another name.
        i += parts.length - (after ? 2 : 1)
      }
    }
    link(tree)
  }
}

/** Markdown to HTML. Raw HTML in a post is not passed through. */
function render(locale: Locale, markdown: string, where: string) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(() => linkStudio(locale, where))
    .use(polish)
    .use(rehypeStringify)
  return String(processor.processSync(markdown))
}

/** Every page a language has: its home, its posts and its topics. */
export function pagesOf(locale: Locale): string[] {
  return [
    `/${locale}`,
    ...getPosts(locale).map((post) => `/${locale}/${post.slug}`),
    ...getTags(locale).map(({ tag }) => `/${locale}/tags/${tag}`),
  ]
}
