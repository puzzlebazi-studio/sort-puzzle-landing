'use client'

import { useEffect, useRef } from 'react'
import { track } from '@/lib/analytics'
import { STUDIO_URL } from '@/lib/site'

const STORES: [RegExp, string][] = [
  [/cafebazaar\.ir/, 'bazaar'],
  [/myket\.ir/, 'myket'],
]

/**
 * Placed right after a post's body (`#post-body`): reports `read_complete` when the reader gets
 * there, `store_click` for links to Cafe Bazaar or Myket inside the post and `studio_link` for
 * links to the studio's site.
 */
export function ReadTracker({ slug }: { slug: string }) {
  const end = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = end.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      track('read_complete', { post: slug })
      observer.disconnect()
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [slug])

  useEffect(() => {
    const body = document.getElementById('post-body')
    if (!body) return
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest('a')
      if (!link) return
      const store = STORES.find(([pattern]) => pattern.test(link.href))?.[1]
      if (store) track('store_click', { store, post: slug })
      else if (link.href.startsWith(`${STUDIO_URL}/`)) track('studio_link', { place: 'post', post: slug })
    }
    body.addEventListener('click', onClick)
    return () => body.removeEventListener('click', onClick)
  }, [slug])

  return <div ref={end} aria-hidden="true" />
}
