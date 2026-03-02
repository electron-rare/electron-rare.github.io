import { motion } from 'motion/react';
import { TRACK_EVENTS, trackAttrs } from '@/lib/tracking';

type SprintStatus = 'en-cours' | 'planifie' | 'valide';

type SprintCard = {
  title: string;
  window: string;
  status: SprintStatus;
  progress: number;
  objective: string;
  deliverables: string[];
};

const SPRINT_CARDS: SprintCard[] = [
  {
    title: 'Sprint Signal Route',
    window: 'Semaine 01-02',
    status: 'en-cours',
    progress: 72,
    objective: 'Clarifier le parcours hero -> preuve -> conversion avec une lecture plus rapide sur mobile.',
    deliverables: ['Hero densifie', 'Navigation active renforcee', 'CTA mission priorise']
  },
  {
    title: 'Sprint Lab Motion',
    window: 'Semaine 03-04',
    status: 'planifie',
    progress: 34,
    objective: 'Introduire des micro-interactions contextuelles pour guider la prise de decision sans bruit visuel.',
    deliverables: ['Cards reactives', 'Transitions sectionnelles', 'Feedback focus tactile']
  },
  {
    title: 'Sprint Conversion Proof',
    window: 'Semaine 05-06',
    status: 'valide',
    progress: 100,
    objective: 'Pousser les preuves business et techniques au-dessus de la ligne de flottaison pour augmenter les contacts.',
    deliverables: ['Bloc preuve compact', 'Timeline impact affinee', 'Pont direct vers contact']
  }
];

function statusLabel(status: SprintStatus) {
  if (status === 'en-cours') {
    return 'En cours';
  }
  if (status === 'planifie') {
    return 'Planifie';
  }
  return 'Valide';
}

export function GraphicSprints() {
  return (
    <section className="section-anchor graphic-sprints mt-5" id="sprints-graphiques" aria-labelledby="graphic-sprints-title">
      <div className="graphic-sprints-panel">
        <div className="graphic-sprints-head">
          <p className="graphic-sprints-kicker">Nouveau sprint graphique</p>
          <h2 id="graphic-sprints-title" className="graphic-sprints-title">
            UI/UX plus dynamique, pilotee par preuves
          </h2>
          <p className="graphic-sprints-copy">
            Sequence de sprints orientee conversion: rythme visuel, hiérarchie CTA, et densite d information stable sur
            390/768/1024/1440.
          </p>
        </div>

        <div className="graphic-sprints-grid">
          {SPRINT_CARDS.map((sprint, index) => (
            <motion.article
              key={sprint.title}
              className="graphic-sprint-card"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.32, delay: index * 0.06 }}
              style={{ ['--sprint-progress-target' as string]: `${sprint.progress}%` }}
            >
              <header className="graphic-sprint-card-head">
                <p className={`graphic-sprint-status graphic-sprint-status--${sprint.status}`}>{statusLabel(sprint.status)}</p>
                <p className="graphic-sprint-window">{sprint.window}</p>
              </header>

              <h3 className="graphic-sprint-title">{sprint.title}</h3>
              <p className="graphic-sprint-objective">{sprint.objective}</p>

              <div className="graphic-sprint-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={sprint.progress}>
                <span className="graphic-sprint-progress-fill" />
              </div>
              <p className="graphic-sprint-progress-label">Avancement {sprint.progress}%</p>

              <ul className="graphic-sprint-deliverables">
                {sprint.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className="graphic-sprints-foot">
          <p className="graphic-sprints-foot-copy">Besoin de lancer le prochain sprint visuel en priorite produit ?</p>
          <a href="#contact" className="graphic-sprints-cta" {...trackAttrs(TRACK_EVENTS.ctaHeroContact, '#contact')}>
            Planifier le sprint UI/UX
          </a>
        </div>
      </div>
    </section>
  );
}
