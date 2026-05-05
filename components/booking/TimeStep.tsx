'use client'
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react'
import type { Service, Slot } from '@/types/booking'
import { fmtTime, shortDate } from '@/types/booking'

interface TimeStepProps {
  service: Service
  date: string
  slots: Slot[]
  selected: string
  loading: boolean
  onSelect: (t: string) => void
  onNext: () => void
  onBack: () => void
}

export default function TimeStep({ service, date, slots, selected, loading, onSelect, onNext, onBack }: TimeStepProps) {
  const available = slots.filter(s => s.available)
  const morning   = slots.filter(s => parseInt(s.time) < 12)
  const afternoon = slots.filter(s => parseInt(s.time) >= 12)

  return (
    <div className="py-10" style={{ background: 'var(--cream)', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div className="max-w-lg mx-auto" style={{ animation: 'fadeUp 0.5s ease both' , 
         padding: '32px 24px', borderRadius: 12, minWidth: 320, maxWidth: 600, width: '100%', }}>
        {/* Heading */}
        <div className="text-center mb-6">
          <h2
            className="mb-2"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 38, fontWeight: 300, color: 'var(--ink)', letterSpacing: '-0.01em' }}
          >
            Select a time
          </h2>
          <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--ink-muted)' , marginBottom: 24 }}>
            Available slots for {shortDate(date)}.
          </p>
        </div>

        {/* Date chip */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded mb-6 w-fit mx-auto"
          style={{ background: 'var(--cream-dark)', border: '1px solid var(--line)',
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 8, marginBottom: 24,
            margin:'24px auto', 
           }}
        >
          <CalendarDays size={13} style={{ color: 'var(--gold)' }} />
          <span className="text-[13px] font-medium" style={{ color: 'var(--ink)' }}>{shortDate(date)}</span>
          <span className="text-xs" style={{ color: 'var(--ink-muted)' }}>· {service.name}</span>
        </div>

        {/* Slots */}
        {loading ? (
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-10 rounded skeleton" />
            ))}
          </div>
        ) : slots.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-base mb-1" style={{ color: 'var(--ink-mid)' }}>No slots available</p>
            <p className="text-sm font-light" style={{ color: 'var(--ink-muted)' }}>Please choose a different date.</p>
          </div>
        ) : (
          <>
            {[
              { label: 'Morning',   items: morning   },
              { label: 'Afternoon', items: afternoon },
            ].map(({ label, items }) => {
              if (!items.length) return null
              return (
                <div key={label} className="mb-5">
                  <p className="text-[9px] font-semibold tracking-[0.12em] uppercase mb-2.5" style={{ color: 'var(--ink-muted)' }}>
                    {label}
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {items.map(slot => (
                      <button
                        key={slot.time}
                        className={`slot ${selected === slot.time ? 'active' : ''} ${!slot.available ? 'taken' : ''}`}
                        disabled={!slot.available}
                        onClick={() => onSelect(slot.time)}
                      >
                        {fmtTime(slot.time)}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
            <p className="text-[11px] mt-2" style={{ color: 'var(--ink-faint)', marginTop: 8 }}>
              {available.length} {available.length === 1 ? 'slot' : 'slots'} available
            </p>
          </>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-7" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
          <button className="btn btn-ghost" onClick={onBack}>
            <ChevronLeft size={14} /> Back
          </button>
          <button className="btn btn-dark" disabled={!selected} onClick={onNext} style={{ minWidth: 180 }}>
            Next: Your details <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}
