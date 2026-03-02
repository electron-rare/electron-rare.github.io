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
    title: 'Automatisme de navigation active',
    intent: 'Rendre la lecture de section instantanee pendant le scroll.',
    system: 'Signal scroll -> section active -> etat nav.',
    build: 'Header sticky + progress line + jitter controle.',
    test: 'Verification 390/768/1024/1440 + clavier.',
    result: 'Navigation plus lisible sans perte de contraste.',
    href: '#top',
    event: TRACK_EVENTS.ctaHeroProfile,
    destination: '#top'
  },
  {
    date: '2026-02-27',
    title: 'Boucle conversion dual CTA',
    intent: 'Clarifier le chemin de contact professionnel.',
    system: 'CTA primaire LinkedIn, secondaire Malt.',
    build: 'Module CTA reutilisable sur sections cles.',
    test: 'Controle tracking GA4 + focus visible.',
    result: 'Parcours contact plus direct et mesurable.',
    href: '#contact',
    event: TRACK_EVENTS.ctaHeroContact,
    destination: '#contact'
  },
  {
    date: '2026-03-01',
    title: 'Research noise / Electron Fou',
    intent: 'Connecter les travaux sonores au studio systeme.',
    system: 'Carte projet + timeline + lien plateforme.',
    build: 'Integration Bandcamp dans axe portfolio.',
    test: 'Sortants verifies + ouverture nouvel onglet.',
    result: 'Preuve publique du versant noise experimental.',
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
            Lab notes
          </h2>
          <span className="circuit-pinline" aria-hidden="true" />
        </div>

        <p className="section-lead mb-0 mt-3">
          Debrief technique de sprint: hypotheses, implémentation, verification et impact operationnel.
        </p>

        <p className="mb-0 mt-3 max-w-3xl studio-muted">
          Journal de fabrication: chaque note suit le meme protocole
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

        <CtaDualRail className="mt-5" label="Transformer une note en mission active" />
      </div>
    </section>
  );
}
