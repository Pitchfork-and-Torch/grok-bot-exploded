export function FallbackPoster() {
  return (
    <div className="fallback" aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <g className="hemi-l">
          <path d="M100 22 A78 78 0 0 0 100 178" fill="#f3eee6" />
        </g>
        <g className="hemi-r">
          <path d="M100 22 A78 78 0 0 1 100 178" fill="#f7f3ec" />
        </g>
        <g className="core">
          <circle cx="100" cy="100" r="18" fill="#d5e2ef" />
          <circle cx="100" cy="100" r="28" fill="none" stroke="#cfd6df" strokeWidth="1" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="#9aa6b4" strokeWidth="0.6" />
        </g>
        <g className="ring">
          <ellipse cx="100" cy="100" rx="78" ry="10" fill="none" stroke="#c8c2b8" strokeWidth="1.2" />
        </g>
        <g className="eyes">
          <rect x="62" y="86" width="28" height="12" rx="6" fill="#141414" />
          <rect x="110" y="86" width="28" height="12" rx="6" fill="#141414" />
        </g>
      </svg>
    </div>
  )
}
