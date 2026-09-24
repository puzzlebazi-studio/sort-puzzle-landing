import { cn } from '../lib/cn'

interface PhoneFrameProps {
  src: string
  alt: string
  className?: string
  eager?: boolean
}

/** A phone with a 9:16 screen, sized by its parent's width. */
export function PhoneFrame({ src, alt, className, eager }: PhoneFrameProps) {
  return (
    <div className={cn('phone', className)}>
      <div className="phone__screen">
        <img src={src} alt={alt} width={540} height={960} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable={false} />
      </div>
      <span className="phone__speaker" aria-hidden="true" />
    </div>
  )
}
