'use client';

import { useRef } from 'react';

/**
 * Tilts a few degrees toward the cursor with a soft glare. Mouse/trackpad
 * only; touch devices and reduced-motion users get a still card.
 */
export default function TiltCard({
  children,
  className = '',
  max = 7,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const canTilt = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !canTilt()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--ry', `${(x - 0.5) * max}deg`);
    el.style.setProperty('--rx', `${(0.5 - y) * max}deg`);
    el.style.setProperty('--gx', `${x * 100}%`);
    el.style.setProperty('--gy', `${y * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div className="h-full [perspective:1000px]">
      <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`tilt-card h-full ${className}`}>
        {children}
        <span aria-hidden="true" className="tilt-glare" />
      </div>
    </div>
  );
}
