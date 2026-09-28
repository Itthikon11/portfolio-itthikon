import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { TEXT } from '../data/content';

const AppContext = createContext(null);

export const PAGES = ['home', 'education', 'skills', 'projects', 'contact'];

const pageFromHash = () => {
  const id = window.location.hash.slice(1);
  return PAGES.includes(id) ? id : 'home';
};

const read = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable */
  }
};

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');
  const [lang, setLang] = useState(() => read('lang', 'en'));
  const [page, setPage] = useState(pageFromHash);

  // Each section is its own page; the navbar links just change the hash.
  useEffect(() => {
    const onHash = () => {
      setPage(pageFromHash());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    write('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    write('lang', lang);
  }, [lang]);

  const toggleTheme = useCallback(() => setTheme(t => (t === 'dark' ? 'light' : 'dark')), []);
  const toggleLang = useCallback(() => setLang(l => (l === 'en' ? 'th' : 'en')), []);

  const value = useMemo(
    () => ({ theme, lang, page, t: TEXT[lang], toggleTheme, toggleLang }),
    [theme, lang, page, toggleTheme, toggleLang]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
