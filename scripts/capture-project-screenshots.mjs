// Captures a screenshot of each live project into public/projects/.
//
// Needs Playwright and network access to the sites:
//   npm i --no-save playwright && npx playwright install chromium
//   node scripts/capture-project-screenshots.mjs
//
// Then set `screenshot: '/projects/<name>.png'` on the matching entry in
// src/app/projects/page.tsx. Pass name=url to override a target, e.g.
//   node scripts/capture-project-screenshots.mjs plcc=http://localhost:3000
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const targets = {
  plcc: 'https://plcc-live.vercel.app',
  'utah-golf': 'https://utah-golf-tinder.vercel.app/',
  searchlight: 'https://searchlight-digital-v2.vercel.app/',
  tic: 'https://www.theinsurancecenter.com',
};

for (const arg of process.argv.slice(2)) {
  const [name, url] = arg.split('=');
  targets[name] = url;
}

mkdirSync('public/projects', { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

for (const [name, url] of Object.entries(targets)) {
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `public/projects/${name}.png` });
    console.log(`saved public/projects/${name}.png`);
  } catch (err) {
    console.error(`skipped ${name}: ${err.message.split('\n')[0]}`);
  }
}

await browser.close();
