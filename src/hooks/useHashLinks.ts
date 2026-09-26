import { useEffect } from 'react'

/**
 * Smooth-scrolls links to a section of the same page (href="#id") and moves focus there, like
 * the browser's own jump. The browser's jump would add a history entry that React Router's
 * scroll restoration then fights over, so the address bar is updated in place instead.
 */
export function useHashLinks() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null
      const id = link ? decodeURIComponent(link.getAttribute('href')!.slice(1)) : ''
      const target = id ? document.getElementById(id) : null
      if (!target) return
      event.preventDefault()
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
      window.history.replaceState(window.history.state, '', `#${id}`)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}
