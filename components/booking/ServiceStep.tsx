'use client'
import { Clock, ChevronRight } from 'lucide-react'
import type { Service } from '@/types/booking'
import { SERVICES, CATEGORIES } from '@/types/booking'

interface ServiceStepProps {
  selected: Service | null
  onSelect: (s: Service) => void
  onNext: () => void
}

export default function ServiceStep({ selected, onSelect, onNext }: ServiceStepProps) {
  return (
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      {/* Heading */}
      <div className="text-center mb-9">
        <h2
          className="mb-2"
          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 300, color: 'var(--ink)', letterSpacing: '-0.01em' }}
        >
          Choose a service
        </h2>
        <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--ink-muted)' }}>
          Select what you'd like to book today.
        </p>
      </div>

      {/* Categories */}
      {CATEGORIES.map(cat => {
        const items = SERVICES.filter(s => s.category === cat)
        if (!items.length) return null
        return (
          <div key={cat} className="mb-8">
            <p className="text-[9px] font-semibold tracking-[0.14em] uppercase mb-3 pl-0.5" style={{ color: 'var(--ink-muted)', margin: 12 }}>
              {cat}
            </p>
            <div className="flex flex-col gap-4">
              {items.map(svc => (
                <div
                  key={svc.id}
                  className={`svc-card ${selected?.id === svc.id ? 'svc-selected' : ''}`}
                  onClick={() => onSelect(svc)}
                >
                  {/* Colour dot */}
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: svc.color }} />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-medium mb-1" style={{ color: 'var(--ink)' }}>{svc.name}</p>
                    <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--ink-muted)' }}>{svc.desc}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--ink-faint)' }}>
                        <Clock size={11} />{svc.duration}
                      </span>
                      {svc.deposit && (
                        <span
                          className="text-[11px] font-medium px-2 py-0.5 rounded"
                          style={{ background: 'rgba(196,154,60,0.1)', color: 'var(--gold)' }}
                        >
                          {svc.deposit} deposit
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 300, color: 'var(--ink)', flexShrink: 0 }}>
                    {svc.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {/* Next */}
      <div className="flex justify-end pt-32">
        <button className="btn btn-dark" disabled={!selected} onClick={onNext} style={{ minWidth: 180, marginTop: 32 }}>
          Next: Pick a date <ChevronRight size={15} />
        </button>
      </div>
    </div>
  )
}
