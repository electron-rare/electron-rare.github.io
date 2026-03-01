export const TRACK_EVENTS = {
  ctaHeroProjects: 'cta_hero_projets',
  ctaHeroContact: 'cta_hero_contact',
  ctaHeroProfile: 'cta_hero_profile',
  outboundLinkedinProject: 'outbound_linkedin_project',
  outboundLinkedinContact: 'outbound_linkedin_contact',
  outboundMaltContact: 'outbound_malt_contact',
  outboundBandcampProject: 'outbound_bandcamp_project',
  outboundBandcampContact: 'outbound_bandcamp_contact'
} as const;

export type TrackEventName = (typeof TRACK_EVENTS)[keyof typeof TRACK_EVENTS];

export type TrackEventPayload = {
  event: TrackEventName;
  event_category: 'engagement';
  event_label: TrackEventName;
  destination: string;
};

export function trackAttrs(event: TrackEventName, destination: string) {
  return {
    'data-track': event,
    'data-destination': destination
  } as const;
}
