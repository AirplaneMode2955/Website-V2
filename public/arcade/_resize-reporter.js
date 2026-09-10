/*
 * Runs inside each hosted arcade game's iframe. Reports this document's
 * real content height to the parent window via postMessage so the wrapper
 * (src/components/ArcadeFrame.tsx) can size the iframe to fit on phones.
 *
 * Deliberately does NOT rely on the parent reaching into this document
 * (e.g. a parent-created ResizeObserver watching an element that lives in
 * a different document) -- that cross-document pattern is spec-legal but
 * not reliably supported everywhere (notably Safari/WebKit). A
 * ResizeObserver created here watches an element in its own document,
 * which every engine supports correctly.
 */
(function () {
  var lastHeight = 0;

  function report() {
    var root = document.documentElement;
    var body = document.body;
    var height = Math.max(
      root ? root.scrollHeight : 0,
      body ? body.scrollHeight : 0
    );
    if (height > 0 && height !== lastHeight) {
      lastHeight = height;
      try {
        window.parent.postMessage(
          { source: 'arcade-frame', type: 'resize', height: height },
          window.location.origin
        );
      } catch (e) {
        /* no-op: parent unreachable (e.g. opened standalone, not framed) */
      }
    }
  }

  report();
  window.addEventListener('load', report);
  if ('ResizeObserver' in window && document.body) {
    new ResizeObserver(report).observe(document.body);
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(report).catch(function () {});
  }
  // Fallback net for state changes a ResizeObserver might miss timing on
  // (e.g. a screen swap driven by a class toggle mid-transition).
  setInterval(report, 400);
})();
