import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
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

      <div className="grid items-end gap-5 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="m-0 text-xs font-bold uppercase tracking-[0.16em] text-fuchsia-300">
            Pro • Codeur creatif • Iterateur IA • Savant fou
          </p>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-4 mt-3 max-w-[17ch] text-4xl leading-[1.04] md:text-6xl"
          >
            Clement Saillant, alias L&apos;electron rare.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
            className="max-w-2xl text-base text-violet-100/82 md:text-lg"
          >
            Creation electronique, design de produit et invention de systemes audiovisuels.
            J&apos;assemble code, IA, materiaux sonores et narration visuelle pour concevoir des experiences
            qui passent du prototype au live.
          </motion.p>

          <ul aria-label="Axes artistiques" className="mb-6 mt-5 flex flex-wrap gap-2 p-0">
            <li className="list-none rounded-full border border-fuchsia-300/30 bg-fuchsia-100/10 px-3 py-1 text-sm text-fuchsia-100">
              Creation electronique
            </li>
            <li className="list-none rounded-full border border-cyan-300/35 bg-cyan-100/10 px-3 py-1 text-sm text-cyan-100">
              Invention de systemes
            </li>
            <li className="list-none rounded-full border border-violet-200/30 bg-violet-100/10 px-3 py-1 text-sm text-violet-100">
              Design produit
            </li>
            <li className="list-none rounded-full border border-lime-200/30 bg-lime-100/10 px-3 py-1 text-sm text-lime-100">
              Lab IA
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

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-violet-100/76">
            <span className="lab-kicker">Contact rapide</span>
            <a
              href="https://fr.linkedin.com/in/electron-rare"
              target="_blank"
              rel="noopener noreferrer"
              {...trackAttrs(TRACK_EVENTS.outboundLinkedinContact, 'linkedin.com')}
              className="font-semibold text-cyan-300 underline-offset-4 hover:text-cyan-200 hover:underline"
            >
              LinkedIn DM
            </a>
            <span aria-hidden="true">•</span>
            <a
              href="https://www.malt.com/profile/clementsaillant"
              target="_blank"
              rel="noopener noreferrer"
              {...trackAttrs(TRACK_EVENTS.outboundMaltContact, 'malt.com')}
              className="font-semibold text-fuchsia-300 underline-offset-4 hover:text-fuchsia-200 hover:underline"
            >
              Malt
            </a>
          </div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 24, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.62, delay: 0.12, ease: 'easeOut' }}
          aria-label="Carte studio"
          className="lab-panel relative overflow-hidden rounded-2xl p-5"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-fuchsia-400/25 blur-2xl" />
          <p className="m-0 text-[11px] uppercase tracking-[0.16em] text-cyan-200">Carte rapide</p>
          <h2 className="mb-2 mt-2 text-3xl">L&apos;electron rare</h2>
          <p className="mt-0 text-violet-100/82">
            Studio personnel: conception, experimentation, iteration IA et execution de projets electroniques.
          </p>
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
          <a
            href={profileCta.href}
            {...trackAttrs(profileCta.event, profileCta.destination)}
            className="mt-4 inline-block font-semibold text-cyan-300 underline-offset-4 hover:text-cyan-200 hover:underline"
          >
            {profileCta.label}
          </a>
        </motion.aside>
      </div>
    </section>
  );
}
