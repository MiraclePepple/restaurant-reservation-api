import { parseISO, isBefore, isAfter } from 'date-fns'

export function isWithinOperatingHours(
  reservationStart: Date,
  reservationEnd: Date,
  openingTime: string,
  closingTime: string
): boolean {
  const date = reservationStart.toISOString().split('T')[0]

  const open = parseISO(`${date}T${openingTime}`)
  const close = parseISO(`${date}T${closingTime}`)

  return !isBefore(reservationStart, open) && !isAfter(reservationEnd, close)
}

export function isOverlapping(
  startA: Date,
  endA: Date,
  startB: Date,
  endB: Date
): boolean {
  return !(endA <= startB || startA >= endB)
}
