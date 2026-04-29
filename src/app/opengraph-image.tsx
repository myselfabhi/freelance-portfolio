import { ImageResponse } from 'next/og'
import { SITE } from '@/lib/seo'

export const alt = `${SITE.author} — ${SITE.jobTitle}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(139,92,246,0.12), transparent 70%), #050505',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Bottom-right purple orb */}
        <div
          style={{
            position: 'absolute',
            right: '-150px',
            bottom: '-150px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.35), transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Top: AV mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            fontSize: '20px',
            fontWeight: 800,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#34D399',
              boxShadow: '0 0 12px rgba(52,211,153,0.9)',
              display: 'flex',
            }}
          />
          {SITE.availability}
        </div>

        {/* Center: tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '108px',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: 'white',
            }}
          >
            <div style={{ display: 'flex' }}>Web products</div>
            <div style={{ display: 'flex' }}>that print money.</div>
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.55)',
              letterSpacing: '-0.01em',
            }}
          >
            {`${SITE.author} — ${SITE.jobTitle}`}
          </div>
        </div>

        {/* Bottom: URL + AV */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              fontSize: '22px',
              fontWeight: 800,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            abhinavverma.dev
          </div>
          <div
            style={{
              fontSize: '120px',
              fontWeight: 900,
              fontStyle: 'italic',
              letterSpacing: '-0.06em',
              color: 'rgba(139,92,246,0.5)',
              lineHeight: 1,
            }}
          >
            AV.
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
