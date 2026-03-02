import { motion, useReducedMotion } from 'motion/react';
import { TRACK_EVENTS, trackAttrs } from '@/lib/tracking';

type PipelineStep = {
  label: string;
  detail: string;
  href: string;
  event: (typeof TRACK_EVENTS)[keyof typeof TRACK_EVENTS];
  destination: string;
};

const steps: PipelineStep[] = [
  {
    label: 'Audit cible',
    detail: 'Objectifs business, contraintes techniques et priorites de livraison',
    href: '#a-propos',
    event: TRACK_EVENTS.ctaHeroProfile,
    destination: '#a-propos'
  },
  {
    label: 'Architecture',
    detail: 'Flux, interfaces, points de mesure et hypotheses a valider',
    href: '#projets',
    event: TRACK_EVENTS.ctaHeroProjects,
    destination: '#projets'
  },
  {
    label: 'Prototype sprint',
    detail: 'Execution en cycle court: build, test, calibration et feedback',
    href: '#projets',
    event: TRACK_EVENTS.ctaHeroProjects,
    destination: '#projets'
  },
  {
    label: 'Delivery',
    detail: 'Handoff lisible, plan de deploiement et gouvernance des iterations',
    href: '#contact',
    event: TRACK_EVENTS.ctaHeroContact,
    destination: '#contact'
  }
];

export function SystemPipeline() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section aria-labelledby="pipeline-title" className="section-anchor mt-5">
      <div className="circuit-board rounded-2xl p-4 md:p-5">
        <div className="circuit-title-row">
          <span className="circuit-node circuit-node--green" aria-hidden="true" />
          <h2 id="pipeline-title" className="m-0 text-2xl md:text-3xl">
            Systeme de delivery sur mesure
          </h2>
          <span className="circuit-pinline" aria-hidden="true" />
        </div>

        <p className="section-lead mb-0 mt-3">
          Chaque etape transforme un fait technique en decision exploitable, puis en impact business mesurable.
        </p>

        <div className="section-signal-row mt-3" aria-label="Signaux pipeline">
          <span className="section-signal-chip">audit - prototype - delivery</span>
          <span className="section-signal-chip">sprints de 2 semaines</span>
          <span className="section-signal-chip">decisions tracees</span>
        </div>

        <ol className="system-pipeline mt-4" aria-label="Pipeline studio">
          {steps.map((step, index) => (
            <motion.li
              key={step.label}
              className="system-pipeline-step"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.38 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.38, delay: index * 0.07, ease: 'easeOut' }}
            >
              <a href={step.href} className="system-pipeline-link" {...trackAttrs(step.event, step.destination)}>
                <span className="system-pipeline-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="system-pipeline-content">
                  <span className="system-pipeline-label">{step.label}</span>
                  <span className="system-pipeline-detail">{step.detail}</span>
                </span>
              </a>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
