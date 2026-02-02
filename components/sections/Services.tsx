import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'

const SERVICES = [
  { name: "Women's Cut & Blow Dry", desc: 'Wash, precision cut, blow dry and finish.', duration: '60 mins', price: '£65', tag: 'Popular' },
  { name: "Men's Cut",              desc: 'A sharp cut shaped to your style.',         duration: '30 mins', price: '£35', tag: null },
  { name: 'Full Colour',            desc: 'Root-to-tip colour with a gloss finish.',   duration: '2 hours', price: '£120', tag: null },
  { name: 'Balayage',               desc: 'Hand-painted, sun-kissed highlights.',      duration: '2.5 hrs', price: '£160', tag: 'Signature' },
  { name: 'Highlights',             desc: 'Foil highlights — full or half head.',      duration: '90 mins', price: '£95', tag: null },
  { name: 'Keratin Treatment',      desc: 'Smooth, frizz-free for up to 3 months.',   duration: '2 hours', price: '£140', tag: null },
]

export default function Services() {
  return (
    <section className="section" id="services" style={{ background: 'var(--cream)' }}>
      <div className="container">

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <span className="gold-rule" />
            <p className="t-label" style={{ marginBottom: 14 }}>What we offer</p>
            <h2 className="t-display-lg">Our services</h2>
          </div>
          <Link href="/booking" className="btn btn-outline-dark" style={{ alignSelf: 'flex-end' }}>
            View all & book <ArrowRight size={13} />
          </Link>
        </div>

        {/* Grid */}
        <div  className='group'
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: 'var(--line)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--r-sm)',
          overflow: 'hidden',
        }}>
          {SERVICES.map((svc, i) => (
            <Link
            className='hover:bg-red-500 group-hover:transition-colors group-hover:duration-300 service-card'

              href="/booking"
              key={svc.name}
              style={{
                display: 'block',
                background: 'var(--white)',
                padding: '32px 28px',
                position: 'relative',
                transition: 'background 0.2s',
                textDecoration: 'none',
                
              }}
              

            >
              {/* Tag */}
              {svc.tag && (
                <span style={{
                  position: 'absolute', top: 20, right: 20,
                  fontFamily: 'var(--font-sans)', fontSize: 9,
                  fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'var(--gold)',
                  background: 'var(--gold-pale)',
                  padding: '3px 8px', borderRadius: 2,
                  border: '1px solid rgba(196,154,60,0.2)',
                }}>
                  {svc.tag}
                </span>
              )}

              {/* Number */}
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11, color: 'var(--ink-faint)',
                marginBottom: 16,
              }}>
                {String(i + 1).padStart(2, '0')}
              </p>

              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 22, fontWeight: 400,
                color: 'var(--ink)', marginBottom: 10,
                letterSpacing: '-0.01em', lineHeight: 1.2,
              }}>
                {svc.name}
              </h3>

              <p className="t-body-sm" style={{ marginBottom: 24 }}>{svc.desc}</p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Clock size={11} style={{ color: 'var(--ink-faint)' }} />
                  <span style={{ fontSize: 12, color: 'var(--ink-faint)', fontWeight: 300 }}>{svc.duration}</span>
                </div>
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 26, fontWeight: 300, color: 'var(--ink)',
                }}>
                  {svc.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .services-grid { grid-template-columns: 1fr !important; } }
        .service-card:hover {
          background: var(--gold-pale) !important;
        }
      `}</style>
    </section>
  )
}
