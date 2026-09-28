import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { FlagTH, FlagUK, Icon } from './Icons';

const SECTIONS = ['home', 'education', 'skills', 'projects', 'contact'];

export default function Navbar() {
  const { t, theme, lang, toggleTheme, toggleLang } = useApp();
  const [active, setActive] = useState('home');

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <nav className="navbar" aria-label="Main">
        <ul className="navbar__links">
          {SECTIONS.map(id => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'true' : undefined}>
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="navbar__theme"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? t.themeToLight : t.themeToDark}
          title={theme === 'dark' ? t.themeToLight : t.themeToDark}
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={26} strokeWidth={1.6} />
        </button>
      </nav>
      <button type="button" className="lang-toggle" onClick={toggleLang} aria-label={t.langSwitch} title={t.langSwitch}>
        {lang === 'en' ? <FlagUK /> : <FlagTH />}
        <span>{lang.toUpperCase()}</span>
      </button>
    </>
  );
}
