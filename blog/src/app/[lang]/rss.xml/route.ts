import { isLocale, LOCALES, TAGS, UI } from '@/lib/i18n'
import { getPosts } from '@/lib/posts'
import { absoluteUrl, BLOG_URL } from '@/lib/site'

// One RSS 2.0 feed per language (/fa/rss.xml, /en/rss.xml), written at build time.
export const dynamic = 'force-static'
export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }))

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export async function GET(_request: Request, { params }: RouteContext<'/[lang]/rss.xml'>) {
  const { lang } = await params
  if (!isLocale(lang)) return new Response('Not found', { status: 404 })
  const t = UI[lang]
  const posts = getPosts(lang)
  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/${lang}/${post.slug}`)
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(post.description)}</description>
      <pubDate>${new Date(`${post.date}T09:00:00+03:30`).toUTCString()}</pubDate>
${post.tags.map((tag) => `      <category>${escape(TAGS[tag][lang])}</category>`).join('\n')}
    </item>`
    })
    .join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(t.title)}</title>
    <link>${BLOG_URL}/${lang}</link>
    <description>${escape(t.description)}</description>
    <language>${lang}</language>
    <atom:link href="${absoluteUrl(`/${lang}/rss.xml`)}" rel="self" type="application/rss+xml" />
${posts[0] ? `    <lastBuildDate>${new Date(`${posts[0].date}T09:00:00+03:30`).toUTCString()}</lastBuildDate>\n` : ''}${items}
  </channel>
</rss>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
