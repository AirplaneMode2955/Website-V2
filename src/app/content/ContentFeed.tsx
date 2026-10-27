'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export type FeedItem = {
  kind: 'article' | 'podcast';
  id: string;
  title: string;
  href: string;
  topics: string[];
  excerpt?: string;
  date?: string;
  readTime?: string;
  /** YouTube video id, podcast items only. */
  videoId?: string;
};

type TypeFilter = 'all' | FeedItem['kind'];

const chip = (on: boolean) =>
  `font-label text-[10px] uppercase tracking-luxe px-3 py-1.5 rounded-full border transition-colors ${
    on
      ? 'border-primary bg-primary text-on-primary'
      : 'border-white/10 text-on-surface/60 hover:border-primary/40 hover:text-primary'
  }`;

export default function ContentFeed({ items }: { items: FeedItem[] }) {
  const [type, setType] = useState<TypeFilter>('all');

  const shown = type === 'all' ? items : items.filter((i) => i.kind === type);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by type">
        <button onClick={() => setType('all')} className={chip(type === 'all')}>
          All
        </button>
        <button onClick={() => setType('article')} className={chip(type === 'article')}>
          Articles
        </button>
        <button onClick={() => setType('podcast')} className={chip(type === 'podcast')}>
          Podcast
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {shown.map((item, i) => (
          <FadeIn key={item.id} delay={Math.min(i, 4) * 0.06} className="h-full">
            {item.kind === 'article' ? (
              <Link
                href={item.href}
                className="group flex h-full flex-col bg-surface-container-highest rounded-[1.25rem] p-8 border border-white/[0.08] shadow-soft hover:border-primary/20 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="font-label text-[10px] uppercase tracking-luxe px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                    Article
                  </span>
                  {item.date && (
                    <span className="font-label text-[10px] uppercase tracking-luxe text-outline">
                      {item.date}
                    </span>
                  )}
                  {item.readTime && (
                    <span className="font-label text-[10px] uppercase tracking-luxe text-outline">
                      · {item.readTime}
                    </span>
                  )}
                </div>
                <h3 className="font-headline italic text-2xl text-primary mb-3 group-hover:text-primary-fixed transition-colors">
                  {item.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed mb-5 flex-1">{item.excerpt}</p>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {item.topics.map((t) => (
                      <span
                        key={t}
                        className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary-container text-on-primary-container rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-primary font-label text-xs uppercase tracking-luxe group-hover:text-primary-fixed transition-colors hidden md:block whitespace-nowrap">
                    Read →
                  </span>
                </div>
              </Link>
            ) : (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col bg-surface-container-highest rounded-[1.25rem] overflow-hidden border border-white/[0.08] shadow-soft hover:border-primary/20 transition-colors"
              >
                <div className="relative aspect-[2/1] bg-surface-container-high">
                  <Image
                    src={`https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span
                    className="material-symbols-outlined absolute bottom-3 right-3 text-white bg-black/50 rounded-full p-1.5"
                    aria-hidden="true"
                  >
                    play_arrow
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="font-label text-[10px] uppercase tracking-luxe px-2 py-0.5 bg-secondary/10 text-secondary rounded-full">
                      Podcast
                    </span>
                    <span className="font-label text-[10px] uppercase tracking-luxe text-outline">
                      Commute 2 Work
                    </span>
                  </div>
                  <h3 className="font-headline italic text-2xl text-primary mb-5 flex-1 group-hover:text-primary-fixed transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      {item.topics.map((t) => (
                        <span
                          key={t}
                          className="font-label text-[10px] uppercase tracking-luxe px-3 py-1 bg-primary-container text-on-primary-container rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="text-primary font-label text-xs uppercase tracking-luxe group-hover:text-primary-fixed transition-colors hidden md:block whitespace-nowrap">
                      Watch →
                    </span>
                  </div>
                </div>
              </a>
            )}
          </FadeIn>
        ))}
      </div>
    </>
  );
}
