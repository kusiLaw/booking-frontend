'use client'
import { useState } from 'react'
import { ChevronLeft, CalendarDays, Clock, PoundSterling, User, Mail, Phone, MessageSquare, Loader2, AlertCircle, MapPin } from 'lucide-react'
import type { Service } from '@/types/booking'
import { fmtTime, fmtDate } from '@/types/booking'

interface FormData {
  firstName: string
  lastName:  string
  email:     string
  phone:     string
  notes:     string
}

interface DetailsStepProps {
  service: Service
  date:    string
  time:    string
  form:    FormData
  onChange: (field: keyof FormData, value: string) => void
  onSubmit: () => Promise<void>
  onBack:   () => void
}

const LABEL = "block text-[11px] font-medium tracking-[0.06em] uppercase mb-1.5"

export default function DetailsStep({ service, date, time, form, onChange, onSubmit, onBack }: DetailsStepProps) {
  const [errors,  setErrors]  = useState<Partial<Record<keyof FormData, string>>>({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e: typeof errors = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim())  e.lastName  = 'Required'
    if (!form.email.trim())     e.email     = 'Required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.phone.trim())     e.phone     = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    try { await onSubmit() }
    finally { setLoading(false) }
  }

  return (
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      {/* Heading */}
      <div className="text-center mb-9">
        <h2
          className="mb-2"
          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px,4vw,42px)',
             fontWeight: 300, color: 'var(--ink)', letterSpacing: '-0.01em' }}
        >
          Your details
        </h2>
        <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--ink-muted)' , marginBottom: 24}}>
          Almost done — a few details to confirm your booking.
        </p>
      </div>

      <div className="grid gap-8" style={{ gridTemplateColumns: '1fr 360px', alignItems: 'start' }}>

        {/* ── Form ── */}
        <div className="flex flex-col gap-4">

          {/* Name row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL} style={{ color: 'var(--ink-mid)' }}>First name</label>
              <div className="relative">
                <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--ink-faint)' }} />
                <input
                  className={`form-input pl-8 ${errors.firstName ? 'error' : ''}`}
                  style={{
                  paddingLeft: 32
                }}
                  placeholder="Jane"
                  value={form.firstName}
                  onChange={e => onChange('firstName', e.target.value)}
                />
              </div>
              {errors.firstName && (
                <p className="flex items-center gap-1 text-[11px] mt-1" style={{ color: 'var(--red)' }}>
                  <AlertCircle size={10} />{errors.firstName}
                </p>
              )}
            </div>
            <div>
              <label className={LABEL} style={{ color: 'var(--ink-mid)' }}>Last name</label>
              <input
                className={`form-input ${errors.lastName ? 'error' : ''}`}
                
                placeholder="Smith"
                value={form.lastName}
                onChange={e => onChange('lastName', e.target.value)}
              />
              {errors.lastName && (
                <p className="flex items-center gap-1 text-[11px] mt-1" style={{ color: 'var(--red)' }}>
                  <AlertCircle size={10} />{errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={LABEL} style={{ color: 'var(--ink-mid)' }}>Email address</label>
            <div className="relative">
              <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--ink-faint)' 

              }} />
              <input
                className={`form-input pl-8 ${errors.email ? 'error' : ''}`}
                style={{
                  paddingLeft: 32
                }}
                type="email"
                placeholder="jane@email.com"
                value={form.email}
                onChange={e => onChange('email', e.target.value)}
              />
            </div>
            {errors.email
              ? <p className="flex items-center gap-1 text-[11px] mt-1" style={{ color: 'var(--red)' }}><AlertCircle size={10} />{errors.email}</p>
              : <p className="text-[11px] mt-1" style={{ color: 'var(--ink-faint)' }}>Confirmation sent to this address</p>
            }
          </div>

          {/* Phone */}
          <div>
            <label className={LABEL} style={{ color: 'var(--ink-mid)' }}>Mobile number</label>
            <div className="relative">
              <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--ink-faint)' }} />
              <input
                className={`form-input pl-8 ${errors.phone ? 'error' : ''}`}
                type="tel"
                placeholder="07700 900000"
                value={form.phone}
                onChange={e => onChange('phone', e.target.value)}
                style={{
                  paddingLeft: 32
                }}
              />
            </div>
            {errors.phone
              ? <p className="flex items-center gap-1 text-[11px] mt-1" style={{ color: 'var(--red)' }}><AlertCircle size={10} />{errors.phone}</p>
              : <p className="text-[11px] mt-1" style={{ color: 'var(--ink-faint)' }}>For your 24-hour reminder SMS</p>
            }
          </div>

          {/* Notes */}
          <div>
            <label className={LABEL} style={{ color: 'var(--ink-mid)' }}>
              Notes <span className="normal-case tracking-normal font-light" style={{ color: 'var(--ink-faint)' }}>(optional)</span>
            </label>
            <div className="relative">
              <MessageSquare size={13} className="absolute left-3 top-3.5 pointer-events-none" style={{ color: 'var(--ink-faint)' }} />
              <textarea
                className="form-input pl-8"
                
                style={{ minHeight: 112, resize: 'vertical', lineHeight: 1.55,  paddingLeft: 32
 }}
                placeholder="Allergies, hair history, anything we should know…"
                value={form.notes}
                onChange={e => onChange('notes', e.target.value)}
                maxLength={255}

                
              />
            </div>
          </div>
        </div>

        {/* ── Summary ── */}
        <div>
          <div className="card-white rounded-xl p-6"
            style={{ animation: 'fadeUp 0.5s ease both',
              borderRadius: 12, padding: 24,
             }}
           >
            <p className="text-[9px] font-semibold tracking-[0.14em] uppercase mb-5" style={{ color: 'var(--ink-muted)', marginBottom: 24 }}>
              Booking summary
            </p>

            <div className="flex flex-col gap-4">
              {[
                { icon: <div className="w-2 h-2 rounded-full mt-0.5" style={{ background: service.color }} />, label: 'Service', value: service.name },
                { icon: <CalendarDays size={13} />, label: 'Date',    value: fmtDate(date) },
                { icon: <Clock size={13} />,        label: 'Time',    value: `${fmtTime(time)} · ${service.duration}` },
                { icon: <PoundSterling size={13} />, label: 'Price',  value: service.price },
              ].map((row, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="flex-shrink-0 mt-0.5" style={{ color: 'var(--gold)' }}>{row.icon}</div>
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.08em] mb-0.5" style={{ color: 'var(--ink-faint)' }}>{row.label}</p>
                    <p className="text-[13px] font-medium" style={{ color: 'var(--ink)' }}>{row.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px my-4" style={{ background: 'var(--line)', margin: '16px 0' }} />

            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: 'var(--ink-mid)' }}>Total</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 300, color: 'var(--ink)' }}>
                {service.price}
              </span>
            </div>

            {service.deposit && (
              <div className="mt-3 p-3 rounded" style={{ background: 'rgba(196,154,60,0.08)', border: '1px solid rgba(196,154,60,0.2)' }}>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--gold)', textAlign: 'center' }}>
                  <strong>{service.deposit}</strong> deposit required to secure your booking.
                </p>
              </div>
            )}
          </div>

          {/* Address note */}
          <div className="flex items-start gap-2 p-3 rounded mt-3" style={{ background: 'var(--cream-dark)',
             border: '1px solid var(--line)', padding: '12px 15px', marginTop: 24,}}>
            <MapPin size={12} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--ink-faint)' }} />
            <p className="text-[11px] font-light leading-relaxed" style={{ color: 'var(--ink-muted)' }}>
              12 High Street, Milton Keynes MK9 2EA · 01234 567890
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-8"
      style={{marginTop:32}}
      >
        <button className="btn btn-ghost" onClick={onBack} disabled={loading}>
          <ChevronLeft size={14} /> Back
        </button>
        <button
          className="btn btn-gold"
          onClick={handleSubmit}
          disabled={loading}
          style={{ minWidth: 200 }}
        >
          {loading
            ? <><Loader2 size={14} className="animate-spin" /> Confirming…</>
            : 'Confirm booking'
          }
        </button>
      </div>
      <p className="text-[11px] font-light text-center mt-4" style={{ color: 'var(--ink-faint)',
        marginTop: 16,
       }}>
        By booking you agree to our cancellation policy · 24hrs notice required
      </p>
    </div>
  )
}
