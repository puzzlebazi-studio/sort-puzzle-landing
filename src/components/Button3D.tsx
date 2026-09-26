import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'
import { cn } from '../lib/cn'
import type { Tone } from '../lib/tone'

interface CommonProps {
  tone?: Tone
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  className?: string
  children?: ReactNode
}

type AnchorProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: undefined }
type RouteLinkProps = CommonProps & Omit<LinkProps, 'className' | 'children'> & { href?: undefined }
type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; to?: undefined }

/**
 * The game's glossy pill button: outlined, with a darker lip that presses down.
 * `to` navigates within the site, `href` goes anywhere else (or to a section of the page).
 */
export function Button3D(props: AnchorProps | RouteLinkProps | ButtonProps) {
  const { tone = 'leaf', size = 'md', icon, className, children, ...rest } = props
  const classes = cn('btn-3d', `tone-${tone}`, size !== 'md' && `btn-3d--${size}`, className)
  const content = (
    <>
      {icon}
      {children !== undefined && <span>{children}</span>}
    </>
  )
  if (rest.to !== undefined) {
    return (
      <Link className={classes} {...(rest as LinkProps)}>
        {content}
      </Link>
    )
  }
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
