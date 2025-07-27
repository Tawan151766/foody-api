# Migrations

Place your TypeORM migration files in this directory.

## Creating a Migration

```
npx typeorm migration:generate -d ./src/db.js ./src/migration/YourMigrationName
```

## Running Migrations

```
npx typeorm migration:run -d ./src/db.js
```

## Reverting a Migration

```
npx typeorm migration:revert -d ./src/db.js
```
