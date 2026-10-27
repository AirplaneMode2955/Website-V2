import type { Metadata } from 'next';
import FadeIn from '@/components/FadeIn';
import Image from 'next/image';
import Link from 'next/link';
import TiltCard from '@/components/motion/TiltCard';
import InkUnderline from '@/components/motion/InkUnderline';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A look at the systems, tools, and projects Jett Iverson has built. From analytics dashboards to AI automation workflows.',
};

type Group = 'business' | 'app' | 'tic';

type Project = {
  group: Group;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  imageAlt: string;
  /** Short result or fact shown on the card. Only add numbers that are backed up elsewhere on the site. */
  proof?: string;
  /** Real capture of the project, served from /public/projects. Falls back to `image` until it exists. */
  screenshot?: string;
  /** Slug of a matching write-up under /case-studies. */
  caseStudy?: string;
  github?: string;
  link?: string;
  status: 'live' | 'in-progress' | 'completed';
};

const projects: Project[] = [
  {
    group: 'business',
    title: 'The Insurance Center: Company Website',
    description:
      'Led the full design, build, and ongoing management of theinsurancecenter.com, the agency\'s primary digital presence and lead generation engine.',
    longDescription:
      'Took the website from concept to launch and have managed it since, handling everything from information architecture and design direction to SEO optimization and content strategy. The site serves as the agency\'s storefront, referral hub, and a key driver of inbound leads. Includes individual agent pages, a full blog, and structured data for local search.',
    tags: ['Web Design', 'SEO', 'CMS', 'Content Strategy'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    imageAlt: 'Website design on a laptop screen',
    link: 'https://www.theinsurancecenter.com',
    proof: 'Organic search up 203% through the April 2026 site migration',
    caseStudy: 'organic-search',
    status: 'live',
  },
  {
    group: 'tic',
    title: 'Insurance Center Analytics Dashboard',
    description:
      'A custom dashboard that surfaces what\'s actually driving results. Marketing decisions come from real numbers instead of gut feelings.',
    longDescription:
      'Aggregates SEO performance, lead flow, keyword rankings, and revenue attribution into one place. The goal was to make it easy to answer "what\'s working?" in under 60 seconds. Built with React on the frontend and Python for data pipelines and API integrations.',
    tags: ['React', 'Python', 'Data Visualization', 'SEO Analytics'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    imageAlt: 'Analytics dashboard showing charts and KPIs',
    proof:
      "Built to answer \"what's working?\" in under 60 seconds",
    caseStudy: 'marketing-dashboard',
    status: 'live',
  },
  {
    group: 'business',
    title: 'SearchLight Digital',
    description:
      'An SEO and GEO agency built for the new era of search — where AI answers are the new page one and most businesses have no idea they\'re invisible.',
    longDescription:
      'SearchLight Digital is the agency I founded to solve a problem I kept running into: the rules of search have changed, but most agencies are still playing the old game. We specialize in SEO and Generative Engine Optimization — helping brands show up in Google, ChatGPT, Perplexity, and AI Overviews. Every strategy is built around where attention actually lives now, not where it lived five years ago.',
    tags: ['SEO', 'GEO', 'AI Search', 'Agency'],
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80',
    imageAlt: 'Digital marketing and search strategy dashboard',
    link: 'https://searchlight-digital-v2.vercel.app/',
    status: 'live',
  },
  {
    group: 'app',
    title: 'Apple Watch Whoop Replacement',
    description:
      'A personal health algorithm that turns Apple Watch data into Whoop-style recovery and strain scores — without the subscription.',
    longDescription:
      'Whoop\'s insights are genuinely useful, but the data is already sitting in my Apple Watch. This system pulls health metrics directly from Apple Health — HRV, resting heart rate, sleep stages, SpO2, and more — and runs them through a custom algorithm that calculates daily recovery scores, strain scores, and sleep performance. The output mirrors what Whoop delivers but is built on data I already own, costs nothing to run, and can be tuned to how my body actually responds.',
    tags: ['Python', 'Apple Health', 'Automation', 'Health Tech'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    imageAlt: 'Health metrics and wearable data dashboard',
    proof: 'Recovery, strain, and sleep scores from data already on the watch',
    status: 'in-progress',
  },
  {
    group: 'app',
    title: 'Utah Golf Tinder',
    description:
      'Track every golf course you\'ve played in Utah and see how far through the state\'s full catalog you\'ve made it.',
    longDescription:
      'A map-based web app that lets Utah golfers log which courses they\'ve played and visualize them on an interactive map. The app tracks your personal percentage of Utah\'s total golf courses played, turning it into a fun challenge to work through the whole state. Built for golfers who want to see their progress and discover courses they haven\'t hit yet.',
    tags: ['React', 'Maps', 'Web App', 'Golf'],
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80',
    imageAlt: 'Golfer on a green Utah golf course',
    github: 'https://github.com/AirplaneMode2955/Utah-Golf-Tinder',
    link: 'https://utah-golf-tinder.vercel.app/',
    status: 'completed',
  },
  {
    group: 'app',
    title: 'Premier League Command Center',
    description:
      'A live, one-screen Premier League dashboard — fixtures, results, standings, and match detail, all visible without scrolling.',
    longDescription:
      'Built for match days: a dark, data-forward control room for the Premier League. A LIVE pill appears only when a match is actually in progress, live fixtures pulse and show the minute, and clicking any match swaps in a detail panel with possession, shots, xG, and key events. Data comes from FotMob\'s public JSON through a server-side proxy that caches every 35 seconds and normalizes a 743 KB payload down to the 12 KB the screen actually renders. If the upstream fails, the last good response is served with a "stale" chip so the screen never blanks.',
    tags: ['Next.js', 'TypeScript', 'API Proxy', 'Data Viz'],
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80',
    imageAlt: 'Football stadium under floodlights',
    github: 'https://github.com/AirplaneMode2955/premier-league-command-center',
    link: 'https://plcc-live.vercel.app',
    proof: '743 KB upstream payload trimmed to the 12 KB the screen renders',
    status: 'live',
  },
  {
    group: 'tic',
    title: 'Google Reviews Workflow',
    description:
      'An internal workflow system that tracks Google Review performance across agents. Making getting reviews a competitive, trackable team activity.',
    longDescription:
      'Google reviews are one of the highest-leverage local SEO signals, but getting agents to consistently ask for them was inconsistent. This workflow system tracks review requests, captures responses, and surfaces a leaderboard that shows each agent\'s review count and trend over time. The competitive element changed behavior. Reviews at The Insurance Center increased significantly after implementation.',
    tags: ['Automation', 'CRM Integration', 'Local SEO'],
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    imageAlt: 'Team performance dashboard with review metrics',
    proof: '95 → 306 Google reviews, rating holding at 4.9',
    status: 'live',
  },
];

const groups: { id: Group; label: string; blurb: string }[] = [
  { id: 'business', label: 'Businesses', blurb: 'Sites and companies I built and run.' },
  { id: 'app', label: 'Apps I shipped', blurb: 'Built for curiosity, deployed for real.' },
  { id: 'tic', label: 'Work at The Insurance Center', blurb: 'Internal systems behind the results.' },
];

const statusStyles = {
  live: { label: 'Live', class: 'bg-accent/20 text-accent' },
  'in-progress': { label: 'In Progress', class: 'bg-secondary/20 text-secondary' },
  completed: { label: 'Completed', class: 'bg-primary/20 text-primary' },
};

export default function ProjectsPage() {
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
          Projects
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
              Work
            </span>
            <h1 className="font-headline italic text-6xl md:text-8xl text-primary leading-tight mb-4">
              <InkUnderline variant="swoop">Projects</InkUnderline>
            </h1>
            <p className="text-on-surface-variant text-xl max-w-xl">
              Systems and tools built to make complex work simple. Mostly for The Insurance Center,
              sometimes for curiosity.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Tools & Stack ── */}
      <section className="py-16 px-8 bg-surface-container-low border-b border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-6 block">
              Tools &amp; stack
            </span>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                label: 'Build',
                tools: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Python'],
              },
              {
                label: 'Marketing & Data',
                tools: ['SEO / GEO', 'Google Ads', 'GA4 & Search Console', 'SQL'],
              },
              {
                label: 'Automation',
                tools: ['Zapier', 'n8n', 'Airtable', 'Claude / AI agents'],
              },
            ].map((group) => (
              <FadeIn key={group.label}>
                <div className="bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] p-6 h-full">
                  <p className="font-label text-[10px] uppercase tracking-luxe text-outline mb-4">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.tools.map((tool) => (
                      <span
                        key={tool}
                        className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary-container text-on-primary-container rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects, grouped by type ── */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto space-y-20">
          {groups.map((group) => (
            <div key={group.id}>
              <FadeIn>
                <div className="mb-8">
                  <h2 className="font-headline italic text-4xl text-primary mb-2">{group.label}</h2>
                  <p className="text-on-surface-variant">{group.blurb}</p>
                </div>
              </FadeIn>
              <div className="space-y-12">
                {projects
                  .filter((project) => project.group === group.id)
                  .map((project, i) => (
                    <FadeIn key={project.title} delay={i * 0.05}>
                      <TiltCard max={3} className="rounded-[1.25rem]">
                        <div className="bg-surface-container-highest rounded-[1.25rem] overflow-hidden border border-white/[0.08] shadow-soft hover:shadow-premium transition-shadow duration-300">
                          <div className="grid grid-cols-1 md:grid-cols-5">
                            {/* Image */}
                            <div className="relative md:col-span-2 aspect-video md:aspect-auto min-h-[240px]">
                              <Image
                                src={project.screenshot ?? project.image}
                                alt={project.imageAlt}
                                fill
                                sizes="(max-width: 768px) 100vw, 360px"
                                className="object-cover object-top"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-container/20" />
                            </div>

                            {/* Content */}
                            <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-between">
                              <div>
                                {/* Tags + status */}
                                <div className="flex flex-wrap items-center gap-2 mb-5">
                                  <span
                                    className={`font-label text-[10px] uppercase tracking-luxe px-3 py-1 rounded-full ${statusStyles[project.status].class}`}
                                  >
                                    {statusStyles[project.status].label}
                                  </span>
                                  {project.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary-container text-on-primary-container rounded-full"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>

                                <h3 className="font-headline italic text-3xl text-primary mb-3">
                                  {project.title}
                                </h3>
                                {project.proof && (
                                  <p className="font-label text-xs uppercase tracking-luxe text-secondary mb-4">
                                    {project.proof}
                                  </p>
                                )}
                                <p className="text-on-surface-variant/80 text-base mb-4 leading-relaxed">
                                  {project.description}
                                </p>
                                <p className="text-on-surface-variant text-sm leading-relaxed">
                                  {project.longDescription}
                                </p>
                              </div>

                              {(project.link || project.github || project.caseStudy) && (
                                <div className="mt-6 flex flex-wrap gap-3">
                                  {project.caseStudy && (
                                    <Link
                                      href={`/case-studies/${project.caseStudy}`}
                                      className="inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-md font-label uppercase tracking-[0.18em] text-xs transition-all duration-200 hover:shadow-premium"
                                    >
                                      Read the case study
                                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </Link>
                                  )}
                                  {project.link && (
                                    <a
                                      href={project.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 border border-primary/40 text-primary px-5 py-2.5 rounded-md font-label uppercase tracking-[0.18em] text-xs hover:bg-primary hover:text-on-primary transition-all duration-200"
                                    >
                                      Visit Site
                                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                                    </a>
                                  )}
                                  {project.github && (
                                    <a
                                      href={project.github}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 border border-primary/40 text-primary px-5 py-2.5 rounded-md font-label uppercase tracking-[0.18em] text-xs hover:bg-primary hover:text-on-primary transition-all duration-200"
                                    >
                                      View on GitHub
                                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </TiltCard>
                    </FadeIn>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GitHub CTA ── */}
      <section className="py-20 px-8 bg-background border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto text-center">
          <FadeIn>
            <p className="text-on-surface-variant text-lg mb-6">
              More experiments and work-in-progress on GitHub.
            </p>
            <a
              href="https://github.com/AirplaneMode2955"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-md font-label uppercase tracking-[0.18em] text-sm transition-all duration-200 shadow-soft hover:shadow-premium hover:scale-[1.03]"
            >
              GitHub / AirplaneMode2955
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
