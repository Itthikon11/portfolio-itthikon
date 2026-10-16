import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '../context/AppContext';
import { pick, PROJECTS } from '../data/content';
import { Icon } from './Icons';

// a list item is either plain text or [bold lead, rest]
function Point({ item }) {
  return (
    <li>
      <Icon name="check" size={16} strokeWidth={2.5} className="pdetail__tick" />
      <span>
        {Array.isArray(item) ? (
          <>
            <strong>{item[0]}</strong> {item[1]}
          </>
        ) : (
          item
        )}
      </span>
    </li>
  );
}

// Full write-up of one project in a dialog over the gallery. ←/→ step through projects, Esc closes.
export default function ProjectDetail({ index, onClose, onNavigate }) {
  const { t, lang } = useApp();
  const closeRef = useRef(null);
  const bodyRef = useRef(null);
  const project = PROJECTS[index];
  const count = PROJECTS.length;
  const step = d => onNavigate((index + d + count) % count);
  const shots = project.gallery ?? [];
  // index of the image open in the lightbox, or null
  const [lightbox, setLightbox] = useState(null);
  const lightStep = d => setLightbox(i => (i + d + shots.length) % shots.length);

  useEffect(() => {
    const restore = document.activeElement;
    closeRef.current?.focus();
    return () => restore?.focus?.();
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
    setLightbox(null);
  }, [index]);

  useEffect(() => {
    const onKey = e => {
      // while the lightbox is open it captures the keys; Esc closes it, arrows step photos
      if (lightbox !== null) {
        if (e.key === 'Escape') setLightbox(null);
        else if (e.key === 'ArrowRight') lightStep(1);
        else if (e.key === 'ArrowLeft') lightStep(-1);
        return;
      }
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const title = pick(project.title, lang);
  const [a, b] = project.accent;

  return createPortal(
    <div className="pdetail" role="dialog" aria-modal="true" aria-labelledby="pdetail-title">
      <div className="pdetail__backdrop" onClick={onClose} />
      <article key={index} className="pdetail__panel" style={{ '--pa': a, '--pb': b }}>
        <header className="pdetail__hero">
          <div className="pdetail__hero-text">
            <div className="pdetail__meta">
              <span className="pdetail__num">{String(index + 1).padStart(2, '0')}</span>
              <span className="pdetail__chip">{pick(project.category, lang)}</span>
              {project.featured ? (
                <span className="pdetail__chip pdetail__chip--star">
                  <Icon name="star" size={13} strokeWidth={2.5} /> {t.featured}
                </span>
              ) : null}
            </div>
            <h3 id="pdetail-title">{title}</h3>
            <p>{pick(project.tagline, lang)}</p>
          </div>
          <div className="pdetail__glyph" aria-hidden="true">
            <Icon name={project.glyph} size={64} strokeWidth={1.6} />
          </div>
          <button ref={closeRef} type="button" className="pdetail__close" onClick={onClose} aria-label={t.close}>
            <Icon name="close" size={20} />
          </button>
        </header>

        <div ref={bodyRef} className="pdetail__body">
          <section className="pdetail__overview">
            <h4>{t.overview}</h4>
            <p>{pick(project.overview, lang)}</p>
            {project.stats ? (
              <ul className="pdetail__stats">
                {project.stats.map(s => (
                  <li key={s.value}>
                    <strong>{s.value}</strong>
                    <span>{pick(s.label, lang)}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>

          {shots.length ? (
            <section className="pdetail__gallery">
              <h4>{t.screens}</h4>
              <div className="pdetail__shots">
                {shots.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    className="pdetail__shot"
                    onClick={() => setLightbox(i)}
                    aria-label={`${t.screens} ${i + 1}`}
                  >
                    <img src={src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          <div className="pdetail__cols">
            <section>
              <h4>{pick(project.featuresLabel, lang) || t.features}</h4>
              <ul className="pdetail__list">
                {project.features[lang].map((item, i) => (
                  <Point key={i} item={item} />
                ))}
              </ul>
            </section>
            <section>
              <h4>{t.highlights}</h4>
              <ul className="pdetail__list">
                {project.highlights[lang].map((item, i) => (
                  <Point key={i} item={item} />
                ))}
              </ul>
            </section>
          </div>

          <section>
            <h4>{t.stack}</h4>
            <dl className="pdetail__stack">
              {project.stack.map(group => (
                <div key={group.label}>
                  <dt>{group.label}</dt>
                  <dd>
                    {group.items.map(item => (
                      <span key={item} className="pdetail__tool">
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <footer className="pdetail__nav">
          <button type="button" onClick={() => step(-1)} aria-label={t.prevProject}>
            <Icon name="chevronLeft" size={18} />
          </button>
          <span>
            {index + 1} / {count}
          </span>
          <button type="button" onClick={() => step(1)} aria-label={t.nextProject}>
            <Icon name="chevronRight" size={18} />
          </button>
        </footer>
      </article>

      {lightbox !== null ? (
        <div className="pdetail__lightbox" onClick={() => setLightbox(null)}>
          <button type="button" className="pdetail__lb-close" onClick={() => setLightbox(null)} aria-label={t.close}>
            <Icon name="close" size={22} />
          </button>
          {shots.length > 1 ? (
            <button
              type="button"
              className="pdetail__lb-nav pdetail__lb-nav--prev"
              onClick={e => { e.stopPropagation(); lightStep(-1); }}
              aria-label={t.prevProject}
            >
              <Icon name="chevronLeft" size={26} />
            </button>
          ) : null}
          <img
            className="pdetail__lb-img"
            src={shots[lightbox]}
            alt=""
            onClick={e => e.stopPropagation()}
          />
          {shots.length > 1 ? (
            <button
              type="button"
              className="pdetail__lb-nav pdetail__lb-nav--next"
              onClick={e => { e.stopPropagation(); lightStep(1); }}
              aria-label={t.nextProject}
            >
              <Icon name="chevronRight" size={26} />
            </button>
          ) : null}
          <span className="pdetail__lb-count">{lightbox + 1} / {shots.length}</span>
        </div>
      ) : null}
    </div>,
    document.body
  );
}
