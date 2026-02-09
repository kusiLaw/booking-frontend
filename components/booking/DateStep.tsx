'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { format, addMonths, subMonths, startOfMonth, getDay, isBefore, startOfDay, addDays, isSameDay } from 'date-fns'
import type { Service } from '@/types/booking'
import { fmtDate } from '@/types/booking'

interface DateStepProps {
  service: Service
  selected: string
  onSelect: (d: string) => void
  onNext: () => void
  onBack: () => void
}

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export default function DateStep({ service, selected, onSelect, onNext, onBack }: DateStepProps) {
  const [viewDate, setVD] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 1); return d
  })

  const today    = startOfDay(new Date())
  const minDate  = addDays(today, 1)
  const monthStart = startOfMonth(viewDate)
  const firstDOW   = getDay(monthStart)

  // Build calendar grid
  const calDays: (Date | null)[] = []
  for (let i = 0; i < firstDOW; i++) calDays.push(null)
  const d = new Date(monthStart)
  while (d.getMonth() === viewDate.getMonth()) { calDays.push(new Date(d)); d.setDate(d.getDate() + 1) }
  while (calDays.length % 7 !== 0) calDays.push(null)

  const isDisabled = (d: Date) => isBefore(d, minDate) || d.getDay() === 0
  const isSel      = (d: Date) => selected === format(d, 'yyyy-MM-dd')
  const isToday    = (d: Date) => isSameDay(d, today)

  return (
    <div className="py-10" style={{ background: 'var(--cream)', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div className="max-w- mx-auto " style={{ animation: 'fadeUp 0.5s ease both' ,minWidth: '80%', paddingTop:32, paddingBottom: 32, borderRadius: 12, padding: '32px 24px' }}>
        {/* Heading */}
        <div className="text-center mb-7 flex flex-col items-center gap-2" style={{ maxWidth: 400, margin: '0 auto',  textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <h2
            className="mb-2"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 38, fontWeight: 300, color: 'var(--ink)', letterSpacing: '-0.01em', textAlign: 'center' }}
          >
            Pick a date
          </h2>
          <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--ink-muted)' }}>
            Choose your preferred appointment date.
          </p>
        </div>

        {/* Selected service chip */}
        <div
          className="flex items-center gap-2.5 px-4 py-2.5 rounded mb-6"
          style={{ background: 'var(--gold-pale)', border: '1px solid rgba(196,154,60,0.25)',
            margin:40, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 8, marginBottom: 24
           }}
        >
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: service.color }} />
          <span className="text-[13px] font-medium flex-1" style={{ color: 'var(--ink)' }}>{service.name}</span>
          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--ink-muted)' }}>
            <Clock size={11} />{service.duration}
          </span>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--ink)' }}>{service.price}</span>
        </div>

        {/* Calendar card */}
        <div className="card-white rounded-xl p-6" style={{padding:12}}>
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-5 px-1" style={{marginBottom: 15}}>
            <button
              onClick={() => setVD(v => subMonths(v, 1))}
              className="w-8 h-8 flex items-center justify-center rounded-md transition-colors"
              style={{ border: '1px solid var(--line-mid)', background: 'transparent', cursor: 'pointer' }}
            >
              <ChevronLeft size={15} style={{ color: 'var(--ink-mid)' }} />
            </button>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 400, color: 'var(--ink)' }}>
              {format(viewDate, 'MMMM yyyy')}
            </p>
            <button
              onClick={() => setVD(v => addMonths(v, 1))}
              className="w-8 h-8 flex items-center justify-center rounded-md transition-colors"
              style={{ border: '1px solid var(--line-mid)', background: 'transparent', cursor: 'pointer' }}
            >
              <ChevronRight size={15} style={{ color: 'var(--ink-mid)' }} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAY_LABELS.map((d, i) => (
              <div key={i} className="text-center text-[10px] font-semibold tracking-widest uppercase py-1" style={{ color: 'var(--ink-faint)' , marginBottom: 8}}>
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7" style={{ gap: '2px 0' }}>
            {calDays.map((day, idx) => {
              if (!day) return <div key={`e${idx}`} />
              const dis = isDisabled(day)
              const sel = isSel(day)
              const tod = isToday(day)
              return (
                <div
                  key={day.toISOString()}
                  className={`cal-cell ${sel ? 'cal-active' : ''} ${dis ? 'cal-disabled' : ''} ${tod && !sel ? 'cal-today' : ''}`}
                  style={{ color: sel ? '#fff' : dis ? 'var(--ink-faint)' : 'var(--ink)' }}
                  onClick={() => !dis && onSelect(format(day, 'yyyy-MM-dd'))}
                >
                  {format(day, 'd')}
                </div>
              )
            })}
          </div>

          <p className="text-[11px] text-center mt-3" style={{ color: 'var(--ink-faint)', marginTop: 12 }}>
            We are closed on Sundays
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button className="btn btn-ghost" onClick={onBack} style={{ marginTop: 32 }}>
            <ChevronLeft size={14} /> Back
          </button>
          <button className="btn btn-dark" disabled={!selected} onClick={onNext} style={{ minWidth: 180, marginTop: 32 }}>
            Next: Choose time <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}
