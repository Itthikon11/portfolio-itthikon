import {
  siClaude,
  siCss,
  siDart,
  siDocker,
  siExpress,
  siFigma,
  siFirebase,
  siFlutter,
  siGithub,
  siGithubcopilot,
  siGooglegemini,
  siHtml5,
  siJavascript,
  siMongodb,
  siMysql,
  siOpenjdk,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siPostman,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVite
} from 'simple-icons';

const BRANDS = {
  React: siReact,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  HTML5: siHtml5,
  CSS3: siCss,
  'Tailwind CSS': siTailwindcss,
  Flutter: siFlutter,
  Dart: siDart,
  Java: siOpenjdk,
  PHP: siPhp,
  'Node.js': siNodedotjs,
  'Express.js': siExpress,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  MongoDB: siMongodb,
  Supabase: siSupabase,
  Firebase: siFirebase,
  Docker: siDocker,
  Github: siGithub,
  Postman: siPostman,
  Vite: siVite,
  Figma: siFigma,
  'Claude Code': siClaude,
  'GitHub Copilot': siGithubcopilot,
  Gemini: siGooglegemini
};

// Logos simple-icons no longer ships (or that have no brand) get a plain line icon instead.
const LINE = {
  'Visual Studio Code': <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />,
  ChatGPT: <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.6L3 20.5l1.4-5.1A8.5 8.5 0 1 1 21 11.5z" />,
  'Database Modeling': (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <path d="M10 6.5h4a3 3 0 0 1 3 3V14" />
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
