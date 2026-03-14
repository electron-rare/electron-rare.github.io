import { trackAttrs } from '@/lib/tracking';
import { CASE_STUDIES } from '@/content/home-content';

export function CaseStudies() {
  return (
    <section
      id="cas-clients"
      aria-labelledby="cases-title"
      className="section-anchor mt-5"
    >
      <div className="circuit-board cases-panel rounded-2xl p-5 md:p-6">
        <div className="circuit-title-row">
          <span className="circuit-node circuit-node--cyan" aria-hidden="true" />
          <h2 id="cases-title" className="m-0 text-3xl md:text-4xl">
            Cas concrets
          </h2>
          <span className="circuit-pinline" aria-hidden="true" />
        </div>

        <p className="section-lead mb-0 mt-3">
          Trois interventions, trois contextes différents — chaque fois un livrable testé.
        </p>

        <div className="cases-grid mt-4">
          {CASE_STUDIES.map((study) => (
            <article
              key={study.title}
              className="case-card"
            >
              <p className={`case-tag case-tag--${study.color}`}>{study.tag}</p>
              <h3 className="case-title">{study.title}</h3>
              <p className="case-context">{study.context}</p>
              <p className="case-intervention"><strong>Intervention :</strong> {study.intervention}</p>
              <p className="case-result"><strong>Résultat :</strong> {study.result}</p>
              {study.link && (
                <a
                  href={study.link.href}
                  target={study.link.external ? '_blank' : undefined}
                  rel={study.link.external ? 'noopener noreferrer' : undefined}
                  {...trackAttrs(study.link.event, study.link.destination)}
                  className="case-link studio-link"
                >
                  {study.link.label} →
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
