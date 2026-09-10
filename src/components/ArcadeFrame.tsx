'use client';

import { useEffect, useRef } from 'react';

type Props = {
  slug: string;
  title: string;
};

/**
 * The desktop-fixed iframe height (calc(100vh - 11rem)) leaves a large dead
 * gap under short, card-style games (chess, birthdle) on phones, where the
 * viewport is tall relative to the game's actual content. Below md, size the
 * iframe to its real content height instead; desktop keeps the original
 * fixed height via the md: class.
 *
 * Each hosted game's own page carries public/arcade/_resize-reporter.js,
 * which measures its own document (with a same-document ResizeObserver --
 * always reliable) and posts the height up via postMessage. That's the
 * primary signal here. A parent-side poll of iframe.contentDocument is kept
 * only as a fallback for the rare case a game predates that script or the
 * message never arrives; it is NOT relied on alone, because a parent-side
 * ResizeObserver watching an element in a *different* document (the
 * iframe's) is not reliably supported everywhere (notably Safari/WebKit).
 */
export default function ArcadeFrame({ slug, title }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let lastHeight = 0;
    let heardFromChild = false;

    const applyHeight = (height: number) => {
      if (window.innerWidth >= 768) {
        if (iframe.style.height) iframe.style.height = '';
        return;
      }
      if (height > 0 && height !== lastHeight) {
        lastHeight = height;
        iframe.style.height = `${height}px`;
      }
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.source !== iframe.contentWindow) return;
      if (!event.data || event.data.source !== 'arcade-frame' || event.data.type !== 'resize') return;
      heardFromChild = true;
      applyHeight(Number(event.data.height));
    };

    const handleWindowResize = () => applyHeight(lastHeight);

    const pollFallback = () => {
      if (heardFromChild) return;
      const doc = iframe.contentDocument;
      if (!doc?.documentElement) return;
      applyHeight(Math.max(doc.documentElement.scrollHeight, doc.body?.scrollHeight ?? 0));
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('resize', handleWindowResize);
    const poll = window.setInterval(pollFallback, 400);

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('resize', handleWindowResize);
      window.clearInterval(poll);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={`/arcade/${slug}/index.html`}
      title={title}
      className="w-full min-h-[420px] md:h-[calc(100vh-11rem)] md:min-h-[520px] border-0"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
    />
  );
}
