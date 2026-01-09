export function validateReservationPayload(body: any) {
  const required = [
    'restaurantId',
    'customerName',
    'phone',
    'partySize',
    'dateTime',
    'duration'
  ]

  for (const field of required) {
    if (!body[field]) {
      return `Missing required field: ${field}`
    }
  }

  if (body.partySize <= 0) {
    return 'Party size must be greater than zero'
  }

  if (body.duration <= 0) {
    return 'Duration must be greater than zero'
  }

  return null
}
