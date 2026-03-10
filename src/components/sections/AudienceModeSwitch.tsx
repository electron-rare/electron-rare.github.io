import * as React from 'react';
import { TRACK_EVENTS, trackEvent } from '@/lib/tracking';

type AudienceMode = 'discover' | 'pro';

type NeedItem = {
  title: string;
  body: string;
};

const MODE_STORAGE_KEY = 'er_audience_mode';

const MODE_COPY: Record<
  AudienceMode,
  {
    kicker: string;
    title: string;
    paragraphs: string[];
    ctaLabel: string;
    ctaHref: string;
  }
> = {
  discover: {
    kicker: 'JE DECOUVRE',
    title: 'Vous avez une idee. Je la transforme en prototype qui dit la verite.',
    paragraphs: [
      "Beaucoup d'idees restent dans un carnet parce que l'electronique semble etre un mur. Je transforme ce mur en chemin: on clarifie l'usage, on structure le systeme, on construit un premier prototype, puis on verifie avec des tests concrets.",
      'Vous avancez avec une trajectoire lisible: ce qu\'on construit, ce qu\'on teste, ce qu\'on decide. On passe de l\'imaginaire au reel, sans jargon inutile et sans zones floues.',
      "Vous repartez avec un prototype credible, des preuves mesurables, et un plan clair pour la suite."
    ],
    ctaLabel: 'Decrire votre idee (2 minutes)',
    ctaHref: '#contact'
  },
  pro: {
    kicker: 'JE SUIS PRO',
    title: 'Pour CTO et equipes hardware: reduction du risque systeme, mesuree et actionnable.',
    paragraphs: [
      'Quand le blocage est deja technique, le format est direct: audit rapide, plan d\'attaque, instrumentation, mesures, decisions tranchees.',
      'Perimetre traite: power integrity, signal integrity, EMI/EMC pre-conformite, RF, audio, thermique, testabilite, Go/NoGo et handoff DFM.',
      'Livrables transmis: architecture, plan de test, rapport de mesures, priorisation risque x valeur, trajectoire industrialisation.'
    ],
    ctaLabel: 'Partager votre contrainte #1',
    ctaHref: '#contact'
  }
};

const NEEDS: Record<AudienceMode, NeedItem[]> = {
  discover: [
    { title: 'Objet autonome', body: 'Je veux un objet sur batterie qui tienne plusieurs jours avec recharge USB-C.' },
    { title: 'Objet connecte', body: 'Je veux un produit Bluetooth/Wi-Fi pilotable depuis une application mobile.' },
    { title: 'Prototype demo', body: 'Je veux une demo fiable pour client ou investisseur, pas juste un concept.' },
    { title: 'Objet sonore', body: 'Je veux un systeme audio sans souffle ni buzz, stable dans le temps.' },
    { title: 'Capteurs terrain', body: 'Je veux mesurer des capteurs et exploiter les donnees dans des conditions reelles.' },
    { title: 'Moteur/actionneur', body: 'Je veux piloter un moteur ou une pompe sans a-coups et sans surchauffe.' },
    { title: 'Robustesse usage', body: 'Je veux que le prototype tienne les vibrations, la temperature et l\'usage intensif.' },
    { title: 'Du croquis au reel', body: 'Je veux un plan clair: quoi fabriquer, quoi tester et dans quel ordre avancer.' }
  ],
  pro: [
    { title: 'Resets sous charge', body: 'Reset sur pics de charge/radio/moteur: PI, transitoires et brown-out a verrouiller.' },
    { title: 'Bruit analog/audio', body: 'Niveau de bruit hors spec: masse, decouplage, routage, filtres et preuves de mesure.' },
    { title: 'Autonomie degradee', body: 'Consommation trop elevee: profiling, budget energie, arbitrages MCU/RF.' },
    { title: 'EMI pre-scan KO', body: 'Echec pre-conformite: identifier les sources, corriger vite, revalider proprement.' },
    { title: 'RF instable', body: 'Portee faible/desensibilisation: integration antenne, coexistence, matching.' },
    { title: 'Bus fragile', body: 'I2C/SPI/UART instables: timings, SI, pull-ups, marges et strategie debug.' },
    { title: 'Variabilite cartes', body: 'Resultats heterogenes entre unites: robustesse, tolerances, plan de test.' },
    { title: 'Proto vers prod', body: 'Handoff industrialisation: DFM, testabilite, Go/NoGo et documentation exploitable.' }
  ]
};

function isAudienceMode(value: string): value is AudienceMode {
  return value === 'discover' || value === 'pro';
}

function shuffleItems<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = next[i];
    next[i] = next[j];
    next[j] = tmp;
  }
  return next;
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduce(media.matches);
    onChange();
    media.addEventListener?.('change', onChange) ?? media.addListener(onChange);
    return () => media.removeEventListener?.('change', onChange) ?? media.removeListener(onChange);
  }, []);

  return reduce;
}

function useRotatingNeeds(items: NeedItem[], pageSize: number, intervalMs: number) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [order, setOrder] = React.useState<NeedItem[]>(items);
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  const itemsRef = React.useRef(items);
  React.useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  React.useEffect(() => {
    setOrder(shuffleItems(items));
    setIndex(0);
  }, [items]);

  React.useEffect(() => {
    if (prefersReducedMotion || paused || order.length === 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((prev) => {
        const next = prev + pageSize;
        if (next >= order.length) {
          setOrder(shuffleItems(itemsRef.current));
          return 0;
        }
        return next;
      });
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [order.length, paused, pageSize, intervalMs, prefersReducedMotion]);

  const current = React.useMemo(() => {
    if (order.length === 0) {
      return [] as NeedItem[];
    }
    const doubled = [...order, ...order];
    return doubled.slice(index, index + pageSize);
  }, [order, index, pageSize]);

  const next = React.useCallback(() => {
    setIndex((prev) => {
      const nextIndex = prev + pageSize;
      if (nextIndex >= order.length) {
        return 0;
      }
      return nextIndex;
    });
  }, [order.length, pageSize]);

  return { current, next, paused, setPaused, prefersReducedMotion } as const;
}

export function AudienceModeSwitch() {
  const [mode, setMode] = React.useState<AudienceMode>('discover');

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = (params.get('audience') || '').toLowerCase().trim();
    if (isAudienceMode(fromQuery)) {
      setMode(fromQuery);
      try {
        window.localStorage.setItem(MODE_STORAGE_KEY, fromQuery);
      } catch (_error) {
        // Ignore localStorage access errors.
      }
      return;
    }

    try {
      const fromStorage = (window.localStorage.getItem(MODE_STORAGE_KEY) || '').toLowerCase().trim();
      if (isAudienceMode(fromStorage)) {
        setMode(fromStorage);
      }
    } catch (_error) {
      // Ignore localStorage access errors.
    }
  }, []);

  const updateMode = React.useCallback((nextMode: AudienceMode) => {
    setMode(nextMode);
    document.documentElement.setAttribute('data-audience-mode', nextMode);
    try {
      window.localStorage.setItem(MODE_STORAGE_KEY, nextMode);
    } catch (_error) {
      // Ignore localStorage access errors.
    }
    trackEvent(TRACK_EVENTS.audienceModeSwitch, {
      destination: '#audience',
      selected_mode: nextMode
    });
  }, []);

  const copy = MODE_COPY[mode];
  const needs = NEEDS[mode];
  const { current, next, setPaused, prefersReducedMotion } = useRotatingNeeds(needs, 3, 4800);

  const [scanKey, setScanKey] = React.useState(0);
  const currentKey = React.useMemo(() => current.map((item) => item.title).join('|'), [current]);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-audience-mode', mode);
  }, [mode]);

  React.useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    setScanKey((value) => value + 1);
  }, [mode, currentKey, prefersReducedMotion]);

  return (
    <section className="section-anchor audience-switch mt-5" id="audience" aria-labelledby="audience-title">
      <div className="circuit-board audience-switch-board rounded-2xl p-5 md:p-6">
        <div className="audience-switch-header">
          <div className="audience-scope" role="tablist" aria-label="Mode de lecture">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'discover'}
              className={`audience-scope-btn ${mode === 'discover' ? 'is-active' : ''}`}
              onClick={() => updateMode('discover')}
            >
              <span className={`audience-led ${mode === 'discover' ? 'is-on' : ''}`} aria-hidden="true" />
              <span className="audience-scope-label">JE DECOUVRE</span>
            </button>
            <span className="audience-scope-divider" aria-hidden="true" />
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'pro'}
              className={`audience-scope-btn ${mode === 'pro' ? 'is-active' : ''}`}
              onClick={() => updateMode('pro')}
            >
              <span className={`audience-led ${mode === 'pro' ? 'is-on' : ''}`} aria-hidden="true" />
              <span className="audience-scope-label">JE SUIS PRO</span>
            </button>
          </div>
          <p className="audience-mode-kicker">{copy.kicker} · lecture progressive</p>
        </div>

        <h2 id="audience-title" className="m-0 text-3xl md:text-4xl">
          {copy.title}
        </h2>

        <div className="audience-copy mt-3">
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-0 mt-3 max-w-3xl studio-muted">
              {paragraph}
            </p>
          ))}
        </div>

        <div
          className="audience-needs mt-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {!prefersReducedMotion ? <div key={scanKey} className="audience-scanline" aria-hidden="true" /> : null}
          <div className="audience-needs-head">
            <p className="audience-needs-title m-0">Exemples de besoins concrets</p>
            <div className="audience-needs-actions">
              <button type="button" className="audience-next" onClick={next}>
                Suivant
              </button>
              <span className="audience-needs-hint">
                {prefersReducedMotion ? 'Rotation auto desactivee' : 'Rotation reguliere · pause au survol'}
              </span>
            </div>
          </div>

          <div className="audience-needs-grid" aria-live="polite">
            {current.map((item, idx) => (
              <article key={`${item.title}-${idx}`} className="audience-need-card">
                <p className="audience-need-title m-0">{item.title}</p>
                <p className="audience-need-body m-0 mt-2">{item.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="audience-cta-row mt-4">
          <a href={copy.ctaHref} className="figma-lab-pill">
            {copy.ctaLabel}
          </a>
          <a href="#lab-notes" className="figma-lab-pill">
            Voir des preuves
          </a>
        </div>
      </div>
    </section>
  );
}
