export function IdentityLab() {
  return (
    <section
      id="identite"
      aria-labelledby="identity-title"
      className="section-anchor mt-5"
    >
      <div className="circuit-board rounded-2xl p-5 md:p-6">
        <div className="circuit-title-row">
          <span className="circuit-node circuit-node--magenta" aria-hidden="true" />
          <h2 id="identity-title" className="m-0 text-3xl md:text-4xl">
            Systemes et identite de marque
          </h2>
          <span className="circuit-pinline" aria-hidden="true" />
        </div>

        <p className="mb-0 mt-3 max-w-3xl studio-muted">
          Cette section expose la grammaire visuelle du studio: signal technique, lisibilite commerciale et signature
          premium orientee mission.
        </p>

        <div className="identity-lab-grid mt-4">
          <article className="logo-lab-card">
            <p className="logo-lab-kicker">Marque 01</p>
            <h3 className="logo-lab-title">ER monogramme PCB</h3>
            <svg viewBox="0 0 360 140" className="logo-lab-svg" role="img" aria-label="Electron rare monogramme PCB">
              <rect x="8" y="8" width="344" height="124" rx="14" className="logo-lab-bg" />
              <path d="M58 40 H128 V60 H78 V74 H124" className="logo-lab-trace" />
              <path d="M150 40 H214 Q248 40 248 66 Q248 92 214 92 H150 V40" className="logo-lab-trace" />
              <circle cx="58" cy="40" r="4" className="logo-lab-node" />
              <circle cx="124" cy="74" r="4" className="logo-lab-node logo-lab-node--alt" />
              <circle cx="248" cy="66" r="4" className="logo-lab-node" />
              <text x="54" y="112" className="logo-lab-wordmark">
                ELECTRON RARE
              </text>
            </svg>
            <p className="logo-lab-meta">Positionnement: precision technique</p>
          </article>

          <article className="logo-lab-card">
            <p className="logo-lab-kicker">Marque 02</p>
            <h3 className="logo-lab-title">Boucle de controle</h3>
            <svg viewBox="0 0 360 140" className="logo-lab-svg" role="img" aria-label="Electron rare boucle de controle">
              <rect x="8" y="8" width="344" height="124" rx="14" className="logo-lab-bg" />
              <rect x="48" y="48" width="50" height="44" rx="8" className="logo-lab-block" />
              <rect x="155" y="48" width="50" height="44" rx="8" className="logo-lab-block" />
              <rect x="262" y="48" width="50" height="44" rx="8" className="logo-lab-block" />
              <path d="M98 70 H155 M205 70 H262 M287 92 V104 H73 V92" className="logo-lab-link" />
              <polygon points="145,66 155,70 145,74" className="logo-lab-arrow" />
              <polygon points="252,66 262,70 252,74" className="logo-lab-arrow" />
              <text x="28" y="28" className="logo-lab-wordmark">
                ELECTRON RARE
              </text>
            </svg>
            <p className="logo-lab-meta">Positionnement: pilotage par feedback</p>
          </article>

          <article className="logo-lab-card">
            <p className="logo-lab-kicker">Marque 03</p>
            <h3 className="logo-lab-title">Stamp technique</h3>
            <svg viewBox="0 0 360 140" className="logo-lab-svg" role="img" aria-label="Electron rare stamp technique">
              <rect x="8" y="8" width="344" height="124" rx="14" className="logo-lab-bg" />
              <rect x="34" y="34" width="292" height="72" rx="8" className="logo-lab-stamp" />
              <text x="50" y="65" className="logo-lab-wordmark">
                ELECTRON RARE
              </text>
              <text x="50" y="89" className="logo-lab-subline">
                UNSTABLE BY DESIGN
              </text>
              <circle cx="294" cy="70" r="7" className="logo-lab-node logo-lab-node--amber" />
            </svg>
            <p className="logo-lab-meta">Positionnement: label industriel sur mesure</p>
          </article>
        </div>
      </div>
    </section>
  );
}
