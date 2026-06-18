import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import { articles } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Content',
  description:
    'Articles and writing by Jett Iverson on AI, SEO, GEO, and modern marketing strategy.',
};

export default function ContentPage() {
  const onSite = articles.filter((a) => a.source === 'on-site' && a.status === 'published');
  const linkedIn = articles.filter((a) => a.source === 'LinkedIn Pulse' && a.status === 'published');
  const upcoming = articles.filter((a) => a.status === 'coming-soon');

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
              Writing
            </span>
            <h1 className="font-headline italic text-6xl md:text-8xl text-primary leading-tight mb-4">
              Content
            </h1>
            <p className="text-on-surface-variant text-xl max-w-xl">
              Writing about SEO, GEO, AI, and modern marketing — what&apos;s changing and what it
              means for real businesses.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── On-Site Articles ── */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <h2 className="font-headline italic text-3xl text-primary mb-2">Articles</h2>
            <p className="text-on-surface-variant text-sm mb-10">
              In-depth pieces on SEO, GEO, and what small businesses need to know.
            </p>
          </FadeIn>

          <div className="space-y-6">
            {onSite.map((article, i) => (
              <FadeIn key={article.slug} delay={i * 0.1}>
                <Link
                  href={`/content/${article.slug}`}
                  className="group block bg-surface-container-highest rounded-[1.25rem] p-8 border border-white/[0.08] shadow-soft hover:border-primary/20 transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="font-label text-[10px] uppercase tracking-luxe px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                      On-Site
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
                      Read Article →
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
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
