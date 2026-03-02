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
          Point d&apos;entree conversion: cadrage mission, objectifs de systeme, planning et contraintes terrain.
        </p>

        <p className="mb-0 mt-3 max-w-3xl studio-muted">
          Pour mission de conception, design produit, collaboration de creation electronique ou production
          audiovisuelle et automatisme de systemes, contactez-moi via les plateformes ci-dessous.
        </p>
        <p className="mb-0 mt-2 text-sm studio-muted">
          Canal prioritaire: LinkedIn DM. Option business/freelance: Malt.
        </p>

        <CtaDualRail className="mt-4" label="Canaux conversion (primaire puis secondaire)" />

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
          <li>Poste studio: conception electronique et design de systeme</li>
          <li>Presence professionnelle active sur LinkedIn et Malt</li>
          <li>Premier echange possible sous 24-48h selon disponibilite</li>
          <li>Travaux publies et processus de co-conception vérifiables</li>
        </ul>
      </div>
    </motion.section>
  );
}
