# Restaurant Table Reservation API

A simple REST API for managing restaurant tables and reservations.  
Built as a backend take-home exercise to demonstrate business logic, API design, and TypeScript discipline.

---

## Tech Stack

- Node.js
- Express
- TypeScript (strict mode)
- SQLite (via better-sqlite3)
- Jest + Supertest (testing)

---

## Features

### Restaurant & Table Management
- Create restaurants with operating hours
- Add tables with capacity constraints
- Retrieve restaurant details and tables

### Reservation System
- Create reservations with party size, time, and duration
- Prevent double-booking of tables
- Enforce table capacity limits
- Enforce restaurant operating hours
- Automatically assign the best available table

### Business Rules
- Reservations must be within opening and closing times
- A table cannot be reserved for overlapping time slots
- Parties larger than table capacity are rejected
- Reservations return clear error messages on failure

---

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation

```bash
git clone <your-github-repo-url>
cd restaurant-reservation-api
npm install
