// Stroke icons on a 24×24 grid (Lucide-style). Paths are shared with the canvas-drawn lanyard card.
export const ICON_PATHS = {
  github: [
    'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4',
    'M9 18c-4.51 2-5-2-7-2'
  ],
  mail: ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'm22 6-10 7L2 6'],
  linkedin: [
    'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z',
    'M2 9h4v12H2z',
    'M6 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z'
  ],
  pin: ['M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z', 'M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'],
  code: ['m18 16 4-4-4-4', 'm6 8-4 4 4 4', 'm14.5 4-5 16'],
  moon: ['M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'],
  sun: [
    'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z',
    'M12 2v2',
    'M12 20v2',
    'm4.93 4.93 1.41 1.41',
    'm17.66 17.66 1.41 1.41',
    'M2 12h2',
    'M20 12h2',
    'm6.34 17.66-1.41 1.41',
    'm19.07 4.93-1.41 1.41'
  ],
  chevronLeft: ['m15 18-6-6 6-6'],
  chevronRight: ['m9 18 6-6-6-6'],
  close: ['M18 6 6 18', 'm6 6 12 12'],
  send: ['M22 2 11 13', 'M22 2 15 22l-4-9-9-4 20-7z'],
  arrowUpRight: ['M7 17 17 7', 'M7 7h10v10'],
  home: ['M3 10.5 12 3l9 7.5', 'M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5'],
  graduation: ['M22 9 12 4 2 9l10 5 10-5z', 'M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5', 'M22 9v6'],
  folder: ['M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z'],
  external: ['M15 3h6v6', 'M10 14 21 3', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'],
  check: ['M20 6 9 17l-5-5'],
  star: ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'],
  // project glyphs
  qr: [
    'M3 3h5v5H3z',
    'M16 3h5v5h-5z',
    'M3 16h5v5H3z',
    'M21 16h-3a2 2 0 0 0-2 2v3',
    'M21 21v.01',
    'M12 7v3a2 2 0 0 1-2 2H7',
    'M3 12h.01',
    'M12 3h.01',
    'M12 16v.01',
    'M16 12h1',
    'M21 12v.01',
    'M12 21v-1'
  ],
  landmark: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  receipt: [
    'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z',
    'M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8',
    'M12 17.5v-11'
  ],
  zap: ['M13 2 3 14h9l-1 8 10-12h-9l1-8z'],
  map: ['M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z', 'M8 2v16', 'M16 6v16']
};

export function Icon({ name, size = 24, strokeWidth = 2, className = '', ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {ICON_PATHS[name].map(d => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

export function FlagUK({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-hidden="true">
      <defs>
        <clipPath id="flag-uk-clip">
          <circle cx="30" cy="30" r="30" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-uk-clip)">
        <rect width="60" height="60" fill="#012169" />
        <path d="M0 0 60 60M60 0 0 60" stroke="#fff" strokeWidth="12" />
        <path d="M0 0 60 60M60 0 0 60" stroke="#C8102E" strokeWidth="4" />
        <path d="M30 0v60M0 30h60" stroke="#fff" strokeWidth="18" />
        <path d="M30 0v60M0 30h60" stroke="#C8102E" strokeWidth="10" />
      </g>
    </svg>
  );
}

export function FlagTH({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-hidden="true">
      <defs>
        <clipPath id="flag-th-clip">
          <circle cx="30" cy="30" r="30" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-th-clip)">
        <rect width="60" height="60" fill="#A51931" />
        <rect y="10" width="60" height="40" fill="#F4F5F8" />
        <rect y="20" width="60" height="20" fill="#2D2A4A" />
      </g>
    </svg>
  );
}
