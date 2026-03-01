import type { TrackEventName } from '@/lib/tracking';

export type CtaLink = {
  label: string;
  href: string;
  event: TrackEventName;
  destination: string;
  external?: boolean;
};
