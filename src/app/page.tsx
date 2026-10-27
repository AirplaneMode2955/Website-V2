import type { Metadata } from 'next';
import FadeIn from '@/components/FadeIn';
import Link from 'next/link';
import Image from 'next/image';
import HeroSection from '@/components/HeroSection';
import { getOnSiteArticles } from '@/lib/articles';
import { getLatestEpisode } from '@/lib/latestEpisode';
import InkUnderline from '@/components/motion/InkUnderline';
import CountUpStats, { type Stat } from '@/components/motion/CountUpStats';
import TiltCard from '@/components/motion/TiltCard';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

// The latest-episode card reads YouTube's RSS feed; refresh it hourly.
export const revalidate = 3600;

const adsStats: Stat[] = [
  { label: 'Impressions', value: 7.4, format: 'multiplier', before: 69200, after: 513980, beforeLabel: '69,200', afterLabel: '513,980' },
  { label: 'Clicks', value: 7.9, format: 'multiplier', before: 2060, after: 16372, beforeLabel: '2,060', afterLabel: '16,372' },
  { label: 'Inbound Calls', value: 105, format: 'percent', before: 181, after: 371, beforeLabel: '181', afterLabel: '371' },
  { label: 'Digital Premium', value: 490713, format: 'currency', after: 490713, beforeLabel: '—', afterLabel: '$490,713', note: '306 policies' },
];

type Build = {
  kind: 'Work' | 'For fun';
  title: string;
  description: string;
  tags: string[];
  href: string;
  external?: boolean;
  cta: string;
};

const builds: Build[] = [
  {
    kind: 'Work',
    title: 'Marketing Dashboard',
    description:
      'A week of reports collapsed into a one-minute answer to "what\'s working?" Built for The Insurance Center.',
    tags: ['React', 'Python', 'Analytics'],
    href: '/case-studies/marketing-dashboard',
    cta: 'Read the case study',
  },
  {
    kind: 'Work',
    title: 'AI Prospecting Agent',
    description:
      'ZoomInfo connected to Claude so the week\'s best prospects show up ranked, with outreach already drafted.',
    tags: ['Claude', 'MCP', 'Automation'],
    href: '/case-studies/ai-prospecting-agent',
    cta: 'Read the case study',
  },
  {
    kind: 'Work',
    title: 'SearchLight Digital',
    description:
      'An SEO and GEO agency built for the new era of search, where AI answers are the new page one.',
    tags: ['SEO', 'GEO', 'AI Search'],
    href: 'https://searchlight-digital-v2.vercel.app/',
    external: true,
    cta: 'Visit site',
  },
  {
    kind: 'For fun',
    title: 'Play Me in Chess',
    description:
      'A chess bot trained on 311 of my real games, with a leaderboard behind an API I wrote.',
    tags: ['AI', 'Chess', 'API'],
    href: '/play/play-me-chess',
    cta: 'Play it',
  },
  {
    kind: 'For fun',
    title: 'Premier League Command Center',
    description:
      'A live one-screen match-day dashboard. A proxy I wrote shrinks a 743 KB payload to the 12 KB the screen needs.',
    tags: ['Next.js', 'API Proxy', 'Data Viz'],
    href: 'https://plcc-live.vercel.app',
    external: true,
    cta: 'Visit site',
  },
  {
    kind: 'For fun',
    title: 'Utah Golf Tinder',
    description:
      "Log every Utah course you've played and watch your percentage of the whole state tick up.",
    tags: ['React', 'Maps', 'Golf'],
    href: 'https://utah-golf-tinder.vercel.app/',
    external: true,
    cta: 'Visit site',
  },
];

export default async function Home() {
  const [featuredArticle] = getOnSiteArticles();
  const latestEpisode = await getLatestEpisode();
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
                Marketing student.<br />
                <InkUnderline variant="flick">AI-driven.</InkUnderline>
              </h2>
              <p className="text-on-surface-variant leading-relaxed mb-8 text-lg">
                Studying Marketing at Utah State University&apos;s Huntsman School of Business —
                graduating December 2026 with a 3.74 GPA while working full time. Director of Marketing at The Insurance Center, where I lead SEO, GEO, and AI
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
                sizes="(max-width: 768px) 100vw, 50vw"
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
                  Director of Marketing
                </h3>
                <p className="text-on-surface-variant text-sm mb-6">
                  Farr West, UT &nbsp;·&nbsp; Jun 2024 – Present &nbsp;·&nbsp; Director since Apr 2025
                </p>
                <ul className="space-y-3">
                  {[
                    'Lead SEO, GEO and AI implementation',
                    'Licensed Insurance Agent (P&C)',
                    'YouTube views up 12× in 2026',
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

      {/* ── Case Studies ── */}
      <section className="py-28 px-8 bg-surface-container-low border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
              Results
            </span>
            <h2 className="font-headline italic text-5xl text-primary mb-4">
              By the <InkUnderline variant="flick">numbers</InkUnderline>
            </h2>
            <p className="text-on-surface-variant text-lg mb-6 max-w-xl">
              Real outcomes from real campaigns. These are the numbers behind the work at The Insurance Center.
            </p>
            <div className="flex flex-col gap-4 mb-16">
              <Link
                href="/case-studies/organic-search"
                className="inline-flex items-center gap-2 text-primary font-headline italic text-lg hover:text-primary-fixed transition-colors"
              >
                Full case study: growing organic search 203%
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-outline font-label uppercase tracking-luxe text-xs hover:text-primary transition-colors"
              >
                More: AI prospecting agent, marketing dashboard, YouTube growth
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
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
              <CountUpStats stats={adsStats} />
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
                <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
                  <div>
                    <p className="font-headline italic text-6xl text-primary leading-none">+222%</p>
                    <p className="text-on-surface-variant text-sm mt-2">review growth</p>
                  </div>
                  <div className="text-on-surface-variant text-sm pb-1">
                    <span className="text-outline">95 reviews</span>
                    <span className="mx-2 text-primary/40">→</span>
                    <span className="text-primary font-medium">306 reviews</span>
                    <span className="block text-outline mt-1">rating holding at 4.9</span>
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
                <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
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

      {/* ── Things I've built: work and fun in one grid ── */}
      <section className="py-28 px-8 bg-background">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
                  Projects
                </span>
                <h2 className="font-headline italic text-5xl text-primary mb-4">
                  Things I&apos;ve <InkUnderline variant="flick">built</InkUnderline>
                </h2>
                <p className="text-on-surface-variant text-lg max-w-xl">
                  Some of it runs the marketing at work. Some of it is just for fun.
                </p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {builds.map((build, i) => (
              <FadeIn key={build.title} delay={(i % 3) * 0.1} className="h-full">
                <TiltCard className="bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] p-6 flex flex-col hover:border-primary/20">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span
                      className={`font-label text-[10px] uppercase tracking-luxe px-3 py-1 rounded-full ${
                        build.kind === 'Work'
                          ? 'bg-primary text-on-primary'
                          : 'bg-secondary/20 text-secondary'
                      }`}
                    >
                      {build.kind}
                    </span>
                    {build.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary-container text-on-primary-container rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-headline italic text-xl text-primary mb-2">{build.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed flex-1 mb-4">
                    {build.description}
                  </p>
                  {build.external ? (
                    <a
                      href={build.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-label uppercase tracking-[0.18em] text-xs hover:text-primary-fixed transition-colors"
                    >
                      {build.cta}
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                  ) : (
                    <Link
                      href={build.href}
                      className="inline-flex items-center gap-2 text-primary font-label uppercase tracking-[0.18em] text-xs hover:text-primary-fixed transition-colors"
                    >
                      {build.cta}
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  )}
                </TiltCard>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-center">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 border border-primary/40 text-primary px-6 py-3 rounded-md font-label uppercase tracking-[0.18em] text-sm hover:bg-primary hover:text-on-primary transition-all duration-200"
              >
                All Projects
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <Link
                href="/play"
                className="inline-flex items-center justify-center gap-2 border border-primary/40 text-primary px-6 py-3 rounded-md font-label uppercase tracking-[0.18em] text-sm hover:bg-primary hover:text-on-primary transition-all duration-200"
              >
                Open the Arcade
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Podcast Teaser ── */}
      <section className="py-28 px-8 bg-background border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
              Podcast
            </span>
            <h2 className="font-headline italic text-5xl text-primary mb-6">
              Commute 2 <InkUnderline variant="flick">Work</InkUnderline>
            </h2>
            <p className="text-on-surface-variant text-lg mb-8 max-w-2xl leading-relaxed">
              A podcast recorded from the driver&apos;s seat. I turned my commute into a place to
              think out loud about AI, careers, and the algorithm, and I&apos;m automating the
              whole channel along the way.
            </p>
            <Link
              href="/podcast"
              className="inline-flex items-center gap-2 border border-primary/40 text-primary px-6 py-3 rounded-md font-label uppercase tracking-[0.18em] text-sm transition-all duration-200 hover:bg-primary hover:text-on-primary"
            >
              Where to start
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </FadeIn>

          {latestEpisode && (
            <FadeIn delay={0.1}>
              <a
                href={`https://www.youtube.com/watch?v=${latestEpisode.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-12 flex flex-col sm:flex-row gap-6 items-center max-w-3xl bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] p-4 hover:border-primary/20 transition-colors"
              >
                <div className="relative w-full sm:w-64 aspect-video flex-shrink-0 rounded-[0.75rem] overflow-hidden">
                  <Image
                    src={`https://i.ytimg.com/vi/${latestEpisode.id}/hqdefault.jpg`}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 256px"
                    className="object-cover"
                  />
                </div>
                <div className="sm:pr-4">
                  <p className="font-label text-[10px] uppercase tracking-luxe text-outline mb-2">
                    Latest episode ·{' '}
                    {new Date(latestEpisode.published).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      timeZone: 'UTC',
                    })}
                  </p>
                  <p className="font-headline italic text-xl text-primary group-hover:text-primary-fixed transition-colors">
                    {latestEpisode.title}
                  </p>
                </div>
              </a>
            </FadeIn>
          )}
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

          {featuredArticle && (
            <FadeIn>
              <Link
                href={`/content/${featuredArticle.slug}`}
                className="block bg-surface-container p-8 md:p-10 rounded-[1.25rem] border border-white/[0.08] shadow-soft hover:border-primary/20 transition-colors group max-w-3xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-label text-[10px] uppercase tracking-luxe px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                    On-Site
                  </span>
                  <span className="text-outline/50">·</span>
                  <span className="font-label text-[10px] uppercase tracking-luxe text-outline">
                    {featuredArticle.readTime}
                  </span>
                </div>
                <h3 className="font-headline italic text-2xl md:text-3xl text-primary mb-3 group-hover:text-primary-fixed transition-colors">
                  {featuredArticle.title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  {featuredArticle.excerpt}
                </p>
                <span className="text-primary font-label text-xs uppercase tracking-luxe">
                  Read Article →
                </span>
              </Link>
            </FadeIn>
          )}
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
              Outside the <InkUnderline variant="flick">office</InkUnderline>
            </h2>
          </FadeIn>
          <div className="photo-wall columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {[
              { src: '/fishing-pond-golden.jpg', alt: 'Fishing a still pond at golden hour with the dog watching, Utah foothills behind' },
              { src: '/couple-forest-hillside.jpg', alt: 'Jett and his wife on a wooded hillside with the dog' },
              { src: '/IMG_6716.JPEG', alt: 'Jett and his wife at Lake Como, Italy' },
              { src: '/fishing-sunset-silhouette.jpg', alt: 'Silhouetted at the lake, fishing under a burning sunset' },
              { src: '/Wedding.JPEG', alt: 'Wedding day' },
              { src: '/snowbasin-summer-dog.jpg', alt: 'At Snowbasin in summer with the dog, gondola line up the green run' },
              { src: '/IMG_7344.JPEG', alt: 'Jett and his wife at an Argentina soccer match' },
              { src: '/Fishing Wind Rivers.JPEG', alt: 'Fishing in the Wind Rivers' },
              { src: '/IMG_0208.JPEG', alt: 'Cooking class in Rome' },
              { src: '/Golf.JPEG', alt: 'On the golf course' },
              { src: '/Mountain 2.0.JPEG', alt: 'Mountain adventure' },
              { src: '/Snow Time with Wife.JPEG', alt: 'Snow day with wife' },
              { src: '/Double Rainbow.JPEG', alt: 'Double rainbow' },
              { src: '/Mission.JPEG', alt: 'LDS Mission in Brazil' },
              { src: '/Fishing sitting down.jpeg', alt: 'Fishing' },
              { src: '/Baby Jett.JPEG', alt: 'Baby Jett' },
              { src: '/IMG_0961.JPEG', alt: 'Jett and his wife in the mountains' },
              { src: '/IMG_8221.jpeg', alt: 'Christmas lights date night' },
              { src: '/IMG_9203.JPEG', alt: 'Jett and his wife at a wedding' },
              { src: '/IMG_6857.JPEG', alt: 'Kissing in the rain at a lakeside heart sculpture' },
              { src: '/IMG_0104.JPEG', alt: 'In Naples, Italy wearing Argentina jerseys' },
              { src: '/Fishing w leo.JPEG', alt: 'Teaching a toddler to fish on the river' },
            ].map((photo) => (
              <FadeIn key={photo.src} className="break-inside-avoid">
                <figure tabIndex={0} className="photo relative m-0 overflow-hidden rounded-[0.75rem] outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={600}
                    height={800}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="w-full h-auto object-cover"
                  />
                  <figcaption
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 px-3 pb-2.5 pt-8 font-headline italic text-sm md:text-[15px] leading-snug text-white bg-gradient-to-t from-[#0f140f]/90 to-transparent"
                  >
                    {photo.alt}
                  </figcaption>
                </figure>
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
              Got something worth building,<br />
              or just want to play{' '}
              <InkUnderline variant="swoop" color="text-secondary">a quick 9?</InkUnderline>
            </h2>
            <p className="text-on-primary-container/70 text-lg mb-10 max-w-xl mx-auto">
              Let me know.
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
            <p className="mt-6 text-on-primary-container/70 text-sm">
              Or write directly:{' '}
              <a
                href="mailto:jett@insurancecenterut.com"
                className="underline underline-offset-4 hover:text-on-primary-container transition-colors"
              >
                jett@insurancecenterut.com
              </a>
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
