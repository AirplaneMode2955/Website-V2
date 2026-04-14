import type { Metadata } from 'next';
import FadeIn from '@/components/FadeIn';
import AnimatedSkills from '@/components/AnimatedSkills';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Resume of Jett Iverson — Head of Marketing, Insurance Agent, and AI strategist based in Utah.',
};

const experience = [
  {
    role: 'Head of Marketing / Licensed Insurance Agent',
    company: 'The Insurance Center',
    location: 'Farr West, UT',
    period: 'Jun 2024 – Present',
    bullets: [
      'Took ownership of the full marketing function — from strategy to execution — building the agency\'s digital presence from the ground up',
      'Grew brand exposure by over 50% through targeted social media campaigns and a disciplined content strategy',
      'Drove sales velocity to 16.8%, surpassing both the industry average (12.7%) and the top-quartile benchmark (15.8%)',
      'Maintained organic growth at 10.7%, in line with the industry median, while scaling new business velocity significantly above it',
      'Manages 100+ client accounts, ensuring prompt policy renewals and proactive coverage guidance',
      'Conducts ongoing market research to identify emerging trends and adjust the agency\'s offerings accordingly',
      'Leading SEO, GEO, and AI integration strategy — building automation systems for content publishing, review generation, and analytics reporting',
    ],
  },
  {
    role: 'Certified Youth Soccer Official',
    company: 'UYSA',
    location: 'Ogden, UT',
    period: 'Feb 2018 – Present',
    bullets: [
      'Officiated competitive youth matches across Northern Utah, making high-stakes decisions in fast-paced, high-pressure environments',
      'Mediated disputes between players, coaches, and officials — developing communication and conflict-resolution skills that translate directly to client and team relationships',
      'Coordinated with fellow officials and coaching staff to maintain fair, consistent gameplay across large tournaments',
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
      'Google Ads Certification · Meta Business Suite Certification',
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
    detail: 'Property & Casualty — State of Utah',
    period: 'Jul 2024',
  },
];

const serviceLeadership = [
  {
    role: 'Club Member / Account Manager',
    org: 'ProSales, Jon M. Huntsman School of Business',
    location: 'Logan, UT',
    period: 'Jan 2025 – Present',
    bullets: [
      'Manages the account relationship with a corporate partner on behalf of the club — communicating updates and identifying annual recruitment needs',
      'Builds and maintains long-term professional relationships that bridge the university and the business community',
    ],
  },
  {
    role: 'Full-time Volunteer',
    org: 'The Church of Jesus Christ of Latter-day Saints',
    location: 'Porto Alegre, Brazil',
    period: 'Jul 2022 – Jun 2024',
    bullets: [
      'Led a team of 10–20 volunteers — coaching performance, setting goals, and developing the people around me as much as the mission itself',
      'Developed and executed outreach strategies that measurably expanded community reach across the Porto Alegre mission area',
      'Delivered presentations and training sessions in Portuguese to large groups — now fluent in the language',
    ],
  },
];

const skills: Record<string, string[]> = {
  Marketing: ['SEO', 'GEO', 'Content Strategy', 'Local SEO', 'AI Search Optimization', 'Analytics', 'Social Media'],
  Technical: ['React', 'Python', 'OpenAI API', 'Automation', 'Data Visualization', 'SQL'],
  Tools: ['Google Analytics', 'Google Ads', 'Meta Business Suite', 'Canva', 'WordPress', 'CRM Integration'],
  Languages: ['English (Native)', 'Portuguese (Fluent)'],
};

const interests = ['Golf', 'Skiing', 'Fishing'];

export default function ResumePage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="pt-16 pb-12 px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <h1 className="font-headline italic text-5xl md:text-7xl text-primary leading-tight mb-2">
                  Jett Iverson
                </h1>
                <p className="text-on-surface-variant">
                  Head of Marketing &nbsp;·&nbsp; Licensed Insurance Agent &nbsp;·&nbsp; AI Strategist
                </p>
                <p className="text-outline text-sm mt-1">
                  Plain City, Utah &nbsp;·&nbsp;{' '}
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
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-primary/40 text-primary px-6 py-3 rounded-md font-label uppercase tracking-[0.18em] text-sm hover:bg-primary hover:text-on-primary transition-all duration-200 self-start whitespace-nowrap"
              >
                Download PDF
                <span className="material-symbols-outlined text-sm">download</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="pb-24 px-8 bg-background">
        <div className="max-w-3xl mx-auto space-y-16">

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
                      {role.company} &mdash; {role.location}
                    </p>
                    <ul className="space-y-1.5">
                      {role.bullets.map((b) => (
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
                      {edu.degree} &mdash; {edu.location}
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
                      {item.org} &mdash; {item.location}
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
