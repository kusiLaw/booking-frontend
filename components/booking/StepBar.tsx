'use client'
import { Check } from 'lucide-react'
import type { Step } from '@/types/booking'
import { STEPS_DISPLAY } from '@/types/booking'

interface StepBarProps {
  current: Step
}

export default function StepBar({ current }: StepBarProps) {
  const currentIdx = STEPS_DISPLAY.findIndex(s => s.key === current)

  return (
    <div className="flex items-center justify-center py-8">
      {STEPS_DISPLAY.map((step, idx) => {
        const isDone   = idx < currentIdx
        const isActive = idx === currentIdx
        const isLast   = idx === STEPS_DISPLAY.length - 1

        return (
          <div key={step.key} className="flex items-center">
            {/* Step node */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300"
                style={{
                  background: isDone ? 'var(--ink)' : isActive ? 'var(--gold)' : 'var(--cream-mid)',
                  color:      isDone || isActive ? '#fff' : 'var(--ink-faint)',
                  boxShadow:  isActive ? '0 0 0 4px rgba(196,154,60,0.2)' : 'none',
                }}
              >
                {isDone
                  ? <Check size={13} strokeWidth={2.5} />
                  : <span>{idx + 1}</span>
                }
              </div>
              <span
                className="text-[9px] font-semibold tracking-[0.1em] uppercase transition-colors duration-300"
                style={{ color: isActive ? 'var(--gold)' : isDone ? 'var(--ink-mid)' : 'var(--ink-faint)' }}
              >
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {!isLast && (
              <div
                className="w-12 h-[1.5px] mx-1 mb4 transition-all duration-300"
                style={{ background: idx < currentIdx ? 'var(--ink)' : 'var(--cream-mid)', 
                  marginBottom:15
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
