import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import { caseStudies } from '@/lib/caseStudies';

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Detailed write-ups of marketing work by Jett Iverson — SEO, GEO, and organic search results, measured in GA4 and Search Console.',
};

export default function CaseStudiesPage() {
  return (
    <>
      {/* ── Page Banner ── */}
      <section className="relative py-24 px-8 bg-surface-container-low border-b border-white/5 overflow-hidden">
        <span
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 font-headline italic text-primary select-none pointer-events-none leading-none pr-8"
          style={{ fontSize: 'clamp(6rem, 16vw, 15rem)', opacity: 0.04 }}
        >
          Case Studies
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
              Results
            </span>
            <h1 className="font-headline italic text-6xl md:text-8xl text-primary leading-tight mb-4">
              Case Studies
            </h1>
            <p className="text-on-surface-variant text-xl max-w-xl">
              Longer write-ups of specific work — what the problem was, what I did, and the
              numbers it moved. Every figure is pulled from the source it names.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── List ── */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto space-y-8">
          {caseStudies.map((study, i) => (
            <FadeIn key={study.slug} delay={i * 0.05}>
              <Link
                href={`/case-studies/${study.slug}`}
                className="group block bg-surface-container-highest rounded-[1.25rem] p-8 md:p-10 border border-white/[0.08] shadow-soft hover:border-primary/20 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary-container text-on-primary-container rounded-full">
                    The Insurance Center
                  </span>
                  <span className="font-label text-[10px] uppercase tracking-luxe text-outline">
                    {study.period}
                  </span>
                </div>

                <h2 className="font-headline italic text-3xl md:text-4xl text-primary mb-3 group-hover:text-primary-fixed transition-colors">
                  {study.title}
                </h2>

                <p className="text-on-surface-variant leading-relaxed mb-6 max-w-3xl">
                  {study.tagline}
                </p>

                <div className="flex flex-wrap gap-6 mb-6">
                  {study.metrics.slice(0, 3).map((m) => (
                    <div key={m.label}>
                      <p className="font-headline italic text-3xl md:text-4xl text-primary leading-none">
                        {m.change}
                      </p>
                      <p className="text-outline text-xs mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary/10 text-primary rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-primary font-label text-xs uppercase tracking-luxe group-hover:text-primary-fixed transition-colors hidden md:block">
                    Read case study →
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
