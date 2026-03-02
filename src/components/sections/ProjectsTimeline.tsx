import { motion } from 'motion/react';
import { TRACK_EVENTS, trackAttrs } from '@/lib/tracking';
import type { TrackEventName } from '@/lib/tracking';

type TimelineItem = {
  year: string;
  title: string;
  category: string;
  summary: string;
  href?: string;
  event?: TrackEventName;
  destination?: string;
  external?: boolean;
};

const timeline: TimelineItem[] = [
  {
    year: '2010',
    title: 'VJ Clearscreen',
    category: 'Video live / scenographie',
    summary: 'Performances video et experimentations de diffusion autour du langage ecran.'
  },
  {
    year: '2016',
    title: 'Electron Fou',
    category: 'Noise / creation sonore',
    summary: 'R&D de textures noise et sorties en ligne sur plateformes audio.',
    href: 'https://lelectron-fou.bandcamp.com/',
    event: TRACK_EVENTS.outboundBandcampProject,
    destination: 'bandcamp.com',
    external: true
  },
  {
    year: '2021',
    title: "L'electron rare",
    category: 'Design produit / systemes',
    summary: 'Conception de dispositifs, automation creative et methodes studio.',
    href: 'https://fr.linkedin.com/in/electron-rare',
    event: TRACK_EVENTS.outboundLinkedinProject,
    destination: 'linkedin.com',
    external: true
  },
  {
    year: '2026',
    title: 'Open repos references',
    category: 'Hardware/Firmware',
    summary: 'References GitHub: ESP32, STM32, LED, energie batterie et systemes de controle.',
    href: 'https://github.com/electron-rare/',
    event: TRACK_EVENTS.outboundGithubProject,
    destination: 'github.com',
    external: true
  },
  {
    year: '2026',
    title: 'Studio acquisition',
    category: 'SEO / CRO / tracking',
    summary: 'Pipeline mesuree: CTA, analytics, indexation et iteration continue.',
    href: '#contact',
    event: TRACK_EVENTS.ctaHeroContact,
    destination: '#contact'
  }
];

export function ProjectsTimeline() {
  return (
    <section aria-labelledby="timeline-title" className="section-anchor mt-5">
      <div className="circuit-board rounded-2xl p-5 md:p-6">
        <div className="circuit-title-row">
          <span className="circuit-node circuit-node--magenta" aria-hidden="true" />
          <h2 id="timeline-title" className="m-0 text-3xl md:text-4xl">
            Timeline projets
          </h2>
          <span className="circuit-pinline" aria-hidden="true" />
        </div>

        <p className="section-lead mb-0 mt-3">
          Chronologie orientee preuves: evolution video/noise, design systeme puis references open source.
        </p>

        <ol className="projects-timeline mt-4" aria-label="Chronologie projets">
          {timeline.map((item, index) => (
            <motion.li
              key={`${item.year}-${item.title}`}
              className="projects-timeline-item"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.24 }}
              transition={{ duration: 0.36, delay: index * 0.05 }}
            >
              <p className="projects-timeline-year">{item.year}</p>
              <div className="projects-timeline-content">
                <p className="projects-timeline-kicker">{item.category}</p>
                <h3 className="projects-timeline-title">{item.title}</h3>
                <p className="projects-timeline-summary">{item.summary}</p>
                {item.href && item.event && item.destination && (
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    {...trackAttrs(item.event, item.destination)}
                    className="projects-timeline-link"
                  >
                    {item.external ? 'Ouvrir preuve' : 'Voir detail'}
                  </a>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
