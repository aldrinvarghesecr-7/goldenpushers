import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: '#050505',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#D4AF77',
          borderRadius: '20%',
          border: '1px solid rgba(212, 175, 119, 0.3)',
        }}
      >
        <svg
          viewBox="0 0 100 100"
          style={{ width: '85%', height: '85%' }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Outer Circular Wave */}
          <path
            d="M82.5 35C85 45 85 55 82.5 65C78 78 65 88 50 88C30 88 12 72 12 50C12 28 28 12 50 12C62 12 73 18 80 28"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Inner Wave Layers */}
          <path
            d="M18 55C25 45 35 48 45 58C55 68 65 65 75 55"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ opacity: 0.6 }}
          />
          <path
            d="M22 65C30 58 40 60 48 68C56 76 66 74 74 66"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ opacity: 0.4 }}
          />
        </svg>

      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
