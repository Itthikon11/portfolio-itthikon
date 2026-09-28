import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LINKS, PHOTO } from '../../data/content';
import { drawBack, drawBand, drawFront, HOLDER_COLORS, loadImage } from '../cardCanvas';
import { Icon } from '../Icons';

// three/rapier for the lanyard are only fetched once the contact section gets close.
const Lanyard = lazy(() => import('../reactbits/Lanyard'));

let photoPromise;

function useCardCanvases(theme, t) {
  const [canvases, setCanvases] = useState(null);
  useEffect(() => {
    let cancelled = false;
    photoPromise ??= loadImage(PHOTO);
    Promise.all([photoPromise, document.fonts.load('32px Kurale'), document.fonts.load('32px Kanit')]).then(([photo]) => {
      if (cancelled) return;
      setCanvases({ front: drawFront(theme, t, photo), back: drawBack(theme, t), band: drawBand(theme) });
    });
    return () => {
      cancelled = true;
    };
  }, [theme, t]);
  return canvases;
}

export default function Contact() {
  const { t, theme } = useApp();
  const sectionRef = useRef(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [sent, setSent] = useState(false);
  const canvases = useCardCanvases(theme, t);

  useEffect(() => {
    const el = sectionRef.current;
    const nearIo = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '600px 0px' });
    const visIo = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    nearIo.observe(el);
    visIo.observe(el);
    return () => {
      nearIo.disconnect();
      visIo.disconnect();
    };
  }, []);

  // No backend: compose the message in the visitor's mail app.
  const onSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `Portfolio contact from ${data.get('name')}`;
    const body = `${data.get('message')}\n\n— ${data.get('name')} <${data.get('email')}>`;
    window.location.href = `${LINKS.email.href}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section contact" ref={sectionRef}>
      <header className="contact__head">
        <h2>{t.getInTouch}</h2>
        <p>{t.question}</p>
      </header>

      <div className="contact__info">
        <h3>{t.contactInfo}</h3>
        <ul className="info-list">
          <li>
            <Icon name="mail" size={30} />
            <span>
              <small>{t.email}</small>
              <a href={LINKS.email.href}>{LINKS.email.handle}</a>
            </span>
          </li>
          <li>
            <Icon name="pin" size={30} />
            <span>
              <small>{t.location}</small>
              {t.locationValue}
            </span>
          </li>
        </ul>
        <h3>{t.followMe}</h3>
        <ul className="info-list">
          <li>
            <Icon name="github" size={30} />
            <span>
              <small>{t.github}</small>
              <a href={LINKS.github.href} target="_blank" rel="noreferrer">
                {LINKS.github.handle}
              </a>
            </span>
          </li>
          <li>
            <Icon name="linkedin" size={30} />
            <span>
              <small>{t.linkedin}</small>
              <a href={LINKS.linkedin.href} target="_blank" rel="noreferrer">
                {LINKS.linkedin.handle}
              </a>
            </span>
          </li>
        </ul>
      </div>

      <form className="contact__form" onSubmit={onSubmit}>
        <label>
          {t.form.name}
          <input name="name" type="text" required autoComplete="name" />
        </label>
        <label>
          {t.form.email}
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label>
          {t.form.message}
          <textarea name="message" rows={6} required />
        </label>
        <button type="submit" className="send-btn">
          {t.form.send}
        </button>
        <p className="form-status" aria-live="polite">
          {sent ? t.form.sent : ''}
        </p>
      </form>

      <div className="contact__lanyard" aria-label={t.dragCard} title={t.dragCard}>
        {near && canvases ? (
          <Suspense fallback={null}>
            <Lanyard
              frontCanvas={canvases.front}
              backCanvas={canvases.back}
              bandCanvas={canvases.band}
              holderColor={HOLDER_COLORS[theme]}
              metalColor={theme === 'dark' ? '#9a9ca3' : '#d3d5da'}
              position={[0, 0, 18]}
              fov={20}
              anchorY={3.4}
              lanyardWidth={3}
              active={visible}
            />
          </Suspense>
        ) : null}
      </div>

      <footer className="footer">{t.rights}</footer>
    </section>
  );
}
