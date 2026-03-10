import fs from 'node:fs';

const htmlPath = new URL('../dist/index.html', import.meta.url);
const html = fs.readFileSync(htmlPath, 'utf8');

const expectedPrimary = [
  'cta_hero_projets',
  'cta_hero_contact',
  'outbound_linkedin_contact'
];

const optionalPrimary = [
  'outbound_linkedin_project',
  'outbound_bandcamp_project',
  'outbound_github_project'
];

const expectedLegacy = [];

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
const missingOptional = optionalPrimary.filter((eventName) => !uniqueDataTrack.includes(eventName));
if (missingOptional.length) {
  console.log(`Optional primary events missing: ${missingOptional.join(', ')}`);
}
