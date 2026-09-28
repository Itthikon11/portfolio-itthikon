import { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PROJECTS } from '../../data/content';
import { Icon } from '../Icons';
import Folder from '../reactbits/Folder';

const PER_PAGE = 6;

function ProjectCard({ project, index, lang, viewLabel }) {
  const initials = project.title
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2);
  const body = (
    <>
      <div className="project-card__thumb">
        {project.image ? <img src={project.image} alt="" /> : <span aria-hidden="true">{initials}</span>}
      </div>
      <div className="project-card__body">
        <h3>{project.title}</h3>
        <p>{project.description[lang]}</p>
        <ul className="project-card__tags">
          {project.tags.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
      {project.href ? (
        <span className="project-card__link">
          {viewLabel} <Icon name="external" size={16} />
        </span>
      ) : null}
    </>
  );
  const style = { '--i': index };
  return project.href ? (
    <a className="project-card glass" href={project.href} target="_blank" rel="noreferrer" style={style}>
      {body}
    </a>
  ) : (
    <article className="project-card glass" style={style}>
      {body}
    </article>
  );
}

export default function Projects() {
  const { t, lang } = useApp();
  const [view, setView] = useState('folder');
  const [page, setPage] = useState(0);
  const timer = useRef(0);
  const pages = Math.max(1, Math.ceil(PROJECTS.length / PER_PAGE));
  const visible = PROJECTS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const onFolderToggle = open => {
    clearTimeout(timer.current);
    // let the papers fan out before swapping to the grid
    if (open) timer.current = setTimeout(() => setView('grid'), 750);
  };

  const go = dir => setPage(p => (p + dir + pages) % pages);

  return (
    <section id="projects" className="section projects">
      <header className="section-head">
        <h2>{t.projectsTitle}</h2>
        <p>{t.projectsSub}</p>
      </header>

      {view === 'folder' ? (
        <div className="projects__folder">
          <div className="folder-stage">
            <Folder color="#DDD59B" size={3.4} onToggle={onFolderToggle} />
          </div>
          <p className="pixel poke">
            {t.poke[0]}
            <br />
            {t.poke[1]}
          </p>
        </div>
      ) : (
        <div className="projects__grid-wrap">
          {pages > 1 ? (
            <button type="button" className="projects__arrow projects__arrow--prev" onClick={() => go(-1)} aria-label="Previous">
              <Icon name="chevronLeft" size={64} strokeWidth={2.4} />
            </button>
          ) : null}
          <div className="projects__grid" key={page}>
            {visible.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} lang={lang} viewLabel={t.viewProject} />
            ))}
          </div>
          {pages > 1 ? (
            <button type="button" className="projects__arrow projects__arrow--next" onClick={() => go(1)} aria-label="Next">
              <Icon name="chevronRight" size={64} strokeWidth={2.4} />
            </button>
          ) : null}
          <div className="projects__footer">
            {pages > 1 ? (
              <div className="projects__dots">
                {Array.from({ length: pages }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={i === page ? 'is-active' : ''}
                    onClick={() => setPage(i)}
                    aria-label={`Page ${i + 1}`}
                  />
                ))}
              </div>
            ) : null}
            <button
              type="button"
              className="projects__close"
              onClick={() => {
                setView('folder');
                setPage(0);
              }}
            >
              <Icon name="close" size={16} /> {t.backToFolder}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
