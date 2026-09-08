import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { hostedGames, getHostedGame } from '@/lib/arcadeGames';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return hostedGames.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getHostedGame(slug);
  if (!game) return {};
  return {
    title: game.title,
    description: game.blurb,
  };
}

export default async function ArcadeGamePage({ params }: Props) {
  const { slug } = await params;
  const game = getHostedGame(slug);

  if (!game) {
    notFound();
  }

  return (
    <div className="px-4 md:px-8 pb-12">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between py-4">
          <Link
            href="/play"
            className="inline-flex items-center gap-2 text-on-surface/60 hover:text-primary font-label text-xs uppercase tracking-luxe transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Arcade
          </Link>
          <span className="font-headline italic text-lg text-primary">{game.title}</span>
        </div>

        <div className="rounded-[1.25rem] overflow-hidden border border-white/[0.08] shadow-soft bg-surface-container-lowest">
          <iframe
            src={`/arcade/${game.slug}/index.html`}
            title={game.title}
            className="w-full h-[calc(100vh-11rem)] min-h-[520px] border-0"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>

        <p className="text-outline text-xs mt-4 text-center">
          {game.title} runs in its own frame. If it misbehaves, open it{' '}
          <a
            href={`/arcade/${game.slug}/index.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            full screen
          </a>
          .
        </p>
      </div>
    </div>
  );
}
