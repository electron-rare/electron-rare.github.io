export const TRACK_EVENTS = {
  ctaHeroProjects: 'cta_hero_projets',
  ctaHeroContact: 'cta_hero_contact',
  ctaHeroProfile: 'cta_hero_profile',
  audienceModeSwitch: 'audience_mode_switch',
  engagementCaseOpened: 'engagement_case_opened',
  funnelBriefGenerated: 'funnel_brief_generated',
  funnelBriefCopied: 'funnel_brief_copied',
  funnelContactSubmitted: 'funnel_contact_submitted',
  outboundLinkedinProject: 'outbound_linkedin_project',
  outboundLinkedinContact: 'outbound_linkedin_contact',
  outboundBandcampProject: 'outbound_bandcamp_project',
  outboundBandcampContact: 'outbound_bandcamp_contact',
  outboundGithubProject: 'outbound_github_project',
  outboundGithubContact: 'outbound_github_contact'
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

export function trackEvent(event: string, payload?: Record<string, unknown>) {
  if (typeof window === 'undefined') {
    return;
  }
  const tracker = (window as typeof window & { __erTrackEvent?: (name: string, payload?: Record<string, unknown>) => void }).__erTrackEvent;
  if (typeof tracker !== 'function') {
    return;
  }
  tracker(event, payload);
}
