import { motion } from 'motion/react';
import { CtaDualRail } from '@/components/ui/cta-dual-rail';

const proofItems = [
  {
    label: 'Execution',
    value: 'Audit, prototype, delivery',
    detail: 'Methode agile en sprints de 2 semaines.'
  },
  {
    label: 'Rigueur technique',
    value: 'Faits, mesures, arbitrages',
    detail: 'Trajectoire documentee pour CTO et metier.'
  },
  {
    label: 'References verifiables',
    value: 'LinkedIn, Bandcamp, GitHub',
    detail: 'Cas et stacks consultables avant prise de contact.'
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
            Signaux de confiance pour decider
          </h2>
          <span className="circuit-pinline" aria-hidden="true" />
        </div>

        <p className="section-lead mb-0 mt-3">
          Vous obtenez les preuves utiles avant decision: execution, methode et references publiques.
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
          Ces preuves reduisent la friction commerciale sans surpromesse.
        </p>

        <CtaDualRail className="mt-4" label="Declencher un premier echange cadre" />
      </motion.div>
    </section>
  );
}
