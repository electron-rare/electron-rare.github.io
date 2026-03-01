import type { CtaLink } from '@/lib/types';
import { TRACK_EVENTS, trackAttrs } from '@/lib/tracking';

const contactLinks: CtaLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://fr.linkedin.com/in/electron-rare',
    event: TRACK_EVENTS.outboundLinkedinContact,
    destination: 'linkedin.com',
    external: true
  },
  {
    label: 'Malt',
    href: 'https://www.malt.com/profile/clementsaillant',
    event: TRACK_EVENTS.outboundMaltContact,
    destination: 'malt.com',
    external: true
  },
  {
    label: 'Bandcamp (Electron Fou)',
    href: 'https://lelectron-fou.bandcamp.com/',
    event: TRACK_EVENTS.outboundBandcampContact,
    destination: 'bandcamp.com',
    external: true
  }
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-anchor mt-5">
      <div className="rounded-2xl border border-cyan-300/25 bg-gradient-to-b from-cyan-300/7 to-violet-100/6 p-5 md:p-6">
        <h2 id="contact-title" className="m-0 text-3xl md:text-4xl">
          Contact
        </h2>
        <p className="mb-0 mt-3 max-w-3xl text-violet-100/82">
          Pour mission de conception, design produit, collaboration de creation electronique ou production
          audiovisuelle, contactez-moi via les plateformes ci-dessous.
        </p>

        <ul className="mb-0 mt-4 flex flex-col gap-2 pl-0">
          {contactLinks.map((link) => (
            <li className="list-none" key={link.label}>
              <a
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                {...trackAttrs(link.event, link.destination)}
                className="inline-flex min-h-9 items-center font-semibold text-cyan-300 underline-offset-4 hover:text-cyan-200 hover:underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <ul aria-label="Repères de confiance" className="mb-0 mt-4 pl-5 text-violet-100/76">
          <li>Positionnement verifiable: concepteur, creation electronique et iteration IA</li>
          <li>Presence professionnelle active sur LinkedIn et Malt</li>
          <li>Travaux publies et contact direct pour collaboration</li>
        </ul>
      </div>
    </section>
  );
}
