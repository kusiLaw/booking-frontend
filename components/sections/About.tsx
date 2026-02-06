// 'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function About() {
  return (
    <section className="section" id="about" style={{ background: 'var(--cream-dark)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

          {/* Image stack — placeholder */}
          <div style={{ position: 'relative', paddingBottom: 40 }}>
            {/* Main image */}
            
            <div className="imgplaceholder" style={{
              width: '85%', paddingBottom: '110%',
              borderRadius: 'var(--r-sm)',
              position: 'relative',
            }}>
               <Image src="/about.jpg" alt="About image" fill style={{ objectFit: 'cover',  }} />

              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: 'var(--ink-faint)' }}>✦</span>
                <p className="t-label" style={{ color: 'var(--ink-faint)' }}>About photo</p>
              </div>
            </div>

            {/* Inset accent image */}
            <div className="imgplaceholder" style={{
              position: 'absolute',
              bottom: 0, right: 0,
              width: '52%', paddingBottom: '64%',
              borderRadius: 'var(--r-sm)',
              border: '4px solid var(--cream-dark)',
              boxShadow: 'var(--sh-lg)',
            }}>
              <Image src="/hair-details.jpg" alt="About image" fill style={{ objectFit: 'cover',  }} />
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
                <p className="t-label" style={{ color: 'var(--ink-faint)', fontSize: 9 }}>Detail photo</p>
              </div>
            </div>

            {/* Gold accent bar */}
            <div style={{
              position: 'absolute',
              top: 40, left: -16,
              width: 4, height: '60%',
              background: 'linear-gradient(to bottom, var(--gold), transparent)',
              borderRadius: 2,
            }} />
          </div>

          {/* Text */}
          <div>
            <span className="gold-rule" />
            <p className="t-label" style={{ marginBottom: 16 }}>Our story</p>

            <h2 className="t-display-lg" style={{ marginBottom: 28, lineHeight: 1.05 }}>
              Crafted with<br />
              <span className="t-italic" style={{ color: 'var(--gold-deep)' }}>care & precision</span>
            </h2>

            <p className="t-body" style={{ marginBottom: 20 }}>
              Founded in 2018, Cuts & Colour Studio was born from a simple belief — that everyone deserves a salon experience that feels personal, unhurried, and genuinely excellent.
            </p>

            <p className="t-body" style={{ marginBottom: 40 }}>
              Our stylists are trained at the highest level, continually upskilling so that every technique we offer reflects the very best the industry has to offer. No rushed appointments. No one-size-fits-all. Just exceptional hair.
            </p>

            {/* Values */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
              {[
                ['Bespoke consultation', 'Every cut and colour begins with listening.'],
                ['Premium products only', 'Olaplex, Wella, Kerastase — nothing less.'],
                ['Unhurried experience', 'No double-booking. Your time is respected.'],
              ].map(([title, desc]) => (
                <div key={title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--gold-pale)', border: '1px solid var(--line-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <span style={{ fontSize: 8, color: 'var(--gold)' }}>✦</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)', marginBottom: 2 }}>{title}</p>
                    <p className="t-body-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/booking" className="btn btn-dark">
              Meet the team <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          #about .container > div > div:first-child { display: none; }
        }
      `}</style>
    </section>
  )
}
