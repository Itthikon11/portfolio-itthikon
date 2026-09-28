import { useApp } from '../../context/AppContext';
import { SKILLS } from '../../data/content';
import BranchedMenu from '../reactbits/BranchedMenu';
import CRTWarp from '../reactbits/CRTWarp';

const PANEL = {
  light: { color: '#ffffff', backgroundColor: '#8b8b8f', ink: '#0f0f12', accent: '#4f63ff' },
  dark: { color: '#e9e9f2', backgroundColor: '#040406', ink: '#f4f4f7', accent: '#9fb0ff' }
};

export default function Skills() {
  const { t, theme } = useApp();
  const p = PANEL[theme];

  return (
    <section id="skills" className="section skills">
      <div className="skills__panel">
        <CRTWarp
          color={p.color}
          backgroundColor={p.backgroundColor}
          pixelation={26}
          curvature={0.2}
          scanlineStrength={0.35}
          scanlineFrequency={260}
          waveFrequency={1.6}
          rgbShift={0.03}
          noise={0.06}
          brightness={1.1}
        />
        <div className={`skills__title skills__title--${theme}`}>
          <h2 className="slab">{t.skillsTitle}</h2>
          <p className="slab">{t.skillsSub}</p>
        </div>
      </div>

      <div className="skills__tree">
        {SKILLS.map(column => (
          <BranchedMenu
            key={column[0].label}
            items={column.map(group => ({
              label: group.label,
              children: group.items.map(skill => ({ value: skill, label: skill }))
            }))}
            defaultOpen={column.map((_, i) => i)}
            defaultActive="-"
            color={p.ink}
            accentColor={p.accent}
            lineColor={p.ink}
            width={360}
            fontSize={17}
            rowHeight={33}
            indent={46}
            lineWidth={2.5}
            className="skills__menu"
          />
        ))}
      </div>
    </section>
  );
}
