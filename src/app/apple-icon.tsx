import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#141c14',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="180"
          height="180"
          viewBox="0 0 160 160"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Putting green */}
          <ellipse cx="80" cy="118" rx="52" ry="11" fill="#2a3e2a" />

          {/* Flagstick */}
          <line
            x1="80" y1="38" x2="80" y2="120"
            stroke="#c9dbc3" strokeWidth="3" strokeLinecap="round"
          />

          {/* Red flag */}
          <polygon points="80,38 118,53 80,68" fill="#d94f3d" />

          {/* Ball */}
          <circle cx="108" cy="116" r="7" fill="#e7e9e4" />
          <circle cx="106" cy="114" r="2.5" fill="#ffffff" opacity="0.45" />

          {/* Ball shadow */}
          <ellipse cx="108" cy="122" rx="7" ry="2.5" fill="#000000" opacity="0.2" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
