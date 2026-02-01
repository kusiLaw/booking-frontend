
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock,  } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--cream)', paddingTop: 80, paddingBottom: 40 }}>
      <div className="container">
        <div className='gridin' style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 60, marginBottom: 64
        
         }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 300, color: 'var(--cream)', marginBottom: 4 }}>
                Cuts & Colour
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                Studio · Milton Keynes
              </p>
            </div>
            <p className="t-body-sm" style={{ color: 'rgba(240,235,226,0.55)', lineHeight: 1.8, maxWidth: 260 }}>
              A boutique hair studio dedicated to precision, colour artistry, and the kind of finish that turns heads.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              {/* {[Instagram, Facebook].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: 38, height: 38, borderRadius: '50%',
                  border: '1px solid rgba(240,235,226,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(240,235,226,0.5)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(240,235,226,0.2)'; e.currentTarget.style.color = 'rgba(240,235,226,0.5)' }}
                >
                  <Icon size={15} />
                </a>
              ))} */}
            </div>
          </div>

          {/* Services */}
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
              Services
            </p>
            {["Women's Cut & Style", "Men's Cut", 'Full Colour', 'Balayage', 'Highlights', 'Keratin Treatment'].map(s => (
              <p key={s} style={{ fontSize: 13, fontWeight: 300, color: 'rgba(240,235,226,0.55)', marginBottom: 10, cursor: 'pointer', transition: 'color 0.15s' }}
                // onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
                // onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,235,226,0.55)')}
              >
                {s}
              </p>
            ))}
          </div>

          {/* Quick links */}
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
              Studio
            </p>
            {['About Us', 'Gallery', 'Our Team', 'Gift Vouchers', 'FAQ', 'Contact'].map(l => (
              <Link href={`#${l.split(' ')[0] === 'Our' ? 'team' : l.split(' ')[0].toLowerCase()}`} className='footer-hover' key={l} style={{display: 'block', fontSize: 13, fontWeight: 300, color: 'rgba(240,235,226,0.55)', marginBottom: 10, cursor: 'pointer', transition: 'color 0.15s' }}
                // onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
                // onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,235,226,0.55)')}
              >
                {l}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
              Find Us
            </p>
            {[
              { icon: MapPin,  text: '12 High Street, Milton Keynes MK9 2EA' },
              { icon: Phone,   text: '01234 567890' },
              { icon: Mail,    text: 'hello@cutsandcolour.co.uk' },
              { icon: Clock,   text: 'Mon–Sat  9:00am – 6:00pm' },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14 }}>
                <Icon size={13} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(240,235,226,0.6)', lineHeight: 1.5 }}>{text}</p>
              </div>
            ))}

            <Link href="/booking" className="btn btn-gold" style={{ marginTop: 20, padding: '12px 24px', fontSize: 11 }}>
              Book appointment
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(240,235,226,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 11, fontWeight: 300, color: 'rgba(240,235,226,0.35)' }}>
            © 2026 Cuts & Colour Studio. All rights reserved.
          </p>
          <p style={{ fontSize: 11, fontWeight: 300, color: 'rgba(240,235,226,0.35)' }}>
            Website by <a href="https://websp.co.uk" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', opacity: 0.8 }}>WebSP</a>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div > div:first-child > div:first-child { grid-template-columns: 1fr 1fr !important; }
          .gridin { grid-template-columns:  1fr !important; gap: 45px !important;}
        }
        @media (max-width: 600px) {
          footer > div > div:first-child > div:first-child { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        .footer-hover:hover { color: var(--cream) !important; }
      `}</style>
    </footer>
  )
}
