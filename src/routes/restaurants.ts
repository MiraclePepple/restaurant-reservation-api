import express from 'express';
import db from '../db';

const router = express.Router();

router.post('/', (req, res, next) => {
  try {
    const { name, openingTime, closingTime, totalTables } = req.body;
    if (!name || !openingTime || !closingTime || !totalTables) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const stmt = db.prepare(
      'INSERT INTO restaurants (name, openingTime, closingTime, totalTables) VALUES (?, ?, ?, ?)'
    );
    const info = stmt.run(name, openingTime, closingTime, totalTables);

    res.status(201).json({ id: info.lastInsertRowid, name, openingTime, closingTime, totalTables });
  } catch (err) {
    next(err);
  }
});

router.post('/:restaurantId/tables', (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const { tableNumber, capacity } = req.body;

    if (!tableNumber || !capacity) {
      return res.status(400).json({ error: 'Missing tableNumber or capacity' });
    }

    // Check restaurant exists
    const restaurant = db.prepare('SELECT * FROM restaurants WHERE id = ?').get(restaurantId);
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });

    const stmt = db.prepare(
      'INSERT INTO tables (restaurantId, tableNumber, capacity) VALUES (?, ?, ?)'
    );
    const info = stmt.run(restaurantId, tableNumber, capacity);

    res.status(201).json({ id: info.lastInsertRowid, restaurantId, tableNumber, capacity });
  } catch (err) {
    next(err);
  }
});

router.get('/:restaurantId', (req, res, next) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = db.prepare('SELECT * FROM restaurants WHERE id = ?').get(restaurantId);
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });

    const tables = db.prepare('SELECT * FROM tables WHERE restaurantId = ?').all(restaurantId);

    // Note: availability requires reservation data + business logic, skip here for brevity
    res.json({ ...restaurant, tables });
  } catch (err) {
    next(err);
  }
});

export default router;
