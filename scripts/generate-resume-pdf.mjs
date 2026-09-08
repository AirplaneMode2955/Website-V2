/**
 * Generates public/resume.pdf from the resume content below.
 * Simple single-column layout — not a pixel match for the on-site /resume page,
 * but kept in sync with the same verified numbers.
 *
 * Run: npm run resume:pdf
 */
import PDFDocument from 'pdfkit';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'resume.pdf');

const INK = '#1b231b';
const MUTED = '#4d5a4d';
const RULE = '#c7ccc3';

const contact = {
  name: 'Jett Iverson',
  title: 'Acting Director of Marketing · Licensed Insurance Agent · AI Strategist',
  line: 'Plain City, Utah  ·  jett@insurancecenterut.com  ·  linkedin.com/in/jettiverson',
};

const experience = [
  {
    role: 'Acting Director of Marketing / Licensed Insurance Agent',
    company: 'The Insurance Center — Farr West, UT',
    period: 'Jun 2024 – Present',
    bullets: [
      'Took over the full marketing function in June 2024, the first person to hold the role in a dedicated capacity, covering strategy, execution, and reporting.',
      "Grew organic search sessions 203% (139/month in June 2024 to 421/month in July 2026) and organic pageviews 232% (235 to 780/month), measured in GA4's Organic Search channel and Google Search Console.",
      "Owned SEO and GEO strategy through the agency's April 2026 website migration, building 50 SEO/GEO content pages on the new site in five months from a near-blank slate.",
      "New site's Search Console impressions grew 12.5x in the first four months live (1,860 to 23,314/month).",
      'Ran a generative-engine-optimization audit across ChatGPT, Claude, Gemini, and Perplexity (visibility scored 61/100) and confirmed content ranking inside AI-conversation search queries logged in Search Console, including position 1 for "how much is life insurance for a 30 year old".',
      'Drove sales velocity to 16.8%, surpassing both the industry average (12.7%) and the top-quartile benchmark (15.8%).',
      'Manages 100+ client accounts, ensuring prompt policy renewals and proactive coverage guidance.',
      'Built automation systems for content publishing, review generation, and analytics reporting.',
    ],
  },
  {
    role: 'Founder',
    company: 'SearchLight Digital — Utah',
    period: 'Pre-launch',
    bullets: [
      'SEO and GEO agency I founded, currently pre-launch and independent of my work at The Insurance Center.',
      'Productizing the same organic-search and AI-search-visibility methods I run in-house.',
    ],
  },
  {
    role: 'Certified Youth Soccer Official',
    company: 'UYSA — Ogden, UT',
    period: 'Feb 2018 – Present',
    bullets: [
      'Officiated competitive youth matches across Northern Utah, making high-stakes decisions in fast-paced, high-pressure environments.',
      'Mediated disputes between players, coaches, and officials, developing communication and conflict-resolution skills that translate directly to client and team relationships.',
      'Coordinated with fellow officials and coaching staff to maintain fair, consistent gameplay across large tournaments.',
    ],
  },
];

const education = [
  {
    school: 'Utah State University — Jon M. Huntsman School of Business',
    period: 'Fall 2024 – December 2026 (Expected)',
    detail: 'Bachelor of Science, Major: Marketing — Logan, UT',
    bullets: [
      'GPA: 3.74 while working 25 hours per week',
      'Academic Scholarship recipient',
      'Member of ProSales, Jon M. Huntsman School of Business',
      'Google Ads Certification · Meta Business Suite Certification',
      'Proficiency in SQL, Marketing, and Finance; completed Advanced Excel coursework',
    ],
  },
  {
    school: 'Fremont High School — Plain City, UT',
    period: 'Graduated May 2022',
    detail: 'High School Diploma',
    bullets: [],
  },
];

const credentials = [
  'Insurance License — Property & Casualty, State of Utah (Jul 2024)',
];

const serviceLeadership = [
  {
    role: 'Club Member / Account Manager — ProSales, Jon M. Huntsman School of Business',
    period: 'Jan 2025 – Present',
    bullets: [
      'Manages the account relationship with a corporate partner on behalf of the club, communicating updates and identifying annual recruitment needs.',
      'Builds and maintains long-term professional relationships that bridge the university and the business community.',
    ],
  },
  {
    role: 'Full-time Volunteer — The Church of Jesus Christ of Latter-day Saints, Porto Alegre, Brazil',
    period: 'Jul 2022 – Jun 2024',
    bullets: [
      'Led a team of 10–20 volunteers, coaching performance, setting goals, and developing the people around me.',
      'Developed and executed outreach strategies that measurably expanded community reach across the Porto Alegre mission area.',
      'Delivered presentations and training sessions in Portuguese to large groups. Now fluent in the language.',
    ],
  },
];

const skills = [
  ['Skills & Tools', [
    'SEO & Technical SEO',
    'GEO / AI Search Visibility (ChatGPT, Claude, Gemini, Perplexity)',
    'Google Ads & Meta Ads',
    'GA4 & Search Console',
    'Looker Studio & Apps Script',
    'SQL',
    'Python',
    'Marketing Automation (Zapier, n8n)',
  ].join('  ·  ')],
  ['Languages', 'English (Native)  ·  Portuguese (Fluent)'],
  ['Interests', 'Golf  ·  Skiing  ·  Fishing'],
];

const doc = new PDFDocument({ size: 'LETTER', margins: { top: 54, bottom: 54, left: 54, right: 54 } });
doc.pipe(fs.createWriteStream(OUT));

const W = doc.page.width - doc.page.margins.left - doc.page.margins.right;

function heading(text) {
  doc.moveDown(0.8);
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(12).text(text.toUpperCase(), { characterSpacing: 1.2 });
  const y = doc.y + 3;
  doc.moveTo(doc.page.margins.left, y).lineTo(doc.page.margins.left + W, y).strokeColor(RULE).lineWidth(1).stroke();
  doc.moveDown(0.6);
}

function entry(title, period, sub) {
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(10.5).text(title, { continued: !!period });
  if (period) {
    doc.font('Helvetica').fontSize(9).fillColor(MUTED).text(period, { align: 'right' });
  }
  if (sub) doc.font('Helvetica').fontSize(9.5).fillColor(MUTED).text(sub);
  doc.moveDown(0.2);
}

function bullets(items) {
  doc.font('Helvetica').fontSize(9.5).fillColor(INK);
  for (const it of items) {
    doc.text('•  ' + it, { indent: 6, paragraphGap: 3, lineGap: 1 });
  }
}

// Header
doc.fillColor(INK).font('Helvetica-Bold').fontSize(24).text(contact.name);
doc.moveDown(0.15);
doc.font('Helvetica').fontSize(10).fillColor(MUTED).text(contact.title);
doc.moveDown(0.1);
doc.fontSize(9).fillColor(MUTED).text(contact.line);

heading('Experience');
for (const role of experience) {
  entry(role.role, role.period, role.company);
  bullets(role.bullets);
  doc.moveDown(0.5);
}

heading('Education & Credentials');
for (const edu of education) {
  entry(edu.school, edu.period, edu.detail);
  if (edu.bullets.length) bullets(edu.bullets);
  doc.moveDown(0.4);
}
bullets(credentials);

heading('Service & Leadership');
for (const item of serviceLeadership) {
  entry(item.role, item.period);
  bullets(item.bullets);
  doc.moveDown(0.4);
}

heading('Skills');
for (const [label, value] of skills) {
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(INK).text(label + ':  ', { continued: true });
  doc.font('Helvetica').fillColor(INK).text(value);
  doc.moveDown(0.2);
}

doc.end();
console.log('Wrote', OUT);
