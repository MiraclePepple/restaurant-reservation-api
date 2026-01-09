import express, { Request, Response, NextFunction } from 'express'
import db from '../db'
import { parseISO, addMinutes } from 'date-fns'
import { validateReservationPayload } from '../validation'
import { isWithinOperatingHours } from '../utils'

const router = express.Router()

// TYPES
type Table = {
  id: number
  tableNumber: number
  capacity: number
}

// ROUTE: Create Reservation

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    try {
      //Validate payload
      const error = validateReservationPayload(req.body)
      if (error) {
        return res.status(400).json({ error })
      }

      const {
        restaurantId,
        customerName,
        phone,
        partySize,
        dateTime,
        duration
      } = req.body

      //Fetch restaurant
      const restaurant = db
        .prepare('SELECT * FROM restaurants WHERE id = ?')
        .get(restaurantId) as {
        id: number
        openingTime: string
        closingTime: string
      } | undefined

      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' })
      }

      // Time calculations
      const startTime = parseISO(dateTime)
      const endTime = addMinutes(startTime, duration)

      const withinHours = isWithinOperatingHours(
        startTime,
        endTime,
        restaurant.openingTime,
        restaurant.closingTime
      )

      if (!withinHours) {
        return res
          .status(400)
          .json({ error: 'Reservation outside operating hours' })
      }

      //Find tables that can fit the party
      const tables = db
        .prepare(
          `SELECT id, tableNumber, capacity 
           FROM tables 
           WHERE restaurantId = ? AND capacity >= ?`
        )
        .all(restaurantId, partySize) as Table[]

      if (tables.length === 0) {
        return res
          .status(400)
          .json({ error: 'No table can accommodate this party size' })
      }

      //Find available table (no overlap)
      let selectedTable: Table | null = null

      for (const table of tables) {
        const overlap = db
          .prepare(
            `
            SELECT 1 FROM reservations
            WHERE tableId = ?
            AND status = 'confirmed'
            AND NOT (endTime <= ? OR startTime >= ?)
          `
          )
          .get(table.id, startTime.toISOString(), endTime.toISOString())

        if (!overlap) {
          selectedTable = table
          break
        }
      }

      if (!selectedTable) {
        return res
          .status(400)
          .json({ error: 'No available table for this time slot' })
      }

      // Insert reservation
      const result = db
        .prepare(
          `
          INSERT INTO reservations (
            tableId,
            restaurantId,
            customerName,
            phone,
            partySize,
            startTime,
            endTime,
            status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, 'confirmed')
        `
        )
        .run(
          selectedTable.id,
          restaurantId,
          customerName,
          phone,
          partySize,
          startTime.toISOString(),
          endTime.toISOString()
        )

      console.log(
        `Reservation confirmed for ${customerName} at table ${selectedTable.tableNumber}`
      )

      return res.status(201).json({
        id: result.lastInsertRowid,
        restaurantId,
        tableId: selectedTable.id,
        customerName,
        phone,
        partySize,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        status: 'confirmed'
      })
    } catch (err) {
      next(err)
    }
  }
)

export default router
