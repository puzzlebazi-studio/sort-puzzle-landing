import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import type { Tone } from '../data/content'
import { cn } from '../lib/cn'

interface CommonProps {
  tone?: Tone
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  className?: string
  children?: ReactNode
}

type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

/** The game's glossy pill button: outlined, with a darker lip that presses down. */
export function Button3D(props: LinkProps | ButtonProps) {
  const { tone = 'leaf', size = 'md', icon, className, children, ...rest } = props
  const classes = cn('btn-3d', `tone-${tone}`, size !== 'md' && `btn-3d--${size}`, className)
  const content = (
    <>
      {icon}
      {children !== undefined && <span>{children}</span>}
    </>
  )
  if (typeof rest.href === 'string') {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )
}
