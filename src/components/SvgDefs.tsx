/** Gradients shared by every bottle and coin on the page. It must stay rendered (not display: none). */
export function SvgDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <filter id="sp-glow" x="-50%" y="-20%" width="200%" height="140%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <linearGradient id="sp-glass" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="0.7" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="sp-glass-shade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.32" />
          <stop offset="0.17" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="0.4" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.7" stopColor="#000" stopOpacity="0" />
          <stop offset="0.9" stopColor="#000" stopOpacity="0.12" />
          <stop offset="1" stopColor="#000" stopOpacity="0.24" />
        </linearGradient>
        <linearGradient id="sp-rim" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#dbeaff" />
          <stop offset="1" stopColor="#9dbcf0" />
        </linearGradient>
        <linearGradient id="sp-cork" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f4cd95" />
          <stop offset="0.55" stopColor="#dca466" />
          <stop offset="1" stopColor="#b77c42" />
        </linearGradient>
        <radialGradient id="sp-coin" cx="0.4" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#fff3a8" />
          <stop offset="0.45" stopColor="#ffc93a" />
          <stop offset="0.85" stopColor="#f29a12" />
          <stop offset="1" stopColor="#d97a08" />
        </radialGradient>
        <radialGradient id="sp-bubble" cx="0.35" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.1" />
        </radialGradient>
      </defs>
    </svg>
  )
}
