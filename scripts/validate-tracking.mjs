import fs from 'node:fs';

const htmlPath = new URL('../index.html', import.meta.url);
const html = fs.readFileSync(htmlPath, 'utf8');

const expectedPrimary = [
  'cta_hero_projets',
  'cta_hero_contact',
  'cta_hero_profile',
  'outbound_linkedin_contact',
  'outbound_malt_contact',
  'outbound_bandcamp_contact',
  'outbound_github_contact',
  'outbound_github_project_rtc_bl_phone',
  'outbound_github_project_zacus',
  'outbound_github_project_site',
  'outbound_github_lab_more',
  'cta_lab_interactif_open'
];

const expectedLegacy = ['outbound_github_project', 'outbound_github_contact'];

const dataTrackMatches = [...html.matchAll(/data-track="([^"]+)"/g)].map((m) => m[1]);
const dataLegacyMatches = [...html.matchAll(/data-track-legacy="([^"]+)"/g)].map((m) => m[1]);

const uniqueDataTrack = [...new Set(dataTrackMatches)];
const uniqueLegacyTrack = [...new Set(dataLegacyMatches)];

const missingPrimary = expectedPrimary.filter((eventName) => !uniqueDataTrack.includes(eventName));
const missingLegacy = expectedLegacy.filter((eventName) => !uniqueLegacyTrack.includes(eventName));

if (missingPrimary.length || missingLegacy.length) {
  console.error('Tracking contract validation failed.');
  if (missingPrimary.length) {
    console.error(`Missing primary events: ${missingPrimary.join(', ')}`);
  }
  if (missingLegacy.length) {
    console.error(`Missing legacy events: ${missingLegacy.join(', ')}`);
  }
  process.exit(1);
}

console.log('Tracking contract validation passed.');
console.log(`Primary events found (${uniqueDataTrack.length}): ${uniqueDataTrack.join(', ')}`);
console.log(`Legacy events found (${uniqueLegacyTrack.length}): ${uniqueLegacyTrack.join(', ')}`);
