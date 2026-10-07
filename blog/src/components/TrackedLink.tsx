'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { track, type BlogEvent, type BlogTag } from '@/lib/analytics'

type TrackedLinkProps = ComponentProps<typeof Link> & {
  event: BlogEvent
  tags?: Partial<Record<BlogTag, string>>
}

/** A link that reports a Clarity event when followed; other sites open in a new tab. */
export function TrackedLink({ event, tags, onClick, href, ...props }: TrackedLinkProps) {
  const external = typeof href === 'string' && /^https?:\/\//.test(href)
  return (
    <Link
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      {...props}
      onClick={(e) => {
        track(event, tags)
        onClick?.(e)
      }}
    />
  )
}
