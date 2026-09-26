import { useEffect, useRef, useState } from 'react'

/**
 * True once the element has scrolled into view (and stays true). It starts false everywhere,
 * so pre-rendered HTML and the first browser render agree; the root layout shows everything
 * when scripts are off.
 */
export function useInView<T extends Element>(rootMargin = '0px 0px -12% 0px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
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
