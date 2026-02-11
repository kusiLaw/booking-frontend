'use client'
import { useEffect, useState } from 'react'
import { CalendarDays, Clock, PoundSterling, Phone, RotateCcw, Share2, Check } from 'lucide-react'
import Link from 'next/link'
import type { Service } from '@/types/booking'
import { fmtTime, fmtDate, addMins } from '@/types/booking'

interface ConfirmedStepProps {
  service:   Service
  date:      string
  time:      string
  email:     string
  reference: string
  onBookAgain: () => void
}

interface ConfettiPiece {
  id:     number
  x:      number
  color:  string
  delay:  number
  size:   number
  round:  boolean
}

const CONFETTI_COLORS = ['#C49A3C', '#18120E', '#DDB95A', '#9A9087', '#F0EBE2', '#C49A3C']

export default function ConfirmedStep({ service, date, time, email, reference, onBookAgain }: ConfirmedStepProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const [copied,   setCopied]   = useState(false)
  const [drawn,    setDrawn]    = useState(false)

  // Fire confetti + trigger check animation on mount
  useEffect(() => {
    const pieces: ConfettiPiece[] = Array.from({ length: 28 }, (_, i) => ({
      id:    i,
      x:     Math.random() * 100,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: Math.random() * 0.9,
      size:  5 + Math.random() * 7,
      round: Math.random() > 0.5,
    }))
    setConfetti(pieces)
    // Trigger checkmark draw after a short pause
    const t = setTimeout(() => setDrawn(true), 300)
    return () => clearTimeout(t)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(reference).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const endTime = addMins(time, service.durationMins)

  return (
    <div style={{display:'flex', 
      flexDirection:'column', alignItems:'center', justifyContent:'center', padding: '0 16px'
    }}
    >
      <div
        className="max-w-lg mx-auto text-center relative"
        style={{ animation: 'scaleIn 0.4s ease both', overflow: 'hidden' }}
      >
        {/* ── Confetti ── */}
        {confetti.map(p => (
          <div
            key={p.id}
            className="absolute pointer-events-none"
            style={{
              top:    -16,
              left:   `${p.x}%`,
              width:  p.size,
              height: p.size,
              borderRadius: p.round ? '50%' : 2,
              background: p.color,
              animation: `confettiFall 1.6s ${p.delay}s ease-in both`,
            }}
          />
        ))}

        {/* ── Animated checkmark circle ── */}
        <div
          className="w-18 h-18 rounded-full mx-auto mb-6 flex items-center justify-center"

          style={{
            width: 72, height: 72,
            background: 'var(--ink)',
            boxShadow: '0 8px 32px rgba(24,18,14,0.2)',
            animation: 'scaleIn 0.4s 0.1s ease both',
             justifySelf: 'center',
             marginBottom: 24,
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <polyline
              points="7,17 13,24 25,9"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="40"
              style={{
                strokeDashoffset: drawn ? 0 : 40,
                transition: 'stroke-dashoffset 0.45s ease 0.4s',
              }}
            />
          </svg>
        </div>

        {/* ── Headline ── */}
        <h2
          className="mb-2"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 48, fontWeight: 300,
            color: 'var(--ink)', letterSpacing: '-0.02em',
            lineHeight: 1.05,
            animation: 'fadeUp 0.4s 0.2s ease both',
          }}
        >
          You're booked!
        </h2>
        <p
          className="text-[15px] font-light mb-2"
          style={{ color: 'var(--ink-muted)', animation: 'fadeUp 0.4s 0.3s ease both',
            marginBottom: 16,
           }}
        >
          Confirmation sent to{' '}
          <strong style={{ color: 'var(--ink)', fontWeight: 500, 
        
           }}>{email}</strong>
        </p>

        {/* ── Copyable reference ── */}
        <button
          onClick={handleCopy}
          title="Click to copy reference"
          className="inline-flex items-center gap-2 px-4 py-2 rounded mb-8 cursor-pointer transition-all"
          style={{
            background: 'var(--cream-dark)',
            border: '1px solid var(--line)',
            animation: 'fadeUp 0.4s 0.35s ease both',
            marginBottom: 24,
            padding: '6px 12px',
          }}
        >
          <span
            style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 500, color: 'var(--ink-mid)', letterSpacing: '0.08em' }}
          >
            {reference}
          </span>
          {copied
            ? <Check size={13} style={{ color: 'var(--gold)' }} />
            : <Share2 size={12} style={{ color: 'var(--ink-faint)' }} />
          }
          {copied && (
            <span className="text-[11px]" style={{ color: 'var(--gold)' }}>Copied!</span>
          )}
        </button>

        {/* ── Booking detail card ── */}
        <div
          className="card-white rounded-xl text-left mb-5"
          style={{ padding: 24, animation: 'fadeUp 0.4s 0.4s ease both' }}
        >
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <CalendarDays size={14} />,   label: 'Date',    value: fmtDate(date) },
              { icon: <Clock size={14} />,           label: 'Time',    value: `${fmtTime(time)} – ${fmtTime(endTime)}` },
              { icon: <div className="w-2 h-2 rounded-full mt-0.5" style={{ background: service.color }} />, label: 'Service', value: service.name },
              { icon: <PoundSterling size={14} />,  label: 'Total',   value: service.price },
            ].map((row, i) => (
              <div key={i} className="flex gap-2.5 items-start">
                <div className="flex-shrink-0" style={{ color: 'var(--gold)', marginTop: 2 }}>{row.icon}</div>
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.08em] mb-0.5" style={{ color: 'var(--ink-faint)' }}>{row.label}</p>
                  <p className="text-[13px] font-medium" style={{ color: 'var(--ink)' }}>{row.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Deposit note if applicable */}
          {service.deposit && (
            <>
              <div className="h-px my-4" style={{ background: 'var(--line)', margin: '16px 0' }} />
              <div
                className="flex gap-2.5 items-start p-3 rounded"
                style={{ background: 'rgba(196,154,60,0.08)', border: '1px solid rgba(196,154,60,0.2)' ,
                  padding: '12px 15px',
                }}
              >
                <PoundSterling size={13} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--gold)' }} />
                <p className="text-xs leading-relaxed" style={{ color: 'var(--ink-mid)' }}>
                  A deposit of <strong>{service.deposit}</strong> is required to secure your booking.
                  We'll send payment details separately.
                </p>
              </div>
            </>
          )}
        </div>

        {/* ── Reminder note ── */}
        <div
          className="flex items-start gap-2.5 p-3 rounded text-left mb-8"
          style={{
            background: 'var(--cream-dark)',
            border: '1px solid var(--line)',
            animation: 'fadeUp 0.4s 0.5s ease both',
            marginTop: 24,
            padding: '15px',
          }}
        >
          <Phone size={13} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--ink-muted)' }} />
          <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--ink-muted)',
            padding: '0 4px',
           }}>
            You'll receive a <strong style={{ fontWeight: 500 }}>reminder SMS and email</strong> 24 hours before your appointment. Need to cancel? Please give us at least 24 hours notice.
          </p>
        </div>

        {/* ── Actions ── */}
        <div
          className="flex gap-3 justify-center flex-wrap"
          style={{ animation: 'fadeUp 0.4s 0.55s ease both', 
            marginTop: 32,
          }}
        >
          <button className="btn btn-outline-dark" onClick={onBookAgain}>
            <RotateCcw size={13} /> Book another
          </button>
          <Link href="/" className="btn btn-ghost">
            ← Back to website
          </Link>
        </div>

        {/* Keyframe for confetti + scale-in */}
        <style>{`
          @keyframes confettiFall {
            0%   { transform: translateY(-20px) rotate(0deg);   opacity: 1; }
            100% { transform: translateY(70px)  rotate(360deg); opacity: 0; }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.94); }
            to   { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  )
}
