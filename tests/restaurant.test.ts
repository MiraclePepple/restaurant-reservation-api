import request from 'supertest'
import app from '../src/app'

describe('Restaurant API', () => {
  it('creates a restaurant successfully', async () => {
    const res = await request(app)
      .post('/restaurants')
      .send({
        name: 'Test Restaurant',
        openingTime: '10:00:00',
        closingTime: '22:00:00',
        totalTables: 5
      })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.name).toBe('Test Restaurant')
  })
})
