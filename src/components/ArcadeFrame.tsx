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
 */
export default function ArcadeFrame({ slug, title }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let ro: ResizeObserver | null = null;

    const fitToContent = () => {
      if (window.innerWidth >= 768) {
        iframe.style.height = '';
        return;
      }
      const doc = iframe.contentDocument;
      if (!doc?.documentElement) return;
      const height = Math.max(doc.documentElement.scrollHeight, doc.body?.scrollHeight ?? 0);
      if (height > 0) iframe.style.height = `${height}px`;
    };

    const handleLoad = () => {
      fitToContent();
      const doc = iframe.contentDocument;
      if (doc?.body && 'ResizeObserver' in window) {
        ro = new ResizeObserver(fitToContent);
        ro.observe(doc.body);
      }
      doc?.fonts?.ready.then(fitToContent).catch(() => {});
      setTimeout(fitToContent, 300);
    };

    // The iframe often finishes loading before this effect runs (React
    // hydrates after the browser has already fetched the static HTML), so
    // the 'load' event below never fires again — run the same setup now if
    // the document is already there.
    if (iframe.contentDocument?.readyState === 'complete') {
      handleLoad();
    }

    iframe.addEventListener('load', handleLoad);
    window.addEventListener('resize', fitToContent);

    return () => {
      iframe.removeEventListener('load', handleLoad);
      window.removeEventListener('resize', fitToContent);
      ro?.disconnect();
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
