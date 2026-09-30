import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { composeMail, LINKS, PHOTO } from '../../data/content';
import { drawBack, drawBand, drawFront, HOLDER_COLORS, loadImage } from '../cardCanvas';
import { Icon } from '../Icons';
import Rights from '../Rights';

// three/rapier for the lanyard are only fetched once the contact section gets close.
const Lanyard = lazy(() => import('../reactbits/Lanyard'));

let photoPromise;

function useCardCanvases(theme, t) {
  const [canvases, setCanvases] = useState(null);
  useEffect(() => {
    let cancelled = false;
    photoPromise ??= loadImage(PHOTO);
    Promise.all([photoPromise, document.fonts.load('600 32px Pridi'), document.fonts.load('700 32px Pridi')]).then(([photo]) => {
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
  const anchorRef = useRef(null);
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

  // No backend: compose the message in Gmail.
  const onSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `Portfolio contact from ${data.get('name')}`;
    const body = `${data.get('message')}\n\n— ${data.get('name')} <${data.get('email')}>`;
    window.open(composeMail({ subject, body }), '_blank', 'noopener');
    setSent(true);
  };

  return (
    <section id="contact" className="section contact" ref={sectionRef}>
      <header className="contact__head">
        <p className="contact__eyebrow">
          <span className="status-dot" aria-hidden="true" />
          {t.getInTouch}
        </p>
        <h2>{t.question}</h2>
      </header>

      <div className="contact__info glass">
        <h3>{t.contactInfo}</h3>
        <ul className="info-list">
          <li>
            <a className="info-row" href={LINKS.email.href} target="_blank" rel="noreferrer">
              <span className="info-row__icon">
                <Icon name="mail" size={22} />
              </span>
              <span className="info-row__text">
                <small>{t.email}</small>
                {LINKS.email.handle}
              </span>
              <Icon name="arrowUpRight" size={16} className="info-row__go" />
            </a>
          </li>
          <li>
            <div className="info-row">
              <span className="info-row__icon">
                <Icon name="pin" size={22} />
              </span>
              <span className="info-row__text">
                <small>{t.location}</small>
                {t.locationValue}
              </span>
            </div>
          </li>
        </ul>
        <h3>{t.followMe}</h3>
        <ul className="info-list">
          <li>
            <a className="info-row" href={LINKS.github.href} target="_blank" rel="noreferrer">
              <span className="info-row__icon">
                <Icon name="github" size={22} />
              </span>
              <span className="info-row__text">
                <small>{t.github}</small>
                {LINKS.github.handle}
              </span>
              <Icon name="arrowUpRight" size={16} className="info-row__go" />
            </a>
          </li>
          <li>
            <a className="info-row" href={LINKS.linkedin.href} target="_blank" rel="noreferrer">
              <span className="info-row__icon">
                <Icon name="linkedin" size={22} />
              </span>
              <span className="info-row__text">
                <small>{t.linkedin}</small>
                {LINKS.linkedin.handle}
              </span>
              <Icon name="arrowUpRight" size={16} className="info-row__go" />
            </a>
          </li>
        </ul>
      </div>

      <form className="contact__form glass" onSubmit={onSubmit}>
        <div className="contact__form-row">
          <label>
            {t.form.name}
            <input name="name" type="text" required autoComplete="name" />
          </label>
          <label>
            {t.form.email}
            <input name="email" type="email" required autoComplete="email" />
          </label>
        </div>
        <label>
          {t.form.message}
          <textarea name="message" rows={6} required />
        </label>
        <button type="submit" className="send-btn">
          {t.form.send}
          <Icon name="send" size={18} />
        </button>
        <p className="form-status" aria-live="polite">
          {sent ? t.form.sent : ''}
        </p>
      </form>

      {/* empty grid cell the strap hangs from; the canvas itself spans the whole section so the card can be pulled anywhere */}
      <div ref={anchorRef} className="contact__lanyard" aria-label={t.dragCard} title={t.dragCard} />
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
            anchorRef={anchorRef}
            eventSource={sectionRef}
            lanyardWidth={1.4}
            active={visible}
          />
        </Suspense>
      ) : null}

      <Rights />
    </section>
  );
}
