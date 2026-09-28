// Draws a project as the site's glass project card (initials thumb, title, description, tag chips)
// so the CircularGallery can use it as a texture. A project's own `image`, when set, fills the thumb.
export const CARD_W = 880;
export const CARD_H = 600;
const FONT = 'Pridi, serif';

const THEME = {
  light: {
    card: ['#f6f7fc', '#dce3f5'],
    thumb: 'rgba(79, 99, 255, 0.22)',
    ink: '#0f0f12',
    muted: '#34343e',
    badge: '#ffffff'
  },
  dark: {
    card: ['#3b3947', '#2c2a36'],
    thumb: 'rgba(159, 176, 255, 0.3)',
    ink: '#f4f4f7',
    muted: '#d6d5de',
    badge: 'rgba(255, 255, 255, 0.2)'
  }
};

const roundRect = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
};

const initialsOf = title =>
  title
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2);

export function drawProjectCard(project, theme, lang, photo) {
  const p = THEME[theme];
  const c = document.createElement('canvas');
  c.width = CARD_W;
  c.height = CARD_H;
  const ctx = c.getContext('2d');

  // card body — the gallery shader rounds the outer corners
  const bg = ctx.createLinearGradient(0, 0, CARD_W, CARD_H);
  bg.addColorStop(0, p.card[0]);
  bg.addColorStop(1, p.card[1]);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // thumb
  const pad = 32;
  const thumbH = 330;
  ctx.save();
  roundRect(ctx, pad, pad, CARD_W - pad * 2, thumbH, 30);
  ctx.clip();
  if (photo) {
    const s = Math.max((CARD_W - pad * 2) / photo.width, thumbH / photo.height);
    const dw = photo.width * s;
    const dh = photo.height * s;
    ctx.drawImage(photo, pad + (CARD_W - pad * 2 - dw) / 2, pad + (thumbH - dh) / 2, dw, dh);
  } else {
    const tg = ctx.createLinearGradient(pad, pad, CARD_W - pad, pad + thumbH);
    tg.addColorStop(0, p.thumb);
    tg.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = tg;
    ctx.fillRect(pad, pad, CARD_W - pad * 2, thumbH);
    ctx.fillStyle = p.ink;
    ctx.globalAlpha = 0.5;
    ctx.font = `400 84px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initialsOf(project.title), CARD_W / 2, pad + thumbH / 2);
    ctx.globalAlpha = 1;
  }
  ctx.restore();

  // text
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = p.ink;
  ctx.font = `400 44px ${FONT}`;
  ctx.fillText(project.title, pad + 10, pad + thumbH + 68);
  ctx.fillStyle = p.muted;
  ctx.font = `400 30px ${FONT}`;
  ctx.fillText(project.description[lang], pad + 10, pad + thumbH + 112);

  // tag chips
  let x = pad + 10;
  const y = pad + thumbH + 138;
  ctx.font = `400 22px ${FONT}`;
  project.tags.forEach(tag => {
    const w = ctx.measureText(tag).width + 32;
    roundRect(ctx, x, y, w, 40, 20);
    ctx.fillStyle = p.badge;
    ctx.fill();
    ctx.fillStyle = p.ink;
    ctx.fillText(tag, x + 16, y + 28);
    x += w + 10;
  });

  return c.toDataURL('image/png');
}
