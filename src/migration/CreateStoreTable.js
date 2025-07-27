const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateStoreTable20250727 {
  name = 'CreateStoreTable20250727'

  async up(queryRunner) {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS stores (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )`);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE IF EXISTS stores`);
  }
};
