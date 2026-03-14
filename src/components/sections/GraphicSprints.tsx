import { TRACK_EVENTS, trackAttrs } from '@/lib/tracking';
import { SPRINT_CARDS, type SprintStatus } from '@/content/home-content';

function statusLabel(status: SprintStatus) {
  if (status === 'trace') {
    return 'Trace';
  }
  if (status === 'bench') {
    return 'Bench';
  }
  return 'Run';
}

export function GraphicSprints() {
  return (
    <section className="section-anchor graphic-sprints mt-5" id="sprints-graphiques" aria-labelledby="graphic-sprints-title">
      <div className="graphic-sprints-panel graphic-sprints-panel--routing">
        <div className="graphic-sprints-head">
          <p className="graphic-sprints-kicker">Formats de mission</p>
          <h2 id="graphic-sprints-title" className="graphic-sprints-title">
            Trois formats, un livrable testé
          </h2>
          <p className="graphic-sprints-copy">
            Du diagnostic rapide à la mission complète — choisissez le bon niveau d&apos;engagement selon votre projet.
          </p>
        </div>

        <div className="graphic-sprints-grid">
          {SPRINT_CARDS.map((sprint) => (
            <article
              key={sprint.title}
              className="graphic-sprint-card"
              style={{ ['--sprint-progress-target' as string]: `${sprint.progress}%` }}
            >
              <header className="graphic-sprint-card-head">
                <p className={`graphic-sprint-status graphic-sprint-status--${sprint.status}`}>{statusLabel(sprint.status)}</p>
                <p className="graphic-sprint-window">{sprint.window}</p>
              </header>

              <h3 className="graphic-sprint-title">{sprint.title}</h3>
              <p className="graphic-sprint-objective">{sprint.objective}</p>

              <div className="graphic-sprint-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={sprint.progress} aria-valuetext={`Niveau d'engagement ${sprint.progress}%`}>
                <span className="graphic-sprint-progress-fill" />
              </div>
              <p className="graphic-sprint-progress-label">Niveau d engagement {sprint.progress}%</p>

              <ul className="graphic-sprint-deliverables">
                {sprint.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="graphic-sprints-foot">
          <p className="graphic-sprints-foot-copy">Besoin d&apos;aide pour choisir le bon format ?</p>
          <a href="#contact" className="graphic-sprints-cta" {...trackAttrs(TRACK_EVENTS.ctaHeroContact, '#contact')}>
            En discuter
          </a>
        </div>
      </div>
    </section>
  );
}
