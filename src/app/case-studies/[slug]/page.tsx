import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import { caseStudies, getCaseStudyBySlug } from '@/lib/caseStudies';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.tagline,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
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
              href="/case-studies"
              className="inline-flex items-center gap-2 text-outline font-label text-xs uppercase tracking-luxe mb-8 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              All case studies
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary-container text-on-primary-container rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-headline italic text-4xl md:text-6xl text-primary leading-tight mb-6">
              {study.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-outline font-label text-xs uppercase tracking-luxe">
              <span>{study.client}</span>
              <span className="text-outline/40">·</span>
              <span>{study.role}</span>
              <span className="text-outline/40">·</span>
              <span>{study.period}</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Context ── */}
      <section className="py-20 px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="font-headline italic text-2xl md:text-3xl text-primary mb-5">Context</h2>
            <div className="space-y-5">
              {study.overview.map((para, i) => (
                <p key={i} className="text-on-surface-variant text-lg leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── The Numbers ── */}
      <section className="py-4 px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="font-headline italic text-2xl md:text-3xl text-primary mb-8">
              The numbers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {study.metrics.map((m) => (
                <div
                  key={m.label}
                  className="bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] p-6 flex flex-col gap-3"
                >
                  <p className="font-label text-[10px] uppercase tracking-luxe text-outline">
                    {m.label}
                  </p>
                  <p className="font-headline italic text-4xl md:text-5xl text-primary leading-none">
                    {m.change}
                  </p>
                  <div className="flex items-center gap-2 text-on-surface-variant text-xs">
                    <span>{m.before}</span>
                    <span className="material-symbols-outlined text-sm text-primary/40">
                      arrow_forward
                    </span>
                    <span className="text-primary">{m.after}</span>
                  </div>
                  <p className="text-outline/80 text-xs leading-relaxed border-t border-white/[0.06] pt-3">
                    {m.source}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── GEO ── */}
      <section className="py-20 px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="font-headline italic text-2xl md:text-3xl text-primary mb-5">
              GEO — showing up in AI answers
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
              {study.geo.intro}
            </p>
            <ul className="space-y-3">
              {study.geo.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-on-surface-variant text-lg leading-relaxed"
                >
                  <span className="text-primary/60 mt-1.5 flex-shrink-0 text-sm">—</span>
                  {point}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* ── SearchLight ── */}
      <section className="px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] p-8">
              <span className="font-label text-[10px] uppercase tracking-luxe text-outline block mb-3">
                Separate from this work
              </span>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                {study.searchlight}{' '}
                <a
                  href="https://searchlight-digital-v2.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-fixed underline underline-offset-4 transition-colors"
                >
                  SearchLight Digital
                </a>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Method & disclosures ── */}
      <section className="py-20 px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="font-headline italic text-2xl md:text-3xl text-primary mb-5">
              Method &amp; disclosures
            </h2>
            <div className="space-y-4">
              {study.disclosures.map((note, i) => (
                <p key={i} className="text-on-surface-variant text-base leading-relaxed">
                  {note}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="py-20 px-8 bg-surface-container-low border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="font-label text-xs uppercase tracking-luxe text-outline mb-1">
                  Written by
                </p>
                <p className="font-headline italic text-2xl text-primary">Jett Iverson</p>
                <p className="text-on-surface-variant text-sm mt-1">
                  Acting Director of Marketing, The Insurance Center
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-2 border border-primary/40 text-primary px-5 py-2.5 rounded-md font-label uppercase tracking-[0.18em] text-xs hover:bg-primary hover:text-on-primary transition-all duration-200"
                >
                  Resume
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-md font-label uppercase tracking-[0.18em] text-xs hover:shadow-premium transition-all duration-200"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
