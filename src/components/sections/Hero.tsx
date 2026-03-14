import * as React from 'react';
import type { CtaLink } from '@/lib/types';
import { withSiteBase } from '@/lib/site';
import { TRACK_EVENTS, trackAttrs } from '@/lib/tracking';

const heroCtas: CtaLink[] = [
  {
    label: 'Profil expert',
    href: '#a-propos',
    event: TRACK_EVENTS.ctaHeroProfile,
    destination: '#a-propos'
  },
  {
    label: 'Demarrer mission',
    href: '#contact',
    event: TRACK_EVENTS.ctaHeroContact,
    destination: '#contact'
  },
  {
    label: "Voir les cas d'usage",
    href: '#projets',
    event: TRACK_EVENTS.ctaHeroProjects,
    destination: '#projets'
  }
];

const HERO_TITLE_WORDS = ['Conception', 'electronique', 'sur mesure'];
const assetPath = (value: string) => withSiteBase(value);

const HERO_VARIANT_ASSETS: Record<
  string,
  {
    routingDesktopWebp: string;
    routingMobileWebp: string;
    routingDesktop: string;
    routingMobile: string;
    instrumentDesktopWebp: string;
    instrumentMobileWebp: string;
    instrumentDesktop: string;
    instrumentMobile: string;
    notebookDesktopWebp: string;
    notebookMobileWebp: string;
    notebookDesktop: string;
    notebookMobile: string;
    routingCaption: string;
    instrumentCaption: string;
  }
> = {
  v12: {
    routingDesktopWebp: assetPath('/assets/da/openai/hero-pcb-routing-map-v2.webp'),
    routingMobileWebp: assetPath('/assets/da/openai/hero-pcb-routing-map-mobile-low-noise-v2.webp'),
    routingDesktop: assetPath('/assets/da/openai/hero-pcb-routing-map-v2.png'),
    routingMobile: assetPath('/assets/da/openai/hero-pcb-routing-map-mobile-low-noise-v2.png'),
    instrumentDesktopWebp: assetPath('/assets/da/openai/hero-instrument-panel-v2.webp'),
    instrumentMobileWebp: assetPath('/assets/da/openai/hero-instrument-panel-mobile-low-noise-v2.webp'),
    instrumentDesktop: assetPath('/assets/da/openai/hero-instrument-panel-v2.png'),
    instrumentMobile: assetPath('/assets/da/openai/hero-instrument-panel-mobile-low-noise-v2.png'),
    notebookDesktopWebp: assetPath('/assets/da/openai/hero-carnet-labo-open-v2.webp'),
    notebookMobileWebp: assetPath('/assets/da/openai/carnet-labo-ouvert.webp'),
    notebookDesktop: assetPath('/assets/da/openai/hero-carnet-labo-open-v2.png'),
    notebookMobile: assetPath('/assets/da/openai/carnet-labo-ouvert.png'),
    routingCaption: 'Architecture pcb',
    instrumentCaption: 'Appareil de mesure (asset)'
  }
};

function resolveDaVariant() {
  if (typeof window === 'undefined') {
    return 'v12';
  }

  const rootVariant = document.documentElement.getAttribute('data-da-variant') || '';
  if (HERO_VARIANT_ASSETS[rootVariant]) {
    return rootVariant;
  }

  return 'v12';
}

export function Hero() {
  const [assets, setAssets] = React.useState(HERO_VARIANT_ASSETS.v12);

  React.useEffect(() => {
    const variant = resolveDaVariant();
    setAssets(HERO_VARIANT_ASSETS[variant] || HERO_VARIANT_ASSETS.v12);
  }, []);

  return (
    <section aria-labelledby="hero-title" className="section-anchor relative overflow-hidden pt-4 md:pt-6" id="top">
      <div className="figma-lab-hero-grid">
        <article className="figma-lab-left">
          <h1 id="hero-title" className="figma-lab-title">
            {HERO_TITLE_WORDS.map((word, index) => (
              <span key={word} className="hero-title-word" style={{ ['--word-index' as string]: String(index) }}>
                {word}
              </span>
            ))}
          </h1>

          <p className="figma-lab-copy hero-copy-reveal">
            Studio premium: cadrage, prototype, validation terrain et delivery en sprints de 2 semaines.
          </p>
          <p className="figma-lab-copy figma-lab-copy--mono hero-console-line">
            CH1 business / CH2 architecture / DMM risque / REV sprint 02
          </p>

          <div className="figma-lab-cta-row">
            <a href={heroCtas[0].href} {...trackAttrs(heroCtas[0].event, heroCtas[0].destination)} className="figma-lab-pill">
              {heroCtas[0].label}
            </a>
            <a href={heroCtas[1].href} {...trackAttrs(heroCtas[1].event, heroCtas[1].destination)} className="figma-lab-pill">
              {heroCtas[1].label}
            </a>
            <a href={heroCtas[2].href} {...trackAttrs(heroCtas[2].event, heroCtas[2].destination)} className="figma-lab-pill">
              {heroCtas[2].label}
            </a>
          </div>
          <p className="figma-lab-cta-help">Parcours recommande: profil, cas d&apos;usage, puis mission.</p>

          <section aria-label="Notes de bench" className="figma-lab-notes">
            <p className="figma-lab-notes-title">Notes de bench & valeur business</p>
            <ul className="figma-lab-notes-list">
              <li>Fait: contraintes I/O et EMI mesurees. Decision: architecture cible verrouillee.</li>
              <li>Fait: prototype sprint 01 stable. Decision: backlog priorise par valeur client.</li>
              <li>Fait: validation terrain sprint 02. Impact: reduction du risque planning delivery.</li>
            </ul>
          </section>

          <figure className="figma-lab-notebook">
            <picture>
              <source media="(max-width: 767px)" type="image/webp" srcSet={assets.notebookMobileWebp} />
              <source media="(max-width: 767px)" srcSet={assets.notebookMobile} />
              <source type="image/webp" srcSet={assets.notebookDesktopWebp} />
              <img
                src={assets.notebookDesktop}
                alt="Carnet de laboratoire electronique avec schema et mesures"
                loading="lazy"
                decoding="async"
                width={1200}
                height={800}
              />
            </picture>
          </figure>
        </article>

        <aside className="figma-lab-right" aria-label="Assets labo electronique">
          <figure className="figma-lab-asset-card">
            <picture>
              <source media="(max-width: 767px)" type="image/webp" srcSet={assets.routingMobileWebp} />
              <source media="(max-width: 767px)" srcSet={assets.routingMobile} />
              <source type="image/webp" srcSet={assets.routingDesktopWebp} />
              <img
                src={assets.routingDesktop}
                alt="Routing PCB avec traces et vias"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                width={1200}
                height={700}
              />
            </picture>
            <figcaption>{assets.routingCaption}</figcaption>
          </figure>
          <figure className="figma-lab-asset-card">
            <picture>
              <source media="(max-width: 767px)" type="image/webp" srcSet={assets.instrumentMobileWebp} />
              <source media="(max-width: 767px)" srcSet={assets.instrumentMobile} />
              <source type="image/webp" srcSet={assets.instrumentDesktopWebp} />
              <img
                src={assets.instrumentDesktop}
                alt="Affichage oscilloscope de mesure"
                loading="lazy"
                decoding="async"
                width={1200}
                height={700}
              />
            </picture>
            <figcaption>{assets.instrumentCaption}</figcaption>
          </figure>
        </aside>
      </div>
    </section>
  );
}
