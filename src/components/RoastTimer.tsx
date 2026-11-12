'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * "Seconds since Jett last …" — counts up, then snaps back to zero when the
 * thing inevitably happens again. Each reset can swap to a new line.
 * The golf one never gets past a few seconds. That's the joke.
 */
type Line = { text: string; min: number; max: number; weight: number };

const LINES: Line[] = [
  { text: 'thought about golf', min: 1.8, max: 4.2, weight: 3 },
  { text: "checked this site's analytics", min: 6, max: 38, weight: 1 },
];

function pick(prev?: Line): Line {
  const total = LINES.reduce((s, l) => s + l.weight, 0);
  let r = Math.random() * total;
  for (const l of LINES) {
    r -= l.weight;
    if (r <= 0) return l === prev && LINES.length > 1 && Math.random() < 0.35 ? pick(prev) : l;
  }
  return LINES[0];
}

const rand = (l: Line) => l.min + Math.random() * (l.max - l.min);

export default function RoastTimer({ className = '' }: { className?: string }) {
  const [line, setLine] = useState<Line>(LINES[0]);
  const [elapsed, setElapsed] = useState(0);
  const [flash, setFlash] = useState(false);
  const start = useRef(0);
  const limit = useRef(3);

  useEffect(() => {
    start.current = performance.now();
    limit.current = rand(LINES[0]);
    let current = LINES[0];
    const id = window.setInterval(() => {
      const s = (performance.now() - start.current) / 1000;
      if (s >= limit.current) {
        current = pick(current);
        setLine(current);
        start.current = performance.now();
        limit.current = rand(current);
        setElapsed(0);
        setFlash(true);
        window.setTimeout(() => setFlash(false), 450);
      } else {
        setElapsed(s);
      }
    }, 100);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={className}>
      <div
        className={`font-headline italic text-5xl md:text-6xl tabular-nums leading-none transition-colors duration-300 ${
          flash ? 'text-[#d94f3d]' : 'text-primary'
        }`}
        aria-hidden="true"
      >
        {elapsed.toFixed(1)}
        <span className="text-2xl text-outline not-italic font-label ml-1">s</span>
      </div>
      <p className="font-label text-xs uppercase tracking-luxe text-outline mt-3" aria-live="off">
        Since Jett last {line.text}
      </p>
      <span className="sr-only">A joke timer: seconds since Jett last {line.text}. It keeps resetting.</span>
    </div>
  );
}
