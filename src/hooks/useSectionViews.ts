import { useEffect } from 'react'
import { track } from '../lib/analytics'

/**
 * Reports `view_<id>` the first time each section reaches the middle of the screen, once per page
 * view: how far down visitors read, and who reached the download section.
 */
export function useSectionViews(ids: string[]) {
  const key = ids.join(' ')
  useEffect(() => {
    const seen = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id
          if (!entry.isIntersecting || seen.has(id)) continue
          seen.add(id)
          observer.unobserve(entry.target)
          track(`view_${id}`)
        }
      },
      // A line across the middle of the screen: tall sections count once they reach it.
      { rootMargin: '-50% 0px -50% 0px' },
    )
    for (const id of key.split(' ')) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [key])
}
