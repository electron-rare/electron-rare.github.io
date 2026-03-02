import { motion } from 'motion/react';
import { TRACK_EVENTS, trackAttrs } from '@/lib/tracking';
import { CtaDualRail } from '@/components/ui/cta-dual-rail';

type LabEntry = {
  date: string;
  title: string;
  intent: string;
  system: string;
  build: string;
  test: string;
  result: string;
  href: string;
  event: (typeof TRACK_EVENTS)[keyof typeof TRACK_EVENTS];
  destination: string;
  external?: boolean;
};

const entries: LabEntry[] = [
  {
    date: '2026-02-25',
    title: 'Sprint 01 - Navigation et lisibilite commerciale',
    intent: 'Reduire la friction de lecture pour un decideur en scan rapide.',
    system: 'Signal scroll -> section active -> priorite CTA.',
    build: 'Header sticky, progress line et hierarchie copy mobile/desktop.',
    test: 'Verification 390/768/1024/1440, clavier et focus-visible.',
    result: 'Temps de comprehension hero/nav reduit, parcours de contact clarifie.',
    href: '#top',
    event: TRACK_EVENTS.ctaHeroProfile,
    destination: '#top'
  },
  {
    date: '2026-02-27',
    title: 'Sprint 02 - Boucle conversion mission',
    intent: 'Rendre explicite la proposition sur mesure et la methode agile.',
    system: 'CTA profil expert -> mission -> cas d usage.',
    build: 'Micro-copy de preuves, labels actionnables et sequence commerciale.',
    test: 'Controle tracking GA4/GTM + consistence des labels de sections.',
    result: 'Decision de prise de contact mieux guidee sans changer le contrat events.',
    href: '#contact',
    event: TRACK_EVENTS.ctaHeroContact,
    destination: '#contact'
  },
  {
    date: '2026-03-01',
    title: 'Sprint 03 - Preuves publiques et qualification',
    intent: 'Renforcer la credibilite avant premier echange commercial.',
    system: 'Cas d usage + timeline + references externes verifiables.',
    build: 'Integration Bandcamp, GitHub et liens experts dans le parcours.',
    test: 'Sortants verifies, conformite nofollow/noopener et UX mobile.',
    result: 'Bloc confiance plus robuste pour qualifier une mission premium.',
    href: 'https://lelectron-fou.bandcamp.com/',
    event: TRACK_EVENTS.outboundBandcampProject,
    destination: 'bandcamp.com',
    external: true
  }
];

export function LabNotes() {
  return (
    <section id="lab-notes" aria-labelledby="lab-notes-title" className="section-anchor mt-5">
      <div className="circuit-board rounded-2xl p-5 md:p-6">
        <div className="circuit-title-row">
          <span className="circuit-node circuit-node--green" aria-hidden="true" />
          <h2 id="lab-notes-title" className="m-0 text-3xl md:text-4xl">
            Lab notes / journal d'execution
          </h2>
          <span className="circuit-pinline" aria-hidden="true" />
        </div>

        <p className="section-lead mb-0 mt-3">
          Debrief sprint par sprint: faits techniques, decisions prises et impact sur la mission.
        </p>

        <p className="mb-0 mt-3 max-w-3xl studio-muted">
          Journal de fabrication: chaque note suit le protocole
          <code> Intent -&gt; System -&gt; Build -&gt; Test -&gt; Result</code>.
        </p>

        <div className="lab-notes-grid mt-4">
          {entries.map((entry, index) => (
            <motion.article
              key={`${entry.date}-${entry.title}`}
              className="lab-note-card"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <p className="lab-note-date">{entry.date}</p>
              <h3 className="lab-note-title">{entry.title}</h3>
              <dl className="lab-note-flow">
                <dt>Intent</dt>
                <dd>{entry.intent}</dd>
                <dt>System</dt>
                <dd>{entry.system}</dd>
                <dt>Build</dt>
                <dd>{entry.build}</dd>
                <dt>Test</dt>
                <dd>{entry.test}</dd>
                <dt>Result</dt>
                <dd>{entry.result}</dd>
              </dl>
              <p className="mb-0 mt-3">
                <a
                  href={entry.href}
                  target={entry.external ? '_blank' : undefined}
                  rel={entry.external ? 'noopener noreferrer' : undefined}
                  {...trackAttrs(entry.event, entry.destination)}
                  className="lab-note-link"
                >
                  Ouvrir note reliee
                </a>
              </p>
            </motion.article>
          ))}
        </div>

        <CtaDualRail className="mt-5" label="Passer du journal a une mission active" />
      </div>
    </section>
  );
}
