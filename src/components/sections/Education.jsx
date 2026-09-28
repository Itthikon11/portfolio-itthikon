import { useApp } from '../../context/AppContext';
import CRTWarp from '../reactbits/CRTWarp';

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

  return (
    <section id="education" className="section education">
      <div className="tv">
        <div className="tv__screen" style={pct(tv.screen)}>
          <CRTWarp {...tv.crt} curvature={0.35} scanlineStrength={0.3} waveAmplitude={0.3} rgbShift={0.01} />
        </div>
        <img src={tv.src} alt="" className="tv__body" draggable="false" />
        <h2 className="tv__title slab" style={pct(tv.screen)}>
          <span>{t.educationTitle}</span>
        </h2>
      </div>

      <ol className="timeline">
        {t.education.map((item, i) => (
          <li key={item.degree} className={`timeline__item timeline__item--${i % 2 ? 'right' : 'left'}`}>
            <span className="timeline__num" style={{ gridRow: i + 1 }}>{i + 1}</span>
            <article className="edu-card glass" style={{ gridRow: i + 1 }}>
              <span className="edu-card__years">{item.years}</span>
              <h3>
                {item.degree}
                <br />
                {item.field}
              </h3>
              <p>{item.school}</p>
              <p>{item.grade}</p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
