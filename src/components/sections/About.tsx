import { ABOUT_FAMILIES } from '@/content/home-content';
import { withSiteBase } from '@/lib/site';

export function About() {
  return (
    <section
      id="a-propos"
      aria-labelledby="about-title"
      className="section-anchor mt-5"
    >
      <div className="circuit-board about-panel rounded-2xl p-5 md:p-6">
        <div className="circuit-title-row">
          <span className="circuit-node" aria-hidden="true" />
          <h2 id="about-title" className="m-0 text-3xl md:text-4xl">
            Approche et expertise
          </h2>
          <span className="circuit-pinline" aria-hidden="true" />
        </div>
        <div className="about-intro">
          <img
            src={withSiteBase('/assets/photos/portrait-bench.webp')}
            alt="Clément Saillant, designer électronique embarquée freelance, consultant et formateur"
            className="about-portrait"
            loading="lazy"
            decoding="async"
            width="192"
            height="192"
          />
          <div className="about-intro-text">
            <p className="section-lead mb-0 mt-3">
              Électronique embarquée, automatisme industriel, prototypage hardware, instrumentation — et aussi consulting, formation et workflows agentiques. J&apos;interviens là où le projet croise plusieurs disciplines.
            </p>
            <p className="mb-0 mt-3 studio-muted">
              Je suis <strong>Clément Saillant</strong>, fondateur de <strong>L&apos;électron rare</strong>. Depuis plus de 5 ans, je conçois des solutions électroniques sur mesure pour le spectacle vivant, les installations artistiques et l&apos;industrie. J&apos;accompagne aussi des équipes en consulting et en formation — du cahier des charges à la mise en production.
            </p>
            <p className="mb-0 mt-3 studio-muted">
              Secteurs : spectacle vivant, industries créatives, transport (CBTC), énergie, IoT, audio professionnel, robotique. Outils : KiCad, oscilloscopes, automates Siemens/Schneider, uC (STM32, ESP, Teensy), Python, C/C++.
            </p>
            <p className="mb-0 mt-3 studio-muted">
              Retours de terrain et notes techniques sur le <a href="https://blog.saillant.cc" target="_blank" rel="noopener noreferrer" className="studio-link">blog technique</a>. Formations disponibles sur la <a href={withSiteBase('/formation/')} className="studio-link">page formation</a>.
            </p>
            <p className="mb-0 mt-3 studio-muted" style={{ fontSize: '0.85em', opacity: 0.85 }}>
              Assuré RC Pro · NDA sur demande
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-[color:var(--line)] p-3">
          <ul className="m-0 grid grid-cols-1 gap-2 p-0">
            {ABOUT_FAMILIES.map((item, index) => (
              <li
                key={item}
                className={`list-none studio-chip ${
                  index === 0
                    ? 'studio-chip--cyan'
                    : index === 1
                      ? 'studio-chip--vio'
                      : index === 2
                        ? 'studio-chip--pink'
                        : index === 3
                          ? 'studio-chip--emerald'
                          : 'studio-chip--amber'
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
