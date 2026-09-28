import { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PROJECTS } from '../../data/content';
import { loadImage } from '../cardCanvas';
import { Icon } from '../Icons';
import { CARD_H, CARD_W, drawProjectCard } from '../projectArt';
import CircularGallery from '../reactbits/CircularGallery';
import Folder from '../reactbits/Folder';
import Rights from '../Rights';

// Each project drawn as a card image for the gallery; rebuilt when theme or language changes.
function useProjectCards(theme, lang) {
  const [items, setItems] = useState(null);
  useEffect(() => {
    let cancelled = false;
    const photos = PROJECTS.map(p => (p.image ? loadImage(p.image).catch(() => null) : null));
    Promise.all([...photos, document.fonts.load('400 44px Pridi')]).then(loaded => {
      if (cancelled) return;
      setItems(PROJECTS.map((p, i) => ({ image: drawProjectCard(p, theme, lang, loaded[i]), text: '' })));
    });
    return () => {
      cancelled = true;
    };
  }, [theme, lang]);
  return items;
}

export default function Projects() {
  const { t, theme, lang } = useApp();
  const [view, setView] = useState('folder');
  // true while the current view plays its exit animation
  const [leaving, setLeaving] = useState(false);
  const timers = useRef([]);
  const cards = useProjectCards(theme, lang);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  // exit the current view, then mount the next one (which plays its own entrance)
  const switchTo = (next, delay) => {
    clearTimers();
    timers.current.push(
      setTimeout(() => setLeaving(true), delay),
      setTimeout(() => {
        setView(next);
        setLeaving(false);
      }, delay + 380)
    );
  };

  const onFolderToggle = open => {
    // let the papers fan out first
    if (open) switchTo('gallery', 520);
    else clearTimers();
  };

  return (
    <section id="projects" className="section projects">
      <header className="section-head">
        <h2>{t.projectsTitle}</h2>
        <p>{t.projectsSub}</p>
      </header>

      {view === 'folder' ? (
        <div className={`projects__folder${leaving ? ' is-leaving' : ''}`}>
          <div className="folder-stage">
            <Folder color="#DDD59B" size={3.4} onToggle={onFolderToggle} />
          </div>
          <p className="pixel poke">
            {t.poke[0]}
            <br />
            {t.poke[1]}
          </p>
        </div>
      ) : (
        <div className={`projects__stage${leaving ? ' is-leaving' : ''}`}>
          <div className="projects__gallery">
            {cards ? (
              <CircularGallery
                items={cards}
                bend={2}
                borderRadius={0.05}
                itemWidth={CARD_W}
                itemHeight={CARD_H}
                scrollEase={0.06}
                intro={2}
                label={t.projectsTitle}
              />
            ) : null}
          </div>
          <div className="projects__footer">
            <span className="projects__hint">{t.galleryHint}</span>
            <button type="button" className="projects__close" onClick={() => switchTo('folder', 0)}>
              <Icon name="close" size={16} /> {t.backToFolder}
            </button>
          </div>
        </div>
      )}
      <Rights />
    </section>
  );
}
