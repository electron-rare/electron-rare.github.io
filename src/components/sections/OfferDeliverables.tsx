import { CtaDualRail } from '@/components/ui/cta-dual-rail';

type Deliverable = {
  title: string;
  detail: string;
  impact: string;
};

const DELIVERABLES: Deliverable[] = [
  {
    title: 'Architecture',
    detail: 'Carte systeme, interfaces critiques, risques et arbitrages assumes.',
    impact: 'Vision partagee entre produit, tech et execution.'
  },
  {
    title: 'Prototype instrumente',
    detail: 'Points de mesure, logs et protocoles de test prevus des le build.',
    impact: 'Apprendre vite avec des faits, pas des suppositions.'
  },
  {
    title: 'Validation',
    detail: 'Criteres Go/NoGo, rapport actionnable et priorisation risque x valeur.',
    impact: 'Decisions rapides, defendables et tracables.'
  },
  {
    title: 'Handoff',
    detail: 'Documentation transmissible, testabilite et trajectoire vers la production.',
    impact: 'Passage propre vers BE/CTO/industrialisation.'
  }
];

export function OfferDeliverables() {
  return (
    <section id="offre-systeme" className="section-anchor mt-5" aria-labelledby="offer-title">
      <div className="circuit-board rounded-2xl p-5 md:p-6">
        <div className="circuit-title-row">
          <span className="circuit-node circuit-node--green" aria-hidden="true" />
          <h2 id="offer-title" className="m-0 text-3xl md:text-4xl">
            Offre & livrables
          </h2>
          <span className="circuit-pinline" aria-hidden="true" />
        </div>

        <p className="section-lead mb-0 mt-3">
          Ce que vous recevez est simple a lire, utile a decider, et exploitable en execution.
        </p>

        <div className="offer-grid mt-4" role="list" aria-label="Livrables mission">
          {DELIVERABLES.map((item) => (
            <article key={item.title} className="offer-card" role="listitem">
              <p className="offer-card-title">{item.title}</p>
              <p className="offer-card-detail">{item.detail}</p>
              <p className="offer-card-impact">Impact: {item.impact}</p>
            </article>
          ))}
        </div>

        <p className="offer-signature mb-0 mt-4">
          Pas une carte de plus. Une partition technique: chaque mesure produit une decision.
        </p>

        <CtaDualRail className="mt-4" label="Transformer ces livrables en mission" />
      </div>
    </section>
  );
}
