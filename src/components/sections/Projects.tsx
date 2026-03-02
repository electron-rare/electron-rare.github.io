import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { CtaDualRail } from '@/components/ui/cta-dual-rail';
import type { CtaLink } from '@/lib/types';
import { TRACK_EVENTS, trackAttrs } from '@/lib/tracking';

type ProjectItem = {
  title: string;
  stage: string;
  description: string;
  link?: CtaLink;
};

const projects: ProjectItem[] = [
  {
    title: "L'électron rare",
    stage: 'Cas 01 - Studio core',
    description:
      'Contexte: besoin de plateforme R&D transverse. Intervention: architecture electronique et prototypage iteratif. Resultat: base systeme reutilisable pour nouvelles missions.',
    link: {
      label: 'Voir profil LinkedIn',
      href: 'https://fr.linkedin.com/in/electron-rare',
      event: TRACK_EVENTS.outboundLinkedinProject,
      destination: 'linkedin.com',
      external: true
    }
  },
  {
    title: 'Bureau conception produit/systeme',
    stage: 'Cas 02 - Design produit',
    description:
      "Contexte: idee produit sous contrainte planning. Intervention: cadrage, maquette fonctionnelle et plan d'industrialisation. Resultat: decisions rapides cote CTO et business."
  },
  {
    title: 'Electron Fou (noise)',
    stage: 'Cas 03 - R&D sonore',
    description:
      'Contexte: experimentation artistique et diffusion publique. Intervention: pipeline de production son + outillage. Resultat: preuves publiees et processus reproduisible.',
    link: {
      label: 'Ecouter sur Bandcamp',
      href: 'https://lelectron-fou.bandcamp.com/',
      event: TRACK_EVENTS.outboundBandcampProject,
      destination: 'bandcamp.com',
      external: true
    }
  },
  {
    title: 'Hardware/Firmware references',
    stage: 'Cas 04 - Open source',
    description:
      'Contexte: besoin de credibilite technique ouverte. Intervention: publication de stacks hardware/firmware terrain. Resultat: base de preuve consultable pour qualification mission.'
  }
];

const topReferences = [
  'https://github.com/KomplexKapharnaum/KXKM_ESP32_Audio_Battery_hardware',
  'https://github.com/KomplexKapharnaum/LEDcurtain_hardware',
  'https://github.com/KomplexKapharnaum/kxkm_Ve.direct'
] as const;

const referencesHub = 'https://github.com/electron-rare/?tab=repositories';

export function Projects() {
  return (
    <section id="projets" aria-labelledby="projects-title" className="section-anchor mt-5">
      <div className="circuit-board rounded-2xl p-5 md:p-6">
        <div className="circuit-title-row">
          <span className="circuit-node circuit-node--green" aria-hidden="true" />
          <h2 id="projects-title" className="m-0 text-3xl md:text-4xl">
            Cas d'usage et preuves d'execution
          </h2>
          <span className="circuit-pinline" aria-hidden="true" />
        </div>

        <p className="section-lead mb-0 mt-3">
          Chaque cas suit la meme logique: contexte, intervention technique, impact sur delai, risque ou fiabilite.
        </p>
        <p className="mb-0 mt-2 text-sm studio-muted">
          Choisissez le cas le plus proche de votre contexte puis ouvrez les references associees.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.42, delay: index * 0.06 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full">
                <p className="project-stage">{project.stage}</p>
                <div className="mb-2 flex items-center gap-2">
                  <span className="circuit-node" aria-hidden="true" />
                  <h3 className="m-0 text-xl">{project.title}</h3>
                </div>
                <p className="mb-0 mt-2 studio-muted">{project.description}</p>
                {project.link && (
                  <p className="mb-0 mt-3">
                    <a
                      href={project.link.href}
                      target={project.link.external ? '_blank' : undefined}
                      rel={project.link.external ? 'noopener noreferrer' : undefined}
                      {...trackAttrs(project.link.event, project.link.destination)}
                      className="font-semibold studio-link"
                    >
                      {project.link.label}
                    </a>
                  </p>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="project-reference-panel mt-5">
          <p className="project-reference-title">References GitHub (preuves techniques)</p>
          <ul className="project-reference-list">
            {topReferences.map((href) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...trackAttrs(TRACK_EVENTS.outboundGithubProject, 'github.com')}
                  className="project-reference-link"
                >
                  {href.replace('https://github.com/', '')}
                </a>
              </li>
            ))}
          </ul>
          <p className="mb-0 mt-3">
            <a
              href={referencesHub}
              target="_blank"
              rel="noopener noreferrer"
              {...trackAttrs(TRACK_EVENTS.outboundGithubProject, 'github.com')}
              className="project-reference-more"
            >
              Voir plus sur GitHub
            </a>
          </p>
        </div>

        <CtaDualRail className="mt-5" label="Transformer un cas en plan de mission" />
      </div>
    </section>
  );
}
