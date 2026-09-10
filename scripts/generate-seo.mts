/**
 * Generates public/sitemap.xml, public/robots.txt and public/manifest.webmanifest
 * from the site's content data. Runs automatically before `next build` (see the
 * "prebuild" script in package.json) and can be run directly with:
 *
 *   node scripts/generate-seo.mts
 *
 * These are emitted as static files rather than App Router metadata routes
 * (app/sitemap.ts etc.) because Next's webpack metadata-route loader fails to
 * escape an apostrophe in the absolute project path ("…/Jett's Workspace/…"),
 * which breaks `next build` locally. Static generation sidesteps that entirely.
 */
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { articles } from '../src/lib/articles.ts';
import { caseStudies } from '../src/lib/caseStudies.ts';
import { featuredGames } from '../src/lib/arcadeGames.ts';

const SITE = 'https://jettiverson.com';
const PUBLIC = path.join(import.meta.dirname, '..', 'public');
const now = new Date().toISOString();

type Entry = { path: string; priority: number; changefreq: string };

const staticEntries: Entry[] = [
  { path: '/', priority: 1.0, changefreq: 'monthly' },
  { path: '/about', priority: 0.8, changefreq: 'yearly' },
  { path: '/resume', priority: 0.8, changefreq: 'monthly' },
  { path: '/projects', priority: 0.7, changefreq: 'monthly' },
  { path: '/content', priority: 0.7, changefreq: 'weekly' },
  { path: '/case-studies', priority: 0.7, changefreq: 'monthly' },
  { path: '/contact', priority: 0.5, changefreq: 'yearly' },
  { path: '/play', priority: 0.5, changefreq: 'monthly' },
  { path: '/play/gut-check', priority: 0.4, changefreq: 'monthly' },
  { path: '/play/table-talk', priority: 0.4, changefreq: 'monthly' },
];

const dynamicEntries: Entry[] = [
  ...articles.map((a) => ({ path: `/content/${a.slug}`, priority: 0.6, changefreq: 'monthly' })),
  ...caseStudies.map((c) => ({ path: `/case-studies/${c.slug}`, priority: 0.6, changefreq: 'monthly' })),
  ...featuredGames
    .filter((g) => g.mode === 'hosted')
    .map((g) => ({ path: `/play/${g.slug}`, priority: 0.3, changefreq: 'monthly' })),
];

const entries = [...staticEntries, ...dynamicEntries];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <url>\n    <loc>${SITE}${e.path}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority.toFixed(1)}</priority>\n  </url>`
  )
  .join('\n')}
</urlset>
`;

const robots = `# https://jettiverson.com
User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
Host: ${SITE}
`;

const manifest = JSON.stringify(
  {
    name: 'Jett Iverson',
    short_name: 'Jett Iverson',
    description:
      'Jett Iverson — Marketer, husband, and AI strategist based in Utah. Performance marketing, SEO, GEO, and AI systems.',
    start_url: '/',
    display: 'standalone',
    background_color: '#141c14',
    theme_color: '#141c14',
    icons: [
      { src: '/favicon-64.png', sizes: '64x64', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { src: '/logo.png', sizes: '1024x1024', type: 'image/png', purpose: 'any' },
    ],
  },
  null,
  2
);

await Promise.all([
  writeFile(path.join(PUBLIC, 'sitemap.xml'), sitemap),
  writeFile(path.join(PUBLIC, 'robots.txt'), robots),
  writeFile(path.join(PUBLIC, 'manifest.webmanifest'), manifest + '\n'),
]);

process.stdout.write(`SEO files written: ${entries.length} sitemap URLs\n`);
