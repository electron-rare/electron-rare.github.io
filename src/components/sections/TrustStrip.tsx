import { motion } from 'motion/react';
import { CtaDualRail } from '@/components/ui/cta-dual-rail';

const proofItems = [
  {
    label: 'Collaborations',
    value: 'Studio / design / audiovisuel',
    detail: 'Approche orientee systeme et livraison.'
  },
  {
    label: 'Projets actifs',
    value: 'R&D electronique + UX conversion',
    detail: 'Chaîne complete: idee, prototype, QA, publication.'
  },
  {
    label: 'Liens verifiables',
    value: 'LinkedIn, Malt, Bandcamp, GitHub',
    detail: 'References hardware/firmware consultables.'
  }
];

export function TrustStrip() {
  return (
    <section aria-labelledby="proof-title" className="section-anchor mt-5">
      <motion.div
        className="circuit-board rounded-2xl p-5 md:p-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="circuit-title-row">
          <span className="circuit-node" aria-hidden="true" />
          <h2 id="proof-title" className="m-0 text-2xl md:text-3xl">
            Signaux de confiance
          </h2>
          <span className="circuit-pinline" aria-hidden="true" />
        </div>

        <p className="section-lead mb-0 mt-3">
          Preuves de credibilite avant contact: execution, references publiques et capacite d&apos;iteration.
        </p>

        <div className="trust-strip mt-4" role="list" aria-label="Preuves studio">
          {proofItems.map((item) => (
            <article key={item.label} className="trust-pill" role="listitem">
              <p className="trust-pill-label">{item.label}</p>
              <p className="trust-pill-value">{item.value}</p>
              <p className="trust-pill-detail">{item.detail}</p>
            </article>
          ))}
        </div>

        <p className="mb-0 mt-4 text-sm studio-muted">
          Bloc preuves place avant contact pour reduire la friction de decision.
        </p>

        <CtaDualRail className="mt-4" label="Declencher le premier echange" />
      </motion.div>
    </section>
  );
}
