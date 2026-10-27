import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import AnimatedSkills from '@/components/AnimatedSkills';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Resume of Jett Iverson. Acting Director of Marketing, Licensed Insurance Agent, and AI strategist based in Utah.',
};

const summary =
  'Solo marketing lead who runs demand generation end to end for a 25-person insurance agency with no marketing department: paid search, SEO/GEO, web, social, video, lifecycle email, and reputation. Owns the number. One rebuilt Google Ads account produced $490,713 in digital premium across 306 policies. Builds AI agents and workflows that run in production (ZoomInfo-to-Claude prospecting, Zapier lifecycle, reporting dashboards), measures every channel against revenue, and trains the team to run what he ships.';

type Bullet = { lead?: string; text: string };

const experience: {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: Bullet[];
}[] = [
  {
    role: 'Acting Director of Marketing / Licensed Insurance Agent',
    company: 'The Insurance Center',
    location: 'Farr West, UT',
    period: 'Jun 2024 – Present',
    bullets: [
      {
        lead: 'Paid search to revenue.',
        text: 'Took over Google Ads with only the logins and no brief, then rebuilt campaign architecture, audience targeting, and insurance-intent landing pages. Impressions up 7.4x (69.2K to 514K), clicks up 7.9x (2,060 to 16,372), inbound calls up 105% (181 to 371), and $490,713 in digital premium across 306 policies.',
      },
      {
        lead: 'AI-built prospecting.',
        text: "Connected ZoomInfo to Claude through an MCP server that pulls and ranks the week's top 10-15 prospects (niche, then geography, then Utah) and drafts outreach. Outreach volume up 400%; multiple large accounts converted.",
      },
      {
        lead: 'Lifecycle and automated outreach.',
        text: 'Designed Zapier lead-gen workflows that keep prospects and commercial accounts warm with no manual follow-up (+200% outreach volume). Chose and rolled out an AI renewal-email tool to the full team through three months of resistance, 4-5 trainings, and daily one-on-one help; it now saves hundreds of staff hours and gets renewals out earlier.',
      },
      {
        lead: 'Reputation engine.',
        text: 'Built a Google Reviews workflow with a live agent leaderboard and per-review incentive. Reviews grew from 95 to 306 (+222%) with the rating holding at 4.9.',
      },
      {
        lead: 'Measurement.',
        text: 'Built a React and Python dashboard combining SEO performance, lead flow, keyword rank, and revenue attribution. Answering "what\'s working" went from a week of reports to under a minute.',
      },
      {
        lead: 'SEO, GEO, and web.',
        text: 'Led the redesign and ongoing management of theinsurancecenter.com: information architecture, on-page and technical SEO, blog program, structured data, agent pages, and GEO work for visibility in ChatGPT, Perplexity, and Google AI Overviews. Organic search sessions grew 203% (139 to 421/month) and the new site\'s Search Console impressions grew 12.5x in its first four months.',
      },
      {
        lead: 'Video and social.',
        text: "Built a video editing workflow that took the agency's YouTube channel from 31.9K views in 2025 to 395.2K in 2026 (through Oct 26), about 12x, and watch time from 128 to 7,900 hours. Run organic social across platforms.",
      },
      {
        lead: 'Sales-facing marketing.',
        text: 'Redesigned proposals to lead with coverage instead of a price spreadsheet. The first won a large contractor, now one of the biggest accounts; about 10 decks since have won roughly 40%. Manage 100+ client accounts as a licensed agent.',
      },
    ],
  },
  {
    role: 'Founder',
    company: 'SearchLight Digital',
    location: 'Utah',
    period: '2025 – Present',
    bullets: [
      {
        text: 'Founded an SEO and GEO agency for small businesses that are invisible to AI search. Scoped the offer, built the site, and built the scoring engine that measures visibility across major AI search engines and converts it into a prioritized, time-boxed improvement plan.',
      },
    ],
  },
];

const education = [
  {
    school: 'Utah State University',
    subtitle: 'Jon M. Huntsman School of Business',
    location: 'Logan, UT',
    degree: 'Bachelor of Science, Major: Marketing',
    period: 'Fall 2024 – December 2026 (Expected)',
    bullets: [
      'GPA: 3.74 while working 25 hours per week',
      'Academic Scholarship recipient',
      'Member of ProSales, Jon M. Huntsman School of Business',
      'Proficiency in SQL, Marketing, and Finance',
      'Completed Advanced Excel coursework',
    ],
  },
  {
    school: 'Fremont High School',
    subtitle: null,
    location: 'Plain City, UT',
    degree: 'High School Diploma',
    period: 'Graduated May 2022',
    bullets: [],
  },
];

const credentials = [
  {
    name: 'Insurance License',
    detail: 'Property & Casualty, State of Utah',
    period: 'Jul 2024',
  },
];

const serviceLeadership = [
  {
    role: 'Full-Time Volunteer Missionary',
    org: 'The Church of Jesus Christ of Latter-day Saints',
    location: 'Porto Alegre, Brazil',
    period: 'Jul 2022 – Jun 2024',
    bullets: [
      'Led and trained 10-20 volunteers with no fixed reporting structure, raising output through coaching and goal-setting',
      'Ran trainings and presentations in Portuguese for large non-technical audiences; built community outreach from scratch with no playbook',
    ],
  },
  {
    role: 'Corporate Account Manager, ProSales',
    org: 'Jon M. Huntsman School of Business',
    location: 'Logan, UT',
    period: 'Jan 2025 – Present',
    bullets: [
      "Own the relationship with a corporate partner: club updates and the company's annual recruiting needs",
    ],
  },
  {
    role: 'Certified Youth Soccer Official',
    org: 'UYSA',
    location: 'Ogden, UT',
    period: 'Feb 2018 – Present',
    bullets: [
      'Make real-time calls and mediate disputes in front of large crowds. Hold a decision under pressure and own it',
    ],
  },
];

const skills: Record<string, string[]> = {
  Marketing: [
    'Google Ads',
    'GA4',
    'Search Console',
    'SEO / GEO',
    'Lifecycle email',
    'Reviews / local SEO',
    'Social',
    'YouTube',
    'Canva',
    'Advanced Excel',
  ],
  Build: [
    'Claude and Claude Code',
    'MCP servers',
    'Zapier',
    'Python',
    'SQL',
    'React / JavaScript',
    'HTML / CSS',
    'Google Apps Script',
  ],
  Certified: ['Google Ads', 'Meta Business Suite', 'AI Fluency and Claude 101 (Anthropic)'],
  Languages: ['English (Native)', 'Portuguese (Fluent)'],
};

const interests = ['Golf', 'Skiing', 'Fishing'];

export default function ResumePage() {
  return (
    <>
      {/* ── Page Banner ── */}
      <section className="relative py-24 px-8 bg-surface-container-low border-b border-white/5 overflow-hidden">
        {/* Watermark */}
        <span
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 font-headline italic text-primary select-none pointer-events-none leading-none pr-8"
          style={{ fontSize: 'clamp(8rem, 20vw, 18rem)', opacity: 0.04 }}
        >
          Resume
        </span>
        {/* Radial glow behind headline */}
        <div
          aria-hidden="true"
          className="absolute left-8 top-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, var(--color-primary) 0%, transparent 70%)',
            opacity: 0.06,
          }}
        />
        <div className="max-w-screen-2xl mx-auto relative z-10">
          <FadeIn>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
              The track record
            </span>
            <h1 className="font-headline italic text-6xl md:text-8xl text-primary leading-tight mb-4">
              Resume
            </h1>
            <p className="text-on-surface-variant text-xl max-w-xl">
              Marketing, SEO/GEO strategy, and AI systems — the full history below, or grab the PDF.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Identity Strip ── */}
      <section className="pt-16 pb-12 px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <h2 className="font-headline italic text-3xl md:text-4xl text-primary leading-tight mb-2">
                  Jett Iverson
                </h2>
                <p className="text-on-surface-variant">
                  Acting Director of Marketing &nbsp;·&nbsp; Licensed Insurance Agent &nbsp;·&nbsp; AI Strategist
                </p>
                <p className="text-outline text-sm mt-1">
                  Syracuse, Utah &nbsp;·&nbsp;{' '}
                  <a
                    href="mailto:jett@insurancecenterut.com"
                    className="hover:text-primary transition-colors"
                  >
                    jett@insurancecenterut.com
                  </a>
                  &nbsp;·&nbsp;{' '}
                  <a
                    href="https://www.linkedin.com/in/jettiverson"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    linkedin.com/in/jettiverson
                  </a>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 self-start">
                <Link
                  href="/case-studies/organic-search"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-md font-label uppercase tracking-[0.18em] text-sm hover:shadow-premium transition-all duration-200 whitespace-nowrap"
                >
                  View Case Study
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-primary/40 text-primary px-6 py-3 rounded-md font-label uppercase tracking-[0.18em] text-sm hover:bg-primary hover:text-on-primary transition-all duration-200 whitespace-nowrap"
                >
                  Download PDF
                  <span className="material-symbols-outlined text-sm">download</span>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="pb-24 px-8 bg-background">
        <div className="max-w-3xl mx-auto space-y-16">

          {/* Summary */}
          <FadeIn>
            <div>
              <h2 className="font-headline italic text-3xl text-primary pb-3 mb-6 border-b border-white/10">
                Summary
              </h2>
              <p className="text-on-surface-variant leading-relaxed">{summary}</p>
            </div>
          </FadeIn>

          {/* Experience */}
          <FadeIn>
            <div>
              <h2 className="font-headline italic text-3xl text-primary pb-3 mb-8 border-b border-white/10">
                Experience
              </h2>
              <div className="space-y-10">
                {experience.map((role) => (
                  <div key={role.role}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-0.5">
                      <h3 className="font-headline italic text-xl text-primary">{role.role}</h3>
                      <span className="font-label text-[10px] uppercase tracking-luxe text-outline flex-shrink-0">
                        {role.period}
                      </span>
                    </div>
                    <p className="text-on-surface-variant text-sm mb-3">
                      {role.company}, {role.location}
                    </p>
                    <ul className="space-y-1.5">
                      {role.bullets.map((b) => (
                        <li
                          key={b.text}
                          className="flex items-start gap-2 text-on-surface-variant text-sm leading-relaxed"
                        >
                          <span className="text-primary/60 mt-0.5 flex-shrink-0">–</span>
                          <span>
                            {b.lead && <strong className="text-primary font-medium">{b.lead} </strong>}
                            {b.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Education & Credentials */}
          <FadeIn delay={0.05}>
            <div>
              <h2 className="font-headline italic text-3xl text-primary pb-3 mb-8 border-b border-white/10">
                Education &amp; Credentials
              </h2>
              <div className="space-y-8">
                {education.map((edu) => (
                  <div key={edu.school}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <div>
                        <h3 className="font-headline italic text-xl text-primary">{edu.school}</h3>
                        {edu.subtitle && (
                          <p className="text-outline text-xs font-label uppercase tracking-luxe mt-0.5">
                            {edu.subtitle}
                          </p>
                        )}
                      </div>
                      <span className="font-label text-[10px] uppercase tracking-luxe text-outline flex-shrink-0">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-on-surface-variant text-sm mt-1">
                      {edu.degree}, {edu.location}
                    </p>
                    {edu.bullets.length > 0 && (
                      <ul className="mt-3 space-y-1.5">
                        {edu.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2 text-on-surface-variant text-sm leading-relaxed"
                          >
                            <span className="text-primary/60 mt-0.5 flex-shrink-0">–</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {credentials.map((cred) => (
                  <div key={cred.name}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <h3 className="font-headline italic text-xl text-primary">{cred.name}</h3>
                      <span className="font-label text-[10px] uppercase tracking-luxe text-outline flex-shrink-0">
                        {cred.period}
                      </span>
                    </div>
                    <p className="text-on-surface-variant text-sm">{cred.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Service & Leadership */}
          <FadeIn delay={0.06}>
            <div>
              <h2 className="font-headline italic text-3xl text-primary pb-3 mb-8 border-b border-white/10">
                Service &amp; Leadership
              </h2>
              <div className="space-y-10">
                {serviceLeadership.map((item) => (
                  <div key={item.role}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-0.5">
                      <h3 className="font-headline italic text-xl text-primary">{item.role}</h3>
                      <span className="font-label text-[10px] uppercase tracking-luxe text-outline flex-shrink-0">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-on-surface-variant text-sm mb-3">
                      {item.org}, {item.location}
                    </p>
                    <ul className="space-y-1.5">
                      {item.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-on-surface-variant text-sm leading-relaxed"
                        >
                          <span className="text-primary/60 mt-0.5 flex-shrink-0">–</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Skills */}
          <FadeIn delay={0.08}>
            <div>
              <h2 className="font-headline italic text-3xl text-primary pb-3 mb-8 border-b border-white/10">
                Skills
              </h2>
              <AnimatedSkills skills={skills} />

              {/* Interests */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <span className="font-label text-[10px] uppercase tracking-luxe text-outline block mb-3">
                  Interests
                </span>
                <p className="text-on-surface-variant text-sm">
                  {interests.join(' · ')}
                </p>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* ── Download CTA ── */}
      <section className="py-16 px-8 bg-surface-container-low border-t border-white/5">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-on-surface-variant">Prefer a formatted PDF copy?</p>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-md font-label uppercase tracking-[0.18em] text-sm transition-all duration-200 shadow-soft hover:shadow-premium hover:scale-[1.03] active:scale-[0.97] whitespace-nowrap"
          >
            Download Resume PDF
            <span className="material-symbols-outlined text-sm">download</span>
          </a>
        </div>
      </section>
    </>
  );
}
