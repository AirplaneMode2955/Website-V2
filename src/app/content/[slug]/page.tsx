import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import { articles, getArticleBySlug } from '@/lib/articles';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return articles
    .filter((a) => a.source === 'on-site')
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.source !== 'on-site') {
    notFound();
  }

  return (
    <>
      {/* ── Banner ── */}
      <section className="relative py-24 px-8 bg-surface-container-low border-b border-white/5 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute left-8 top-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, var(--color-primary) 0%, transparent 70%)',
            opacity: 0.06,
          }}
        />
        <div className="max-w-3xl mx-auto relative z-10">
          <FadeIn>
            <Link
              href="/content"
              className="inline-flex items-center gap-2 text-outline font-label text-xs uppercase tracking-luxe mb-8 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              All writing
            </Link>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              {article.topics.map((topic) => (
                <span
                  key={topic}
                  className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary-container text-on-primary-container rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>

            <h1 className="font-headline italic text-4xl md:text-6xl text-primary leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-outline font-label text-xs uppercase tracking-luxe">
              <span>{article.date}</span>
              <span className="text-outline/40">·</span>
              <span>{article.readTime}</span>
              <span className="text-outline/40">·</span>
              <span>Jett Iverson</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Article Body ── */}
      <section className="py-20 px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          {article.sections?.map((section, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="mb-12">
                {section.heading && (
                  <h2 className="font-headline italic text-2xl md:text-3xl text-primary mb-5">
                    {section.heading}
                  </h2>
                )}
                <div className="space-y-5">
                  {section.body.split('\n\n').map((para, j) => {
                    const parts = para.split(/\*\*(.*?)\*\*/g);
                    return (
                      <p key={j} className="text-on-surface-variant text-lg leading-relaxed">
                        {parts.map((part, k) =>
                          k % 2 === 1 ? (
                            <strong key={k} className="text-primary font-medium">
                              {part}
                            </strong>
                          ) : (
                            part
                          )
                        )}
                      </p>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="py-20 px-8 bg-surface-container-low border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="font-label text-xs uppercase tracking-luxe text-outline mb-1">Written by</p>
                <p className="font-headline italic text-2xl text-primary">Jett Iverson</p>
                <p className="text-on-surface-variant text-sm mt-1">
                  Head of Marketing · SearchLight Digital Founder
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/content"
                  className="inline-flex items-center gap-2 border border-primary/40 text-primary px-5 py-2.5 rounded-md font-label uppercase tracking-[0.18em] text-xs hover:bg-primary hover:text-on-primary transition-all duration-200"
                >
                  More writing
                </Link>
                <a
                  href="https://www.linkedin.com/in/jettiverson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-md font-label uppercase tracking-[0.18em] text-xs hover:shadow-premium transition-all duration-200"
                >
                  Follow on LinkedIn
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
