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
npm run dev
```
---
## Design Decisions & Assumptions

- Used SQLite for simplicity and portability.
- Times are stored and handled as ISO 8601 strings.
- Reservation durations are in minutes.
- Tables are auto-assigned based on capacity and availability.
- No user authentication implemented (beyond the scope).

## Known Limitations

- No reservation modification or cancellation endpoints.
- No handling of time zones beyond ISO formatting.
- No waitlist or notification system.
- No caching implemented.
- No Docker support yet.

## What I Would Improve With More Time

- Add endpoints for modifying and cancelling reservations.
- Implement Redis caching for availability checks.
- Add a waitlist feature when no tables are available.
- Dockerize the application for easier deployment.
- Add user authentication and role management.

## Scaling Considerations

- Switch to a more robust RDBMS like PostgreSQL for higher traffic.
- Use Redis to cache availability queries and reduce DB load.
- Separate availability and reservation logic into microservices.
- Introduce background jobs for notifications and cleanup.
- Implement API rate limiting and authentication.
