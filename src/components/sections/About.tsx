import { motion } from 'motion/react';
import { CtaDualRail } from '@/components/ui/cta-dual-rail';

export function About() {
  return (
    <motion.section
      id="a-propos"
      aria-labelledby="about-title"
      className="section-anchor mt-5"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="circuit-board rounded-2xl p-5 md:p-6">
        <div className="circuit-title-row">
          <span className="circuit-node" aria-hidden="true" />
          <h2 id="about-title" className="m-0 text-3xl md:text-4xl">
            A propos / cadre d'intervention
          </h2>
          <span className="circuit-pinline" aria-hidden="true" />
        </div>
        <p className="section-lead mb-0 mt-3">
          Vous sollicitez un expert quand un produit electronique demande une execution sur mesure, rapide et fiable.
        </p>
        <p className="mb-0 mt-3 max-w-3xl studio-muted">
          Je suis <strong>Clement Saillant</strong>, fondateur de <strong>L&apos;electron rare</strong>. J'accompagne
          des equipes produit sur des enjeux a forte contrainte: architecture systeme, prototype fonctionnel et
          passage en production.
        </p>
        <p className="mb-0 mt-3 max-w-3xl studio-muted">
          La methode combine pilotage agile en sprints de 2 semaines, arbitrages techniques documentes et
          synchronisation business pour tenir vos delais sans sacrifier la robustesse.
        </p>

        <div className="mt-4 rounded-xl border border-[color:var(--line)] p-3">
          <ul className="m-0 grid gap-2 p-0 md:grid-cols-2">
            <li className="list-none studio-chip studio-chip--cyan">Quand: cadrage techno sous contrainte delai.</li>
            <li className="list-none studio-chip studio-chip--vio">Livrable: audit - prototype - delivery.</li>
            <li className="list-none studio-chip studio-chip--pink">Decision: backlog priorise par impact et risque.</li>
            <li className="list-none studio-chip studio-chip--emerald">Resultat: trajectoire lisible pour CTO et metier.</li>
          </ul>
        </div>

        <CtaDualRail className="mt-4" label="Cadrer votre mission sur mesure" />
      </div>
    </motion.section>
  );
}
