import { ICON_PATHS } from './Icons';
import { LINKS, NAME } from '../data/content';

// 512×720 keeps the 1.6 : 2.25 ratio of the lanyard card.
const W = 512;
const H = 720;

const PALETTE = {
  light: { holder: '#d4d6dc', slot: '#aeb1b9', card: '#f6f6f8', ink: '#111114', muted: '#3b3b44', strap: '#16161a' },
  dark: { holder: '#2a2a30', slot: '#0d0d10', card: '#141417', ink: '#f4f4f6', muted: '#c9c9d2', strap: '#e6e6ea' }
};

const roundRect = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
};

const makeCanvas = (w = W, h = H) => {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
};

const drawHolder = (ctx, p) => {
  roundRect(ctx, 0, 0, W, H, 26);
  ctx.fillStyle = p.holder;
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.lineWidth = 3;
  roundRect(ctx, 10, 10, W - 20, H - 20, 20);
  ctx.stroke();
  roundRect(ctx, W / 2 - 60, 26, 120, 18, 9);
  ctx.fillStyle = p.slot;
  ctx.fill();
  roundRect(ctx, 40, 70, W - 80, H - 110, 22);
  ctx.fillStyle = p.card;
  ctx.fill();
};

const fitText = (ctx, text, maxWidth, size, family) => {
  let s = size;
  do {
    ctx.font = `${s}px ${family}`;
    s -= 1;
  } while (ctx.measureText(text).width > maxWidth && s > 10);
};

const drawIcon = (ctx, name, x, y, size, color) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 24, size / 24);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ICON_PATHS[name].forEach(d => ctx.stroke(new Path2D(d)));
  ctx.restore();
};

const FONT = 'Kurale, Kanit, serif';

export const loadImage = src =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

export function drawFront(theme, t, photo) {
  const p = PALETTE[theme];
  const c = makeCanvas();
  const ctx = c.getContext('2d');
  drawHolder(ctx, p);

  // photo, "cover"-fitted into a rounded frame
  const fx = 106;
  const fy = 100;
  const fw = 300;
  const fh = 380;
  ctx.save();
  roundRect(ctx, fx, fy, fw, fh, 18);
  ctx.clip();
  const scale = Math.max(fw / photo.width, fh / photo.height);
  const dw = photo.width * scale;
  const dh = photo.height * scale;
  ctx.drawImage(photo, fx + (fw - dw) / 2, fy + (fh - dh) / 2, dw, dh);
  ctx.restore();

  ctx.fillStyle = p.ink;
  ctx.textAlign = 'center';
  fitText(ctx, NAME, 400, 32, FONT);
  ctx.fillText(NAME, W / 2, 540);
  ctx.font = `28px ${FONT}`;
  ctx.fillStyle = p.muted;
  ctx.fillText(t.role[0], W / 2, 590);
  ctx.fillText(t.role[1], W / 2, 628);
  return c;
}

export function drawBack(theme, t) {
  const p = PALETTE[theme];
  const c = makeCanvas();
  const ctx = c.getContext('2d');
  drawHolder(ctx, p);

  ctx.textAlign = 'left';
  ctx.fillStyle = p.ink;
  ctx.font = `20px ${FONT}`;
  ctx.fillText(t.available, 66, 124);
  const dotX = 66 + ctx.measureText(t.available).width + 16;
  ctx.beginPath();
  ctx.arc(dotX, 117, 8, 0, Math.PI * 2);
  ctx.fillStyle = '#8ee68a';
  ctx.fill();

  const rows = [
    ['github', t.github, LINKS.github.handle],
    ['mail', t.gmail, LINKS.email.handle],
    ['linkedin', t.linkedin, LINKS.linkedin.handle],
    ['pin', t.location, t.locationValue],
    ['code', t.role[0], t.role[1]]
  ];
  rows.forEach(([icon, label, value], i) => {
    const y = 160 + i * 84;
    drawIcon(ctx, icon, 64, y + 4, 40, p.ink);
    ctx.fillStyle = p.ink;
    ctx.font = `22px ${FONT}`;
    ctx.fillText(label, 124, y + 18);
    ctx.fillStyle = p.muted;
    fitText(ctx, value, 320, 20, FONT);
    ctx.fillText(value, 124, y + 44);
  });

  ctx.fillStyle = p.ink;
  fitText(ctx, NAME, 380, 30, FONT);
  ctx.fillText(NAME, 66, 630);
  return c;
}

export function drawBand(theme) {
  const p = PALETTE[theme];
  const c = makeCanvas(256, 64);
  const ctx = c.getContext('2d');
  ctx.fillStyle = p.strap;
  ctx.fillRect(0, 0, 256, 64);
  // woven texture + stitched edges
  ctx.globalAlpha = 0.12;
  ctx.strokeStyle = theme === 'dark' ? '#000' : '#fff';
  ctx.lineWidth = 2;
  for (let x = -64; x < 256 + 64; x += 8) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 32, 64);
    ctx.stroke();
  }
  ctx.globalAlpha = 0.35;
  ctx.setLineDash([10, 8]);
  [8, 56].forEach(y => {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y);
    ctx.stroke();
  });
  return c;
}

export const HOLDER_COLORS = { light: PALETTE.light.holder, dark: PALETTE.dark.holder };
