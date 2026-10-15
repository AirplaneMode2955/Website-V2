'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/**
 * Cycles the last word of a tagline. Every word is stacked in one grid cell
 * with the longest one invisible, so the line width never jumps.
 * The first word renders in the server HTML; screen readers get it alone.
 */
export default function RotatingWord({
  words,
  interval = 2400,
  className = '',
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [reduce, words.length, interval]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '');

  return (
    <span className={`relative inline-grid align-baseline ${className}`}>
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden="true" className="invisible [grid-area:1/1]">
        {longest}
      </span>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={words[i]}
          aria-hidden="true"
          className="[grid-area:1/1]"
          initial={{ opacity: 0, y: '60%', filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: '-60%', filter: 'blur(4px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
