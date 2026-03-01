import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import type { CtaLink } from '@/lib/types';
import { TRACK_EVENTS, trackAttrs } from '@/lib/tracking';

type ProjectItem = {
  title: string;
  description: string;
  link?: CtaLink;
};

const projects: ProjectItem[] = [
  {
    title: "L'électron rare",
    description:
      'Studio principal: creation electronique, prototypes d interactions audiovisuelles et systemes experimentaux.',
    link: {
      label: 'Profil LinkedIn',
      href: 'https://fr.linkedin.com/in/electron-rare',
      event: TRACK_EVENTS.outboundLinkedinProject,
      destination: 'linkedin.com',
      external: true
    }
  },
  {
    title: 'Bureau conception produit/systeme',
    description:
      "Conception de dispositifs et parcours d'usage: du concept au prototype fonctionnel, avec approche studio et iteration rapide."
  },
  {
    title: 'Electron Fou (noise)',
    description:
      'Volet noise: R&D sonore, textures radicales et sorties publiees sur plateformes audio.',
    link: {
      label: 'Bandcamp',
      href: 'https://lelectron-fou.bandcamp.com/',
      event: TRACK_EVENTS.outboundBandcampProject,
      destination: 'bandcamp.com',
      external: true
    }
  }
];

export function Projects() {
  return (
    <section id="projets" aria-labelledby="projects-title" className="section-anchor mt-5">
      <div className="rounded-2xl border border-fuchsia-300/25 bg-gradient-to-b from-fuchsia-300/7 to-violet-100/6 p-5 md:p-6">
        <h2 id="projects-title" className="m-0 text-3xl md:text-4xl">
          Projets
        </h2>

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
              <Card className="h-full border-cyan-300/25 bg-violet-950/28">
                <h3 className="m-0 text-xl">{project.title}</h3>
                <p className="mb-0 mt-2 text-violet-100/82">{project.description}</p>
                {project.link && (
                  <p className="mb-0 mt-3">
                    <a
                      href={project.link.href}
                      target={project.link.external ? '_blank' : undefined}
                      rel={project.link.external ? 'noopener noreferrer' : undefined}
                      {...trackAttrs(project.link.event, project.link.destination)}
                      className="font-semibold text-cyan-300 underline-offset-4 hover:text-cyan-200 hover:underline"
                    >
                      {project.link.label}
                    </a>
                  </p>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
