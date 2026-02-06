export interface Service {
  id: string
  name: string
  description?: string
  duration_minutes: number
  price: number
  deposit_required: boolean
  deposit_amount?: number
  category_name?: string
  color?: string
}

export interface StaffMember {
  id: string
  full_name: string
  first_name: string
  role: string
}

export interface TimeSlot {
  time: string      // "HH:MM"
  available: boolean
  staff_id?: string
}

export interface BookingFormData {
  service: Service | null
  date: string         // ISO date "YYYY-MM-DD"
  time: string         // "HH:MM"
  staff_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  notes: string
}

export interface BookingConfirmation {
  id: string
  reference: string
  service_name: string
  staff_name: string
  date: string
  start_time: string
  end_time: string
  total_amount: number
  deposit_amount: number
  client_email: string
}

export type Step = 'service' | 'date' | 'time' | 'details' | 'confirmed'

export const STEPS: { key: Step; label: string }[] = [
  { key: 'service',   label: 'Service'  },
  { key: 'date',      label: 'Date'     },
  { key: 'time',      label: 'Time'     },
  { key: 'details',   label: 'Details'  },
  { key: 'confirmed', label: 'Done!'    },
]
