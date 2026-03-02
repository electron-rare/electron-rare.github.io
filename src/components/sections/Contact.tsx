import { motion } from 'motion/react';
import { CtaDualRail } from '@/components/ui/cta-dual-rail';
import type { CtaLink } from '@/lib/types';
import { TRACK_EVENTS, trackAttrs } from '@/lib/tracking';

const tertiary: CtaLink = {
  label: 'Bandcamp (Electron Fou)',
  href: 'https://lelectron-fou.bandcamp.com/',
  event: TRACK_EVENTS.outboundBandcampContact,
  destination: 'bandcamp.com',
  external: true
};

export function Contact() {
  return (
    <motion.section
      id="contact"
      aria-labelledby="contact-title"
      className="section-anchor mt-5"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="circuit-board rounded-2xl p-5 md:p-6">
        <div className="circuit-title-row">
          <span className="circuit-node circuit-node--magenta" aria-hidden="true" />
          <h2 id="contact-title" className="m-0 text-3xl md:text-4xl">
            Demarrer une mission
          </h2>
          <span className="circuit-pinline" aria-hidden="true" />
        </div>

        <p className="section-lead mb-0 mt-3">
          Point d&apos;entree mission: perimetre, contraintes et priorites de delivery.
        </p>

        <p className="mb-0 mt-3 max-w-3xl studio-muted">
          Missions ciblees: architecture electronique, prototype sur mesure, optimisation systeme et accompagnement
          produit. Le cadrage initial valide objectifs, risques et temporalite.
        </p>
        <p className="mb-0 mt-2 text-sm studio-muted">
          Canal prioritaire: LinkedIn DM. Option achat/prestation: Malt. Premier retour sous 24-48h selon charge.
        </p>

        <CtaDualRail className="mt-4" label="Choisir le canal de contact mission" />

        <p className="mb-0 mt-3">
          <a
            href={tertiary.href}
            target={tertiary.external ? '_blank' : undefined}
            rel={tertiary.external ? 'noopener noreferrer' : undefined}
            {...trackAttrs(tertiary.event, tertiary.destination)}
            className="inline-flex min-h-9 items-center gap-2 font-semibold studio-link underline-offset-4"
          >
            <span className="circuit-node circuit-node--magenta" aria-hidden="true" />
            {tertiary.label}
          </a>
        </p>

        <ul aria-label="Repères de confiance" className="mb-0 mt-4 pl-5 studio-muted">
          <li>Prerequis mission: objectif cible, contexte technique, contrainte principale</li>
          <li>Mode operatoire: sprint de 2 semaines avec jalons de validation</li>
          <li>Livrables: note de cadrage, priorisation et plan de delivery</li>
          <li>References publiques disponibles pour pre-qualification</li>
        </ul>
      </div>
    </motion.section>
  );
}
