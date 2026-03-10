import { TRACK_EVENTS, trackAttrs } from '@/lib/tracking';
import { CASE_STUDIES } from '@/content/caseStudies';

type CaseItem = {
  slug: string;
  title: string;
  trace: string;
  context: string;
  intervention: string;
  result: string;
  linkLabel?: string;
  linkHref?: string;
  event?: (typeof TRACK_EVENTS)[keyof typeof TRACK_EVENTS];
  destination?: string;
};

const CASES: CaseItem[] = [
  ...CASE_STUDIES.map((item) => ({
    slug: item.slug,
    title: item.title,
    trace: item.trace,
    context: item.context,
    intervention: item.intervention,
    result: item.result
  }))
];

const GITHUB_REFERENCES = [
  'https://github.com/KomplexKapharnaum/KXKM_ESP32_Audio_Battery_hardware',
  'https://github.com/KomplexKapharnaum/LEDcurtain_hardware',
  'https://github.com/KomplexKapharnaum/kxkm_Ve.direct'
] as const;

export function CaseProofs() {
  return (
    <section id="cas" className="section-anchor mt-5" aria-labelledby="cases-title">
      <div className="circuit-board rounded-2xl p-5 md:p-6">
        <div className="circuit-title-row">
          <span className="circuit-node" aria-hidden="true" />
          <h2 id="cases-title" className="m-0 text-3xl md:text-4xl">
            Cas & preuves d'execution
          </h2>
          <span className="circuit-pinline" aria-hidden="true" />
        </div>

        <p className="section-lead mb-0 mt-3">
          Trois cas maximum, lecture scan-friendly: contrainte, intervention, resultat.
        </p>

        <div className="case-grid mt-4" role="list" aria-label="Cas d'usage">
          {CASES.map((item) => (
            <article key={item.title} className="case-card" role="listitem">
              <p className="case-trace">{item.trace}</p>
              <h3 className="case-title">{item.title}</h3>
              <p className="case-line">
                <strong>Contexte:</strong> {item.context}
              </p>
              <p className="case-line">
                <strong>Intervention:</strong> {item.intervention}
              </p>
              <p className="case-line">
                <strong>Resultat:</strong> {item.result}
              </p>
              <p className="mb-0 mt-2">
                <a
                  href={`/cas/${item.slug}`}
                  {...trackAttrs(TRACK_EVENTS.engagementCaseOpened, `/cas/${item.slug}`)}
                  className="case-link"
                >
                  Voir le cas complet
                </a>
              </p>
              {item.linkHref && item.linkLabel && item.event && item.destination ? (
                <p className="mb-0 mt-2">
                  <a
                    href={item.linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...trackAttrs(item.event, item.destination)}
                    className="case-link"
                  >
                    {item.linkLabel}
                  </a>
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
