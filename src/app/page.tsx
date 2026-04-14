import FadeIn from '@/components/FadeIn';
import Link from 'next/link';
import Image from 'next/image';
import HeroSection from '@/components/HeroSection';
import MotionCard from '@/components/MotionCard';

const featuredProjects = [
  {
    title: 'Insurance Center Analytics Dashboard',
    description:
      'A custom dashboard that surfaces what\'s actually driving results — so marketing decisions come from real numbers instead of gut feelings.',
    tags: ['React', 'Python'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    imageAlt: 'Analytics dashboard with charts',
  },
  {
    title: 'YouTube Thumbnail Generator',
    description:
      'AI-powered scripts that generate YouTube thumbnails automatically — built to remove the bottleneck of manually designing one for every video.',
    tags: ['OpenAI API'],
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    imageAlt: 'AI generation interface',
  },
];

const featuredArticles = [
  {
    source: 'LinkedIn Pulse',
    readTime: '5 min read',
    title: 'What It Means to Be a Big "I" Best Practices Agency (And Why It Should Matter to You)',
    excerpt:
      'The Big "I" Best Practices designation identifies the top-performing independent agencies in the country. The Insurance Center has earned it six consecutive years running — here\'s what that means.',
    url: 'https://www.linkedin.com/pulse/what-means-big-i-best-practices-agency-why-should-matter-4pizc/',
  },
  {
    source: 'LinkedIn Pulse',
    readTime: '4 min read',
    title: "AI Isn't Replacing Insurance Brokers, It's Making the Best Ones Better",
    excerpt:
      'How integrating AI into the workflow enhances broker efficiency — spending less time on admin and more time providing meaningful guidance on coverage gaps and risk.',
    url: 'https://www.linkedin.com/pulse/ai-isnt-replacing-insurance-brokers-its-making-best-lmkhc/',
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── About Teaser ── */}
      <section className="py-28 px-8 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
                About
              </span>
              <h2 className="font-headline italic text-5xl text-primary mb-6 leading-tight">
                Marketing student.<br />AI-driven.
              </h2>
              <p className="text-on-surface-variant leading-relaxed mb-8 text-lg">
                Studying Marketing at Utah State University&apos;s Huntsman School of Business —
                graduating December 2026 with a 3.74 GPA while working full time. Head of
                Marketing at The Insurance Center of Utah, where I lead SEO, GEO, and AI
                innovation across the company&apos;s entire marketing operation.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-primary/40 text-primary px-6 py-3 rounded-md font-label uppercase tracking-[0.18em] text-sm transition-all duration-200 hover:bg-primary hover:text-on-primary"
              >
                My Story
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </FadeIn>
            <FadeIn delay={0.1} className="relative aspect-[4/3] rounded-[1.25rem] overflow-hidden shadow-soft">
              <Image
                src="/Golf.JPEG"
                alt="Jett golfing in Hawaii"
                fill
                className="object-cover"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Background ── */}
      <section className="py-20 px-8 bg-background border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-8 block">
              Background
            </span>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">

            {/* Work */}
            <FadeIn delay={0.05}>
              <div className="bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] p-8 h-full">
                <span className="material-symbols-outlined text-primary/60 text-2xl mb-4 block">work</span>
                <p className="font-label text-xs uppercase tracking-luxe text-outline mb-2">
                  The Insurance Center
                </p>
                <h3 className="font-headline italic text-3xl text-primary mb-1">
                  Head of Marketing
                </h3>
                <p className="text-on-surface-variant text-sm mb-6">
                  Farr West, UT &nbsp;·&nbsp; Jun 2024 – Present
                </p>
                <ul className="space-y-3">
                  {[
                    'Lead SEO, GEO and AI implementation',
                    'Licensed Insurance Agent (P&C)',
                    '50%+ brand exposure growth',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-on-surface-variant text-sm">
                      <span className="material-symbols-outlined text-primary text-base flex-shrink-0">task_alt</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Education */}
            <FadeIn delay={0.1}>
              <div className="bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] p-8 h-full">
                <span className="material-symbols-outlined text-primary/60 text-2xl mb-4 block">school</span>
                <p className="font-label text-xs uppercase tracking-luxe text-outline mb-2">
                  Utah State University
                </p>
                <h3 className="font-headline italic text-3xl text-primary mb-1">
                  B.S. Marketing
                </h3>
                <p className="text-on-surface-variant text-sm mb-6">
                  Jon M. Huntsman School of Business &nbsp;·&nbsp; Dec 2026
                </p>
                <ul className="space-y-3">
                  {[
                    'GPA 3.74 · Academic Scholarship',
                    'ProSales Member',
                    'Google Ads Certified',
                    'Meta Business Suite Certified',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-on-surface-variant text-sm">
                      <span className="material-symbols-outlined text-primary text-base flex-shrink-0">task_alt</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

          </div>

          {/* Download Resume */}
          <FadeIn delay={0.15}>
            <div className="max-w-3xl mx-auto mt-6">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full border border-primary/40 text-primary px-6 py-4 rounded-md font-label uppercase tracking-[0.18em] text-sm hover:bg-primary hover:text-on-primary transition-all duration-200"
              >
                Download Resume
                <span className="material-symbols-outlined text-sm">download</span>
              </a>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* ── Projects Teaser ── */}
      <section className="py-28 px-8 bg-background">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {featuredProjects.map((project, i) => (
              <FadeIn key={project.title} delay={i * 0.1}>
                <MotionCard className="h-full">
                <div className="bg-surface-container-highest rounded-[1.25rem] overflow-hidden border border-white/[0.08] shadow-soft h-full flex flex-col hover:shadow-premium transition-shadow duration-300">
                  <div className="relative aspect-[16/7]">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
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
                    <h3 className="font-headline italic text-xl text-primary mb-2">
                      {project.title}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed flex-1">
                      {project.description}
                    </p>
                  </div>
                </div>
                </MotionCard>
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
      <section className="py-28 px-8 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredArticles.map((article, i) => (
              <FadeIn key={article.title} delay={i * 0.1}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-surface-container p-8 rounded-[1.25rem] border border-white/[0.08] shadow-soft hover:border-primary/20 transition-colors group h-full"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-label text-[10px] uppercase tracking-luxe text-outline">
                      {article.source}
                    </span>
                    <span className="text-outline/50">·</span>
                    <span className="font-label text-[10px] uppercase tracking-luxe text-outline">
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-headline italic text-2xl text-primary mb-3 group-hover:text-primary-fixed transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                  <span className="text-primary font-label text-xs uppercase tracking-luxe">
                    Read on LinkedIn →
                  </span>
                </a>
              </FadeIn>
            ))}

          </div>
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
