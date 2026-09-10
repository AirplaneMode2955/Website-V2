'use client';

import { useEffect, useState } from 'react';

type Props = {
  slug: string;
  title: string;
};

const MOBILE_BREAKPOINT = 768;

/**
 * Two earlier attempts tried to size the iframe to its content on mobile
 * from JS (first a parent-side ResizeObserver reading into the iframe's
 * document, then a postMessage handshake). Both worked in this sandbox's
 * only available test engine (Chromium) and both still failed on a real
 * iPhone in production -- with no way to attach a debugger to that device,
 * guessing a third cross-frame communication mechanism isn't a sound bet.
 *
 * So: don't iframe hosted games on narrow screens at all. Redirect straight
 * to the game's own page (the same URL the "open it full screen" link
 * already points at). That leaves nothing to size, observe, or message --
 * the browser just renders a normal document. Desktop is untouched: it
 * still gets the iframe at the original fixed height, which never had a
 * sizing problem in the first place.
 */
export default function ArcadeFrame({ slug, title }: Props) {
  const standaloneUrl = `/arcade/${slug}/index.html`;
  const [mode, setMode] = useState<'pending' | 'mobile' | 'desktop'>('pending');

  useEffect(() => {
    if (window.innerWidth < MOBILE_BREAKPOINT) {
      setMode('mobile');
      window.location.replace(standaloneUrl);
    } else {
      setMode('desktop');
    }
  }, [standaloneUrl]);

  if (mode === 'desktop') {
    return (
      <iframe
        src={standaloneUrl}
        title={title}
        className="w-full h-[calc(100vh-11rem)] min-h-[520px] border-0"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    );
  }

  // 'pending' (still deciding, briefly, on first render) or 'mobile'
  // (redirect just fired) both show the same lightweight placeholder --
  // a manual link covers the rare case the redirect doesn't fire.
  return (
    <div className="flex items-center justify-center min-h-[420px] p-8 text-center">
      <a href={standaloneUrl} className="text-primary hover:underline font-label text-xs uppercase tracking-luxe">
        Open {title}
      </a>
    </div>
  );
}
