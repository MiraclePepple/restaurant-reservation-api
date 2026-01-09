import Database from 'better-sqlite3';

const db = new Database(':memory:'); // For demo, in-memory db. Use file for persistence.

db.exec(`
  CREATE TABLE restaurants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    openingTime TEXT NOT NULL,
    closingTime TEXT NOT NULL,
    totalTables INTEGER NOT NULL
  );

  CREATE TABLE tables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    restaurantId INTEGER NOT NULL,
    tableNumber INTEGER NOT NULL,
    capacity INTEGER NOT NULL,
    FOREIGN KEY(restaurantId) REFERENCES restaurants(id)
  );

  CREATE TABLE reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tableId INTEGER NOT NULL,
    restaurantId INTEGER NOT NULL,
    customerName TEXT NOT NULL,
    phone TEXT NOT NULL,
    partySize INTEGER NOT NULL,
    startTime TEXT NOT NULL,
    endTime TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'confirmed',
    FOREIGN KEY(tableId) REFERENCES tables(id),
    FOREIGN KEY(restaurantId) REFERENCES restaurants(id)
  );
`);

export default db;
