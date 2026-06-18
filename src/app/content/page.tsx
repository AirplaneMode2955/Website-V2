import type { Metadata } from 'next';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Content',
  description:
    'Articles and writing by Jett Iverson on AI, SEO, GEO, and modern marketing strategy.',
};

type Article = {
  source: string;
  readTime?: string;
  title: string;
  excerpt: string;
  url: string;
  status: 'published' | 'coming-soon';
  date?: string;
  topics: string[];
};

const articles: Article[] = [
  {
    source: 'LinkedIn Pulse',
    readTime: '5 min read',
    date: 'March 2026',
    title: 'What It Means to Be a Big "I" Best Practices Agency (And Why It Should Matter to You)',
    excerpt:
      'The Big "I" Best Practices designation is a data-driven recognition from the Independent Insurance Agents & Brokers of America that identifies the top-performing independent agencies in the country. The Insurance Center has earned it for six consecutive years running — here\'s what that means and why it matters to every client we serve.',
    url: 'https://www.linkedin.com/pulse/what-means-big-i-best-practices-agency-why-should-matter-4pizc/',
    status: 'published',
    topics: ['Insurance', 'Agency Management', 'Best Practices'],
  },
  {
    source: 'LinkedIn Pulse',
    readTime: '4 min read',
    date: 'March 2026',
    title: "AI Isn't Replacing Insurance Brokers, It's Making the Best Ones Better",
    excerpt:
      'How integrating AI into the workflow enhances broker efficiency — spending less time on admin and more time providing meaningful guidance on coverage gaps and risk. The brokers who learn to use these tools well will pull away from those who don\'t.',
    url: 'https://www.linkedin.com/pulse/ai-isnt-replacing-insurance-brokers-its-making-best-lmkhc/',
    status: 'published',
    topics: ['AI', 'Insurance', 'Workflow'],
  },
  {
    source: 'LinkedIn Pulse',
    title: 'The SEO Playbook for AI-Mediated Search',
    excerpt:
      'Traditional SEO is not dead — but it\'s not enough on its own anymore. As AI Overviews, ChatGPT, and Perplexity reshape how people find information, the brands that win will be the ones optimizing for both search engines and the AI models that summarize them.',
    url: '#',
    status: 'coming-soon',
    topics: ['SEO', 'GEO', 'AI Search'],
  },
  {
    source: 'LinkedIn Pulse',
    title: 'Building High-Leverage Workflows with AI',
    excerpt:
      'The biggest unlock in AI is not replacing tasks — it\'s eliminating the friction between tasks. Here\'s how to identify the highest-leverage places to build automation in your marketing stack and what tools are actually worth using.',
    url: '#',
    status: 'coming-soon',
    topics: ['AI', 'Automation', 'Marketing'],
  },
];

export default function ContentPage() {
  const published = articles.filter((a) => a.status === 'published');
  const upcoming = articles.filter((a) => a.status === 'coming-soon');

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
          Content
        </span>
        {/* Radial glow */}
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
              Writing about what I&apos;m learning in AI, SEO, GEO, and modern marketing — mostly
              on LinkedIn.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Topics ── */}
      <section className="py-16 px-8 bg-background border-b border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-6 block">
              Topics
            </span>
            <div className="flex flex-wrap gap-3">
              {[
                'AI & Automation',
                'SEO',
                'GEO',
                'AI-Mediated Search',
                'Marketing Strategy',
                'Insurance Industry',
                'Workflow Design',
                'Content Strategy',
                'Local SEO',
              ].map((topic) => (
                <span
                  key={topic}
                  className="font-label text-xs uppercase tracking-luxe px-4 py-2 bg-surface-container-highest border border-white/[0.08] text-on-surface-variant rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Published Articles ── */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <h2 className="font-headline italic text-3xl text-primary mb-10">Published</h2>
          </FadeIn>

          <div className="space-y-6">
            {published.map((article, i) => (
              <FadeIn key={article.title} delay={i * 0.1}>
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
      <section className="py-24 px-8 bg-background">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <h2 className="font-headline italic text-3xl text-primary mb-2">Coming Soon</h2>
            <p className="text-on-surface-variant text-sm mb-10">
              Topics I&apos;m actively writing about.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcoming.map((article, i) => (
              <FadeIn key={article.title} delay={i * 0.1}>
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

      {/* ── LinkedIn CTA ── */}
      <section className="py-20 px-8 bg-surface-container-low border-t border-white/5">
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
