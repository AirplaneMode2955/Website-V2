/**
 * Full-color, transparent-background icons for each Arcade game — one hand-drawn
 * SVG per slug, keyed by ArcadeGame['slug']. Deliberately saturated so they pop
 * against the dark cards, unlike the neutral Material Symbols glyphs elsewhere
 * on the site.
 */
import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function CakeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <ellipse cx="32" cy="55" rx="21" ry="4" fill="#C77DA0" opacity="0.35" />
      <rect x="14" y="38" width="36" height="15" rx="3" fill="#FF6FA5" />
      <path
        d="M14 40c2-3 4-3 6 0s4 3 6 0 4-3 6 0 4 3 6 0 4-3 6 0 4 3 6 0v-4H14v4z"
        fill="#FFE8C2"
      />
      <circle cx="20" cy="46" r="1.8" fill="#5B8DEF" />
      <circle cx="30" cy="48" r="1.8" fill="#FFD23F" />
      <circle cx="40" cy="46" r="1.8" fill="#3DAA57" />
      <circle cx="46" cy="49" r="1.8" fill="#5B8DEF" />
      <rect x="29" y="16" width="6" height="16" rx="2" fill="#FFFFFF" />
      <rect x="29" y="22" width="6" height="4" fill="#E63946" />
      <path d="M32 6c3 4 3 7 0 10-3-3-3-6 0-10z" fill="#FF7A00" />
      <path d="M32 10c1.6 2 1.6 3.6 0 5.4-1.6-1.8-1.6-3.4 0-5.4z" fill="#FFD23F" />
    </svg>
  );
}

function ChessIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <rect x="18" y="50" width="28" height="6" rx="2" fill="#2D2A26" />
      <path d="M22 50l4-16h12l4 16H22z" fill="#F2C94C" />
      <ellipse cx="32" cy="30" rx="12" ry="10" fill="#F2C94C" />
      <rect x="21" y="22" width="22" height="6" rx="2" fill="#E8B33D" />
      <circle cx="32" cy="16" r="5.5" fill="#5B8DEF" />
      <rect x="30" y="4" width="4" height="11" rx="1" fill="#5B8DEF" />
      <rect x="26.5" y="7.5" width="11" height="4" rx="1" fill="#5B8DEF" />
    </svg>
  );
}

function GolfFlagIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <ellipse cx="32" cy="51" rx="26" ry="10" fill="#3DAA57" />
      <ellipse cx="25" cy="47" rx="13" ry="4.5" fill="#59C36A" opacity="0.7" />
      <rect x="16.5" y="9" width="3" height="42" rx="1.5" fill="#FFFFFF" />
      <path d="M19.5 11l17 7-17 7V11z" fill="#E63946" />
      <circle cx="47" cy="45" r="5.5" fill="#FFFFFF" stroke="#D8D8D8" strokeWidth="1" />
      <circle cx="45" cy="43" r="0.8" fill="#D8D8D8" />
      <circle cx="49" cy="44" r="0.8" fill="#D8D8D8" />
      <circle cx="47" cy="47" r="0.8" fill="#D8D8D8" />
    </svg>
  );
}

function SoccerBadgeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <ellipse cx="28" cy="51" rx="24" ry="9" fill="#2E9E64" />
      <circle cx="26" cy="32" r="16" fill="#FFFFFF" stroke="#2D2A26" strokeWidth="1.4" />
      <path
        d="M26 22l6 4.4-2.3 7h-7.4L20 26.4 26 22z"
        fill="#2D2A26"
      />
      <path d="M14 30l4.6-1.4 2 6.2-3.6 2.8L14 30z" fill="#2D2A26" />
      <path d="M38 30l-4.6-1.4-2 6.2 3.6 2.8L38 30z" fill="#2D2A26" />
      <circle cx="47" cy="19" r="8" fill="#F2C94C" />
      <path
        d="M47 14l1.5 3.2 3.5.4-2.6 2.4.7 3.5-3.1-1.8-3.1 1.8.7-3.5-2.6-2.4 3.5-.4L47 14z"
        fill="#FFFFFF"
      />
      <path d="M42 25l-2 6 5-2.5z" fill="#E63946" />
      <path d="M52 25l2 6-5-2.5z" fill="#E63946" />
    </svg>
  );
}

function SignatureIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <rect x="10" y="12" width="34" height="42" rx="3" fill="#FFE8C2" transform="rotate(-4 27 33)" />
      <path
        d="M16 38c4-6 7-6 10-1s6 5 9-1 6-7 9-2"
        stroke="#5B8DEF"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        transform="rotate(-4 27 33)"
      />
      <path
        d="M16 46h20"
        stroke="#E8B33D"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.5"
        transform="rotate(-4 27 33)"
      />
      <g transform="rotate(45 46 20)">
        <rect x="42" y="4" width="8" height="26" rx="3" fill="#8E7CC3" />
        <path d="M42 30h8l-4 8-4-8z" fill="#F2C94C" />
        <circle cx="46" cy="39" r="1.6" fill="#2D2A26" />
      </g>
    </svg>
  );
}

function TerrariumIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M18 24c0-2 1-3 3-3h22c2 0 3 1 3 3v24c0 4-3 8-8 8H26c-5 0-8-4-8-8V24z"
        fill="#BEE3F8"
        opacity="0.35"
        stroke="#8FCFEA"
        strokeWidth="2"
      />
      <rect x="19" y="10" width="26" height="7" rx="2" fill="#8FCFEA" />
      <rect x="23" y="6" width="18" height="5" rx="1.5" fill="#6FB9DE" />
      <ellipse cx="32" cy="48" rx="13" ry="4.5" fill="#8B5E3C" />
      <path
        d="M32 47c0-10-6-14-6-22"
        stroke="#2E9E64"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M26 25c-3-2-3-6-1-9 4 1 6 5 5 9-1 2-2 2-4 0z" fill="#3DAA57" />
      <path
        d="M32 40c2-7 8-9 9-15"
        stroke="#2E9E64"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M40 22c3-1 5-5 4-8-4 0-7 3-7 7 0 2 1 2 3 1z" fill="#59C36A" />
      <rect x="21" y="43" width="3" height="3" fill="#F2C94C" />
      <rect x="40" y="45" width="3" height="3" fill="#E63946" />
      <rect x="30" y="46" width="3" height="3" fill="#5B8DEF" />
    </svg>
  );
}

function GolfPuttIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <ellipse cx="32" cy="51" rx="26" ry="10" fill="#8BC34A" />
      <ellipse cx="40" cy="49" rx="5" ry="2.4" fill="#1B1B1B" />
      <path
        d="M22 45c4-1 8-1.5 12-2"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeDasharray="2 3"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="17" cy="44" r="5" fill="#FFFFFF" stroke="#D8D8D8" strokeWidth="1" />
      <g transform="rotate(35 40 30)">
        <rect x="38" y="10" width="2.6" height="30" rx="1.3" fill="#5A5A5A" />
        <rect x="34" y="8" width="10" height="6" rx="1.5" fill="#B0B0B0" />
      </g>
    </svg>
  );
}

function TrophyIcon(props: IconProps) {
  const grid = [
    '..GGGG..',
    '.GGGGGG.',
    'HGGGGGGH',
    'HGGDDGGH',
    '..GDDG..',
    '...GG...',
    '..RRRR..',
    '.BBBBBB.',
    'BBBBBBBB',
  ];
  const colors: Record<string, string> = {
    G: '#F2C94C',
    D: '#C9971F',
    H: '#E8B33D',
    R: '#E63946',
    B: '#5B8DEF',
  };
  const unit = 6.4;
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      {grid.flatMap((row, y) =>
        row.split('').map((cell, x) =>
          cell === '.' ? null : (
            <rect
              key={`${x}-${y}`}
              x={x * unit + 3}
              y={y * unit + 4}
              width={unit}
              height={unit}
              fill={colors[cell]}
            />
          )
        )
      )}
    </svg>
  );
}

export const arcadeIcons: Record<string, (props: IconProps) => React.JSX.Element> = {
  birthdle: CakeIcon,
  'play-me-chess': ChessIcon,
  'utah-golf-tinder': GolfFlagIcon,
  'table-talk': SoccerBadgeIcon,
  'career-signature': SignatureIcon,
  'pixel-terrarium': TerrariumIcon,
  'read-the-green': GolfPuttIcon,
  'retro-world-cup': TrophyIcon,
};

export function GameIcon({ slug, className, style }: { slug: string } & IconProps) {
  const Icon = arcadeIcons[slug];
  if (!Icon) return null;
  return (
    <Icon
      className={className}
      style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.4))', ...style }}
      aria-hidden="true"
    />
  );
}
