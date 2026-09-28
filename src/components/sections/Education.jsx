import { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import CRTWarp from '../reactbits/CRTWarp';
import GlitchText from '../reactbits/GlitchText';
import Rights from '../Rights';

// Transparent screen hole in each TV image, in % of the image.
const TV = {
  light: {
    src: '/images/compu1.png',
    screen: { left: 11.8, top: 13.9, width: 76.3, height: 61 },
    crt: { color: '#8f8f9c', backgroundColor: '#f1f1f4', pixelation: 3, brightness: 1.1, noise: 0.08 }
  },
  dark: {
    src: '/images/compu2.png',
    screen: { left: 12.1, top: 14.2, width: 75.7, height: 61 },
    crt: { color: '#3446ff', backgroundColor: '#05073a', pixelation: 3, brightness: 1.2, noise: 0.08 }
  }
};

const pct = r => ({ left: `${r.left}%`, top: `${r.top}%`, width: `${r.width}%`, height: `${r.height}%` });

export default function Education() {
  const { t, theme } = useApp();
  const tv = TV[theme];
  const timelineRef = useRef(null);

  // Rail, numbers and cards each come in once they scroll into view; cards slide from their own side.
  useEffect(() => {
    const root = timelineRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          e.target.setAttribute('data-shown', '');
          io.unobserve(e.target);
        }),
      { threshold: 0.25 }
    );
    [root, ...root.querySelectorAll('.timeline__num, .edu-card')].forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [t]);

  return (
    <section id="education" className="section education">
      <div className="tv">
        <div className="tv__screen" style={pct(tv.screen)}>
          <CRTWarp {...tv.crt} curvature={0.35} scanlineStrength={0.3} waveAmplitude={0.3} rgbShift={0.01} />
        </div>
        <img src={tv.src} alt="" className="tv__body" draggable="false" />
        <h2 className="tv__title slab" style={pct(tv.screen)}>
          <GlitchText as="span" className="tv__glitch" speed={0.6} shadowColors={['#ffffff', '#ffffff']}>
            {t.educationTitle}
          </GlitchText>
        </h2>
      </div>

      <ol className="timeline" ref={timelineRef}>
        {t.education.map((item, i) => (
          <li key={item.degree} className={`timeline__item timeline__item--${i % 2 ? 'right' : 'left'}`}>
            <span className="timeline__num" style={{ gridRow: i + 1 }}>{i + 1}</span>
            <article className="edu-card glass" style={{ gridRow: i + 1 }}>
              <header className="edu-card__head">
                <h3>
                  {item.degree}
                  <span>{item.field}</span>
                </h3>
                <span className="edu-card__years">{item.years}</span>
              </header>
              <p className="edu-card__school">{item.school}</p>
              <p className="edu-card__grade">{item.grade}</p>
            </article>
          </li>
        ))}
      </ol>
      <Rights />
    </section>
  );
}
