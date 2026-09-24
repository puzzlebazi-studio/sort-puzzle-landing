import { useEffect, type RefObject } from 'react'
import { useFinePointer, useReducedMotion } from './useMediaQuery'

/** Writes the pointer position over the element as --px and --py, each from -1 to 1. */
export function usePointerParallax(ref: RefObject<HTMLElement | null>) {
  const fine = useFinePointer()
  const reduced = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || !fine || reduced) return
    let frame = 0
    let x = 0
    let y = 0
    const apply = () => {
      frame = 0
      element.style.setProperty('--px', x.toFixed(3))
      element.style.setProperty('--py', y.toFixed(3))
    }
    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      y = ((event.clientY - rect.top) / rect.height) * 2 - 1
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      x = 0
      y = 0
      if (!frame) frame = requestAnimationFrame(apply)
    }
    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerleave', onLeave)
    }
  }, [ref, fine, reduced])
}
