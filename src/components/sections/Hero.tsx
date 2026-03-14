import { TRACK_EVENTS, trackAttrs } from '@/lib/tracking';
import { HERO_TITLE_WORDS } from '@/content/home-content';
import { withSiteBase } from '@/lib/site';

const HERO_SLOGAN_LINES = ['électronique · automatisme · énergie'] as const;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="section-anchor relative overflow-hidden pt-4 md:pt-6" id="top">
      <div className="hero-bg-photo" aria-hidden="true">
        <img
          src={withSiteBase('/assets/photos/atelier-oscilloscope-bench.webp')}
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
            <p className="hero-eyebrow hero-eyebrow--image">Électronique · automatisme · énergie · optimisation</p>
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

          <p className="hero-slogan" aria-label="électronique, automatisme, énergie">
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
            Votre projet demande plus qu&apos;une carte standard ou un simple conseil ponctuel ?<br />
            L&apos;Électron Rare conçoit, met au point et fiabilise des systèmes électroniques spécifiques, des automatismes et des ensembles liés à l&apos;énergie, au stockage et à l&apos;optimisation terrain, en mobilisant les bons partenaires quand le projet devient multi-technique.
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
