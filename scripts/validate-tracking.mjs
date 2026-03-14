import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const trackingFile = path.join(repoRoot, 'src/lib/tracking.ts');
const sourceRoots = [
  path.join(repoRoot, 'src/pages'),
  path.join(repoRoot, 'src/components'),
  path.join(repoRoot, 'src/content')
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walk(fullPath);
    }
    if (/\.(astro|tsx|ts|jsx|js)$/.test(entry.name)) {
      return [fullPath];
    }
    return [];
  });
}

function readTrackEvents() {
  const source = fs.readFileSync(trackingFile, 'utf8');
  const objectMatch = source.match(/TRACK_EVENTS\s*=\s*\{([\s\S]*?)\}\s*as const/);
  if (!objectMatch) {
    throw new Error('Unable to parse TRACK_EVENTS from src/lib/tracking.ts');
  }

  const entries = [...objectMatch[1].matchAll(/(\w+)\s*:\s*'([^']+)'/g)].map((match) => ({
    key: match[1],
    value: match[2]
  }));

  return new Map(entries.map(({ key, value }) => [key, value]));
}

const knownEvents = readTrackEvents();
const usedEventKeys = new Set();
const usedRawEvents = new Set();
const legacyAttrs = [];

for (const sourceRoot of sourceRoots) {
  for (const filePath of walk(sourceRoot)) {
    const content = fs.readFileSync(filePath, 'utf8');

    for (const match of content.matchAll(/TRACK_EVENTS\.(\w+)/g)) {
      usedEventKeys.add(match[1]);
    }

    for (const match of content.matchAll(/data-track="([^"]+)"/g)) {
      usedRawEvents.add(match[1]);
    }

    if (content.includes('data-track-legacy=')) {
      legacyAttrs.push(path.relative(repoRoot, filePath));
    }
  }
}

const usedEvents = new Set(
  [...usedEventKeys]
    .filter((key) => knownEvents.has(key))
    .map((key) => knownEvents.get(key))
    .concat([...usedRawEvents])
);

const missingEvents = [...knownEvents.entries()]
  .filter(([_, value]) => !usedEvents.has(value))
  .map(([key, value]) => `${key}=${value}`);

const unexpectedEvents = [...usedEvents].filter(
  (value) => ![...knownEvents.values()].includes(value)
);

if (legacyAttrs.length || missingEvents.length || unexpectedEvents.length) {
  console.error('Tracking contract validation failed.');
  if (legacyAttrs.length) {
    console.error(`Legacy tracking attrs found in: ${legacyAttrs.join(', ')}`);
  }
  if (missingEvents.length) {
    console.error(`Known events missing from active source: ${missingEvents.join(', ')}`);
  }
  if (unexpectedEvents.length) {
    console.error(`Unknown tracking events found in active source: ${unexpectedEvents.join(', ')}`);
  }
  process.exit(1);
}

console.log('Tracking contract validation passed.');
console.log(`Known events (${knownEvents.size}): ${[...knownEvents.values()].join(', ')}`);
console.log(`Active events used (${usedEvents.size}): ${[...usedEvents].join(', ')}`);
