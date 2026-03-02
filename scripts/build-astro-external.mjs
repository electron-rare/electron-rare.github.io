import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const targetSiteUrl =
  process.env.PUBLIC_SITE_URL ||
  process.env.EXTERNAL_SITE_URL ||
  'https://electron-rare.github.io/';

const normalizeUrl = (value) => (value.endsWith('/') ? value : `${value}/`);
process.env.PUBLIC_SITE_URL = normalizeUrl(targetSiteUrl);

const run = (command) => {
  execSync(command, {
    stdio: 'inherit',
    env: process.env
  });
};

console.log(`[build-astro-external] Using PUBLIC_SITE_URL=${process.env.PUBLIC_SITE_URL}`);

run('npm run lab:build');
run('npm run build');

const labSource = path.resolve(process.cwd(), 'lab');
const labDestination = path.resolve(process.cwd(), 'dist', 'lab');

if (fs.existsSync(labSource)) {
  fs.rmSync(labDestination, { recursive: true, force: true });
  fs.cpSync(labSource, labDestination, { recursive: true });
  console.log('[build-astro-external] Included lab/ output in dist/lab.');
} else {
  console.warn('[build-astro-external] Warning: lab/ not found; skipping lab route packaging.');
}

console.log('[build-astro-external] External Astro build done.');
