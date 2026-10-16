"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
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
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const easeInOut = (x: number) => x * x * (3 - 2 * x);
const easeIn = (x: number) => x * x;
const easeOut = (x: number) => 1 - (1 - x) * (1 - x);

type Stop = {
  x: number;
  y: number;
  side: "left" | "right";
  cardWidth: number;
  cardOffset: number;
};

/**
 * Timing of one shot (stop i -> stop i+1), as a fraction t of that scroll segment.
 * The golfer's pose is a set of keyframes; the ball launches exactly at IMPACT.
 */
const IMPACT = 0.17;
const FLIGHT_LEN = 0.36;
const LAND = IMPACT + FLIGHT_LEN;
const ARC_PEAK = 70;
const REACH = 21; // ball sits this far in front of the golfer's feet (unscaled)

/** [time, armAngle, clubAngle, lean, easeFromPrevious] */
type Key = [number, number, number, number, ((x: number) => number)?];

const ADDRESS: [number, number, number] = [-18, -12, 0];
const TOP: [number, number, number] = [150, -42, -7];
const FINISH: [number, number, number] = [-142, -104, -9];
const CARRY: [number, number, number] = [-12, -125, 0];

const SHOT_KEYS: Key[] = [
  [0, ...ADDRESS],
  [0.02, ...ADDRESS],
  [0.12, ...TOP, easeInOut],
  [IMPACT, ...ADDRESS, easeIn],
  [0.27, ...FINISH, easeOut],
  [0.33, ...FINISH],
  [0.46, ...CARRY, easeInOut],
  [0.92, ...CARRY],
  [1, ...ADDRESS, easeInOut],
];

const PUTT_KEYS: Key[] = [
  [0, ...ADDRESS],
  [0.04, ...ADDRESS],
  [0.12, 4, -12, 0, easeInOut],
  [0.16, ...ADDRESS, easeIn],
  [0.22, -34, -12, 0, easeOut],
  [0.7, -34, -12, 0],
  [0.82, -168, -22, -4, easeInOut],
  [1, -168, -22, -4],
];

function pose(t: number, keys: Key[]): [number, number, number] {
  if (t <= keys[0][0]) return [keys[0][1], keys[0][2], keys[0][3]];
  for (let i = 1; i < keys.length; i++) {
    const [t1, a1, b1, c1, ez = easeInOut] = keys[i];
    const [t0, a0, b0, c0] = keys[i - 1];
    if (t <= t1) {
      const k = ez((t - t0) / (t1 - t0));
      return [lerp(a0, a1, k), lerp(b0, b1, k), lerp(c0, c1, k)];
    }
  }
  const l = keys[keys.length - 1];
  return [l[1], l[2], l[3]];
}

function buildGeometry(w: number, n: number) {
  const mobile = w < 768;
  const gap = mobile ? 470 : 400;
  const puttLen = mobile ? 380 : 330;
  const top = 70;
  const cx = w / 2;
  const amp = w * 0.12;
  const k = mobile ? 0.62 : 1;

  const stops: Stop[] = Array.from({ length: n }, (_, i) => {
    if (mobile) {
      const x = i % 2 ? 88 : 44;
      return {
        x,
        y: top + i * gap,
        side: "right",
        cardWidth: w - 128 - 16,
        cardOffset: 128 - x,
      };
    }
    const left = i % 2 === 0;
    return {
      x: cx + (left ? -amp : amp),
      y: top + i * gap,
      side: left ? "left" : "right",
      cardWidth: Math.max(260, Math.min(380, cx - amp - 48)),
      cardOffset: 48,
    };
  });

  const last = stops[n - 1];
  const cup = { x: mobile ? 66 : cx, y: last.y + 150 };
  const H = last.y + puttLen + 170;

  const arcs = stops.slice(0, -1).map((a, i) => {
    const b = stops[i + 1];
    return `M ${a.x} ${a.y} Q ${(a.x + b.x) / 2} ${(a.y + b.y) / 2 - ARC_PEAK * 2} ${b.x} ${b.y}`;
  });

  return { H, gap, puttLen, stops, cup, arcs, mobile, k, scale: mobile ? 1 : 1.5 };
}
type Geo = ReturnType<typeof buildGeometry>;

/* ───────────────────────── the course (static terrain) ───────────────────────── */

function Course({ geo, w }: { geo: Geo; w: number }) {
  const { stops, cup, H, mobile, k } = geo;
  const last = stops[stops.length - 1];
  const pts = [{ x: stops[0].x, y: -60 }, ...stops];
  const line = pts.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ");
  const fw = mobile ? 96 : 150;
  const gr = mobile ? 72 : 118;
  const gx = (last.x + cup.x) / 2;
  const gy = (last.y + cup.y) / 2;
  const fade = "linear-gradient(to bottom, transparent 0, #000 90px, #000 calc(100% - 150px), transparent 100%)";

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-0"
      width={w}
      height={H}
      style={{ maskImage: fade, WebkitMaskImage: fade }}
    >
      <defs>
        <linearGradient id="ttRough" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#172619" />
          <stop offset="1" stopColor="#15231a" />
        </linearGradient>
        <pattern id="ttMow" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(32)">
          <rect width="30" height="60" fill="#fff" opacity="0.045" />
        </pattern>
      </defs>

      <rect width={w} height={H} fill="url(#ttRough)" />

      {/* semi-rough, fairway, mow stripes */}
      <path d={line} fill="none" stroke="#1c3322" strokeWidth={fw + 54} strokeLinejoin="round" strokeLinecap="round" />
      <path d={line} fill="none" stroke="#25472d" strokeWidth={fw} strokeLinejoin="round" strokeLinecap="round" />
      <path d={line} fill="none" stroke="url(#ttMow)" strokeWidth={fw} strokeLinejoin="round" strokeLinecap="round" />

      {/* landing areas */}
      {stops.slice(1, -1).map((s) => (
        <circle key={s.y} cx={s.x} cy={s.y} r={40 * k + 8} fill="#2d5a36" opacity={0.75} />
      ))}

      {/* tee box */}
      <g transform={`translate(${stops[0].x} ${stops[0].y})`}>
        <rect x={-46 * k - 6} y={-22} width={92 * k + 12} height={44} rx={10} fill="#2f5d38" />
        <circle cx={-34 * k - 2} cy={-12} r={3} fill="#f4f1e6" />
        <circle cx={34 * k + 2} cy={-12} r={3} fill="#f4f1e6" />
      </g>

      {/* hazards the ball flies over */}
      {stops.slice(0, -1).map((a, i) => {
        const b = stops[i + 1];
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        return i % 2 === 0 ? (
          <g key={`h${i}`} transform={`translate(${mx} ${my}) scale(${k})`}>
            <ellipse rx={94} ry={52} fill="#1a4558" />
            <ellipse rx={86} ry={45} fill="#2d7391" />
            <ellipse cx={-16} cy={-9} rx={54} ry={23} fill="#3f8ba9" opacity={0.55} />
            <path d="M -44 8 q 8 -6 16 0 t 16 0" stroke="#c4e6f2" strokeWidth={1.6} fill="none" opacity={0.5} />
            <path d="M 16 -16 q 8 -6 16 0 t 16 0" stroke="#c4e6f2" strokeWidth={1.6} fill="none" opacity={0.5} />
          </g>
        ) : (
          <g key={`h${i}`} transform={`translate(${mx} ${my}) scale(${k})`}>
            <ellipse cx={-36} cy={-8} rx={52} ry={28} fill="#7f7553" />
            <ellipse cx={-36} cy={-8} rx={46} ry={23} fill="#cfc193" opacity={0.92} />
            <ellipse cx={40} cy={15} rx={46} ry={25} fill="#7f7553" />
            <ellipse cx={40} cy={15} rx={40} ry={20} fill="#cfc193" opacity={0.92} />
            <path d="M -62 -10 h 44 M -58 -2 h 40 M 20 12 h 40 M 24 20 h 34" stroke="#a89a6b" strokeWidth={1.4} opacity={0.7} />
          </g>
        );
      })}

      {/* the green */}
      <ellipse cx={gx} cy={gy} rx={gr + 24} ry={gr * 0.86 + 24} fill="#2c5732" />
      <ellipse cx={gx} cy={gy} rx={gr} ry={gr * 0.86} fill="#3a7442" />
      <ellipse cx={gx} cy={gy} rx={gr} ry={gr * 0.86} fill="url(#ttMow)" />
      <ellipse cx={cup.x} cy={cup.y} rx={9} ry={5} fill="#070b07" />
      <ellipse cx={cup.x} cy={cup.y} rx={9} ry={5} fill="none" stroke="#a9cc9d" strokeWidth={0.9} />
    </svg>
  );
}

/* ───────────────────────── shot trail ───────────────────────── */

function Arc({
  d,
  y0,
  gap,
  H,
  progress,
}: {
  d: string;
  y0: number;
  gap: number;
  H: number;
  progress: MotionValue<number>;
}) {
  const drawn = useTransform(progress, (p) => clamp(((p * H - y0) / gap - IMPACT) / FLIGHT_LEN));
  return (
    <>
      <path d={d} fill="none" stroke="#f4f1e6" strokeWidth={1.6} strokeLinecap="round" strokeDasharray="2 9" opacity={0.22} />
      <motion.path
        d={d}
        fill="none"
        stroke="#f4f1e6"
        strokeWidth={1.8}
        strokeLinecap="round"
        opacity={0.4}
        style={{ pathLength: drawn }}
      />
    </>
  );
}

/* ───────────────────────── cards ───────────────────────── */

function StopCard({
  event,
  stop,
  progress,
  H,
  gap,
  priority,
}: {
  event: TimelineEvent;
  stop: Stop;
  progress: MotionValue<number>;
  H: number;
  gap: number;
  priority: boolean;
}) {
  // Appears just before the ball lands on this stop.
  const reveal = useTransform(progress, (p) => clamp((p * H - (stop.y - 0.68 * gap)) / (0.1 * gap)));
  const y = useTransform(reveal, (r) => (1 - r) * 44);
  const scale = useTransform(reveal, (r) => 0.88 + r * 0.12);
  const styles = categoryStyles[event.category];
  const left = stop.side === "left";

  return (
    <div className="absolute" style={{ left: stop.x, top: stop.y, width: 0, height: 0 }}>
      <motion.span
        style={{ opacity: reveal, width: stop.cardOffset - 34, [left ? "right" : "left"]: 34 }}
        className="absolute top-0 h-px bg-primary/35"
      />
      <motion.div
        style={{
          opacity: reveal,
          y,
          scale,
          width: stop.cardWidth,
          [left ? "right" : "left"]: stop.cardOffset,
          translateY: "-50%",
        }}
        className="absolute z-10 top-0 bg-surface-container-high rounded-[1rem] overflow-hidden border border-white/[0.08] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)]"
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
            <span className={`font-label text-xs uppercase tracking-luxe px-2.5 py-0.5 rounded-full ${styles.badge}`}>
              {styles.label}
            </span>
            <span className="font-label text-xs uppercase tracking-luxe text-outline">{event.date}</span>
          </div>
          <h3 className="font-headline italic text-2xl text-primary mb-1.5 leading-tight">{event.title}</h3>
          <p className="text-on-surface-variant text-base leading-relaxed">{event.description}</p>
        </div>
      </motion.div>
    </div>
  );
}

function StaticList({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="max-w-screen-md mx-auto px-8 space-y-6">
      {events.map((e) => (
        <div key={e.title} className="bg-surface-container-high rounded-[1rem] border border-white/[0.08] overflow-hidden">
          {e.image && (
            <div className="relative w-full aspect-[4/3]">
              <Image src={e.image} alt={e.title} fill sizes="(max-width: 768px) 100vw, 640px" className="object-cover" />
            </div>
          )}
          <div className="p-5">
            <p className="font-label text-xs uppercase tracking-luxe text-outline mb-1">{e.date}</p>
            <h3 className="font-headline italic text-2xl text-primary mb-2">{e.title}</h3>
            <p className="text-on-surface-variant leading-relaxed">{e.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────── main ───────────────────────── */

export default function TrailTimeline({ events }: { events: TimelineEvent[] }) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<SVGGElement>(null);
  const ballBodyRef = useRef<SVGGElement>(null);
  const shadowRef = useRef<SVGEllipseElement>(null);
  const golferRef = useRef<SVGGElement>(null);
  const bodyRef = useRef<SVGGElement>(null);
  const armRef = useRef<SVGGElement>(null);
  const clubRef = useRef<SVGGElement>(null);
  const legARef = useRef<SVGLineElement>(null);
  const legBRef = useRef<SVGLineElement>(null);
  const flagRef = useRef<SVGPolygonElement>(null);
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

  const geo = useMemo(() => (w ? buildGeometry(w, events.length) : null), [w, events.length]);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start center", "end center"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 150, damping: 30, mass: 0.4 });

  const place = useCallback(
    (p: number) => {
      const ball = ballRef.current;
      const body = ballBodyRef.current;
      const shadow = shadowRef.current;
      const golfer = golferRef.current;
      const torso = bodyRef.current;
      const arm = armRef.current;
      const club = clubRef.current;
      const legA = legARef.current;
      const legB = legBRef.current;
      const flag = flagRef.current;
      if (!geo || !ball || !body || !shadow || !golfer || !torso || !arm || !club || !legA || !legB || !flag) return;

      const { stops, gap, puttLen, H, scale, cup } = geo;
      const n = stops.length;
      const last = stops[n - 1];
      const y = clamp(p) * H;
      const reach = REACH * scale;

      const setGolfer = (x: number, gy: number, face: number, a: number, c: number, lean: number, stride: number) => {
        golfer.setAttribute("transform", `translate(${x} ${gy}) scale(${face * scale} ${scale})`);
        torso.setAttribute("transform", `rotate(${lean} 0 -24)`);
        arm.setAttribute("transform", `rotate(${a} 3 -39)`);
        club.setAttribute("transform", `translate(3 -19) rotate(${c})`);
        legA.setAttribute("transform", `rotate(${stride} 0 -24)`);
        legB.setAttribute("transform", `rotate(${-stride} 0 -24)`);
      };
      const setBall = (bx: number, by: number, lift: number, size: number, alpha: number, sx: number, sy: number, sh: number) => {
        ball.setAttribute("transform", `translate(${bx} ${by - lift})`);
        body.setAttribute("transform", `scale(${size})`);
        ball.style.opacity = String(alpha);
        shadow.setAttribute("transform", `translate(${sx} ${sy}) scale(${sh})`);
        shadow.style.opacity = String(0.35 * alpha);
      };

      if (y >= last.y) {
        /* ── the putt ── */
        const t = clamp((y - last.y) / puttLen);
        const dir = cup.x >= last.x ? 1 : -1;
        const [a, c, lean] = pose(t, PUTT_KEYS);
        const hop = t > 0.82 ? -Math.abs(Math.sin(((t - 0.82) / 0.18) * Math.PI * 3)) * 7 * (1 - (t - 0.82) / 0.18) : 0;
        setGolfer(last.x - dir * reach, last.y + hop, dir, a, c, lean, 0);

        const s = clamp((t - 0.16) / 0.46);
        const roll = 1 - Math.pow(1 - s, 2.2);
        const drop = clamp((t - 0.62) / 0.06);
        const bx = lerp(last.x, cup.x, roll);
        const by = lerp(last.y, cup.y, roll);
        setBall(bx, by + drop * 4, 0, 1 - drop * 0.8, 1 - drop, bx, by, 1 - drop);

        const wig = t > 0.64 ? Math.sin((t - 0.64) * 70) * 9 * (1 - clamp((t - 0.64) / 0.3)) : 0;
        flag.setAttribute("transform", `rotate(${wig} ${cup.x} ${cup.y - 64})`);
        return;
      }

      /* ── a full shot from stop i to stop i+1 ── */
      const i = clamp(Math.floor((y - stops[0].y) / gap), 0, n - 2);
      const t = clamp((y - stops[i].y) / gap);
      const A = stops[i];
      const B = stops[i + 1];
      const dir = B.x >= A.x ? 1 : -1;

      const s = clamp((t - IMPACT) / FLIGHT_LEN);
      const arc = 4 * s * (1 - s);
      const u = clamp((t - LAND) / 0.08);
      const bounce = t > LAND && t < LAND + 0.08 ? 12 * 4 * u * (1 - u) : 0;
      const gx = lerp(A.x, B.x, s);
      const gy = lerp(A.y, B.y, s);
      setBall(gx, gy, arc * ARC_PEAK + bounce, 1 + arc * 0.7, 1, gx, gy, 1 - arc * 0.4);
      flag.setAttribute("transform", "rotate(0)");

      const walk = easeInOut(clamp((t - 0.55) / 0.37));
      const [a, c, lean] = pose(t, SHOT_KEYS);
      const stride = walk > 0 && walk < 1 ? Math.sin(walk * Math.PI * 7) * 28 : 0;
      const face = t >= 0.92 ? -dir : dir;
      setGolfer(
        lerp(A.x - dir * reach, B.x + dir * reach, walk),
        lerp(A.y, B.y, walk),
        face,
        a,
        c,
        lean,
        stride,
      );
    },
    [geo],
  );

  useEffect(() => {
    place(smooth.get());
  }, [place, smooth]);
  useMotionValueEvent(smooth, "change", place);

  if (reduce) return <StaticList events={events} />;

  return (
    <div ref={wrapRef} className="w-full px-0">
      <div ref={trackRef} className="relative" style={{ height: geo ? geo.H : 0 }}>
        {geo && (
          <>
            <Course geo={geo} w={w} />

            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-[5] overflow-visible"
              width={w}
              height={geo.H}
            >
              {geo.arcs.map((d, i) => (
                <Arc key={i} d={d} y0={geo.stops[i].y} gap={geo.gap} H={geo.H} progress={smooth} />
              ))}

              {/* flag */}
              <g>
                <line x1={geo.cup.x} y1={geo.cup.y} x2={geo.cup.x} y2={geo.cup.y - 64} stroke="#f4f1e6" strokeWidth={2} strokeLinecap="round" />
                <polygon
                  ref={flagRef}
                  points={`${geo.cup.x},${geo.cup.y - 64} ${geo.cup.x + 26},${geo.cup.y - 56} ${geo.cup.x},${geo.cup.y - 48}`}
                  fill="#e07a5f"
                />
              </g>

              <ellipse ref={shadowRef} cx={0} cy={0} rx={7} ry={3} fill="#000" />

              {/* golfer, facing +x with the ball in front of his feet */}
              <g ref={golferRef}>
                <line ref={legARef} x1={0} y1={-24} x2={-6} y2={0} stroke="#cdbf9a" strokeWidth={4.5} strokeLinecap="round" />
                <line ref={legBRef} x1={0} y1={-24} x2={7} y2={0} stroke="#cdbf9a" strokeWidth={4.5} strokeLinecap="round" />
                <g ref={bodyRef}>
                  <line x1={0} y1={-24} x2={3} y2={-40} stroke="#dbead6" strokeWidth={8} strokeLinecap="round" />
                  <circle cx={3} cy={-51} r={6} fill="#e8d5bf" />
                  <path d="M -3.2 -53 Q 3 -61.5 9.2 -53 L 15 -52.5 L 15 -51 L -3.2 -51 Z" fill="#90a68a" />
                  <g ref={armRef}>
                    <line x1={3} y1={-39} x2={3} y2={-19} stroke="#dbead6" strokeWidth={3.6} strokeLinecap="round" />
                    <g ref={clubRef}>
                      <line x1={0} y1={0} x2={0} y2={24} stroke="#d5cbb5" strokeWidth={1.8} strokeLinecap="round" />
                      <rect x={-1.5} y={22} width={7} height={3.4} rx={1.2} fill="#d5cbb5" />
                    </g>
                    <circle cx={3} cy={-19} r={2.3} fill="#e8d5bf" />
                  </g>
                </g>
              </g>

              <g ref={ballRef}>
                <g ref={ballBodyRef}>
                  <circle r={6.5} fill="#f4f1e6" stroke="#b9b6a8" strokeWidth={0.8} />
                  <circle cx={-2} cy={-1.5} r={0.9} fill="#b9b6a8" />
                  <circle cx={1.8} cy={1} r={0.9} fill="#b9b6a8" />
                  <circle cx={1.5} cy={-3} r={0.9} fill="#b9b6a8" />
                </g>
              </g>
            </svg>

            {events.map((event, i) => (
              <StopCard
                key={event.title}
                event={event}
                stop={geo.stops[i]}
                progress={smooth}
                H={geo.H}
                gap={geo.gap}
                priority={i < 2}
              />
            ))}

            <p
              className="absolute font-headline italic text-primary/60 text-lg"
              style={
                geo.mobile
                  ? { left: 28, top: geo.H - 90 }
                  : { left: 0, right: 0, top: geo.H - 90, textAlign: "center" }
              }
            >
              On to the next hole…
            </p>
          </>
        )}
      </div>
    </div>
  );
}
