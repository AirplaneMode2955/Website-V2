import FadeIn from '@/components/FadeIn';
import Link from 'next/link';
import Image from 'next/image';
import HeroSection from '@/components/HeroSection';
import { getOnSiteArticles } from '@/lib/articles';

const featuredProjects = [
  {
    title: 'SearchLight Digital',
    description:
      'An SEO and GEO agency built for the new era of search — where AI answers are the new page one and most businesses have no idea they\'re invisible.',
    tags: ['SEO', 'GEO', 'AI Search', 'Agency'],
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80',
    imageAlt: 'Digital marketing and search strategy dashboard',
    link: 'https://searchlight-digital-v2.vercel.app/',
  },
  {
    title: 'Apple Watch Whoop Replacement',
    description:
      'A personal health algorithm that turns Apple Watch data into Whoop-style recovery and strain scores — without the subscription.',
    tags: ['Python', 'Apple Health', 'Health Tech'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    imageAlt: 'Health metrics and wearable data dashboard',
    link: null,
  },
];

export default function Home() {
  const featuredArticles = getOnSiteArticles().slice(0, 2);
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
                Marketing at The Insurance Center, where I lead SEO, GEO, and AI
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
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
              Background
            </span>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">

            {/* Work */}
            <FadeIn delay={0.05}>
              <div className="bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] p-8 h-full">
                <span className="material-symbols-outlined text-primary/60 text-2xl mb-4 block" aria-hidden="true">work</span>
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
                      <span className="material-symbols-outlined text-primary text-base flex-shrink-0" aria-hidden="true">task_alt</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Education */}
            <FadeIn delay={0.1}>
              <div className="bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] p-8 h-full">
                <span className="material-symbols-outlined text-primary/60 text-2xl mb-4 block" aria-hidden="true">school</span>
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
                      <span className="material-symbols-outlined text-primary text-base flex-shrink-0" aria-hidden="true">task_alt</span>
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
                className="flex items-center justify-center gap-2 w-full border border-primary/40 text-primary px-6 py-4 rounded-md font-label uppercase tracking-luxe text-sm hover:bg-primary hover:text-on-primary transition-all duration-200"
              >
                Download Resume
                <span className="material-symbols-outlined text-sm" aria-hidden="true">download</span>
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
                    {project.link && (
                      <div className="mt-4">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border border-primary/40 text-primary px-4 py-2 rounded-md font-label uppercase tracking-[0.18em] text-xs hover:bg-primary hover:text-on-primary transition-all duration-200"
                        >
                          Visit Site
                          <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </a>
                      </div>
                    )}
                  </div>
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

      {/* ── Case Studies ── */}
      <section className="py-28 px-8 bg-surface-container-low border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
              Results
            </span>
            <h2 className="font-headline italic text-5xl text-primary mb-4">By the numbers</h2>
            <p className="text-on-surface-variant text-lg mb-16 max-w-xl">
              Real outcomes from real campaigns. These are the numbers behind the work at The Insurance Center.
            </p>
          </FadeIn>

          {/* Feature case study — Google Ads */}
          <FadeIn delay={0.05}>
            <div className="bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] shadow-soft overflow-hidden mb-8">
              <div className="p-8 md:p-12 border-b border-white/[0.06]">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary-container text-on-primary-container rounded-full">
                    The Insurance Center
                  </span>
                  <span className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary-container text-on-primary-container rounded-full">
                    Google Ads
                  </span>
                  <span className="font-label text-[10px] uppercase tracking-luxe text-outline">
                    2024 → 2025
                  </span>
                </div>
                <h3 className="font-headline italic text-3xl md:text-4xl text-primary mb-3">
                  Search performance rebuilt from the ground up
                </h3>
                <p className="text-on-surface-variant max-w-2xl leading-relaxed">
                  Took over a stagnant Google Ads account and rebuilt the strategy from scratch — new campaign architecture,
                  tighter audience targeting, and landing pages optimized for insurance intent. The results compounded fast.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/[0.06]">
                {[
                  { label: 'Impressions', before: '69,200', after: '513,980', change: '7.4×' },
                  { label: 'Clicks', before: '2,060', after: '16,372', change: '7.9×' },
                  { label: 'Inbound Calls', before: '181', after: '371', change: '+105%' },
                  { label: 'Digital Premium', before: '—', after: '$490,713', change: '306 policies' },
                ].map((stat) => (
                  <div key={stat.label} className="p-8 flex flex-col gap-3">
                    <p className="font-label text-[10px] uppercase tracking-luxe text-outline">{stat.label}</p>
                    <div>
                      <p className="font-headline italic text-4xl md:text-5xl text-primary leading-none">
                        {stat.change}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant text-xs">
                      <span>{stat.before}</span>
                      <span className="material-symbols-outlined text-sm text-primary/40">arrow_forward</span>
                      <span className="text-primary">{stat.after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Two smaller case studies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn delay={0.1}>
              <div className="bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] shadow-soft p-8 h-full flex flex-col">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary-container text-on-primary-container rounded-full">
                    The Insurance Center
                  </span>
                  <span className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary-container text-on-primary-container rounded-full">
                    Local SEO
                  </span>
                </div>
                <h3 className="font-headline italic text-2xl text-primary mb-3">
                  Google Reviews — reputation built systematically
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-8 flex-1">
                  Built an internal workflow that made requesting reviews a trackable, competitive team activity.
                  A leaderboard surfacing each agent&apos;s review count changed behavior agency-wide.
                </p>
                <div className="flex items-end gap-6">
                  <div>
                    <p className="font-headline italic text-6xl text-primary leading-none">+184%</p>
                    <p className="text-on-surface-variant text-sm mt-2">review growth</p>
                  </div>
                  <div className="text-on-surface-variant text-sm pb-1">
                    <span className="text-outline">95 reviews</span>
                    <span className="mx-2 text-primary/40">→</span>
                    <span className="text-primary font-medium">270 reviews</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] shadow-soft p-8 h-full flex flex-col">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary-container text-on-primary-container rounded-full">
                    The Insurance Center
                  </span>
                  <span className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary-container text-on-primary-container rounded-full">
                    Automation
                  </span>
                </div>
                <h3 className="font-headline italic text-2xl text-primary mb-3">
                  Automated drip campaigns — outreach that runs itself
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-8 flex-1">
                  Designed and deployed automated lead gen workflows that maintain contact with prospects and commercial accounts
                  over time — removing manual follow-up from the process entirely.
                </p>
                <div className="flex items-end gap-6">
                  <div>
                    <p className="font-headline italic text-6xl text-primary leading-none">+200%</p>
                    <p className="text-on-surface-variant text-sm mt-2">outreach volume</p>
                  </div>
                  <div className="text-on-surface-variant text-sm pb-1">
                    fully automated
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
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
              <FadeIn key={article.slug} delay={i * 0.1}>
                <Link
                  href={`/content/${article.slug}`}
                  className="block bg-surface-container p-8 rounded-[1.25rem] border border-white/[0.08] shadow-soft hover:border-primary/20 transition-colors group h-full"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-label text-[10px] uppercase tracking-luxe px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                      On-Site
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
                    Read Article →
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo Bank ── */}
      <section className="py-28 px-8 bg-background border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
              Life
            </span>
            <h2 className="font-headline italic text-5xl text-primary mb-12">
              Outside the office
            </h2>
          </FadeIn>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {[
              { src: '/Wedding.JPEG', alt: 'Wedding day' },
              { src: '/Fishing Wind Rivers.JPEG', alt: 'Fishing in the Wind Rivers' },
              { src: '/Golf.JPEG', alt: 'On the golf course' },
              { src: '/Mountain 2.0.JPEG', alt: 'Mountain adventure' },
              { src: '/Fishing w leo.JPEG', alt: 'Fishing with Leo' },
              { src: '/Snow Time with Wife.JPEG', alt: 'Snow day with wife' },
              { src: '/Double Rainbow.JPEG', alt: 'Double rainbow' },
              { src: '/High School Golf.JPEG', alt: 'High school golf' },
              { src: '/Baby Jett.JPEG', alt: 'Baby Jett' },
              { src: '/Mission.JPEG', alt: 'Mission' },
              { src: '/Fishing sitting down.jpeg', alt: 'Fishing' },
              { src: '/Elementary Age Jett.JPEG', alt: 'Elementary school days' },
            ].map((photo) => (
              <FadeIn key={photo.src} className="break-inside-avoid">
                <div className="relative overflow-hidden rounded-[0.75rem]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover"
                  />
                </div>
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
