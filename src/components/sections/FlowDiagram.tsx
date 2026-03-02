import { TRACK_EVENTS, trackAttrs } from '@/lib/tracking';
import type { CtaLink } from '@/lib/types';
import { motion, useReducedMotion } from 'motion/react';

type FlowStep = {
  label: string;
  description: string;
  href: string;
  icon: 'pad' | 'hub' | 'cable';
  event: CtaLink['event'];
  destination: string;
};

const steps: FlowStep[] = [
  {
    label: 'Signal d’entrée',
    description: 'Mesure du besoin, contraintes techniques et points de controle',
    href: '#top',
    icon: 'pad',
    event: TRACK_EVENTS.ctaHeroProfile,
    destination: '#top'
  },
  {
    label: 'Bus de contrôle',
    description: 'Architecture systeme, mapping des flux et logique d automatisme',
    href: '#a-propos',
    icon: 'hub',
    event: TRACK_EVENTS.ctaHeroProjects,
    destination: '#a-propos'
  },
  {
    label: 'Automatisme',
    description: 'Prototype operationnel, boucle test -> calibrage -> validation',
    href: '#projets',
    icon: 'cable',
    event: TRACK_EVENTS.ctaHeroContact,
    destination: '#projets'
  },
  {
    label: 'Lancement mission',
    description: 'Activation de collaboration avec objectifs, delais et livrables',
    href: '#contact',
    icon: 'hub',
    event: TRACK_EVENTS.outboundLinkedinContact,
    destination: '#contact'
  }
];

export function FlowDiagram() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section aria-labelledby="flow-title" className="flow-diagram-shell section-anchor mt-5">
      <div className="circuit-board rounded-2xl p-4 md:p-5">
        <div className="flow-title-row">
          <span className="studio-icon studio-icon--connector" aria-hidden="true" />
          <h2 id="flow-title" className="m-0 text-xl md:text-2xl">
            Chemin visuel: de l’idée à la mission
          </h2>
        </div>

        <p className="section-lead mb-0 mt-3">
          Sequence de pilotage studio: lecture du signal, architecture, automatisme puis activation collaboration.
        </p>

        <div className="section-signal-row mt-3" aria-label="Signaux flux">
          <span className="section-signal-chip">idee -&gt; systeme</span>
          <span className="section-signal-chip">schema -&gt; prototype</span>
          <span className="section-signal-chip">preuve -&gt; mission</span>
        </div>

        <ol className="flow-diagram mt-3" aria-label="Flux studio">
          {steps.flatMap((step, index) => {
            const node = (
              <motion.li
                className="flow-node"
                data-step={index}
                key={`flow-node-${index}`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.36 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.45, delay: index * 0.08, ease: 'easeOut' }
                }
              >
                <a href={step.href} {...trackAttrs(step.event, step.destination)} className="flow-node-card">
                  <span className={`studio-icon studio-icon--${step.icon}`} aria-hidden="true" />
                  <span>
                    <span className="text-sm uppercase tracking-[0.08em] text-[color:var(--electric)]">{step.label}</span>
                    <strong className="mt-1 block leading-tight">{step.description}</strong>
                  </span>
                </a>
              </motion.li>
            );

            if (index === steps.length - 1) {
              return [node];
            }

            const edge = (
              <motion.li
                className="flow-edge"
                key={`flow-edge-${index}`}
                aria-hidden="true"
                initial={prefersReducedMotion ? false : { opacity: 0, scaleX: 0.7 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.35, delay: index * 0.09 + 0.05, ease: 'easeOut' }
                }
              />
            );

            return [node, edge];
          })}
        </ol>
      </div>
    </section>
  );
}
