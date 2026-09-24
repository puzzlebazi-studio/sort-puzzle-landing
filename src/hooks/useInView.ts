import { useEffect, useRef, useState } from 'react'

const supported = typeof IntersectionObserver !== 'undefined'

/** True once the element has scrolled into view (and stays true). */
export function useInView<T extends Element>(rootMargin = '0px 0px -12% 0px') {
  const ref = useRef<T>(null)
  // Without IntersectionObserver there is nothing to wait for, so show everything.
  const [inView, setInView] = useState(!supported)

  useEffect(() => {
    const element = ref.current
    if (!element || !supported) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [rootMargin])

  return [ref, inView] as const
}
