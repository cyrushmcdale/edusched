# EduSched - Login Feature (Planning Phase Prototype)

This repository contains a minimal full‑stack implementation for the Login page only, aligned with your ERD (Admin and Student). It is intended for progress demo and can be expanded later.

## Tech Stack
- Front end: React (Vite), HTML, CSS
- Back end: Node.js/Express
- Database: MySQL (mysql2)

## Project Structure
```
client/      # React UI for login
server/      # Express API with MySQL
database/    # SQL schema and seed data
```

## Getting Started

1. Create and seed the database:
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

2. Configure server env:
```bash
cp server/.env.example server/.env
# Edit DB_* with your local MySQL credentials
```

3. Install dependencies:
```bash
npm --prefix server install
npm --prefix client install
```

4. Run servers:
```bash
npm --prefix server run dev
# in another terminal
npm --prefix client run dev
```

Open the UI at http://localhost:5173.

### Test accounts
- Student: userId `12345`, password `password123`
- Admin: userId `1`, password `password123`

> Note: For demo, login returns basic profile JSON; add sessions/JWT later.
