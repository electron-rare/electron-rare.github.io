import * as React from 'react';
import { TRACK_EVENTS, trackAttrs, trackEvent } from '@/lib/tracking';
import { useCopyContent } from '@/lib/copy';

type ProductType = 'iot' | 'audio' | 'rf' | 'indus';
type Constraint = 'emi' | 'autonomie' | 'cout' | 'delai';
type Deadline = '2-4' | '4-8' | '8+';

const PRODUCT_LABELS: Record<ProductType, string> = {
  iot: 'IoT / objet connecte',
  audio: 'Audio embarque',
  rf: 'RF / sans fil',
  indus: 'Systeme industriel'
};

const CONSTRAINT_LABELS: Record<Constraint, string> = {
  emi: 'EMI / CEM',
  autonomie: 'Autonomie',
  cout: 'Cout BOM',
  delai: 'Delai'
};

const DEADLINE_LABELS: Record<Deadline, string> = {
  '2-4': '2 a 4 semaines',
  '4-8': '4 a 8 semaines',
  '8+': '8+ semaines'
};

function recommendedPlan(
  recommendations: {
    emiQuick: string;
    emiStandard: string;
    autonomie: string;
    cout: string;
    rf: string;
    defaultPlan: string;
  },
  product: ProductType,
  constraint: Constraint,
  deadline: Deadline
) {
  const quick = deadline === '2-4';
  if (constraint === 'emi') {
    return quick ? recommendations.emiQuick : recommendations.emiStandard;
  }
  if (constraint === 'autonomie') {
    return recommendations.autonomie;
  }
  if (constraint === 'cout') {
    return recommendations.cout;
  }
  if (product === 'rf') {
    return recommendations.rf;
  }
  return recommendations.defaultPlan;
}

export function MissionConfigurator() {
  const { copy } = useCopyContent();
  const missionCopy = copy.mission;
  const [product, setProduct] = React.useState<ProductType>('iot');
  const [constraint, setConstraint] = React.useState<Constraint>('emi');
  const [deadline, setDeadline] = React.useState<Deadline>('4-8');
  const [copied, setCopied] = React.useState(false);
  const hasSentInitialGenerated = React.useRef(false);

  const briefText = React.useMemo(() => {
    return [
      missionCopy.planLabels.briefTitle,
      `${missionCopy.planLabels.productLine}: ${PRODUCT_LABELS[product]}`,
      `${missionCopy.planLabels.constraintLine}: ${CONSTRAINT_LABELS[constraint]}`,
      `${missionCopy.planLabels.deadlineLine}: ${DEADLINE_LABELS[deadline]}`,
      `${missionCopy.planLabels.planLine}: ${recommendedPlan(missionCopy.recommendations, product, constraint, deadline)}`
    ].join('\n');
  }, [missionCopy, product, constraint, deadline]);

  const copyBrief = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(briefText);
      localStorage.setItem('er_mission_brief', briefText);
      trackEvent(TRACK_EVENTS.funnelBriefCopied, {
        destination: '#mission-config',
        source: 'mission_config',
        brief_chars: briefText.length
      });
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch (_error) {
      setCopied(false);
    }
  }, [briefText]);

  const saveBrief = React.useCallback(() => {
    try {
      localStorage.setItem('er_mission_brief', briefText);
    } catch (_error) {
      // Ignore localStorage errors.
    }
    trackEvent(TRACK_EVENTS.funnelContactSubmitted, {
      destination: '#contact',
      source: 'mission_config',
      brief_chars: briefText.length
    });
  }, [briefText]);

  React.useEffect(() => {
    trackEvent(TRACK_EVENTS.funnelBriefGenerated, {
      destination: '#mission-config',
      source: hasSentInitialGenerated.current ? 'mission_config_update' : 'mission_config_initial',
      product,
      constraint,
      deadline,
      brief_chars: briefText.length
    });
    hasSentInitialGenerated.current = true;
  }, [briefText, product, constraint, deadline]);

  return (
    <section id="mission-config" className="section-anchor mission-config mt-5" aria-labelledby="mission-config-title">
      <div className="circuit-board rounded-2xl p-5 md:p-6">
        <div className="circuit-title-row">
          <span className="circuit-node circuit-node--green" aria-hidden="true" />
          <h2 id="mission-config-title" className="m-0 text-3xl md:text-4xl">
            {missionCopy.title}
          </h2>
          <span className="circuit-pinline" aria-hidden="true" />
        </div>
        <p className="section-lead mb-0 mt-3">{missionCopy.subtitle}</p>

        <div className="mission-config-grid mt-4">
          <fieldset className="mission-fieldset">
            <legend>{missionCopy.labels.productType}</legend>
            <div className="mission-options">
              {(Object.keys(PRODUCT_LABELS) as ProductType[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`mission-chip ${product === key ? 'is-active' : ''}`}
                  onClick={() => setProduct(key)}
                >
                  {PRODUCT_LABELS[key]}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mission-fieldset">
            <legend>{missionCopy.labels.constraint}</legend>
            <div className="mission-options">
              {(Object.keys(CONSTRAINT_LABELS) as Constraint[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`mission-chip ${constraint === key ? 'is-active' : ''}`}
                  onClick={() => setConstraint(key)}
                >
                  {CONSTRAINT_LABELS[key]}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mission-fieldset">
            <legend>{missionCopy.labels.deadline}</legend>
            <div className="mission-options">
              {(Object.keys(DEADLINE_LABELS) as Deadline[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`mission-chip ${deadline === key ? 'is-active' : ''}`}
                  onClick={() => setDeadline(key)}
                >
                  {DEADLINE_LABELS[key]}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="mission-plan mt-4">
          <p className="mission-plan-kicker">{missionCopy.planLabels.recommended}</p>
          <p className="mission-plan-copy">{recommendedPlan(missionCopy.recommendations, product, constraint, deadline)}</p>
          <pre className="mission-plan-brief" aria-label="Brief genere">
            {briefText}
          </pre>
          <div className="mission-plan-actions">
            <button type="button" className="mission-cta mission-cta--secondary" onClick={copyBrief}>
              {copied ? missionCopy.planLabels.copiedBrief : missionCopy.planLabels.copyBrief}
            </button>
            <a
              href="#contact"
              className="mission-cta mission-cta--primary"
              onClick={saveBrief}
              {...trackAttrs(TRACK_EVENTS.ctaHeroContact, '#contact')}
            >
              {missionCopy.planLabels.sendBrief}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
