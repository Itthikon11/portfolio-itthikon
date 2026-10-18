import {
  siClaude,
  siCss,
  siDart,
  siDocker,
  siExpress,
  siFlutter,
  siGit,
  siGithub,
  siGithubcopilot,
  siGooglegemini,
  siHtml5,
  siJavascript,
  siLeaflet,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPnpm,
  siPostgresql,
  siPostman,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVite,
  siWebgl
} from 'simple-icons';

const BRANDS = {
  React: siReact,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  HTML5: siHtml5,
  CSS3: siCss,
  'Next.js': siNextdotjs,
  'Tailwind CSS': siTailwindcss,
  Flutter: siFlutter,
  Dart: siDart,
  'Node.js': siNodedotjs,
  'Express.js': siExpress,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  'Supabase (RLS, Triggers)': siSupabase,
  'GIS / Maps (Leaflet)': siLeaflet,
  '3D / WebGL': siWebgl,
  Docker: siDocker,
  Git: siGit,
  Github: siGithub,
  pnpm: siPnpm,
  Postman: siPostman,
  Vite: siVite,
  'Claude Code': siClaude,
  'GitHub Copilot': siGithubcopilot,
  Gemini: siGooglegemini
};

// Logos simple-icons no longer ships (or that have no brand) get a plain line icon instead.
const LINE = {
  'Visual Studio Code': <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />,
  ChatGPT: <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.6L3 20.5l1.4-5.1A8.5 8.5 0 1 1 21 11.5z" />,
  'REST API': <path d="M8 4H6a2 2 0 0 0-2 2v4l-2 2 2 2v4a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v4l2 2-2 2v4a2 2 0 0 1-2 2h-2" />,
  'QR Code': (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3M21 14v.01M14 21h3M21 17v4h-1" />
    </>
  ),
  'OCR (Tesseract)': <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M8 9h8M8 12h8M8 15h5" />,
  'Excel & PDF Export': (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M12 11v6M9 14l3 3 3-3" />
    </>
  )
};

// Near-black brand colours would vanish on the dark theme, so those keep the text colour on hover.
const brandColor = hex => {
  const n = parseInt(hex, 16);
  const lum = (0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
  return lum > 0.2 ? `#${hex}` : undefined;
};

export function SkillIcon({ name }) {
  const brand = BRANDS[name];
  if (brand) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ '--brand': brandColor(brand.hex) }}>
        <path d={brand.path} />
      </svg>
    );
  }
  const line = LINE[name];
  if (!line) return null;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {line}
    </svg>
  );
}
