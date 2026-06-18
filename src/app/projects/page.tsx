import type { Metadata } from 'next';
import FadeIn from '@/components/FadeIn';
import Image from 'next/image';
import MotionCard from '@/components/MotionCard';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A look at the systems, tools, and projects Jett Iverson has built. From analytics dashboards to AI automation workflows.',
};

type Project = {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  imageAlt: string;
  github?: string;
  link?: string;
  status: 'live' | 'in-progress' | 'completed';
};

const projects: Project[] = [
  {
    title: 'The Insurance Center: Company Website',
    description:
      'Led the full design, build, and ongoing management of theinsurancecenter.com, the agency\'s primary digital presence and lead generation engine.',
    longDescription:
      'Took the website from concept to launch and have managed it since, handling everything from information architecture and design direction to SEO optimization and content strategy. The site serves as the agency\'s storefront, referral hub, and a key driver of inbound leads. Includes individual agent pages, a full blog, and structured data for local search.',
    tags: ['Web Design', 'SEO', 'CMS', 'Content Strategy'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    imageAlt: 'Website design on a laptop screen',
    link: 'https://www.theinsurancecenter.com',
    status: 'live',
  },
  {
    title: 'Insurance Center Analytics Dashboard',
    description:
      'A custom dashboard that surfaces what\'s actually driving results. Marketing decisions come from real numbers instead of gut feelings.',
    longDescription:
      'Aggregates SEO performance, lead flow, keyword rankings, and revenue attribution into one place. The goal was to make it easy to answer "what\'s working?" in under 60 seconds. Built with React on the frontend and Python for data pipelines and API integrations.',
    tags: ['React', 'Python', 'Data Visualization', 'SEO Analytics'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    imageAlt: 'Analytics dashboard showing charts and KPIs',
    status: 'live',
  },
  {
    title: 'YouTube Thumbnail Generator',
    description:
      'AI-powered scripts that generate YouTube thumbnails automatically. Built to remove the bottleneck of manually designing one for every video.',
    longDescription:
      'Takes a video title and key topics as input, then uses the OpenAI API to generate thumbnail concepts and images automatically. Cuts a task that previously took 30–60 minutes down to under 2 minutes without sacrificing quality. The output drops directly into Canva for any final touches.',
    tags: ['OpenAI API', 'Python', 'Automation'],
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    imageAlt: 'AI generation interface with prompts and image output',
    status: 'completed',
  },
  {
    title: 'Blog Poster',
    description:
      'An automated tool that formats, optimizes, and cross-publishes blog content from a single source. Removing the manual work of posting to multiple platforms.',
    longDescription:
      'Writing a blog post is one thing. Formatting it for WordPress, optimizing the meta data, creating social snippets, and posting across platforms is another. This tool takes a raw draft, runs it through an AI pipeline for SEO optimization and formatting, then publishes it to the configured destinations automatically.',
    tags: ['Python', 'OpenAI API', 'Automation', 'CMS Integration'],
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
    imageAlt: 'Laptop with content writing interface open',
    status: 'in-progress',
  },
  {
    title: 'GEO Reporting System',
    description:
      'A custom reporting system that tracks how often The Insurance Center\'s brand appears in AI-generated search results. Giving visibility where no off-the-shelf tool does.',
    longDescription:
      'As AI-mediated search (Google AI Overviews, ChatGPT, Perplexity) reshapes how people find information, traditional SEO metrics miss half the picture. This system runs scheduled queries across AI platforms, captures brand mention data, and reports on GEO performance over time. It\'s the foundation of The Insurance Center\'s generative engine optimization strategy. Nothing on the market tracked this the right way.',
    tags: ['Python', 'AI', 'Analytics', 'GEO', 'Automation'],
    image: '/ai-insurance.png',
    imageAlt: 'AI search result tracking and reporting interface',
    status: 'live',
  },
  {
    title: 'Google Reviews Workflow',
    description:
      'An internal workflow system that tracks Google Review performance across agents. Making getting reviews a competitive, trackable team activity.',
    longDescription:
      'Google reviews are one of the highest-leverage local SEO signals, but getting agents to consistently ask for them was inconsistent. This workflow system tracks review requests, captures responses, and surfaces a leaderboard that shows each agent\'s review count and trend over time. The competitive element changed behavior. Reviews at The Insurance Center increased significantly after implementation.',
    tags: ['Automation', 'CRM Integration', 'Local SEO'],
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    imageAlt: 'Team performance dashboard with review metrics',
    github: 'https://github.com/AirplaneMode2955',
    status: 'live',
  },
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
              Projects
            </h1>
            <p className="text-on-surface-variant text-xl max-w-xl">
              Systems and tools built to make complex work simple. Mostly for The Insurance Center,
              sometimes for curiosity.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Tools & Stack ── */}
      <section className="py-16 px-8 bg-background border-b border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-8 block">
              Tools &amp; Stack
            </span>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { category: 'Languages', items: ['Python', 'TypeScript', 'SQL'] },
              { category: 'Frameworks', items: ['React', 'Next.js'] },
              { category: 'AI & APIs', items: ['OpenAI API', 'Google AI', 'Perplexity'] },
              { category: 'Marketing', items: ['SEO', 'GEO', 'Google Ads', 'Meta Business Suite'] },
            ].map(({ category, items }, i) => (
              <FadeIn key={category} delay={i * 0.05}>
                <div className="bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] p-6 h-full">
                  <p className="font-label text-[10px] uppercase tracking-luxe text-outline mb-3">
                    {category}
                  </p>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="text-on-surface-variant text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects Grid ── */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto space-y-12">
          {projects.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.05}>
              <MotionCard>
              <div className="bg-surface-container-highest rounded-[1.25rem] overflow-hidden border border-white/[0.08] shadow-soft hover:shadow-premium transition-shadow duration-300">
                <div className="grid grid-cols-1 md:grid-cols-5">
                  {/* Image */}
                  <div className="relative md:col-span-2 aspect-video md:aspect-auto min-h-[240px]">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className="object-cover"
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

                      <h2 className="font-headline italic text-3xl text-primary mb-3">
                        {project.title}
                      </h2>
                      <p className="text-on-surface-variant/80 text-base mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        {project.longDescription}
                      </p>
                    </div>

                    {(project.link || project.github) && (
                      <div className="mt-6 flex flex-wrap gap-3">
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
              </MotionCard>
            </FadeIn>
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
