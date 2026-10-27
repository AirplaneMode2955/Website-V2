import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import { articles } from '@/lib/articles';
import { CHANNEL_URL, episodeGroups } from '@/lib/podcast';
import ContentFeed, { type FeedItem } from './ContentFeed';

export const metadata: Metadata = {
  alternates: { canonical: '/content' },
  title: 'Content',
  description:
    'Articles and Commute 2 Work podcast episodes by Jett Iverson on AI, SEO, GEO, careers, and modern marketing strategy.',
};

export default function ContentPage() {
  const onSite = articles.filter((a) => a.source === 'on-site' && a.status === 'published');
  const linkedIn = articles.filter((a) => a.source === 'LinkedIn Pulse' && a.status === 'published');
  const upcoming = articles.filter((a) => a.status === 'coming-soon');

  const articleItems: FeedItem[] = onSite.map((a) => ({
    kind: 'article',
    id: `article-${a.slug}`,
    title: a.title,
    href: `/content/${a.slug}`,
    topics: a.topics,
    excerpt: a.excerpt,
    date: a.date,
    readTime: a.readTime,
  }));
  const podcastItems: FeedItem[] = episodeGroups.flatMap((g) =>
    g.episodes.map((ep) => ({
      kind: 'podcast' as const,
      id: `podcast-${ep.id}`,
      title: ep.title,
      href: `https://www.youtube.com/watch?v=${ep.id}`,
      topics: [g.title],
      videoId: ep.id,
    })),
  );
  // Alternate article / episode so neither type bunches up; leftovers go last.
  const feed: FeedItem[] = [];
  for (let i = 0; i < Math.max(articleItems.length, podcastItems.length); i++) {
    if (articleItems[i]) feed.push(articleItems[i]);
    if (podcastItems[i]) feed.push(podcastItems[i]);
  }

  return (
    <>
      {/* ── Page Banner ── */}
      <section className="relative py-24 px-8 bg-surface-container-low border-b border-white/5 overflow-hidden">
        <span
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 font-headline italic text-primary select-none pointer-events-none leading-none pr-8"
          style={{ fontSize: 'clamp(8rem, 20vw, 18rem)', opacity: 0.04 }}
        >
          Content
        </span>
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
              Writing &amp; podcast
            </span>
            <h1 className="font-headline italic text-6xl md:text-8xl text-primary leading-tight mb-4">
              Content
            </h1>
            <p className="text-on-surface-variant text-xl max-w-xl">
              Writing about SEO, GEO, AI, and modern marketing, plus the Commute 2 Work podcast —
              what&apos;s changing and what it means for real businesses.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/podcast"
                className="inline-flex items-center gap-2 border border-primary/40 text-primary px-6 py-3 rounded-md font-label uppercase tracking-[0.18em] text-sm transition-all duration-200 hover:bg-primary hover:text-on-primary"
              >
                Podcast page &amp; top Shorts
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-outline font-label uppercase tracking-luxe text-xs px-2 py-3 hover:text-primary transition-colors"
              >
                Watch on YouTube
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Topics I Cover ── */}
      <section className="py-16 px-8 bg-surface-container-low border-b border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-6 block">
              Topics I cover
            </span>
            <div className="flex flex-wrap gap-3">
              {[
                'SEO',
                'GEO / AI Search',
                'Google Ads',
                'Analytics & GA4',
                'Insurance Marketing',
                'AI & Automation',
              ].map((topic) => (
                <span
                  key={topic}
                  className="font-label text-xs uppercase tracking-luxe px-4 py-2 bg-primary-container text-on-primary-container rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── On-Site Articles ── */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <h2 className="font-headline italic text-3xl text-primary mb-2">Articles &amp; episodes</h2>
            <p className="text-on-surface-variant text-sm mb-10">
              Written pieces and Commute 2 Work episodes in one feed. Filter by type.
            </p>
          </FadeIn>

          <ContentFeed items={feed} />
        </div>
      </section>

      {/* ── LinkedIn Published ── */}
      <section className="py-24 px-8 bg-background border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <h2 className="font-headline italic text-3xl text-primary mb-2">On LinkedIn</h2>
            <p className="text-on-surface-variant text-sm mb-10">
              Published pieces on LinkedIn Pulse.
            </p>
          </FadeIn>

          <div className="space-y-6">
            {linkedIn.map((article, i) => (
              <FadeIn key={article.slug} delay={i * 0.1}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-surface-container-highest rounded-[1.25rem] p-8 border border-white/[0.08] shadow-soft hover:border-primary/20 transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="font-label text-[10px] uppercase tracking-luxe text-outline">
                      {article.source}
                    </span>
                    {article.date && (
                      <>
                        <span className="text-outline/40">·</span>
                        <span className="font-label text-[10px] uppercase tracking-luxe text-outline">
                          {article.date}
                        </span>
                      </>
                    )}
                    {article.readTime && (
                      <>
                        <span className="text-outline/40">·</span>
                        <span className="font-label text-[10px] uppercase tracking-luxe text-outline">
                          {article.readTime}
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="font-headline italic text-2xl md:text-3xl text-primary mb-3 group-hover:text-primary-fixed transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-on-surface-variant leading-relaxed mb-5 max-w-3xl">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {article.topics.map((topic) => (
                        <span
                          key={topic}
                          className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary-container text-on-primary-container rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    <span className="text-primary font-label text-xs uppercase tracking-luxe group-hover:text-primary-fixed transition-colors hidden md:block">
                      Read on LinkedIn →
                    </span>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coming Soon ── */}
      {upcoming.length > 0 && (
        <section className="py-24 px-8 bg-surface-container-low border-t border-white/5">
          <div className="max-w-screen-2xl mx-auto">
            <FadeIn>
              <h2 className="font-headline italic text-3xl text-primary mb-2">Coming Soon</h2>
              <p className="text-on-surface-variant text-sm mb-10">
                Topics I&apos;m actively writing about.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcoming.map((article, i) => (
                <FadeIn key={article.slug} delay={i * 0.1}>
                  <div className="bg-surface-container-highest rounded-[1.25rem] p-8 border border-dashed border-primary/15 h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-label text-[10px] uppercase tracking-luxe text-outline">
                        {article.source}
                      </span>
                      <span className="text-outline/40">·</span>
                      <span className="font-label text-[10px] uppercase tracking-luxe bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                    <h3 className="font-headline italic text-2xl text-primary mb-3">
                      {article.title}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-5">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {article.topics.map((topic) => (
                        <span
                          key={topic}
                          className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary-container text-on-primary-container rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── LinkedIn CTA ── */}
      <section className="py-20 px-8 bg-background border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto text-center">
          <FadeIn>
            <p className="text-on-surface-variant text-lg mb-2">Most of my writing lives on LinkedIn.</p>
            <p className="text-on-surface-variant/60 text-sm mb-8">
              Follow along for SEO, GEO, and AI strategy — posted regularly.
            </p>
            <a
              href="https://www.linkedin.com/in/jettiverson"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-md font-label uppercase tracking-[0.18em] text-sm transition-all duration-200 shadow-soft hover:shadow-premium hover:scale-[1.03]"
            >
              Follow on LinkedIn
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
