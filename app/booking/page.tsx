'use client'
import { useState, useCallback } from 'react'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import StepBar from '@/components/booking/StepBar'
import ServiceStep from '@/components/booking/ServiceStep'
import DateStep from '@/components/booking/DateStep'
import TimeStep from '@/components/booking/TimeStep'
import DetailsStep from '@/components/booking/DetailsStep'
import ConfirmedStep from '@/components/booking/ConfirmedStep'
import type { Service, Slot, Step } from '@/types/booking'
import { getMockSlots } from '@/types/booking'

interface FormData {
  firstName: string
  lastName:  string
  email:     string
  phone:     string
  notes:     string
}

const EMPTY_FORM: FormData = {
  firstName: '', lastName: '', email: '', phone: '', notes: '',
}

function genRef() {
  return `BK-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
}

export default function BookingPage() {
  const [step,      setStep]    = useState<Step>('service')
  const [service,   setService] = useState<Service | null>(null)
  const [date,      setDate]    = useState('')
  const [time,      setTime]    = useState('')
  const [slots,     setSlots]   = useState<Slot[]>([])
  const [loadSlots, setLS]      = useState(false)
  const [form,      setForm]    = useState<FormData>(EMPTY_FORM)
  const [reference, setRef]     = useState('')

  const updateForm = useCallback((field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleSelectDate = async (d: string) => {
    setDate(d)
    setTime('')           // reset time when date changes
    setLS(true)
    await new Promise(r => setTimeout(r, 500))   // simulate network
    setSlots(getMockSlots())
    setLS(false)
  }

  const handleSubmit = async () => {
    await new Promise(r => setTimeout(r, 1100))  // simulate API call
    setRef(genRef())
    setStep('confirmed')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBookAgain = () => {
    setStep('service')
    setService(null)
    setDate('')
    setTime('')
    setSlots([])
    setForm(EMPTY_FORM)
    setRef('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Nav />

      {/* Page hero strip */}
      <div
        className="relative overflow-hidden text-center px-4"
        style={{ background: 'var(--ink)', paddingTop: 120, paddingBottom: 56 , paddingLeft: 24, paddingRight: 24 }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(196,154,60,0.08) 0%, transparent 65%)' }}
        />
        <div className="relative z-10">
          <p className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-4" style={{ color: 'var(--gold)' }}>
            Online booking
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(36px,6vw,72px)',
              fontWeight: 300,
              color: 'var(--cream)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              marginBottom: 14,
            }}
          >
            Book an appointment
          </h1>
          <p className="text-[15px] font-light mb-32 " style={{ color: 'rgba(240,235,226,0.55)' }}>
            No account needed · Instant confirmation · Free to cancel 24hrs before
          </p>
        </div>
      </div>

      <main className='' style={{ background: 'var(--cream)', paddingBottom: 100 , marginTop: 32 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>

          {/* Step progress bar */}
          {step !== 'confirmed' && <StepBar current={step} />}

          {/* Step content */}
          <div style={{ marginTop: step === 'confirmed' ? 32 : 8 }}>

            {step === 'service' && (
              <ServiceStep
                selected={service}
                onSelect={setService}
                onNext={() => setStep('date')}
              />
            )}

            {step === 'date' && service && (
              <DateStep
                service={service}
                selected={date}
                onSelect={handleSelectDate}
                onNext={() => setStep('time')}
                onBack={() => setStep('service')}
              />
            )}

            {step === 'time' && service && (
              <TimeStep
                service={service}
                date={date}
                slots={slots}
                selected={time}
                loading={loadSlots}
                onSelect={setTime}
                onNext={() => setStep('details')}
                onBack={() => setStep('date')}
              />
            )}

            {step === 'details' && service && (
              <DetailsStep
                service={service}
                date={date}
                time={time}
                form={form}
                onChange={updateForm}
                onSubmit={handleSubmit}
                onBack={() => setStep('time')}
              />
            )}

            {step === 'confirmed' && service && reference && (
              <ConfirmedStep
                service={service}
                date={date}
                time={time}
                email={form.email}
                reference={reference}
                onBookAgain={handleBookAgain}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
