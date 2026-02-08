import { format, parseISO, isToday, addDays, isBefore, startOfDay } from 'date-fns'

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency', currency: 'GBP', minimumFractionDigits: 0,
  }).format(amount)
}

export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const ampm = h >= 12 ? 'pm' : 'am'
  const hour = h % 12 || 12
  return `${hour}:${m.toString().padStart(2, '0')}${ampm}`
}

export function formatDisplayDate(iso: string): string {
  const d = parseISO(iso)
  if (isToday(d)) return 'Today'
  return format(d, 'EEEE, d MMMM yyyy')
}

export function formatShortDate(iso: string): string {
  return format(parseISO(iso), 'd MMM yyyy')
}

export function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = []
  const date = new Date(year, month, 1)
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}

export function isPastDate(iso: string): boolean {
  return isBefore(parseISO(iso), startOfDay(new Date()))
}

export function minBookingDate(): Date {
  return addDays(new Date(), 1) // earliest is tomorrow
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} mins`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h} ${h === 1 ? 'hour' : 'hours'}`
}
