import type { MetadataRoute } from 'next'
import { LOCALES } from '@/lib/i18n'
import { getPosts, pagesOf } from '@/lib/posts'
import { absoluteUrl } from '@/lib/site'

/** Every page in both languages; posts carry their last change. */
export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) => {
    const dates = new Map(getPosts(locale).map((post) => [`/${locale}/${post.slug}`, post.updated ?? post.date]))
    return pagesOf(locale).map((path) => ({
      url: absoluteUrl(path),
      ...(dates.has(path) ? { lastModified: dates.get(path) } : {}),
    }))
  })
}
