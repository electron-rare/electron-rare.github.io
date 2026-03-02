import fs from 'node:fs';
import path from 'node:path';

const budgetRules = [
  {
    path: 'public/assets/da/openai/hero-pcb-routing-map-v2.webp',
    maxBytes: 350 * 1024
  },
  {
    path: 'public/assets/da/openai/hero-pcb-routing-map-mobile-low-noise-v2.webp',
    maxBytes: 180 * 1024
  },
  {
    path: 'public/assets/da/openai/hero-instrument-panel-v2.webp',
    maxBytes: 220 * 1024
  },
  {
    path: 'public/assets/da/openai/hero-instrument-panel-mobile-low-noise-v2.webp',
    maxBytes: 200 * 1024
  },
  {
    path: 'public/assets/da/openai/hero-carnet-labo-open-v2.webp',
    maxBytes: 240 * 1024
  },
  {
    path: 'public/assets/da/openai/carnet-labo-ouvert.webp',
    maxBytes: 240 * 1024
  }
];

const fmtKB = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

const failures = [];
for (const rule of budgetRules) {
  const absPath = path.resolve(process.cwd(), rule.path);
  if (!fs.existsSync(absPath)) {
    failures.push(`${rule.path}: missing file`);
    continue;
  }

  const size = fs.statSync(absPath).size;
  if (size > rule.maxBytes) {
    failures.push(`${rule.path}: ${fmtKB(size)} > budget ${fmtKB(rule.maxBytes)}`);
  }
}

if (failures.length > 0) {
  console.error('[image-budget] FAILED');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`[image-budget] OK (${budgetRules.length} assets within budget)`);
