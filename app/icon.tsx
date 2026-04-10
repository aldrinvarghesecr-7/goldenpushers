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
          style={{ width: '80%', height: '80%' }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30 50C45 30 65 30 80 55"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M15 65C15 65 30 35 55 35C80 35 85 70 85 70C85 70 70 85 55 85C40 85 15 65 15 65Z"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
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
