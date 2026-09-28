import { useApp } from '../context/AppContext';

// Faint copyright line pinned to the bottom centre of every section.
export default function Rights() {
  const { t } = useApp();
  return <footer className="rights">{t.rights}</footer>;
}
