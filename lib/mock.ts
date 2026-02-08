import type { Service, TimeSlot, BookingConfirmation } from '@/types'

export const MOCK_SERVICES: Service[] = [
  { id: '1', name: "Women's Cut & Blow Dry", description: 'Wash, precision cut, blow dry & style', duration_minutes: 60,  price: 65,  deposit_required: false, category_name: 'Styling', color: '#00C896' },
  { id: '2', name: "Men's Cut",              description: 'Cut & style tailored to you',            duration_minutes: 30,  price: 35,  deposit_required: false, category_name: 'Styling', color: '#4D9EFF' },
  { id: '3', name: 'Full Colour',            description: 'Root-to-tip colour with a gloss finish', duration_minutes: 120, price: 120, deposit_required: true,  deposit_amount: 30,        category_name: 'Colour',  color: '#FFB800' },
  { id: '4', name: 'Balayage',               description: 'Hand-painted highlights for a natural, sun-kissed look', duration_minutes: 150, price: 160, deposit_required: true, deposit_amount: 40, category_name: 'Colour', color: '#A78BFA' },
  { id: '5', name: 'Highlights',             description: 'Foil highlights — full or half head',   duration_minutes: 90,  price: 95,  deposit_required: true,  deposit_amount: 25,        category_name: 'Colour',  color: '#FF6B9D' },
  { id: '6', name: 'Keratin Treatment',      description: 'Smooth, frizz-free finish for up to 3 months', duration_minutes: 120, price: 140, deposit_required: true, deposit_amount: 35, category_name: 'Treatment', color: '#34D399' },
]

export const BUSINESS = {
  name:    'Cuts & Colour Studio',
  tagline: 'Milton Keynes · Hair Salon',
  address: '12 High Street, Milton Keynes',
  phone:   '01234 567890',
  hours:   'Mon–Sat  9am – 6pm',
}

export function getMockSlots(date: string): TimeSlot[] {
  const slots: TimeSlot[] = []
  const unavailableHours = [10, 11, 14] // simulate some booked slots
  for (let h = 9; h <= 17; h++) {
    for (const m of [0, 30]) {
      if (h === 17 && m === 30) continue
      const time = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`
      slots.push({ time, available: !unavailableHours.includes(h) || m === 30 })
    }
  }
  return slots
}

export function mockConfirmBooking(data: any): BookingConfirmation {
  const ref = `BK-${Math.random().toString(36).slice(2,8).toUpperCase()}`
  return {
    id:            ref,
    reference:     ref,
    service_name:  data.service?.name ?? '',
    staff_name:    'Sophie Clarke',
    date:          data.date,
    start_time:    data.time,
    end_time:      addMinutes(data.time, data.service?.duration_minutes ?? 60),
    total_amount:  data.service?.price ?? 0,
    deposit_amount: data.service?.deposit_amount ?? 0,
    client_email:  data.email,
  }
}

function addMinutes(time: string, mins: number): string {
  const [h, m] = time.split(':').map(Number)
  const total = h * 60 + m + mins
  return `${Math.floor(total/60).toString().padStart(2,'0')}:${(total%60).toString().padStart(2,'0')}`
}
