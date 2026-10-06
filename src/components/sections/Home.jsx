import { useApp } from '../../context/AppContext';
import { LINKS } from '../../data/content';
import { Icon } from '../Icons';
import IPod from '../IPod';
import Rights from '../Rights';

export default function Home() {
  const { t } = useApp();
  const contacts = [
    { icon: 'github', label: t.github, ...LINKS.github },
    { icon: 'mail', label: t.gmail, ...LINKS.email },
    { icon: 'linkedin', label: t.linkedin, ...LINKS.linkedin }
  ];

  return (
    <section id="home" className="section home">
      <div className="home__left">
        <p className="eyebrow">
          {t.available} <span className="status-dot" aria-hidden="true" />
        </p>
        <h1 className="display-name">{t.name}</h1>
        <IPod />
      </div>
      <div className="home__right">
        <h2 className="slab-title">{t.aboutTitle}</h2>
        <div className="about">
          {t.about.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <h2 className="slab-title">{t.contactInfo}</h2>
        <ul className="contact-pills">
          {contacts.map(c => (
            <li key={c.icon}>
              <a className="contact-pill glass" href={c.href} target="_blank" rel="noreferrer">
                <Icon name={c.icon} size={38} strokeWidth={1.7} />
                <span className="contact-pill__text">
                  <span>{c.label}</span>
                  <strong>{c.handle}</strong>
                </span>
                <span className="status-dot" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <Rights />
    </section>
  );
}
