import { TRACK_EVENTS, trackAttrs } from '@/lib/tracking';
import { HERO_TITLE_WORDS } from '@/content/home-content';
import { withSiteBase } from '@/lib/site';

const HERO_SLOGAN_LINES = ['du concept au produit testé'] as const;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="section-anchor relative overflow-hidden pt-4 md:pt-6" id="top">
      <div className="hero-bg-photo" aria-hidden="true">
        <img
          src={withSiteBase('/assets/photos/workspace-dev-tektronix.webp')}
          alt=""
          width={1200}
          height={900}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
      </div>
      <div className="figma-lab-hero-grid">
        <article className="figma-lab-left hero-panel-image">
          <div className="hero-panel-head">
            <p className="hero-eyebrow hero-eyebrow--image">Design électronique · Consulting · Formation</p>
          </div>

          <h1 id="hero-title" className="figma-lab-title">
            {HERO_TITLE_WORDS.map((word, index) => (
              <span key={word} className="hero-title-word" style={{ ['--word-index' as string]: String(index) }}>
                {word}
              </span>
            ))}
          </h1>

          <div className="hero-lockup" aria-hidden="true">
            <img src={withSiteBase('/assets/brand/logo-lockup.png')} alt="" className="hero-lockup-image" width={1400} height={700} loading="eager" decoding="sync" fetchPriority="high" />
          </div>

          <p className="hero-slogan" aria-label="du concept au produit testé">
            {HERO_SLOGAN_LINES.map((line, lineIndex) => (
              <span key={line} className="hero-slogan-line">
                {Array.from(line).map((character, charIndex) => (
                  <span
                    key={`${line}-${charIndex}`}
                    className={`hero-slogan-char ${character === ' ' ? 'is-space' : ''}`}
                    style={{ ['--char-index' as string]: String(charIndex + lineIndex * 7) }}
                    aria-hidden="true"
                  >
                    {character === ' ' ? '\u00A0' : character}
                  </span>
                ))}
              </span>
            ))}
          </p>

          <p className="figma-lab-copy hero-copy-reveal hero-copy-reveal--lead">
            Votre projet a besoin d&apos;électronique embarquée — mais le sujet est flou, coûteux ou risqué ?<br />
            Je transforme votre besoin en livrable testé : prototype, carte, firmware ou montée en compétences.
          </p>

          <div className="figma-lab-cta-row">
            <a
              href="#contact"
              {...trackAttrs(TRACK_EVENTS.ctaHeroContact, '#contact')}
              className="figma-lab-pill figma-lab-pill--primary"
            >
              Discuter de votre projet
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
