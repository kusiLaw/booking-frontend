
const REVIEWS = [
  {
    quote: "I've been coming here for three years and I wouldn't go anywhere else. Sophie completely transformed my hair — the colour is extraordinary.",
    name: 'Jessica W.',
    detail: 'Balayage client',
    rating: 5,
  },
  {
    quote: "The most relaxed salon experience I've ever had. No rushing, real conversation, and my haircut was perfect. Genuinely exceptional.",
    name: 'Oliver S.',
    detail: "Men's cut regular",
    rating: 5,
  },
  {
    quote: "I was nervous about going lighter but Emma walked me through every step. The result was beyond what I imagined. Absolutely stunning.",
    name: 'Priya P.',
    detail: 'Full colour client',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="section" style={{ background: 'var(--ink)', overflow: 'hidden', position: 'relative' }}>
      {/* Decorative background text */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(100px, 16vw, 200px)',
        fontWeight: 300,
        color: 'rgba(255,255,255,0.03)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        userSelect: 'none',
        letterSpacing: '-0.04em',
      }}>
        ★★★★★
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="gold-rule" style={{ display: 'block', width: 32, margin: '0 auto 20px' }} />
          <p className="t-label" style={{ color: 'var(--gold)', marginBottom: 16 }}>Client love</p>
          <h2 className="t-display-lg" style={{ color: 'var(--cream)' }}>
            What they say
          </h2>
        </div>

        {/* Reviews */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="hover:bg-[rgba(240,235,226,0.06)] transition-colors duration-300 rounded-lg"
              style={{
                padding: '36px 32px',
                border: '1px solid rgba(240,235,226,0.1)',
                borderRadius: 'var(--r-sm)',
                background: 'rgba(240,235,226,0.04)',
                position: 'relative',
                transition: 'border-color 0.2s, background 0.2s',
              }}
  
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
                {Array.from({ length: r.rating }).map((_, j) => (
                  <span key={j} style={{ color: 'var(--gold)', fontSize: 13 }}>★</span>
                ))}
              </div>

              {/* Opening quote mark */}
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 72, fontWeight: 300,
                color: 'rgba(196,154,60,0.2)',
                lineHeight: 0.6,
                marginBottom: 16,
              }}>
                "
              </div>

              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 18, fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.65,
                color: 'rgba(240,235,226,0.8)',
                marginBottom: 28,
              }}>
                {r.quote}
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(196,154,60,0.15)',
                  border: '1px solid rgba(196,154,60,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 14, color: 'var(--gold-light)' }}>
                    {r.name[0]}
                  </span>
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--cream)' }}>{r.name}</p>
                  <p className="t-body-sm" style={{ color: 'rgba(240,235,226,0.4)', fontSize: 12 }}>{r.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google badge */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(240,235,226,0.4)' }}>
            5.0 ★ on Google · 200+ verified reviews
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { section div[style*="repeat(3, 1fr)"] { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
