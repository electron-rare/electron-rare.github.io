import { Button } from '@/components/ui/button';
import { TRACK_EVENTS, trackAttrs } from '@/lib/tracking';
import { cn } from '@/lib/utils';

type CtaDualRailProps = {
  label?: string;
  className?: string;
};

const LINKEDIN_HREF = 'https://fr.linkedin.com/in/electron-rare';

export function CtaDualRail({ label = 'Canaux mission', className }: CtaDualRailProps) {
  return (
    <div className={cn('dual-cta-rail', className)}>
      <p className="dual-cta-label">{label}</p>
      <div className="dual-cta-actions">
        <Button asChild size="md" className="dual-cta-btn dual-cta-btn--primary">
          <a
            href={LINKEDIN_HREF}
            target="_blank"
            rel="noopener noreferrer"
            {...trackAttrs(TRACK_EVENTS.outboundLinkedinContact, 'linkedin.com')}
          >
            <span className="inline-flex items-center gap-2">
              <span className="circuit-node" aria-hidden="true" />
              LinkedIn DM
            </span>
          </a>
        </Button>
        <Button asChild variant="secondary" size="md" className="dual-cta-btn dual-cta-btn--secondary">
          <a
            href="#contact"
            {...trackAttrs(TRACK_EVENTS.ctaHeroContact, '#contact')}
          >
            <span className="inline-flex items-center gap-2">
              <span className="circuit-node circuit-node--green" aria-hidden="true" />
              Form brief mission
            </span>
          </a>
        </Button>
      </div>
      <p className="dual-cta-helper">LinkedIn pour un echange direct. Form brief pour cadrer la mission.</p>
    </div>
  );
}
