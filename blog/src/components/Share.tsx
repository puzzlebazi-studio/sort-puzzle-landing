'use client'

import { useState } from 'react'
import { track } from '@/lib/analytics'
import { UI, type Locale } from '@/lib/i18n'

const BUTTON =
  'inline-flex items-center gap-2 rounded-full border-[2.5px] border-choco bg-white px-4 pt-1 pb-1.5 text-base font-bold text-choco shadow-[0_3px_0_rgb(58_21_0/0.35)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5'

/** Share a post on Telegram, WhatsApp or X, or copy its address. */
export function Share({ url, title, locale, slug }: { url: string; title: string; locale: Locale; slug: string }) {
  const t = UI[locale]
  const [copied, setCopied] = useState(false)
  const text = encodeURIComponent(title)
  const link = encodeURIComponent(url)
  const targets = [
    { id: 'telegram', label: 'Telegram', href: `https://t.me/share/url?url=${link}&text=${text}` },
    { id: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/?text=${text}%20${link}` },
    { id: 'x', label: 'X', href: `https://x.com/intent/post?text=${text}&url=${link}` },
  ]
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="text-lg font-extrabold text-choco">{t.share}</span>
      {targets.map((target) => (
        <a
          key={target.id}
          href={target.href}
          target="_blank"
          rel="noopener noreferrer"
          className={BUTTON}
          onClick={() => track('share_click', { share: target.id, post: slug })}
        >
          {target.label}
        </a>
      ))}
      <button
        type="button"
        className={`${BUTTON} cursor-pointer`}
        onClick={async () => {
          track('share_click', { share: 'copy', post: slug })
          try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          } catch {
            // Clipboard blocked: nothing to do, the address is in the bar.
          }
        }}
      >
        <span aria-live="polite">{copied ? t.copied : t.copyLink}</span>
      </button>
    </div>
  )
}
