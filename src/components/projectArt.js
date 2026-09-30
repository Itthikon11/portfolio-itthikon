import { pick } from '../data/content';
import { ICON_PATHS } from './Icons';

// Draws a project as a card texture for the CircularGallery: an accent "cover" with the project's
// glyph, number and category, then title, tagline and tag chips. A project's own `image`, when set,
// fills the cover instead.
export const CARD_W = 880;
export const CARD_H = 600;
const FONT = 'Pridi, serif';
// drawn at 2× so text stays crisp on large, high-DPI screens
const SCALE = 2;

const THEME = {
  light: {
    card: ['#f8f9fd', '#e2e7f6'],
    ink: '#0f0f12',
    muted: '#4a4a57',
    badge: '#ffffff',
    badgeLine: 'rgba(20, 24, 48, 0.1)'
  },
  dark: {
    card: ['#3b3947', '#2a2833'],
    ink: '#f4f4f7',
    muted: '#c9c8d3',
    badge: 'rgba(255, 255, 255, 0.12)',
    badgeLine: 'rgba(255, 255, 255, 0.14)'
  }
};

const PAD = 28;
const COVER_H = 300;

const roundRect = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
};

const fitFont = (ctx, text, maxWidth, size, weight) => {
  let s = size;
  do {
    ctx.font = `${weight} ${s}px ${FONT}`;
    s -= 1;
  } while (ctx.measureText(text).width > maxWidth && s > 16);
};

// Thai has no spaces between words, so break on word segments rather than on spaces.
const segmenter = typeof Intl !== 'undefined' && Intl.Segmenter ? new Intl.Segmenter(undefined, { granularity: 'word' }) : null;
const wordsOf = text => (segmenter ? [...segmenter.segment(text)].map(s => s.segment) : text.split(/(?<=\s)/));

const wrapLines = (ctx, text, maxWidth, maxLines) => {
  const lines = [''];
  for (const word of wordsOf(text)) {
    const i = lines.length - 1;
    const next = lines[i] + word;
    if (ctx.measureText(next).width <= maxWidth || !lines[i]) lines[i] = next;
    else lines.push(word.trimStart());
  }
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    let last = kept[maxLines - 1];
    while (last && ctx.measureText(`${last}…`).width > maxWidth) last = last.slice(0, -1);
    kept[maxLines - 1] = `${last.trimEnd()}…`;
    return kept;
  }
  return lines.map(l => l.trimEnd());
};

const drawGlyph = (ctx, name, cx, cy, size) => {
  ctx.save();
  ctx.translate(cx - size / 2, cy - size / 2);
  ctx.scale(size / 24, size / 24);
  ctx.lineWidth = 1.4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ICON_PATHS[name].forEach(d => ctx.stroke(new Path2D(d)));
  ctx.restore();
};

const pill = (ctx, text, x, y, { fill, ink, stroke, font, h = 40, padX = 16 }) => {
  ctx.font = font;
  const w = ctx.measureText(text).width + padX * 2;
  roundRect(ctx, x, y, w, h, h / 2);
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  ctx.fillStyle = ink;
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + padX, y + h / 2 + 1);
  ctx.textBaseline = 'alphabetic';
  return w;
};

function drawCover(ctx, project, index, lang, photo) {
  const x = PAD;
  const y = PAD;
  const w = CARD_W - PAD * 2;
  const h = COVER_H;
  const [a, b] = project.accent;

  ctx.save();
  roundRect(ctx, x, y, w, h, 26);
  ctx.clip();

  if (photo) {
    const s = Math.max(w / photo.width, h / photo.height);
    ctx.drawImage(photo, x + (w - photo.width * s) / 2, y + (h - photo.height * s) / 2, photo.width * s, photo.height * s);
    // keep the labels readable over any photo
    const shade = ctx.createLinearGradient(0, y, 0, y + h);
    shade.addColorStop(0, 'rgba(0, 0, 0, 0.35)');
    shade.addColorStop(0.45, 'rgba(0, 0, 0, 0)');
    shade.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
    ctx.fillStyle = shade;
    ctx.fillRect(x, y, w, h);
  } else {
    // deep colour on the left where the labels sit, light towards the glyph
    const bg = ctx.createLinearGradient(x, y + h, x + w, y);
    bg.addColorStop(0, b);
    bg.addColorStop(1, a);
    ctx.fillStyle = bg;
    ctx.fillRect(x, y, w, h);

    // soft light behind the glyph
    const glow = ctx.createRadialGradient(x + w - 170, y + h / 2, 0, x + w - 170, y + h / 2, 320);
    glow.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
    glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(x, y, w, h);

    // dot grid
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    for (let gx = x + 18; gx < x + w; gx += 26) {
      for (let gy = y + 18; gy < y + h; gy += 26) {
        ctx.beginPath();
        ctx.arc(gx, gy, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // glyph inside two rings on the right
    const cx = x + w - 170;
    const cy = y + h / 2 + 14;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.lineWidth = 2;
    [150, 112].forEach(r => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
    ctx.beginPath();
    ctx.arc(cx, cy, 112, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    drawGlyph(ctx, project.glyph, cx, cy, 120);
  }

  // category chip + featured badge
  ctx.textAlign = 'left';
  const chip = { fill: 'rgba(255, 255, 255, 0.24)', ink: '#ffffff', font: `600 21px ${FONT}` };
  let cx = x + 24;
  cx += pill(ctx, pick(project.category, lang), cx, y + 24, chip) + 10;
  if (project.featured) {
    const label = lang === 'th' ? '★ ผลงานเด่น' : '★ Featured';
    pill(ctx, label, cx, y + 24, { fill: '#ffffff', ink: b, font: `700 21px ${FONT}` });
  }

  // big index number
  ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
  ctx.font = `700 96px ${FONT}`;
  ctx.fillText(String(index + 1).padStart(2, '0'), x + 22, y + h - 28);
  ctx.restore();
}

export function drawProjectCard(project, index, theme, lang, photo) {
  const p = THEME[theme];
  const c = document.createElement('canvas');
  c.width = CARD_W * SCALE;
  c.height = CARD_H * SCALE;
  const ctx = c.getContext('2d');
  ctx.scale(SCALE, SCALE);

  // card body — the gallery shader rounds the outer corners
  const bg = ctx.createLinearGradient(0, 0, CARD_W, CARD_H);
  bg.addColorStop(0, p.card[0]);
  bg.addColorStop(1, p.card[1]);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  drawCover(ctx, project, index, lang, photo);

  const textX = PAD + 8;
  const textW = CARD_W - PAD * 2 - 16;
  let y = PAD + COVER_H + 60;

  ctx.textAlign = 'left';
  ctx.fillStyle = p.ink;
  const title = pick(project.title, lang);
  fitFont(ctx, title, textW, 44, 700);
  ctx.fillText(title, textX, y);

  ctx.fillStyle = p.muted;
  ctx.font = `400 25px ${FONT}`;
  wrapLines(ctx, pick(project.tagline, lang), textW, 2).forEach(line => {
    y += 36;
    ctx.fillText(line, textX, y);
  });

  // tag chips, pinned to the bottom
  let x = textX;
  const chipY = CARD_H - PAD - 40;
  const chip = { fill: p.badge, ink: p.ink, stroke: p.badgeLine, font: `500 21px ${FONT}` };
  project.tags.forEach(tag => {
    x += pill(ctx, tag, x, chipY, chip) + 10;
  });

  return c.toDataURL('image/png');
}
