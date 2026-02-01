'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { href: '/',         label: 'Home'     },
  { href: '/#services',label: 'Services' },
  { href: '/#about',   label: 'About'    },
  { href: '/#gallery', label: 'Gallery'  },
  { href: '/#contact', label: 'Contact'  },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const pathname = usePathname()
  const isBooking = pathname === '/booking'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className='mobile-bg' style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'background 0.35s ease, box-shadow 0.35s ease, padding 0.35s ease',
        background: scrolled || isBooking ? 'rgba(249,246,241,0.96)' : 'transparent',
        backdropFilter: scrolled || isBooking ? 'blur(12px)' : 'none',
        boxShadow: scrolled || isBooking ? '0 1px 0 rgba(24,18,14,0.08)' : 'none',
        padding: scrolled ? '14px 0' : '24px 0',
        width: '100%',
      }}>
        <div className="container nav-padding" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
           gap: 8 ,  }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 20,
              fontWeight: 400,
              letterSpacing: '0.02em',
              color: 'var(--ink)',
              lineHeight: 1,
            }}>
              Cuts & Colour
            </span>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 8,
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              lineHeight: 1,
            }}>
              Studio · Milton Keynes
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden-mobile">
            {LINKS.map(l => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/booking" className="btn btn-dark" style={{ padding: '11px 24px' }}>
              Book now
            </Link>
            <button
              className="mobile-only"
              onClick={() => setOpen(!open)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}
            >
              {open ? <X size={26} style={{ color: 'var(--ink)' }} /> : <Menu size={26} style={{ color: 'var(--ink)' }} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: 'var(--cream)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 32,
          animation: 'fadeIn 0.25s ease',
        }}>
          {LINKS.map(l => (
            <a
              key={l.href} href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 36, fontWeight: 300,
                color: 'var(--ink)',
                letterSpacing: '-0.01em',
              }}
            >
              {l.label}
            </a>
          ))}
          <Link href="/booking" className="btn btn-gold" style={{ marginTop: 16 }} onClick={() => setOpen(false)}>
            Book appointment
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
           .nav-padding { padding: 6px 12px; }
            .mobile-bg { background: rgba(249,246,241,0.96) !important;}

        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important;}
         
        }
      `}</style>
    </>
  )
}
