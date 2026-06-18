import FadeIn from '@/components/FadeIn';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';

const featuredProjects = [
  {
    title: 'Insurance Center Analytics Dashboard',
    description:
      'A custom dashboard that surfaces what\'s actually driving results — so marketing decisions come from real numbers instead of gut feelings.',
    tags: ['React', 'Python'],
  },
  {
    title: 'GEO Reporting System',
    description:
      'Tracks how often The Insurance Center\'s brand appears in AI-generated search results — giving visibility where no off-the-shelf tool does.',
    tags: ['Python', 'AI', 'GEO'],
  },
];

const featuredArticle = {
  source: 'LinkedIn Pulse',
  readTime: '5 min read',
  title: 'What It Means to Be a Big "I" Best Practices Agency (And Why It Should Matter to You)',
  url: 'https://www.linkedin.com/pulse/what-means-big-i-best-practices-agency-why-should-matter-4pizc/',
};

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── About Teaser ── */}
      <section className="py-20 px-8 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
              About
            </span>
            <h2 className="font-headline italic text-5xl text-primary mb-4 leading-tight">
              Marketing student.<br />AI-driven.
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6 max-w-2xl text-lg">
              Utah raised, mission-hardened, and endlessly curious. Head of Marketing at The
              Insurance Center — leading SEO, GEO, and AI strategy while finishing a marketing
              degree at Utah State.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-primary/40 text-primary px-6 py-3 rounded-md font-label uppercase tracking-[0.18em] text-sm transition-all duration-200 hover:bg-primary hover:text-on-primary"
            >
              My Story
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── Background Snapshot ── */}
      <section className="py-16 px-8 bg-background border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
              <div className="flex flex-wrap gap-10">
                {[
                  { value: '50%+', label: 'Brand exposure growth' },
                  { value: '3.74', label: 'GPA at Utah State' },
                  { value: '2', label: 'Languages spoken' },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <p className="font-headline italic text-4xl text-primary">{value}</p>
                    <p className="font-label text-xs uppercase tracking-luxe text-outline mt-1">{label}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 border border-primary/40 text-primary px-6 py-3 rounded-md font-label uppercase tracking-[0.18em] text-sm hover:bg-primary hover:text-on-primary transition-all duration-200 whitespace-nowrap"
              >
                Full Resume
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Projects Teaser ── */}
      <section className="py-20 px-8 bg-background">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
                  Work
                </span>
                <h2 className="font-headline italic text-5xl text-primary">Projects</h2>
              </div>
              <Link
                href="/projects"
                className="hidden md:inline-flex items-center gap-2 text-primary font-headline italic text-lg hover:text-primary-fixed transition-colors"
              >
                All projects{' '}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </FadeIn>

          <div className="space-y-4 mb-8">
            {featuredProjects.map((project, i) => (
              <FadeIn key={project.title} delay={i * 0.08}>
                <div className="bg-surface-container-highest rounded-[1.25rem] p-6 border border-white/[0.08]">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary-container text-on-primary-container rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-headline italic text-xl text-primary mb-1">{project.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{project.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 border border-primary/40 text-primary px-6 py-3 rounded-md font-label uppercase tracking-[0.18em] text-sm hover:bg-primary hover:text-on-primary transition-all duration-200"
              >
                All Projects
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Content Teaser ── */}
      <section className="py-20 px-8 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
                  Writing
                </span>
                <h2 className="font-headline italic text-5xl text-primary">Content</h2>
              </div>
              <Link
                href="/content"
                className="hidden md:inline-flex items-center gap-2 text-primary font-headline italic text-lg hover:text-primary-fixed transition-colors"
              >
                All articles{' '}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <a
              href={featuredArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-surface-container p-8 rounded-[1.25rem] border border-white/[0.08] shadow-soft hover:border-primary/20 transition-colors group mb-8"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="font-label text-[10px] uppercase tracking-luxe text-outline">
                  {featuredArticle.source}
                </span>
                <span className="text-outline/50">·</span>
                <span className="font-label text-[10px] uppercase tracking-luxe text-outline">
                  {featuredArticle.readTime}
                </span>
              </div>
              <h3 className="font-headline italic text-2xl text-primary mb-3 group-hover:text-primary-fixed transition-colors">
                {featuredArticle.title}
              </h3>
              <span className="text-primary font-label text-xs uppercase tracking-luxe">
                Read on LinkedIn →
              </span>
            </a>
          </FadeIn>

          <FadeIn>
            <div className="text-center">
              <Link
                href="/content"
                className="inline-flex items-center gap-2 border border-primary/40 text-primary px-6 py-3 rounded-md font-label uppercase tracking-[0.18em] text-sm hover:bg-primary hover:text-on-primary transition-all duration-200"
              >
                All Writing
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="py-28 px-8 bg-primary-container">
        <div className="max-w-screen-2xl mx-auto text-center">
          <FadeIn>
            <h2 className="font-headline italic text-5xl md:text-6xl text-on-primary-container mb-4 leading-tight">
              Let&apos;s build something<br />worth talking about.
            </h2>
            <p className="text-on-primary-container/70 text-lg mb-10 max-w-xl mx-auto">
              Always open to ambitious projects that blend technical precision with creative
              strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:jett@insurancecenterut.com"
                className="bg-primary text-on-primary px-8 py-4 rounded-md font-label uppercase tracking-[0.18em] text-sm transition-all duration-200 flex items-center justify-center gap-3 shadow-soft hover:shadow-premium hover:scale-[1.03] active:scale-[0.97]"
              >
                Email Me
              </a>
              <Link
                href="/contact"
                className="border border-on-primary-container/40 text-on-primary-container px-8 py-4 rounded-md font-label uppercase tracking-[0.18em] text-sm hover:bg-on-primary-container/10 transition-all duration-200"
              >
                Get in Touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
