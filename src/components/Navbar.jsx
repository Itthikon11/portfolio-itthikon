import { PAGES, useApp } from '../context/AppContext';
import { FlagTH, FlagUK, Icon } from './Icons';
import GlassSurface from './reactbits/GlassSurface';

const PAGE_ICONS = { home: 'home', education: 'graduation', skills: 'code', projects: 'folder', contact: 'mail' };

// Clear liquid-glass backdrop shared by the bar and the language pill.
const Glass = ({ radius }) => (
  <GlassSurface
    width="100%"
    height="100%"
    borderRadius={radius}
    backgroundOpacity={0.12}
    saturation={1.4}
    className="navbar__glass"
  />
);

export default function Navbar() {
  const { t, theme, lang, page: active, toggleTheme, toggleLang } = useApp();

  return (
    <>
      <nav className="navbar" aria-label="Main">
        <Glass radius={34} />
        <ul className="navbar__links">
          {PAGES.map(id => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'page' : undefined}>
                <Icon name={PAGE_ICONS[id]} size={18} strokeWidth={1.8} />
                <span>{t.nav[id]}</span>
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
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={24} strokeWidth={1.6} />
        </button>
      </nav>
      {/* two-flag switch: the highlight slides under the current language */}
      <button
        type="button"
        className="lang-toggle"
        data-lang={lang}
        onClick={toggleLang}
        aria-label={t.langSwitch}
        title={t.langSwitch}
      >
        <Glass radius={22} />
        <span className="lang-toggle__thumb" aria-hidden="true" />
        <span className="lang-toggle__opt" data-on={lang === 'en' ? '' : undefined}>
          <FlagUK size={22} />
        </span>
        <span className="lang-toggle__opt" data-on={lang === 'th' ? '' : undefined}>
          <FlagTH size={22} />
        </span>
      </button>
    </>
  );
}
