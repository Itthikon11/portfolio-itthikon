import { useApp } from '../../context/AppContext';
import { SKILLS } from '../../data/content';
import { SkillIcon } from '../../data/skillIcons';
import BranchedMenu from '../reactbits/BranchedMenu';
import DepthText from '../reactbits/DepthText';
import DitherFlow from '../reactbits/DitherFlow';
import Rights from '../Rights';

const PANEL = {
  light: {
    dither: { lightColor: '#ffffff', midColor: '#9c9aac', darkColor: '#2b2470' },
    depth: ['#0f0f12', '#4f63ff'],
    ink: '#0f0f12',
    line: 'rgba(15, 15, 18, 0.28)',
    accent: '#4f63ff'
  },
  dark: {
    // same ramp inverted: near-black base, grey smoke, lavender peaks
    dither: { lightColor: '#07070b', midColor: '#55536a', darkColor: '#c8c2ff' },
    depth: ['#ffffff', '#6f5cff'],
    ink: '#f4f4f7',
    line: 'rgba(244, 244, 247, 0.3)',
    accent: '#9fb0ff'
  }
};

export default function Skills() {
  const { t, theme } = useApp();
  const p = PANEL[theme];

  return (
    <section id="skills" className="section skills">
      <div className="skills__panel">
        <DitherFlow {...p.dither} />
        <div className={`skills__title skills__title--${theme}`}>
          <h2 className="slab">
            <DepthText
              text={t.skillsTitle}
              faceColor={p.depth[0]}
              depthColor={p.depth[1]}
              fontSize="inherit"
              fontWeight={700}
              layers={24}
              depth={1.6}
              tilt={8}
            />
          </h2>
          <p className="slab">{t.skillsSub}</p>
        </div>
      </div>

      <div className="skills__tree">
        {SKILLS.map((column, c) => (
          <BranchedMenu
            key={column[0].label}
            items={column.map(group => ({
              label: group.label,
              children: group.items.map(skill => ({ value: skill, label: skill, icon: <SkillIcon name={skill} /> }))
            }))}
            defaultOpen={column.map((_, i) => i)}
            defaultActive="-"
            color={p.ink}
            accentColor={p.accent}
            lineColor={p.line}
            width={360}
            fontSize={16}
            rowHeight={32}
            indent={44}
            radius={9}
            lineWidth={1.25}
            reveal
            stagger={45}
            revealDelay={c * 140}
            followPointer
            drawDuration={300}
            className="skills__menu"
          />
        ))}
      </div>
      <Rights />
    </section>
  );
}
