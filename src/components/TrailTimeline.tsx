"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

export type TimelineEvent = {
  date: string;
  title: string;
  description: string;
  category: "personal" | "education" | "career";
  image?: string;
};

const categoryStyles = {
  personal: { badge: "bg-primary/10 text-primary", label: "Personal" },
  education: { badge: "bg-secondary/10 text-secondary", label: "Education" },
  career: { badge: "bg-accent/10 text-accent", label: "Career" },
};

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

type Stop = { x: number; y: number; side: "left" | "right"; cardWidth: number };

function buildGeometry(w: number, n: number) {
  const mobile = w < 768;
  const gap = mobile ? 470 : 400;
  const top = 70;
  const H = top + gap * (n - 1) + 170;
  const cx = w / 2;
  const amp = w * 0.07;

  const stops: Stop[] = Array.from({ length: n }, (_, i) => {
    if (mobile) {
      const x = i % 2 ? 40 : 22;
      return { x, y: top + i * gap, side: "right", cardWidth: w - x - 28 };
    }
    const left = i % 2 === 0;
    return {
      x: cx + (left ? -amp : amp),
      y: top + i * gap,
      side: left ? "left" : "right",
      cardWidth: Math.min(380, cx - amp - 56),
    };
  });

  const pts = [
    { x: mobile ? 30 : cx, y: 0 },
    ...stops,
    { x: mobile ? 30 : cx, y: H },
  ];
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const my = a.y + (b.y - a.y) / 2;
    d += ` C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`;
  }
  return { H, d, stops, mobile };
}

function StopCard({
  event,
  stop,
  mobile,
  progress,
  H,
  priority,
}: {
  event: TimelineEvent;
  stop: Stop;
  mobile: boolean;
  progress: MotionValue<number>;
  H: number;
  priority: boolean;
}) {
  const f = stop.y / H;
  const reveal = useTransform(progress, (p) => clamp((p - f + 0.05) / 0.06));
  const y = useTransform(reveal, (r) => (1 - r) * 44);
  const scale = useTransform(reveal, (r) => 0.88 + r * 0.12);
  const pinScale = useTransform(reveal, (r) => 0.4 + r * 0.6);
  const styles = categoryStyles[event.category];
  const left = stop.side === "left";

  return (
    <div
      className="absolute z-10"
      style={{ left: stop.x, top: stop.y, width: 0, height: 0 }}
    >
      <motion.span
        style={{ scale: pinScale, opacity: reveal }}
        className="absolute -left-[7px] -top-[7px] block w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-primary/20"
      />
      <motion.span
        style={{
          opacity: reveal,
          width: mobile ? 18 : 40,
          [left ? "right" : "left"]: 7,
        }}
        className="absolute top-0 h-px bg-primary/30"
      />
      <motion.div
        style={{
          opacity: reveal,
          y,
          scale,
          width: stop.cardWidth,
          [left ? "right" : "left"]: mobile ? 26 : 48,
          translateY: "-50%",
        }}
        className="absolute top-0 bg-surface-container-high rounded-[1rem] overflow-hidden border border-white/[0.08] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)]"
      >
        {event.image && (
          <div className="relative w-full h-40 md:h-44">
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 90vw, 380px"
              className="object-cover object-[center_25%]"
              priority={priority}
            />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`font-label text-xs uppercase tracking-luxe px-2.5 py-0.5 rounded-full ${styles.badge}`}
            >
              {styles.label}
            </span>
            <span className="font-label text-xs uppercase tracking-luxe text-outline">
              {event.date}
            </span>
          </div>
          <h3 className="font-headline italic text-2xl text-primary mb-1.5 leading-tight">
            {event.title}
          </h3>
          <p className="text-on-surface-variant text-base leading-relaxed">
            {event.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function StaticList({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="max-w-screen-md mx-auto px-8 space-y-6">
      {events.map((e) => (
        <div
          key={e.title}
          className="bg-surface-container-high rounded-[1rem] border border-white/[0.08] overflow-hidden"
        >
          {e.image && (
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={e.image}
                alt={e.title}
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-cover"
              />
            </div>
          )}
          <div className="p-5">
            <p className="font-label text-xs uppercase tracking-luxe text-outline mb-1">
              {e.date}
            </p>
            <h3 className="font-headline italic text-2xl text-primary mb-2">
              {e.title}
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              {e.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TrailTimeline({ events }: { events: TimelineEvent[] }) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const table = useRef<{ ys: number[]; lens: number[]; L: number } | null>(
    null,
  );
  const [w, setW] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setW(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const geo = useMemo(
    () => (w ? buildGeometry(w, events.length) : null),
    [w, events.length],
  );
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end center"],
  });

  const place = useCallback(
    (p: number) => {
      const path = pathRef.current;
      const trail = trailRef.current;
      const plane = planeRef.current;
      const t = table.current;
      if (!geo || !path || !trail || !plane || !t) return;
      const targetY = clamp(p) * geo.H;
      // y is monotonic along the path, so binary-search the sampled table.
      let lo = 0;
      let hi = t.ys.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (t.ys[mid] < targetY) lo = mid + 1;
        else hi = mid;
      }
      const i = Math.max(1, lo);
      const span = t.ys[i] - t.ys[i - 1] || 1;
      const k = clamp((targetY - t.ys[i - 1]) / span);
      const len = t.lens[i - 1] + (t.lens[i] - t.lens[i - 1]) * k;
      const pt = path.getPointAtLength(len);
      const a = path.getPointAtLength(Math.max(0, len - 2));
      const b = path.getPointAtLength(Math.min(t.L, len + 2));
      const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      plane.setAttribute(
        "transform",
        `translate(${pt.x} ${pt.y}) rotate(${angle}) scale(1.5)`,
      );
      trail.style.strokeDasharray = `${len} ${t.L}`;
    },
    [geo],
  );

  useEffect(() => {
    const path = pathRef.current;
    if (!geo || !path) return;
    const L = path.getTotalLength();
    const N = 600;
    const ys: number[] = [];
    const lens: number[] = [];
    for (let s = 0; s <= N; s++) {
      const len = (L * s) / N;
      ys.push(path.getPointAtLength(len).y);
      lens.push(len);
    }
    table.current = { ys, lens, L };
    place(scrollYProgress.get());
  }, [geo, place, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", place);

  if (reduce) return <StaticList events={events} />;

  return (
    <div ref={wrapRef} className="w-full px-0">
      <div
        ref={trackRef}
        className="relative"
        style={{ height: geo ? geo.H : 0 }}
      >
        {geo && (
          <>
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-0 overflow-visible"
              width={w}
              height={geo.H}
            >
              <path
                ref={pathRef}
                d={geo.d}
                fill="none"
                stroke="#d5cbb5"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeDasharray="5 9"
                opacity={0.28}
              />
              <path
                ref={trailRef}
                d={geo.d}
                fill="none"
                stroke="#dbead6"
                strokeWidth={2}
                strokeLinecap="round"
                opacity={0.75}
                style={{ strokeDasharray: "0 99999" }}
              />
              <g ref={planeRef}>
                <path
                  d="M0 0 L26 9 L0 18 L6 9 Z M6 9 L26 9 L9 14 Z"
                  transform="translate(-13 -9)"
                  fill="#dbead6"
                />
              </g>
            </svg>

            {events.map((event, i) => (
              <StopCard
                key={event.title}
                event={event}
                stop={geo.stops[i]}
                mobile={geo.mobile}
                progress={scrollYProgress}
                H={geo.H}
                priority={i < 2}
              />
            ))}

            <p
              className="absolute font-headline italic text-primary/50 text-lg"
              style={
                geo.mobile
                  ? { left: 56, top: geo.H - 70 }
                  : { left: 0, right: 0, top: geo.H - 70, textAlign: "center" }
              }
            >
              More to come…
            </p>
          </>
        )}
      </div>
    </div>
  );
}
