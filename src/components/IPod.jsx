import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { PHOTO, SONG } from '../data/content';

const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

// The screen is a transparent hole in each iPod image; these rects (in % of the image) sit just under it.
const SCREEN = {
  light: { src: '/images/ipod1.png', left: 12.9, top: 7.6, width: 74.2, height: 36.4 },
  dark: { src: '/images/ipod2.png', left: 12.4, top: 7.1, width: 75.2, height: 37.6 }
};

export default function IPod() {
  const { theme } = useApp();
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(40);

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
          <img src={PHOTO} alt="Itthikon Sakumkaew" className="ipod__cover" />
          <div className="ipod__meta">
            <strong>{SONG.title}</strong>
            <span>{SONG.artist}</span>
            <span>{SONG.album}</span>
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
    </div>
  );
}
