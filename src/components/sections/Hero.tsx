import { Button } from '@/components/ui/button';
import { CtaDualRail } from '@/components/ui/cta-dual-rail';
import type { CtaLink } from '@/lib/types';
import { TRACK_EVENTS, trackAttrs } from '@/lib/tracking';

const heroCtas: CtaLink[] = [
  {
    label: "Voir les cas d'usage",
    href: '#projets',
    event: TRACK_EVENTS.ctaHeroProjects,
    destination: '#projets'
  },
  {
    label: 'Lancer une mission',
    href: '#contact',
    event: TRACK_EVENTS.ctaHeroContact,
    destination: '#contact'
  }
];

const profileCta: CtaLink = {
  label: 'Explorer le profil',
  href: '#a-propos',
  event: TRACK_EVENTS.ctaHeroProfile,
  destination: '#a-propos'
};

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="section-anchor relative overflow-hidden pt-12 md:pt-20" id="top">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(circle_at_20%_10%,rgba(255,58,137,0.26),transparent_52%),radial-gradient(circle_at_88%_0%,rgba(49,211,255,0.28),transparent_55%)]" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[rgba(8,247,255,0.25)] blur-2xl" />

      <div className="grid items-end gap-5 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="m-0 text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
            Pro • Codeur creatif • Iterateur IA • Savant fou
          </p>

          <h1
            id="hero-title"
            className="site-shell-title mb-4 mt-3 text-4xl leading-[1.04] md:text-6xl"
          >
            Clement Saillant, alias L&apos;electron rare.
          </h1>

          <p className="max-w-2xl text-base studio-muted md:text-lg">
            Laboratoire electronique et automatisme creatif: design produit, invention de systemes audiovisuels,
            architecture de flux et calibration operationnelle.
            J&apos;assemble code, IA et protocoles de controle pour faire passer une idee du schema au live.
          </p>

          <div className="hero-manifest mt-4">
            <p className="hero-manifest-row">
              <span className="hero-manifest-node" aria-hidden="true" />
              Creation electronique orientee usage et robustesse terrain.
            </p>
            <p className="hero-manifest-row">
              <span className="hero-manifest-node hero-manifest-node--magenta" aria-hidden="true" />
              Invention de systemes: du schema de controle a l interface operable.
            </p>
            <p className="hero-manifest-row">
              <span className="hero-manifest-node hero-manifest-node--green" aria-hidden="true" />
              Design produit: iterateur IA + execution codeur creatif.
            </p>
          </div>

          <ul aria-label="Axes artistiques" className="mb-6 mt-5 flex flex-wrap gap-2 p-0">
            <li className="list-none studio-chip studio-chip--cyan">
              Lab electronique
            </li>
            <li className="list-none studio-chip studio-chip--vio">
              Bus de controle
            </li>
            <li className="list-none studio-chip studio-chip--pink">
              Automatisme creatif
            </li>
            <li className="list-none studio-chip studio-chip--emerald">
              Boucle IA
            </li>
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={heroCtas[0].href} {...trackAttrs(heroCtas[0].event, heroCtas[0].destination)}>
                {heroCtas[0].label}
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href={heroCtas[1].href} {...trackAttrs(heroCtas[1].event, heroCtas[1].destination)}>
                {heroCtas[1].label}
              </a>
            </Button>
          </div>

          <CtaDualRail className="mt-4" label="Canaux mission (priorite conversion)" />
        </div>

        <aside aria-label="Carte studio" className="circuit-board relative overflow-hidden rounded-2xl p-5">
          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[rgba(8,247,255,0.25)] blur-2xl" />
          <div className="circuit-title-row">
            <span className="circuit-node" aria-hidden="true" />
            <p className="m-0 text-[11px] uppercase tracking-[0.16em] text-[var(--electric)]">Carte rapide</p>
            <span className="circuit-pinline" aria-hidden="true" />
          </div>

          <h2 className="mb-2 mt-1 text-3xl">L&apos;electron rare</h2>
          <p className="mt-0 studio-muted">
            Studio personnel: conception, experimentation, iteration IA et execution de projets electroniques.
          </p>

          <div className="circuit-board-rail mt-4">
            <p className="m-0 text-sm font-semibold">Nœud actif</p>
            <p className="mb-0 text-sm studio-muted">
              Le schema relie entree signal, logique de controle et execution visuelle vers des livrables operables.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="lab-metric">
              <span>Mode</span>
              <strong>R&D active</strong>
            </div>
            <div className="lab-metric">
              <span>Focus</span>
              <strong>Design produit</strong>
            </div>
            <div className="lab-metric">
              <span>Stack</span>
              <strong>Astro + IA</strong>
            </div>
            <div className="lab-metric">
              <span>Reponse</span>
              <strong>24-48h</strong>
            </div>
          </div>

          <div className="mt-4">
            <a
              href={profileCta.href}
              {...trackAttrs(profileCta.event, profileCta.destination)}
              className="inline-flex items-center gap-2 studio-link font-semibold"
            >
              <span className="circuit-node circuit-node--magenta" aria-hidden="true" />
              {profileCta.label}
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
