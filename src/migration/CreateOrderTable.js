const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateOrderTable20250727 {
  name = 'CreateOrderTable20250727'

  async up(queryRunner) {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      storeId INTEGER REFERENCES stores(id),
      status VARCHAR(50),
      total FLOAT,
      createdAt TIMESTAMP DEFAULT NOW()
    )`);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE IF EXISTS orders`);
  }
};
