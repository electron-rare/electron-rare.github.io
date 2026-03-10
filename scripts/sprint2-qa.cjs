const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const baseUrl = 'http://127.0.0.1:4323/';
const outDir = path.join(process.cwd(), 'docs', 'qa-artifacts');

const requiredEvents = [
  'experiment_variant_exposed',
  'funnel_brief_generated',
  'funnel_brief_copied',
  'funnel_contact_submitted'
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    responsive: [],
    accessibility: {},
    tracking: {},
    copyVariants: {}
  };

  const viewportMatrix = [
    { width: 390, height: 844, name: '390x844' },
    { width: 768, height: 1024, name: '768x1024' },
    { width: 1024, height: 768, name: '1024x768' },
    { width: 1440, height: 900, name: '1440x900' }
  ];

  for (const vp of viewportMatrix) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    await page.goto(baseUrl + '?copy=public', { waitUntil: 'networkidle' });

    const heroVisible = await page.locator('h1').first().isVisible();
    const contactVisible = await page.locator('#contact').isVisible();
    const diagramScrollableMobile = vp.width <= 390
      ? await page.evaluate(() => {
          const node = document.querySelector('.hero-diagram-scroll, .diagramScroll');
          if (!node) return null;
          return node.scrollWidth > node.clientWidth;
        })
      : null;

    const shotName = `responsive-${vp.name}.png`;
    await page.screenshot({ path: path.join(outDir, shotName), fullPage: true });

    report.responsive.push({
      viewport: vp,
      heroVisible,
      contactVisible,
      diagramScrollableMobile,
      screenshot: `docs/qa-artifacts/${shotName}`
    });

    await context.close();
  }

  {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    await page.goto(baseUrl + '?copy=public', { waitUntil: 'networkidle' });

    const focusTags = [];
    for (let i = 0; i < 14; i += 1) {
      await page.keyboard.press('Tab');
      const active = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el) return null;
        return {
          tag: el.tagName,
          id: el.id || null,
          className: typeof el.className === 'string' ? el.className.slice(0, 80) : null,
          text: (el.textContent || '').trim().slice(0, 60)
        };
      });
      focusTags.push(active);
    }

    const hasAudienceTabs = await page.locator('[role="tablist"] [role="tab"]').count();

    await context.close();

    const reducedContext = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1280, height: 900 } });
    const reducedPage = await reducedContext.newPage();
    await reducedPage.goto(baseUrl + '?copy=public', { waitUntil: 'networkidle' });
    const reducedMotionOk = await reducedPage.evaluate(() => {
      const dots = Array.from(document.querySelectorAll('.signalDot'));
      if (!dots.length) return true;
      return dots.every((dot) => getComputedStyle(dot).display === 'none');
    });
    await reducedContext.close();

    report.accessibility = {
      keyboardFocusSteps: focusTags,
      audienceTabCount: hasAudienceTabs,
      reducedMotionSignalsHidden: reducedMotionOk
    };
  }

  {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    await page.goto(baseUrl + '?copy=public', { waitUntil: 'networkidle' });
    await page.waitForTimeout(700);
    await page.evaluate(() => {
      Object.defineProperty(navigator, 'clipboard', {
        value: {
          writeText: async () => {}
        },
        configurable: true
      });
    });

    await page.getByRole('button', { name: /copier le brief/i }).first().click();
    await page.getByRole('link', { name: /envoyer le brief/i }).click();
    await page.getByRole('tab', { name: /version pro/i }).click();
    await page.getByRole('button', { name: /copier le brief/i }).nth(1).click();
    await page.getByRole('link', { name: /envoyer par mail/i }).click();
    await page.waitForTimeout(400);

    const eventNames = await page.evaluate(() => {
      const dl = window.dataLayer || [];
      return dl.map((e) => e && e.event).filter(Boolean);
    });

    const counts = eventNames.reduce((acc, ev) => {
      acc[ev] = (acc[ev] || 0) + 1;
      return acc;
    }, {});

    report.tracking = {
      requiredEvents,
      present: requiredEvents.filter((ev) => eventNames.includes(ev)),
      missing: requiredEvents.filter((ev) => !eventNames.includes(ev)),
      counts
    };

    await context.close();
  }

  {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();

    await page.goto(baseUrl + '?copy=cto', { waitUntil: 'networkidle' });
    const ctoVariant = await page.evaluate(() => document.documentElement.getAttribute('data-copy-variant'));

    await page.evaluate(() => localStorage.setItem('er_copy_variant', 'cto'));
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    const storageVariant = await page.evaluate(() => document.documentElement.getAttribute('data-copy-variant'));

    await page.evaluate(() => localStorage.removeItem('er_copy_variant'));
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    const defaultVariant = await page.evaluate(() => document.documentElement.getAttribute('data-copy-variant'));

    report.copyVariants = {
      queryCto: ctoVariant,
      storageFallback: storageVariant,
      defaultWithoutQueryOrStorage: defaultVariant
    };

    await context.close();
  }

  await browser.close();
  const outputPath = path.join(outDir, 'sprint2-qa-report.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(outputPath);
})();
