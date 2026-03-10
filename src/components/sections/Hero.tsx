import * as React from 'react';
import { useId } from 'react';
import type { CtaLink } from '@/lib/types';
import { TRACK_EVENTS, trackAttrs } from '@/lib/tracking';
import { useCopyContent } from '@/lib/copy';
import styles from './Hero.module.css';

const heroCtas: CtaLink[] = [
  {
    label: 'Envoyer un brief',
    href: '#contact',
    event: TRACK_EVENTS.ctaHeroContact,
    destination: '#contact'
  },
  {
    label: 'Voir les preuves',
    href: '#lab-notes',
    event: TRACK_EVENTS.ctaHeroProjects,
    destination: '#lab-notes'
  }
];

type EdgeKey = 'power-mcu' | 'power-rf' | 'mcu-rf' | 'mcu-audio' | 'audio-test' | 'rf-test';

const EDGES: { key: EdgeKey; d: string }[] = [
  { key: 'power-mcu', d: 'M520 104 C455 136, 390 164, 280 188' },
  { key: 'power-rf', d: 'M520 104 C620 136, 705 154, 780 170' },
  { key: 'mcu-rf', d: 'M410 234 C500 214, 565 212, 630 224' },
  { key: 'mcu-audio', d: 'M280 278 C235 322, 228 348, 252 370' },
  { key: 'rf-test', d: 'M780 282 C786 324, 786 348, 760 370' },
  { key: 'audio-test', d: 'M400 414 C500 430, 560 430, 610 414' }
];

type SchematicBlock = {
  id: 'power' | 'mcu' | 'rf' | 'audio' | 'test';
  label: string;
  risk: string;
  deliverable: string;
  target: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const SCHEMATIC_BLOCKS: SchematicBlock[] = [
  {
    id: 'power',
    label: 'Votre idee de genie',
    risk: "L'alimentation peut faire tomber tout le systeme.",
    deliverable: 'Plan alim stable + points de mesure clairs.',
    target: 'offre-systeme',
    x: 390,
    y: 20,
    w: 260,
    h: 84
  },
  {
    id: 'mcu',
    label: 'Plan realiste',
    risk: 'Le coeur logique peut ralentir ou planter.',
    deliverable: 'Plan de pilotage clair + priorites firmware.',
    target: 'process-etats',
    x: 150,
    y: 190,
    w: 260,
    h: 88
  },
  {
    id: 'rf',
    label: 'Votre produit magique',
    risk: 'La connexion sans fil peut devenir instable.',
    deliverable: 'Regles radio + validation de portee.',
    target: 'lab-notes',
    x: 630,
    y: 170,
    w: 300,
    h: 112
  },
  {
    id: 'audio',
    label: 'Premiere version',
    risk: 'Le son peut introduire du bruit ou de la saturation.',
    deliverable: 'Chaine audio propre + tests simples.',
    target: 'lab-notes',
    x: 100,
    y: 370,
    w: 300,
    h: 88
  },
  {
    id: 'test',
    label: 'Amelioration agile',
    risk: 'Sans validation, le risque projet reste flou.',
    deliverable: 'Rapport go/no-go simple et actionnable.',
    target: 'contact',
    x: 610,
    y: 370,
    w: 300,
    h: 88
  }
];

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

function Signal({ pathId, speed = 220, count = 2 }: { pathId: string; speed?: number; count?: number }) {
  const reduceMotion = usePrefersReducedMotion();
  const circleRefs = React.useRef<Array<SVGCircleElement | null>>([]);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const path = document.getElementById(pathId) as SVGPathElement | null;
    if (!path) {
      return;
    }

    const totalLength = path.getTotalLength();
    let last = performance.now();
    const offsets = Array.from({ length: count }, (_, i) => (totalLength * i) / count);

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      for (let i = 0; i < count; i += 1) {
        offsets[i] = (offsets[i] + speed * dt) % totalLength;
        const point = path.getPointAtLength(offsets[i]);
        const circle = circleRefs.current[i];
        if (circle) {
          circle.setAttribute('cx', point.x.toFixed(2));
          circle.setAttribute('cy', point.y.toFixed(2));
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [pathId, speed, count, reduceMotion]);

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <circle
          key={`${pathId}-${i}`}
          ref={(el) => {
            circleRefs.current[i] = el;
          }}
          r="3.7"
          className={styles.signalDot}
          pointerEvents="none"
        />
      ))}
    </>
  );
}

export function Hero() {
  const uid = useId();
  const { copy } = useCopyContent();
  const [activeBlock, setActiveBlock] = React.useState<SchematicBlock['id']>('power');
  const [hoveredBlock, setHoveredBlock] = React.useState<SchematicBlock['id'] | null>(null);
  const heroTitleWords = React.useMemo(() => copy.hero.title.split(' ').filter(Boolean), [copy.hero.title]);

  const currentBlock = React.useMemo(() => {
    const id = hoveredBlock || activeBlock;
    return SCHEMATIC_BLOCKS.find((block) => block.id === id) || SCHEMATIC_BLOCKS[0];
  }, [activeBlock, hoveredBlock]);

  const hotEdges = React.useMemo(() => {
    const id = currentBlock.id;
    if (id === 'power') return new Set<EdgeKey>(['power-mcu', 'power-rf']);
    if (id === 'mcu') return new Set<EdgeKey>(['power-mcu', 'mcu-rf', 'mcu-audio']);
    if (id === 'rf') return new Set<EdgeKey>(['power-rf', 'mcu-rf', 'rf-test']);
    if (id === 'audio') return new Set<EdgeKey>(['mcu-audio', 'audio-test']);
    return new Set<EdgeKey>(['rf-test', 'audio-test']);
  }, [currentBlock.id]);

  const goToBlock = React.useCallback((block: SchematicBlock) => {
    setActiveBlock(block.id);
    const target = document.getElementById(block.target);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <section aria-labelledby="hero-title" className={`section-anchor relative overflow-hidden pt-4 md:pt-6 ${styles.root}`} id="top">
      <div className={styles.oscilloscope} aria-hidden="true">
        <svg viewBox="0 0 1440 520" preserveAspectRatio="none" className={styles.oscilloscopeSvg}>
          <defs>
            <linearGradient id="heroScopeBeam" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(121, 255, 171, 0)" />
              <stop offset="28%" stopColor="rgba(121, 255, 171, 0.18)" />
              <stop offset="52%" stopColor="rgba(121, 255, 171, 0.6)" />
              <stop offset="100%" stopColor="rgba(121, 255, 171, 0)" />
            </linearGradient>
            <filter id="heroScopeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.6" result="blurred" />
              <feMerge>
                <feMergeNode in="blurred" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g className={styles.oscTrack}>
            <rect x="-20" y="0" width="620" height="520" fill="url(#heroScopeBeam)" />
            <path
              className={styles.oscWave}
              filter="url(#heroScopeGlow)"
              d="M 20 260 L 52 260 L 88 220 L 112 305 L 142 186 L 170 322 L 206 230 L 236 278 L 266 150 L 298 336 L 332 246 L 360 270 L 390 198 L 426 326 L 460 236 L 490 262 L 524 205 L 560 296 L 596 252"
            />
            <path
              className={styles.oscCore}
              d="M 20 260 L 52 260 L 88 220 L 112 305 L 142 186 L 170 322 L 206 230 L 236 278 L 266 150 L 298 336 L 332 246 L 360 270 L 390 198 L 426 326 L 460 236 L 490 262 L 524 205 L 560 296 L 596 252"
            />
          </g>
        </svg>
      </div>

      <div className={styles.heroGrid}>
        <article className={styles.heroCard}>
          <p className={styles.kicker}>SYSTEM ARTIST · ELECTRONICS MISSION STUDIO</p>
          <h1 id="hero-title" className={styles.title}>
            {heroTitleWords.map((word, index) => (
              <span key={`${word}-${index}`}> {word}</span>
            ))}
          </h1>

          <p className={styles.copy}>{copy.hero.body}</p>

          <section className={styles.schema} aria-label="Schema systeme interactif">
            <div className={styles.schemaScroll}>
              <svg viewBox="0 0 1040 480" className={styles.schemaSvg} role="img" aria-label="Schema vivant electronique">
                {EDGES.map((edge) => (
                  <path
                    key={edge.key}
                    id={`${uid}-edge-${edge.key}`}
                    d={edge.d}
                    className={`${styles.path} ${hotEdges.has(edge.key) ? styles.pathActive : ''}`}
                  />
                ))}

                {EDGES.map((edge) =>
                  hotEdges.has(edge.key) ? (
                    <Signal key={`sig-${edge.key}`} pathId={`${uid}-edge-${edge.key}`} speed={220} count={2} />
                  ) : null
                )}

                {SCHEMATIC_BLOCKS.map((block) => {
                  const isActive = currentBlock.id === block.id;
                  const isMagic = block.id === 'rf';
                  return (
                    <g key={block.id}>
                      <rect
                        x={block.x}
                        y={block.y}
                        width={block.w}
                        height={block.h}
                        rx={14}
                        className={`${styles.nodeRect} ${isActive ? styles.nodeActive : ''} ${isMagic ? styles.nodeMagic : ''}`}
                      />
                      <text
                        x={block.x + block.w / 2}
                        y={block.y + block.h / 2 + 1}
                        className={`${styles.nodeLabel} ${isMagic ? styles.nodeLabelLarge : ''}`}
                      >
                        {block.label}
                      </text>
                      <foreignObject x={block.x} y={block.y} width={block.w} height={block.h}>
                        <button
                          type="button"
                          className={styles.nodeButton}
                          onMouseEnter={() => setHoveredBlock(block.id)}
                          onMouseLeave={() => setHoveredBlock(null)}
                          onFocus={() => setHoveredBlock(block.id)}
                          onBlur={() => setHoveredBlock(null)}
                          onClick={() => goToBlock(block)}
                          aria-label={`Bloc ${block.label}. Ce qui peut bloquer: ${block.risk}. Ce qu'on livre: ${block.deliverable}`}
                          aria-current={isActive ? 'true' : undefined}
                        >
                          <span className={styles.srOnly}>{block.label}</span>
                        </button>
                      </foreignObject>
                    </g>
                  );
                })}
              </svg>
            </div>
            <p className={styles.scrollHint}>Sur mobile: faites glisser le schema horizontalement.</p>

            <div className={styles.meta} aria-live="polite">
              <p className={styles.metaKicker}>Bloc actif: {currentBlock.label}</p>
              <p className={styles.metaLine}>
                <strong>Ce qui peut bloquer:</strong> {currentBlock.risk}
              </p>
              <p className={styles.metaLine}>
                <strong>Ce qu'on livre:</strong> {currentBlock.deliverable}
              </p>
            </div>
          </section>

          <div className={styles.valueRow} role="list" aria-label="Points cle">
            <span className={styles.valuePill} role="listitem">
              Objectif clair
            </span>
            <span className={styles.valuePill} role="listitem">
              Prototype fiable
            </span>
            <span className={styles.valuePill} role="listitem">
              Plan de suite
            </span>
          </div>

          <div className={styles.ctaRow}>
            {heroCtas.map((cta, index) => (
              <a
                key={cta.label}
                href={cta.href}
                {...trackAttrs(cta.event, cta.destination)}
                className={`${styles.cta} ${index === 0 ? styles.ctaPrimary : ''}`}
              >
                {cta.label}
              </a>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
