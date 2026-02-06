export interface Service {
  id: string
  name: string
  desc: string
  duration: string
  durationMins: number
  price: string
  priceNum: number
  deposit?: string
  depositNum?: number
  category: string
  color: string
}

export interface Slot {
  time: string
  available: boolean
}

export type Step = 'service' | 'date' | 'time' | 'details' | 'confirmed'

export const STEPS_DISPLAY: { key: Step; label: string }[] = [
  { key: 'service', label: 'Service' },
  { key: 'date',    label: 'Date'    },
  { key: 'time',    label: 'Time'    },
  { key: 'details', label: 'Details' },
]

export const SERVICES: Service[] = [
  { id: '1', name: "Women's Cut & Blow Dry", desc: 'Wash, precision cut, blow dry & finish.',                duration: '60 mins', durationMins: 60,  price: '£65',  priceNum: 65,  category: 'Styling',   color: '#00C896' },
  { id: '2', name: "Men's Cut",              desc: 'A sharp cut shaped to your style.',                       duration: '30 mins', durationMins: 30,  price: '£35',  priceNum: 35,  category: 'Styling',   color: '#4D9EFF' },
  { id: '3', name: 'Full Colour',            desc: 'Root-to-tip colour with a gloss finish.',                 duration: '2 hours', durationMins: 120, price: '£120', priceNum: 120, deposit: '£30', depositNum: 30, category: 'Colour',    color: '#FFB800' },
  { id: '4', name: 'Balayage',               desc: 'Hand-painted, sun-kissed highlights.',                    duration: '2.5 hrs', durationMins: 150, price: '£160', priceNum: 160, deposit: '£40', depositNum: 40, category: 'Colour',    color: '#A78BFA' },
  { id: '5', name: 'Highlights',             desc: 'Foil highlights — full or half head.',                    duration: '90 mins', durationMins: 90,  price: '£95',  priceNum: 95,  deposit: '£25', depositNum: 25, category: 'Colour',    color: '#FF6B9D' },
  { id: '6', name: 'Keratin Treatment',      desc: 'Smooth, frizz-free finish for up to 3 months.',          duration: '2 hours', durationMins: 120, price: '£140', priceNum: 140, deposit: '£35', depositNum: 35, category: 'Treatment', color: '#34D399' },
]

export const CATEGORIES = ['Styling', 'Colour', 'Treatment']

export function getMockSlots(): Slot[] {
  const unavail = ['10:00', '11:00', '14:00']
  const slots: Slot[] = []
  for (let h = 9; h <= 17; h++) {
    for (const m of [0, 30]) {
      if (h === 17 && m === 30) continue
      const t = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
      slots.push({ time: t, available: !unavail.includes(t) })
    }
  }
  return slots
}

export function fmtTime(t: string): string {
  const [h, m] = t.split(':').map(Number)
  return `${h > 12 ? h - 12 : h || 12}:${String(m).padStart(2, '0')}${h >= 12 ? 'pm' : 'am'}`
}

export function fmtDate(iso: string): string {
  try {
    const d = new Date(iso + 'T00:00:00')
    return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  } catch { return iso }
}

export function shortDate(iso: string): string {
  try {
    return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch { return iso }
}

export function addMins(t: string, m: number): string {
  const [h, mn] = t.split(':').map(Number)
  const tot = h * 60 + mn + m
  return `${String(Math.floor(tot / 60)).padStart(2, '0')}:${String(tot % 60).padStart(2, '0')}`
}
