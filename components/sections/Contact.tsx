'use client'
import Link from 'next/link'
import { ArrowRight, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { min } from 'date-fns'

export default function Contact() {
  return (
    <>
      {/* Full-width CTA band */}
      <section style={{
        background: 'var(--gold)',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative serif watermark */}
        <div style={{
          position: 'absolute', right: -40, top: '50%', transform: 'translateY(-50%)',
          fontFamily: 'var(--font-serif)', fontSize: 160, fontWeight: 300,
          color: 'rgba(0,0,0,0.07)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
          whiteSpace: 'nowrap',
        }}>
          Book Now
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <p className="t-label" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>Ready for a change?</p>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 300, lineHeight: 1.1,
            color: 'var(--white)', marginBottom: 12,
            letterSpacing: '-0.02em',
          }}>
            Book your appointment<br />
            <span style={{ fontStyle: 'italic' }}>today.</span>
          </h2>
          <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.75)', marginBottom: 36, lineHeight: 1.6 }}>
            No app download. No account needed. Just choose your service and you're done.
          </p>
          <Link href="/booking" className="btn" style={{
            background: 'var(--white)', color: 'var(--gold-deep)',
            padding: '16px 40px', fontSize: 12, letterSpacing: '0.1em',
            borderRadius: 2, fontWeight: 600,
          }}>
            Book now — it's free <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Contact section */}
      <section className="section" id="contact" style={{ background: 'var(--cream-dark)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

            {/* Left: info */}
            <div>
              <span className="gold-rule" />
              <p className="t-label" style={{ marginBottom: 16 }}>Get in touch</p>
              <h2 className="t-display-md" style={{ marginBottom: 16 }}>
                Visit the studio
              </h2>
              <p className="t-body" style={{ marginBottom: 40, maxWidth: 380 }}>
                We'd love to meet you. Walk in for a consultation, or book your appointment online and we'll be ready for you.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { icon: MapPin, label: 'Address',  value: '12 High Street, Milton Keynes MK9 2EA' },
                  { icon: Phone,  label: 'Phone',    value: '01234 567890' },
                  { icon: Mail,   label: 'Email',    value: 'hello@cutsandcolour.co.uk' },
                  { icon: Clock,  label: 'Opening hours', value: 'Monday – Saturday · 9:00am – 6:00pm\nThursday late · until 8:00pm\nSunday · Closed' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: 'var(--gold-pale)', border: '1px solid var(--line-gold)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Icon size={15} style={{ color: 'var(--gold)' }} />
                    </div>
                    <div>
                      <p className="t-label" style={{ marginBottom: 4 }}>{label}</p>
                      <p className="t-body-sm" style={{ whiteSpace: 'pre-line' }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: map placeholder + form */}
            <div  style={{ display: 'flex', position: 'relative', flexDirection: 'column', gap: 20 }}>

              

              {/* Map placeholder */}
              <div className="img-placeholder" style={{
                paddingBottom: '56%', borderRadius: 'var(--r-sm)',
                border: '1px solid var(--line)', position: 'relative',
              }}>
                <div style={{ position: 'absolute', height:'100%', minHeight: '500px', borderRadius: 'var(--r-sm)', overflow: 'hidden', top: 0, left: 0, right: 0 , }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Luxe Salon Location"
                />
              </div>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <MapPin size={24} style={{ color: 'var(--ink-faint)' }} />
                  <p className="t-label" style={{ color: 'var(--ink-faint)' }}>Map · 12 High Street, MK</p>
                </div>
              </div>

              {/* Quick enquiry */}
              <div className="card-white" style={{ padding: 28 }}>
                <p className="t-label" style={{ marginBottom: 20 }}>Quick enquiry</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <input className="form-input" placeholder="Your name" />
                  <input className="form-input" type="email" placeholder="Email address" />
                  <textarea className="form-input" placeholder="Your message…" style={{ minHeight: 88, resize: 'vertical', lineHeight: 1.5 }} />
                  <button className="btn btn-dark" style={{ width: '100%', marginTop: 4 }}>
                    Send message <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            #contact .container > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </section>
    </>
  )
}
