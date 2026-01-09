import request from 'supertest';
import app from '../src/app';

describe('Reservation API', () => {
  it('should create a restaurant, table and reservation', async () => {
    // Create restaurant
    const restRes = await request(app).post('/restaurants').send({
      name: 'Testaurant',
      openingTime: '10:00:00',
      closingTime: '22:00:00',
      totalTables: 1,
    });
    expect(restRes.status).toBe(201);
    const restaurantId = restRes.body.id;

    // Add table
    const tableRes = await request(app)
      .post(`/restaurants/${restaurantId}/tables`)
      .send({ tableNumber: 1, capacity: 4 });
    expect(tableRes.status).toBe(201);

    // Make reservation within operating hours
    const reservationRes = await request(app).post('/reservations').send({
      restaurantId,
      customerName: 'John Doe',
      phone: '1234567890',
      partySize: 3,
      dateTime: new Date().toISOString().replace(/T.*/, 'T19:00:00.000Z'),
      duration: 120,
    });
    expect(reservationRes.status).toBe(201);
  });

  it('should prevent overlapping reservations on same table', async () => {
    // Assuming restaurant and table created above

    // Create overlapping reservation
    const response = await request(app).post('/reservations').send({
      restaurantId: 1,
      customerName: 'Jane Smith',
      phone: '0987654321',
      partySize: 2,
      dateTime: new Date().toISOString().replace(/T.*/, 'T20:00:00.000Z'), // Overlaps with 19:00-21:00
      duration: 60,
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/No available table/);
  });
});
