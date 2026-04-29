import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'radial-gradient(circle at 50% 40%, rgba(139,92,246,0.45), transparent 70%), #050505',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: '110px',
            fontWeight: 900,
            fontStyle: 'italic',
            letterSpacing: '-0.06em',
            color: 'white',
            lineHeight: 1,
            textShadow: '0 2px 24px rgba(139,92,246,0.6)',
          }}
        >
          AV
        </div>
      </div>
    ),
    { ...size }
  )
}
