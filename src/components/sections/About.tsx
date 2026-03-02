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
            Profil systeme
          </h2>
          <span className="circuit-pinline" aria-hidden="true" />
        </div>
        <p className="section-lead mb-0 mt-3">
          Positionnement: studio pro, codeur creatif, iterateur IA et concepteur de systemes electroniques.
        </p>
        <p className="mb-0 mt-3 max-w-3xl studio-muted">
          Je suis <strong>Clement Saillant</strong>, createur sous le nom <strong>L&apos;electron rare</strong>.
          Mon terrain: creation electronique, invention de systemes, design de produit et conception
          d&apos;objets/experiences hybrides entre code, son et image.
        </p>
        <p className="mb-0 mt-3 max-w-3xl studio-muted">
          Posture de travail: rigueur pro, execution creative, iteration IA continue et esprit
          laboratoire pour transformer une intuition en systeme utilisable, automatise et maintenable.
        </p>

        <div className="mt-4 rounded-xl border border-[color:var(--line)] p-3">
          <ul className="m-0 grid gap-2 p-0 md:grid-cols-2">
            <li className="list-none studio-chip studio-chip--cyan">Architecture modulaire</li>
            <li className="list-none studio-chip studio-chip--vio">Rituel de prototypage</li>
            <li className="list-none studio-chip studio-chip--pink">Livraison orientée expérimentation</li>
            <li className="list-none studio-chip studio-chip--emerald">Contrôle qualité des parcours</li>
          </ul>
        </div>

        <CtaDualRail className="mt-4" label="Activer une collaboration studio" />
      </div>
    </motion.section>
  );
}
