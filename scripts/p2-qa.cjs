const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const baseUrl = 'http://127.0.0.1:4323/';
const outDir = path.join(process.cwd(), 'docs', 'qa-artifacts');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const report = {
    generatedAt: new Date().toISOString(),
    lotA: {},
    lotB: {},
    lotC: {},
    tracking: {}
  };

  {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await page.locator('#offre-systeme').scrollIntoViewIfNeeded();

    const mapStats = await page.evaluate(() => {
      const scroll = document.querySelector('.system-map-scroll');
      const svg = document.querySelector('.system-map-svg');
      const rects = Array.from(document.querySelectorAll('.system-map-node')).map((n) => ({
        w: Number(n.getAttribute('width') || 0),
        h: Number(n.getAttribute('height') || 0),
        x: Number(n.getAttribute('x') || 0),
        y: Number(n.getAttribute('y') || 0)
      }));

      const overlaps = [];
      for (let i = 0; i < rects.length; i += 1) {
        for (let j = i + 1; j < rects.length; j += 1) {
          const a = rects[i];
          const b = rects[j];
          const ix = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
          const iy = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
          if (ix * iy > 0) overlaps.push([i, j]);
        }
      }

      return {
        hasScrollContainer: !!scroll,
        horizontalOverflow: scroll ? scroll.scrollWidth > scroll.clientWidth : false,
        svgMinWidth: svg ? getComputedStyle(svg).minWidth : null,
        minNodeHitArea: rects.every((r) => r.w >= 40 && r.h >= 40),
        overlapsCount: overlaps.length
      };
    });

    const shotPath = path.join(outDir, 'p2-lot-a-mobile-390.png');
    await page.screenshot({ path: shotPath, fullPage: true });

    report.lotA = { ...mapStats, screenshot: 'docs/qa-artifacts/p2-lot-a-mobile-390.png' };
    await context.close();
  }

  {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await page.locator('#offre-systeme').scrollIntoViewIfNeeded();

    const focusLog = [];
    for (let i = 0; i < 22; i += 1) {
      await page.keyboard.press('Tab');
      const active = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el) return null;
        return {
          tag: el.tagName,
          role: el.getAttribute('role'),
          aria: el.getAttribute('aria-label'),
          text: (el.textContent || '').trim().slice(0, 42)
        };
      });
      focusLog.push(active);
    }

    const tabRoles = await page.locator('#offre-systeme [role="tablist"] [role="tab"]').count();

    report.lotA.keyboard = {
      tabRoleCount: tabRoles,
      focusLog
    };

    await context.close();

    const reduced = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    const reducedPage = await reduced.newPage();
    await reducedPage.goto(baseUrl, { waitUntil: 'networkidle' });
    await reducedPage.locator('#lab-notes').scrollIntoViewIfNeeded();

    const reducedStats = await reducedPage.evaluate(() => {
      const wave = document.querySelector('.proof-scope-wave');
      const marker = document.querySelector('.proof-bode-marker');
      if (!wave || !marker) return { available: false };
      const waveStyle = getComputedStyle(wave);
      const markerStyle = getComputedStyle(marker);
      return {
        available: true,
        waveTransition: waveStyle.transitionDuration,
        markerTransition: markerStyle.transitionDuration
      };
    });

    report.lotB.reducedMotion = reducedStats;
    await reduced.close();
  }

  {
    const pages = ['studio-core', 'design-produit', 'rd-sonore'];
    const lotCChecks = [];

    for (const slug of pages) {
      const file = path.join(process.cwd(), 'dist', 'cas', slug, 'index.html');
      const html = fs.readFileSync(file, 'utf8');
      lotCChecks.push({
        slug,
        hasTitle: /<title>/.test(html),
        hasDesc: /meta name="description"/.test(html),
        hasOgTitle: /meta property="og:title"/.test(html),
        hasOgDesc: /meta property="og:description"/.test(html),
        hasCanonical: /rel="canonical"/.test(html),
        hasSchemaCreativeWork: /"@type":"CreativeWork"/.test(html),
        hasContactLink: /href="\/#contact"/.test(html)
      });
    }

    report.lotC = { pages: lotCChecks };
  }

  {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await page.locator('#cas').scrollIntoViewIfNeeded();
    const hasContract = await page.evaluate(() => !!document.querySelector('a[data-track=\"engagement_case_opened\"]'));
    report.tracking = {
      hasCaseOpenedContractInDom: hasContract
    };

    await context.close();
  }

  await browser.close();
  const outputPath = path.join(outDir, 'p2-qa-report.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(outputPath);
})();
