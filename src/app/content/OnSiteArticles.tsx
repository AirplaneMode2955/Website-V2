'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import type { Article } from '@/lib/articles';

export default function OnSiteArticles({ articles }: { articles: Article[] }) {
  const [active, setActive] = useState<string | null>(null);

  const topics = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of articles) {
      for (const t of a.topics) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([t]) => t);
  }, [articles]);

  const shown = active ? articles.filter((a) => a.topics.includes(active)) : articles;

  return (
    <>
      {topics.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActive(null)}
            className={`font-label text-[10px] uppercase tracking-luxe px-3 py-1.5 rounded-full border transition-colors ${
              active === null
                ? 'border-primary bg-primary text-on-primary'
                : 'border-white/10 text-on-surface/60 hover:border-primary/40 hover:text-primary'
            }`}
          >
            All
          </button>
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setActive(topic === active ? null : topic)}
              className={`font-label text-[10px] uppercase tracking-luxe px-3 py-1.5 rounded-full border transition-colors ${
                topic === active
                  ? 'border-primary bg-primary text-on-primary'
                  : 'border-white/10 text-on-surface/60 hover:border-primary/40 hover:text-primary'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-6">
        {shown.map((article, i) => (
          <FadeIn key={article.slug} delay={Math.min(i, 4) * 0.08}>
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
    </>
  );
}
