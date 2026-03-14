export const TRACK_EVENTS = {
  ctaHeroContact: 'cta_hero_contact',
  outboundLinkedinContact: 'outbound_linkedin_contact',
  outboundEmailContact: 'outbound_email_contact',
  outboundGithubContact: 'outbound_github_contact',
  outboundGithubProjectAudioBattery: 'outbound_github_project_audio_battery',
  ctaLabInteractifOpen: 'cta_lab_interactif_open'
} as const;

export type TrackEventName = (typeof TRACK_EVENTS)[keyof typeof TRACK_EVENTS];

export function trackAttrs(event: TrackEventName, destination: string) {
  return {
    'data-track': event,
    'data-destination': destination
  } as const;
}
