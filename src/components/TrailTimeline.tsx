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

/** width / height of each photo, so cards reserve the right space and crop as little as possible */
const IMAGE_RATIO: Record<string, number> = {
  "/Baby Jett.JPEG": 1.33,
  "/Elementary Age Jett.JPEG": 1.33,
  "/High School Golf.JPEG": 0.75,
  "/Mission.JPEG": 0.67,
  "/Jett Headshot.jpg": 0.8,
  "/Utah State University.JPEG": 0.75,
  "/Wife.JPEG": 0.75,
  "/engagements.JPEG": 1.5,
  "/Wedding.JPEG": 0.67,
  "/Head of Marketing.JPEG": 0.75,
};

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const easeInOut = (x: number) => x * x * (3 - 2 * x);
const easeIn = (x: number) => x * x;
const easeOut = (x: number) => 1 - (1 - x) * (1 - x);
const rand = (a: number, b: number) => {
  const v = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return v - Math.floor(v);
};

type Pt = { x: number; y: number };

type Stop = {
  x: number;
  y: number;
  side: "left" | "right";
  cardWidth: number;
  cardOffset: number;
  revealY: number;
};

/* ───────────────────────── swing poses ───────────────────────── */

const ARC_PEAK = 70;
const REACH = 21; // ball sits this far in front of the golfer's feet (unscaled)

/** [time, armAngle, clubAngle, lean, easeFromPrevious] */
type Key = [number, number, number, number, ((x: number) => number)?];

const ADDRESS: [number, number, number] = [-18, -12, 0];
const TOP: [number, number, number] = [150, -42, -7];
const FINISH: [number, number, number] = [-142, -104, -9];
const CARRY: [number, number, number] = [-12, -125, 0];

/** One clean shot. Ball launches exactly at t = 0.17. */
const SHOT_KEYS: Key[] = [
  [0, ...ADDRESS],
  [0.02, ...ADDRESS],
  [0.12, ...TOP, easeInOut],
  [0.17, ...ADDRESS, easeIn],
  [0.27, ...FINISH, easeOut],
  [0.33, ...FINISH],
  [0.46, ...CARRY, easeInOut],
  [0.92, ...CARRY],
  [1, ...ADDRESS, easeInOut],
];

/** A miss, a walk to the ball, then a second swing. Impacts at t = 0.09 and t = 0.57. */
const MISS_KEYS: Key[] = [
  [0, ...ADDRESS],
  [0.01, ...ADDRESS],
  [0.04, ...TOP, easeInOut],
  [0.09, ...ADDRESS, easeIn],
  [0.17, ...FINISH, easeOut],
  [0.22, ...FINISH],
  [0.3, ...CARRY, easeInOut],
  [0.4, ...CARRY],
  [0.45, ...ADDRESS, easeInOut],
  [0.49, ...ADDRESS],
  [0.52, ...TOP, easeInOut],
  [0.57, ...ADDRESS, easeIn],
  [0.67, ...FINISH, easeOut],
  [0.72, ...FINISH],
  [0.8, ...CARRY, easeInOut],
  [0.96, ...CARRY],
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

/* ───────────────────────── geometry ───────────────────────── */

type Shot = { a: Pt; b: Pt; peak: number; impact: number; flight: number; d: string };
type Walk = { t0: number; t1: number; from: Pt; to: Pt };
type Seg = {
  y0: number;
  len: number;
  shots: Shot[];
  walks: Walk[];
  keys: Key[];
  landT: number;
  over: "pond" | "bunkers";
  overAt: Pt;
  miss?: { kind: "trees" | "bunker"; m: Pt };
  face: (t: number) => number;
};

/** Which shots go wrong, so he needs a second try. */
const MISSES: Record<number, "trees" | "bunker"> = { 1: "trees", 4: "bunker", 6: "trees", 9: "bunker" };

const arcPath = (a: Pt, b: Pt, peak: number) =>
  `M ${a.x} ${a.y} Q ${(a.x + b.x) / 2} ${(a.y + b.y) / 2 - peak * 2} ${b.x} ${b.y}`;

function buildGeometry(w: number, n: number) {
  const mobile = w < 1000;
  const scale = mobile ? 1 : 1.5;
  const reach = REACH * scale;
  const k = mobile ? 0.62 : 1;
  const fw = mobile ? 96 : 150;
  const base = mobile ? 470 : 400;
  const missLen = mobile ? 760 : 700;
  const puttLen = mobile ? 380 : 330;
  const top = 70;
  const cx = w / 2;
  const amp = w * 0.1;

  const lens = Array.from({ length: n - 1 }, (_, i) => (MISSES[i] ? missLen : base));
  const ys: number[] = [top];
  lens.forEach((l) => ys.push(ys[ys.length - 1] + l));

  const stops: Stop[] = ys.map((y, i) => {
    if (mobile) {
      const x = i % 2 ? 88 : 44;
      return { x, y, side: "right", cardWidth: w - 128 - 16, cardOffset: 128 - x, revealY: 0 };
    }
    const left = i % 2 === 0;
    return {
      x: cx + (left ? -amp : amp),
      y,
      side: left ? "left" : "right",
      cardWidth: Math.max(240, Math.min(380, cx - amp - 96 - 24)),
      cardOffset: 96,
      revealY: 0,
    };
  });

  const stand = (p: Pt, face: number): Pt => ({ x: p.x - face * reach, y: p.y });

  const segs: Seg[] = lens.map((len, i) => {
    const A = stops[i];
    const B = stops[i + 1];
    const d = B.x >= A.x ? 1 : -1;
    const kind = MISSES[i];

    if (!kind) {
      const shot: Shot = { a: A, b: B, peak: ARC_PEAK, impact: 0.17, flight: 0.36, d: arcPath(A, B, ARC_PEAK) };
      return {
        y0: ys[i],
        len,
        shots: [shot],
        walks: [{ t0: 0.55, t1: 0.92, from: stand(A, d), to: stand(B, -d) }],
        keys: SHOT_KEYS,
        landT: 0.53,
        over: i % 2 === 0 ? "pond" : "bunkers",
        overAt: { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 },
        face: (t) => (t >= 0.92 ? -d : d),
      };
    }

    // a wayward first shot lands off the line, then he plays it from there
    const cl = Math.hypot(B.x - A.x, B.y - A.y);
    const nx = -(B.y - A.y) / cl;
    const ny = (B.x - A.x) / cl;
    const side = mobile ? 1 : i % 2 ? 1 : -1;
    const off = kind === "trees" ? fw / 2 + 50 * k + 8 : fw / 2 - 10;
    const mid = { x: lerp(A.x, B.x, 0.45), y: lerp(A.y, B.y, 0.45) };
    const M: Pt = {
      x: clamp(mid.x + nx * side * off, 18, w - 18),
      y: mid.y + ny * side * off,
    };
    const d2 = Math.sign(B.x - M.x) || d;
    const s1: Shot = { a: A, b: M, peak: 42, impact: 0.09, flight: 0.12, d: arcPath(A, M, 42) };
    const s2: Shot = { a: M, b: B, peak: ARC_PEAK, impact: 0.57, flight: 0.27, d: arcPath(M, B, ARC_PEAK) };
    return {
      y0: ys[i],
      len,
      shots: [s1, s2],
      walks: [
        { t0: 0.28, t1: 0.43, from: stand(A, d), to: stand(M, d2) },
        { t0: 0.82, t1: 0.96, from: stand(M, d2), to: stand(B, -d) },
      ],
      keys: MISS_KEYS,
      landT: 0.84,
      over: i % 2 === 0 ? "pond" : "bunkers",
      overAt: { x: (M.x + B.x) / 2, y: (M.y + B.y) / 2 },
      miss: { kind, m: M },
      face: (t) => (t >= 0.96 ? -d : t >= 0.44 ? d2 : d),
    };
  });

  // each card appears just before the ball lands on its stop
  stops.forEach((s, i) => {
    s.revealY = i === 0 ? -9999 : s.y - (1 - segs[i - 1].landT) * segs[i - 1].len - 120;
  });

  const last = stops[n - 1];
  const cup = { x: mobile ? 66 : cx, y: last.y + (mobile ? 115 : 150) };
  const H = last.y + puttLen + 170;

  return { H, puttLen, stops, segs, cup, mobile, k, fw, scale };
}
type Geo = ReturnType<typeof buildGeometry>;

/* ───────────────────────── the course (static terrain) ───────────────────────── */

function distToSeg(p: Pt, a: Pt, b: Pt) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const t = clamp(((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy || 1));
  return Math.hypot(p.x - (a.x + dx * t), p.y - (a.y + dy * t));
}

type Tree = { x: number; y: number; r: number; tone: number };

function buildTrees(geo: Geo, w: number): Tree[] {
  const { stops, segs, fw, k, mobile } = geo;
  const last = stops[stops.length - 1];
  const poly: Pt[] = [{ x: stops[0].x, y: -60 }, ...stops];
  const trees: Tree[] = [];

  if (!mobile) {
    for (let j = 0; j < poly.length - 1; j++) {
      const a = poly[j];
      const b = poly[j + 1];
      const L = Math.hypot(b.x - a.x, b.y - a.y);
      const ux = (b.x - a.x) / L;
      const uy = (b.y - a.y) / L;
      let idx = 0;
      for (let d = 18; d < L; d += 40 + rand(j, idx) * 22) {
        for (const side of [-1, 1]) {
          const r1 = rand(j * 13 + idx, side);
          const r2 = rand(j * 7 + idx, side + 3);
          const off = fw / 2 + 40 + r1 * 46;
          const p = { x: a.x + ux * d - uy * side * off, y: a.y + uy * d + ux * side * off };
          const r = 11 + r2 * 13;
          if (p.x < r + 4 || p.x > w - r - 4 || p.y > last.y - 70) continue;
          let near = false;
          for (let q = 0; q < poly.length - 1; q++) {
            if (distToSeg(p, poly[q], poly[q + 1]) < fw / 2 + 30 + r * 0.4) near = true;
          }
          if (!near) trees.push({ x: p.x, y: p.y, r, tone: r2 });
        }
        idx++;
      }
    }
  }

  // the clump the ball disappears into
  segs.forEach((s, i) => {
    if (s.miss?.kind !== "trees") return;
    const { m } = s.miss;
    for (let c = 0; c < 6; c++) {
      const ang = (c / 6) * Math.PI * 2 + rand(i, c) * 1.2;
      const rad = (c === 0 ? 0 : 22 + rand(c, i) * 10) * k;
      trees.push({
        x: m.x + Math.cos(ang) * rad,
        y: m.y + Math.sin(ang) * rad * 0.8,
        r: (17 + rand(i + c, 5) * 9) * Math.max(k, 0.8),
        tone: rand(c, i + 9),
      });
    }
  });

  return trees.sort((a, b) => a.y - b.y);
}

function Course({ geo, w }: { geo: Geo; w: number }) {
  const { stops, segs, cup, H, mobile, k, fw } = geo;
  const last = stops[stops.length - 1];
  const poly = [{ x: stops[0].x, y: -60 }, ...stops];
  const line = poly.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ");
  const gk = mobile ? 0.7 : 1;
  const gx = (last.x + cup.x) / 2;
  const gy = (last.y + cup.y) / 2;
  const grx = Math.abs(cup.x - last.x) / 2 + 78 * gk;
  const gry = Math.abs(cup.y - last.y) / 2 + 72 * gk;
  const trees = useMemo(() => buildTrees(geo, w), [geo, w]);
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

      {/* hazards the ball flies over, plus the bunkers he sometimes finds */}
      {segs.map((s, i) =>
        s.over === "pond" ? (
          <g key={`h${i}`} transform={`translate(${s.overAt.x} ${s.overAt.y}) scale(${k})`}>
            <ellipse rx={94} ry={52} fill="#1a4558" />
            <ellipse rx={86} ry={45} fill="#2d7391" />
            <ellipse cx={-16} cy={-9} rx={54} ry={23} fill="#3f8ba9" opacity={0.55} />
            <path d="M -44 8 q 8 -6 16 0 t 16 0" stroke="#c4e6f2" strokeWidth={1.6} fill="none" opacity={0.5} />
            <path d="M 16 -16 q 8 -6 16 0 t 16 0" stroke="#c4e6f2" strokeWidth={1.6} fill="none" opacity={0.5} />
          </g>
        ) : (
          <g key={`h${i}`} transform={`translate(${s.overAt.x} ${s.overAt.y}) scale(${k})`}>
            <ellipse cx={-36} cy={-8} rx={52} ry={28} fill="#7f7553" />
            <ellipse cx={-36} cy={-8} rx={46} ry={23} fill="#cfc193" opacity={0.92} />
            <ellipse cx={40} cy={15} rx={46} ry={25} fill="#7f7553" />
            <ellipse cx={40} cy={15} rx={40} ry={20} fill="#cfc193" opacity={0.92} />
            <path d="M -62 -10 h 44 M -58 -2 h 40 M 20 12 h 40 M 24 20 h 34" stroke="#a89a6b" strokeWidth={1.4} opacity={0.7} />
          </g>
        ),
      )}
      {segs.map((s, i) =>
        s.miss?.kind === "bunker" ? (
          <g key={`mb${i}`} transform={`translate(${s.miss.m.x} ${s.miss.m.y}) scale(${Math.max(k, 0.75)})`}>
            <ellipse rx={50} ry={29} fill="#7f7553" />
            <ellipse rx={44} ry={24} fill="#cfc193" opacity={0.92} />
            <path d="M -30 -6 h 52 M -26 2 h 46 M -20 10 h 34" stroke="#a89a6b" strokeWidth={1.4} opacity={0.7} />
          </g>
        ) : null,
      )}

      {/* trees lining the fairway and hiding the odd ball */}
      {trees.map((t, i) => (
        <g key={i} transform={`translate(${t.x} ${t.y})`}>
          <circle cx={4} cy={6} r={t.r} fill="#000" opacity={0.3} />
          <circle r={t.r} fill={t.tone > 0.5 ? "#173d22" : "#1c4a29"} />
          <circle cx={-t.r * 0.22} cy={-t.r * 0.25} r={t.r * 0.62} fill={t.tone > 0.5 ? "#245c33" : "#2a6b38"} opacity={0.85} />
          <circle cx={-t.r * 0.38} cy={-t.r * 0.42} r={t.r * 0.22} fill="#3d8a4a" opacity={0.6} />
        </g>
      ))}

      {/* the green */}
      <ellipse cx={gx} cy={gy} rx={grx + 24} ry={gry + 24} fill="#2c5732" />
      <ellipse cx={gx} cy={gy} rx={grx} ry={gry} fill="#3a7442" />
      <ellipse cx={gx} cy={gy} rx={grx} ry={gry} fill="url(#ttMow)" />
      <ellipse cx={cup.x} cy={cup.y} rx={9} ry={5} fill="#070b07" />
      <ellipse cx={cup.x} cy={cup.y} rx={9} ry={5} fill="none" stroke="#a9cc9d" strokeWidth={0.9} />
    </svg>
  );
}

/* ───────────────────────── shot trail ───────────────────────── */

function Arc({
  shot,
  y0,
  len,
  H,
  progress,
}: {
  shot: Shot;
  y0: number;
  len: number;
  H: number;
  progress: MotionValue<number>;
}) {
  const drawn = useTransform(progress, (p) => clamp(((p * H - y0) / len - shot.impact) / shot.flight));
  return (
    <>
      <path d={shot.d} fill="none" stroke="#f4f1e6" strokeWidth={1.6} strokeLinecap="round" strokeDasharray="2 9" opacity={0.22} />
      <motion.path
        d={shot.d}
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
  priority,
}: {
  event: TimelineEvent;
  stop: Stop;
  progress: MotionValue<number>;
  H: number;
  priority: boolean;
}) {
  const reveal = useTransform(progress, (p) => clamp((p * H - stop.revealY) / 70));
  const y = useTransform(reveal, (r) => (1 - r) * 44);
  const scale = useTransform(reveal, (r) => 0.88 + r * 0.12);
  const styles = categoryStyles[event.category];
  const left = stop.side === "left";
  const ratio = clamp(IMAGE_RATIO[event.image ?? ""] ?? 1.33, 0.8, 1.5);

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
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: ratio }}>
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 90vw, 380px"
              className="object-cover object-top"
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
            <div className="relative w-full" style={{ aspectRatio: clamp(IMAGE_RATIO[e.image] ?? 1.33, 0.8, 1.5) }}>
              <Image src={e.image} alt={e.title} fill sizes="(max-width: 768px) 100vw, 640px" className="object-cover object-top" />
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
  const puffRef = useRef<SVGGElement>(null);
  const bubbleRef = useRef<SVGTextElement>(null);
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
      const puff = puffRef.current;
      const bubble = bubbleRef.current;
      if (!geo || !ball || !body || !shadow || !golfer || !torso || !arm || !club || !legA || !legB || !flag || !puff || !bubble)
        return;

      const { stops, segs, puttLen, H, scale, cup, mobile } = geo;
      const last = stops[stops.length - 1];
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
      const setBall = (bx: number, by: number, lift: number, size: number, alpha: number, sh: number) => {
        ball.setAttribute("transform", `translate(${bx} ${by - lift})`);
        body.setAttribute("transform", `scale(${size})`);
        ball.style.opacity = String(alpha);
        shadow.setAttribute("transform", `translate(${bx} ${by}) scale(${sh})`);
        shadow.style.opacity = String(0.35 * alpha);
      };
      const setBubble = (msg: string, amount: number, x: number, gy: number) => {
        if (bubble.textContent !== msg) bubble.textContent = msg;
        bubble.style.opacity = String(amount);
        bubble.setAttribute("transform", `translate(${x} ${gy - 62 * scale - 12})`);
      };

      if (y >= last.y) {
        /* ── the putt ── */
        const t = clamp((y - last.y) / puttLen);
        const dir = cup.x >= last.x ? 1 : -1;
        const [a, c, lean] = pose(t, PUTT_KEYS);
        const hop = t > 0.82 ? -Math.abs(Math.sin(((t - 0.82) / 0.18) * Math.PI * 3)) * 7 * (1 - (t - 0.82) / 0.18) : 0;
        const gx = last.x - dir * reach;
        setGolfer(gx, last.y + hop, dir, a, c, lean, 0);

        const s = clamp((t - 0.16) / 0.46);
        const roll = 1 - Math.pow(1 - s, 2.2);
        const drop = clamp((t - 0.62) / 0.06);
        const bx = lerp(last.x, cup.x, roll);
        const by = lerp(last.y, cup.y, roll);
        setBall(bx, by + drop * 4, 0, 1 - drop * 0.8, 1 - drop, 1 - drop);

        const wig = t > 0.64 ? Math.sin((t - 0.64) * 70) * 9 * (1 - clamp((t - 0.64) / 0.3)) : 0;
        flag.setAttribute("transform", `rotate(${wig} ${cup.x} ${cup.y - 64})`);
        puff.style.opacity = "0";
        setBubble("Nice putt!", Math.sin(Math.PI * clamp((t - 0.72) / 0.26)), gx, last.y);
        return;
      }

      /* ── a shot, or a miss and a second try ── */
      let i = 0;
      while (i < segs.length - 1 && y >= segs[i + 1].y0) i++;
      const seg = segs[i];
      const t = clamp((y - seg.y0) / seg.len);

      let active = seg.shots[0];
      let activeIdx = 0;
      seg.shots.forEach((sh, j) => {
        if (t >= sh.impact) {
          active = sh;
          activeIdx = j;
        }
      });
      const s = t >= active.impact ? clamp((t - active.impact) / active.flight) : 0;
      const arc = 4 * s * (1 - s);
      const landT = active.impact + active.flight;
      const u = clamp((t - landT) / 0.08);
      const bounce = t > landT && t < landT + 0.08 ? (seg.miss && activeIdx === 0 ? 7 : 12) * 4 * u * (1 - u) : 0;
      const gx = lerp(active.a.x, active.b.x, s);
      const gy = lerp(active.a.y, active.b.y, s);
      let alpha = 1;
      if (seg.miss?.kind === "trees" && activeIdx === 0) {
        // the ball vanishes into the leaves until he walks up and finds it
        alpha = t < 0.4 ? 1 - clamp((s - 0.9) / 0.1) : clamp((t - 0.4) / 0.04);
      }
      setBall(gx, gy, arc * active.peak + bounce, 1 + arc * 0.7, alpha, 1 - arc * 0.4);
      flag.setAttribute("transform", "rotate(0)");

      let pos = seg.walks[0].from;
      let stride = 0;
      for (const wk of seg.walks) {
        if (t >= wk.t0) {
          const kk = easeInOut(clamp((t - wk.t0) / (wk.t1 - wk.t0)));
          pos = { x: lerp(wk.from.x, wk.to.x, kk), y: lerp(wk.from.y, wk.to.y, kk) };
          if (kk > 0 && kk < 1) stride = Math.sin(kk * Math.PI * 7) * 28;
        }
      }
      const [a, c, lean] = pose(t, seg.keys);
      setGolfer(pos.x, pos.y, seg.face(t), a, c, lean, stride);

      // sand / leaf burst where the miss lands, and a shout
      if (seg.miss) {
        const first = seg.shots[0];
        const e = clamp((t - first.impact - first.flight) / 0.1);
        if (e > 0 && e < 1) {
          puff.setAttribute("transform", `translate(${seg.miss.m.x} ${seg.miss.m.y})`);
          puff.style.opacity = String(1 - e);
          const spread = 28 * (mobile ? 0.7 : 1);
          Array.from(puff.children).forEach((dot, idx) => {
            const ang = (idx * Math.PI) / 3 + 0.4;
            const r = lerp(2, spread, easeOut(e));
            dot.setAttribute("cx", String(Math.cos(ang) * r));
            dot.setAttribute("cy", String(Math.sin(ang) * r * 0.7 - e * 12));
            dot.setAttribute("fill", seg.miss!.kind === "bunker" ? "#e0d29b" : "#7fb76c");
          });
        } else {
          puff.style.opacity = "0";
        }
        const t0 = first.impact + 0.02;
        setBubble(
          seg.miss.kind === "trees" ? "FORE!" : "Sand trap…",
          Math.sin(Math.PI * clamp((t - t0) / 0.2)),
          pos.x,
          pos.y,
        );
      } else {
        puff.style.opacity = "0";
        bubble.style.opacity = "0";
      }
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
              {geo.segs.map((seg, i) =>
                seg.shots.map((shot, j) => (
                  <Arc key={`${i}-${j}`} shot={shot} y0={seg.y0} len={seg.len} H={geo.H} progress={smooth} />
                )),
              )}

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

              {/* sand / leaf burst */}
              <g ref={puffRef} style={{ opacity: 0 }}>
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <circle key={n} r={3.2} fill="#e0d29b" />
                ))}
              </g>

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

              <text
                ref={bubbleRef}
                textAnchor="middle"
                className="font-label"
                fontSize={15}
                fontWeight={700}
                fill="#f4f1e6"
                stroke="#0f1a12"
                strokeWidth={4}
                strokeLinejoin="round"
                paintOrder="stroke"
                style={{ opacity: 0 }}
              />
            </svg>

            {events.map((event, i) => (
              <StopCard key={event.title} event={event} stop={geo.stops[i]} progress={smooth} H={geo.H} priority={i < 2} />
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
