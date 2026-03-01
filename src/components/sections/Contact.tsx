import { Button } from '@/components/ui/button';
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
  const primary = contactLinks[0];
  const secondary = contactLinks[1];
  const tertiary = contactLinks[2];

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-anchor mt-5">
      <div className="rounded-2xl border border-cyan-300/25 bg-gradient-to-b from-cyan-300/7 to-violet-100/6 p-5 md:p-6">
        <h2 id="contact-title" className="m-0 text-3xl md:text-4xl">
          Demarrer une mission
        </h2>
        <p className="mb-0 mt-3 max-w-3xl text-violet-100/82">
          Pour mission de conception, design produit, collaboration de creation electronique ou production
          audiovisuelle, contactez-moi via les plateformes ci-dessous.
        </p>
        <p className="mb-0 mt-2 text-sm text-violet-100/70">
          Canal prioritaire: LinkedIn DM. Option business/freelance: Malt.
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild size="lg">
            <a
              href={primary.href}
              target={primary.external ? '_blank' : undefined}
              rel={primary.external ? 'noopener noreferrer' : undefined}
              {...trackAttrs(primary.event, primary.destination)}
            >
              {primary.label} (prioritaire)
            </a>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a
              href={secondary.href}
              target={secondary.external ? '_blank' : undefined}
              rel={secondary.external ? 'noopener noreferrer' : undefined}
              {...trackAttrs(secondary.event, secondary.destination)}
            >
              {secondary.label} (brief mission)
            </a>
          </Button>
        </div>

        <p className="mb-0 mt-3">
          <a
            href={tertiary.href}
            target={tertiary.external ? '_blank' : undefined}
            rel={tertiary.external ? 'noopener noreferrer' : undefined}
            {...trackAttrs(tertiary.event, tertiary.destination)}
            className="inline-flex min-h-9 items-center font-semibold text-cyan-300 underline-offset-4 hover:text-cyan-200 hover:underline"
          >
            {tertiary.label}
          </a>
        </p>

        <ul aria-label="Repères de confiance" className="mb-0 mt-4 pl-5 text-violet-100/76">
          <li>Positionnement verifiable: concepteur, creation electronique et iteration IA</li>
          <li>Presence professionnelle active sur LinkedIn et Malt</li>
          <li>Premier echange possible sous 24-48h selon disponibilite</li>
          <li>Travaux publies et contact direct pour collaboration</li>
        </ul>
      </div>
    </section>
  );
}
