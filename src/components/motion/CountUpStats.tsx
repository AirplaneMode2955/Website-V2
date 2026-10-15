'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

/**
 * The Google Ads stat strip. Each headline number counts up when the strip
 * scrolls into view, and two bars show where the metric started (red) and
 * where it ended (sage), on the same scale.
 */

export interface Stat {
  label: string;
  /** Number to count to. */
  value: number;
  format: 'multiplier' | 'percent' | 'currency';
  beforeLabel: string;
  afterLabel: string;
  /** Raw before/after values for the bar scale. Omit `before` when there's no baseline. */
  before?: number;
  after: number;
  note?: string;
}

function formatValue(v: number, f: Stat['format']) {
  if (f === 'multiplier') return `${v.toFixed(1)}×`;
  if (f === 'percent') return `+${Math.round(v)}%`;
  return `$${Math.round(v).toLocaleString('en-US')}`;
}

function CountUp({ stat, play }: { stat: Stat; play: boolean }) {
  const reduce = useReducedMotion();
  // Final value in the server HTML, so the number is never blank or wrong.
  const [shown, setShown] = useState(stat.value);
  const started = useRef(false);

  useEffect(() => {
    if (!play || reduce || started.current) return;
    started.current = true;
    const controls = animate(0, stat.value, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setShown,
    });
    return () => controls.stop();
  }, [play, reduce, stat.value]);

  return <>{formatValue(shown, stat.format)}</>;
}

export default function CountUpStats({ stats }: { stats: Stat[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/[0.06]">
      {stats.map((stat, i) => {
        const beforePct = stat.before ? (stat.before / stat.after) * 100 : 0;
        // Plain CSS width transitions: bars start empty and grow to scale
        // once the strip is in view (instantly with reduced motion).
        const show = inView || reduce;
        const bar = (pct: number, delay: number): React.CSSProperties => ({
          width: show ? `${pct}%` : 0,
          transition: reduce ? 'none' : `width 1.4s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        });
        return (
          <div key={stat.label} className="p-8 flex flex-col gap-3 min-w-0">
            <p className="font-label text-[10px] uppercase tracking-luxe text-outline">{stat.label}</p>
            <p
              className={`font-headline italic text-primary leading-none tabular-nums whitespace-nowrap ${
                stat.format === 'currency' ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-4xl md:text-5xl'
              }`}
            >
              <CountUp stat={stat} play={inView} />
            </p>
            <div className="flex flex-col gap-2 text-xs text-on-surface-variant tabular-nums">
              {stat.before !== undefined && (
                <div className="flex flex-col gap-1">
                  <span className="text-[#e08a7e]">Before · {stat.beforeLabel}</span>
                  <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <div className="h-full rounded-full bg-[#c96a5e]" style={bar(beforePct, 0.15 + i * 0.12)} />
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-1">
                <span className="text-primary">After · {stat.afterLabel}</span>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div className="h-full rounded-full bg-accent" style={bar(100, 0.5 + i * 0.12)} />
                </div>
              </div>
              {stat.note && <span className="text-outline">{stat.note}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
