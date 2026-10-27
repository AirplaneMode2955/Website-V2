import type { Metadata } from 'next';
import Image from 'next/image';
import FadeIn from '@/components/FadeIn';
import InkUnderline from '@/components/motion/InkUnderline';
import { CHANNEL_URL, episodeGroups, topShorts } from '@/lib/podcast';

export const metadata: Metadata = {
  title: 'Commute 2 Work',
  alternates: { canonical: '/podcast' },
  description:
    'Commute 2 Work is a podcast recorded from the driver’s seat: AI, careers, the algorithm, and building in public.',
};

export default function PodcastPage() {
  return (
    <>
      {/* ── Page Banner ── */}
      <section className="relative py-24 px-8 bg-surface-container-low border-b border-white/5 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto relative z-10">
          <FadeIn>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
              The podcast
            </span>
            <h1 className="font-headline italic text-6xl md:text-8xl text-primary leading-tight mb-6">
              Commute 2 Work
            </h1>
            <p className="text-on-surface-variant text-xl max-w-2xl leading-relaxed mb-8">
              A podcast recorded from the driver&apos;s seat. I took a commute that used to be
              dead time and turned it into a place to think out loud, get better at{' '}
              <InkUnderline variant="flick">YouTube and its algorithm</InkUnderline>, and build
              automations that run the whole channel.
            </p>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-md font-label uppercase tracking-[0.18em] text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
            >
              Watch on YouTube
              <span className="material-symbols-outlined text-base" aria-hidden="true">
                open_in_new
              </span>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── Top Shorts ── */}
      <section className="py-24 px-8 bg-background">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
              Most watched
            </span>
            <h2 className="font-headline italic text-5xl text-primary mb-12">Top Shorts</h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {topShorts.map((short, i) => (
              <FadeIn key={short.id} delay={i * 0.04}>
                <a
                  href={`https://www.youtube.com/shorts/${short.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative aspect-[9/16] rounded-[1rem] overflow-hidden border border-white/[0.08] bg-surface-container-highest group-hover:border-primary/40 transition-colors">
                    <Image
                      src={`https://i.ytimg.com/vi/${short.id}/hqdefault.jpg`}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover scale-[1.78] transition-transform duration-300 group-hover:scale-[1.85]"
                    />
                    <span
                      className="material-symbols-outlined absolute bottom-3 right-3 text-white bg-black/50 rounded-full p-1.5"
                      aria-hidden="true"
                    >
                      play_arrow
                    </span>
                  </div>
                  <p className="mt-3 text-on-surface-variant text-base leading-snug group-hover:text-primary transition-colors">
                    {short.title}
                  </p>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Episodes by topic ── */}
      <section className="py-24 px-8 bg-surface-container-low border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
              Where to start
            </span>
            <h2 className="font-headline italic text-5xl text-primary mb-12">
              What I talk about
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {episodeGroups.map((group, i) => (
              <FadeIn key={group.title} delay={i * 0.05}>
                <div className="bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] p-8 h-full">
                  <span
                    className="material-symbols-outlined text-primary/60 text-2xl mb-4 block"
                    aria-hidden="true"
                  >
                    {group.icon}
                  </span>
                  <h3 className="font-headline italic text-2xl text-primary mb-2">
                    {group.title}
                  </h3>
                  <p className="text-on-surface-variant text-base leading-relaxed mb-6">
                    {group.blurb}
                  </p>
                  <ul className="space-y-1">
                    {group.episodes.map((ep) => (
                      <li key={ep.id}>
                        <a
                          href={`https://www.youtube.com/watch?v=${ep.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 min-h-[44px] py-2 text-on-surface-variant text-base hover:text-primary transition-colors"
                        >
                          <span
                            className="material-symbols-outlined text-primary text-base mt-1 flex-shrink-0"
                            aria-hidden="true"
                          >
                            play_circle
                          </span>
                          {ep.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
