'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * A paper airplane that flies in from off-screen on load, leaves a dashed
 * trail, and lands just after the element it's given as `targetRef`
 * (the "AKA Airplane" label). Sits as an overlay inside a `relative` parent.
 */
export default function PaperAirplane({
  containerRef,
  targetRef,
  delay = 900,
  duration = 2600,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  targetRef: React.RefObject<HTMLElement | null>;
  delay?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const trailRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const box = containerRef.current;
    const target = targetRef.current;
    const trail = trailRef.current;
    const plane = planeRef.current;
    if (!box || !target || !trail || !plane) return;

    let raf = 0;
    let timer = 0;
    let landed = false;

    const buildPath = () => {
      const b = box.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      const ex = t.right - b.left + 22;
      const ey = t.top - b.top + t.height / 2 + 1;
      const w = b.width;
      trail.setAttribute(
        'd',
        `M ${w + 60} ${ey * 0.25} ` +
          `C ${w * 0.6} ${ey * 0.05}, ${w * 0.25} ${ey * 0.45}, ${w * 0.4} ${ey * 0.8} ` +
          `S ${ex + 160} ${ey + 70}, ${ex + 80} ${ey - 30} ` +
          `S ${ex + 18} ${ey - 4}, ${ex} ${ey}`,
      );
    };

    const place = (k: number) => {
      const L = trail.getTotalLength();
      const at = L * k;
      const p = trail.getPointAtLength(at);
      const a = trail.getPointAtLength(Math.max(0, Math.min(at, L - 1)));
      const b2 = trail.getPointAtLength(Math.min(L, Math.max(at, 1) + 1));
      const angle = (Math.atan2(b2.y - a.y, b2.x - a.x) * 180) / Math.PI;
      plane.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${angle})`);
      // Reveal the trail behind the plane through a mask-free dash trick.
      trail.style.strokeDasharray = k >= 1 ? '5 7' : `${at} ${L}`;
    };

    const settle = () => {
      plane.style.opacity = '1';
      buildPath();
      place(1);
      landed = true;
    };

    buildPath();
    if (reduce) {
      settle();
    } else {
      place(0);
      plane.style.opacity = '1';
      timer = window.setTimeout(() => {
        const start = performance.now();
        const step = (now: number) => {
          const k = Math.min(1, (now - start) / duration);
          place(1 - Math.pow(1 - k, 3));
          if (k < 1) raf = requestAnimationFrame(step);
          else landed = true;
        };
        raf = requestAnimationFrame(step);
      }, delay);
    }

    const onResize = () => {
      if (landed) settle();
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, [containerRef, targetRef, reduce, delay, duration]);

  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible">
      <path
        ref={trailRef}
        fill="none"
        stroke="#d5cbb5"
        strokeWidth={1.6}
        strokeLinecap="round"
        opacity={0.5}
        style={{ strokeDasharray: '0 99999' }}
      />
      <g ref={planeRef} style={{ opacity: 0 }}>
        <path
          d="M0 0 L26 9 L0 18 L6 9 Z M6 9 L26 9 L9 14 Z"
          transform="translate(-13 -9)"
          fill="#dbead6"
        />
      </g>
    </svg>
  );
}
