export interface Restaurant {
  id: number
  name: string
  openingTime: string
  closingTime: string
  totalTables: number
}

export interface Table {
  id: number
  restaurantId: number
  tableNumber: number
  capacity: number
}

export interface Reservation {
  id: number
  tableId: number
  restaurantId: number
  customerName: string
  phone: string
  partySize: number
  startTime: string
  endTime: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
}
