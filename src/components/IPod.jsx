import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '../context/AppContext';
import { PHOTO, SONG } from '../data/content';
import { Icon } from './Icons';

const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

// The screen is a transparent hole in each iPod image; these rects (in % of the image) sit just under it.
const SCREEN = {
  light: { src: '/images/ipod1.png', left: 12.9, top: 7.6, width: 74.2, height: 36.4 },
  dark: { src: '/images/ipod2.png', left: 12.4, top: 7.1, width: 75.2, height: 37.6 }
};

// The cover photo full size over the page. Esc or a click anywhere closes it.
function PhotoView({ alt, onClose, closeLabel }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const restore = document.activeElement;
    closeRef.current?.focus();
    const onKey = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      restore?.focus?.();
    };
  }, [onClose]);

  return createPortal(
    <div className="photo-view" role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}>
      <img src={PHOTO} alt={alt} className="photo-view__img" />
      <button ref={closeRef} type="button" className="photo-view__close" onClick={onClose} aria-label={closeLabel}>
        <Icon name="close" size={20} />
      </button>
    </div>,
    document.body
  );
}

export default function IPod() {
  const { theme, t } = useApp();
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(40);
  const [photoOpen, setPhotoOpen] = useState(false);

  useEffect(() => {
    if (!playing) return undefined;
    const id = setInterval(() => setElapsed(s => (s + 1) % SONG.duration), 1000);
    return () => clearInterval(id);
  }, [playing]);

  const screen = SCREEN[theme];
  const progress = (elapsed / SONG.duration) * 100;

  return (
    <div className="ipod">
      <div
        className="ipod__screen"
        style={{ left: `${screen.left}%`, top: `${screen.top}%`, width: `${screen.width}%`, height: `${screen.height}%` }}
      >
        <div className="ipod__status">
          <span>{playing ? '▶' : '❚❚'}</span>
          <span className="ipod__battery" />
        </div>
        <div className="ipod__now">
          <button type="button" className="ipod__cover-btn" onClick={() => setPhotoOpen(true)} aria-label={t.viewPhoto} title={t.viewPhoto}>
            <img src={PHOTO} alt={t.name} className="ipod__cover" />
          </button>
          <div className="ipod__meta">
            <strong>{SONG.title}</strong>
            <span>{SONG.subtitle}</span>
            <span className="ipod__tag">
              <span className="status-dot" aria-hidden="true" />
              {SONG.tag}
            </span>
          </div>
        </div>
        <div className="ipod__progress">
          <span>{fmt(elapsed)}</span>
          <div className="ipod__bar">
            <div className="ipod__fill" style={{ width: `${progress}%` }} />
          </div>
          <span>-{fmt(SONG.duration - elapsed)}</span>
        </div>
      </div>
      <img src={screen.src} alt="" className="ipod__body" draggable="false" />
      <button
        type="button"
        className="ipod__wheel"
        onClick={() => setPlaying(p => !p)}
        aria-label={playing ? 'Pause' : 'Play'}
        aria-pressed={playing}
      />
      {photoOpen ? <PhotoView alt={t.name} closeLabel={t.close} onClose={() => setPhotoOpen(false)} /> : null}
    </div>
  );
}
