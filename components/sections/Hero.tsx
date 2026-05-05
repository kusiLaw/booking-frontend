import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      position: 'relative',
      overflow: 'hidden',
      
    }}>
      {/* Left — text */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '140px 64px 80px',
        background: 'var(--cream)',
        position: 'relative',
      
        maxWidth: 1920,
        zIndex: 2,
      }}>
        {/* Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }} className="anim-up">
          <div style={{ width: 32, height: 1.5, background: 'var(--gold)' }} />
          <span className="t-label" style={{ color: 'var(--gold)' }}>Milton Keynes · Est. 2018</span>
        </div>

        {/* Main headline */}
        <h1 className="t-display-xl anim-up d1" style={{ marginBottom: 24 }}>
          Where hair<br />
          becomes <span className="t-italic" style={{ color: 'var(--gold-deep)' }}>art.</span>
        </h1>

        <p className="t-body anim-up d2" style={{ maxWidth: 360, marginBottom: 48 }}>
          A boutique studio for precision cuts, transformative colour, and treatments that elevate. Every visit tailored entirely to you.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }} className="anim-up d3">
          <Link href="/booking" className="btn btn-dark">
            Book appointment <ArrowRight size={14} />
          </Link>
          <a href="#services" className="btn btn-outline-dark">
            Our services
          </a>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: 40, marginTop: 64,
          paddingTop: 40,
          borderTop: '1px solid var(--line)',
        }} className="anim-up d4">
          {[
            { num: '8+',   label: 'Years of craft' },
            { num: '2k+',  label: 'Happy clients' },
            { num: '100%', label: 'Bespoke service' },
          ].map(s => (
            <div key={s.label}>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 32, fontWeight: 300,
                color: 'var(--ink)', lineHeight: 1,
                marginBottom: 4,
              }}>
                {s.num}
              </p>
              <p className="t-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right — image placeholder */}
      <div style={{ position: 'relative', background: 'var(--cream-mid)' , minHeight: '36rem'}} className="imgplaceholder">
        <Image src="/galary1.jpg" alt="Hero image" fill style={{ objectFit: 'cover',  }} 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" preload
        />
        {/* Placeholder label */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 12, zIndex: 1,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            border: '1.5px solid var(--parchment)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--ink-faint)' }}>✦</span>
          </div>
          <p className="t-label" style={{ color: 'var(--ink-faint)' }}>cuts & colour</p>
        </div>

        {/* Decorative gold line */}
        <div style={{
          position: 'absolute', left: 0, top: '10%', bottom: '10%',
          width: 2, background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)',
        }} />
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        zIndex: 5, animation: 'floatUp 2.5s ease-in-out infinite',
      }}>
        <span className="t-label" style={{ color: 'var(--ink-faint)', fontSize: 9 }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--ink-faint), transparent)' }} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          section:first-of-type { grid-template-columns: 1fr !important; }
          section:first-of-type > div:last-child { display: none; }
          section:first-of-type > div:first-child { padding: 120px 24px 60px !important; }
        }
      `}</style>
    </section>
  )
}
