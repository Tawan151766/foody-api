# Foody API

A Node.js RESTful API for food ordering, built with Express and TypeORM.

## Features
- Store, Menu, Category, Order, and Payment management
- PostgreSQL database
- Rate limiting
- CORS enabled

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm
- PostgreSQL database

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file in the root directory with the following:
```
DB_TYPE=postgres
DB_HOST=your_host
DB_PORT=5432
DB_USER=your_user
DB_PASS=your_password
DB_NAME=your_db
TYPEORM_SYNC=true
TYPEORM_LOGGING=false
```

### Running Locally
```bash
npm start
```

### Deployment
- Supports deployment on Vercel (see `vercel.json`)

## Project Structure
```
foody-api/
  src/
    controllers/
    entity/
    routes/
    db.js
    index.js
  scripts/
  package.json
  .env
  vercel.json
```

## Database Migrations

Migration files are in `src/migration/`.

### Create a migration
```bash
npm run migration:generate -- ./src/migration/YourMigrationName
```

### Run migrations
```bash
npm run migration:run
```

### Revert last migration
```bash
npm run migration:revert
```

## License
MIT
