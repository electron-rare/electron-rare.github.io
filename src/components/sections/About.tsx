import { motion } from 'motion/react';
import { CtaDualRail } from '@/components/ui/cta-dual-rail';
import { useCopyContent } from '@/lib/copy';

export function About() {
  const { copy, variant } = useCopyContent();

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
            {copy.about.title}
          </h2>
          <span className="circuit-pinline" aria-hidden="true" />
        </div>
        <p className="section-lead mb-0 mt-3">{copy.about.paragraphs[0]}</p>
        {copy.about.paragraphs.slice(1).map((paragraph) => (
          <p key={paragraph} className="mb-0 mt-3 max-w-3xl studio-muted">
            {paragraph}
          </p>
        ))}

        <div className="mt-4 rounded-xl border border-[color:var(--line)] p-3">
          <ul className="m-0 grid gap-2 p-0 md:grid-cols-2">
            <li className="list-none studio-chip studio-chip--cyan">Quand: cadrage techno sous contrainte delai.</li>
            <li className="list-none studio-chip studio-chip--vio">Livrable: audit - prototype - delivery.</li>
            <li className="list-none studio-chip studio-chip--pink">Decision: backlog priorise par impact et risque.</li>
            <li className="list-none studio-chip studio-chip--emerald">Resultat: trajectoire lisible pour CTO et metier.</li>
          </ul>
        </div>

        <CtaDualRail className="mt-4" label={variant === 'cto' ? 'Cadrer votre mission electronique' : 'Cadrer votre mission sur mesure'} />
      </div>
    </motion.section>
  );
}
