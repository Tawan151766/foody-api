const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateMenuCategoryTable20250727 {
  name = 'CreateMenuCategoryTable20250727'

  async up(queryRunner) {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS menu_categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )`);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE IF EXISTS menu_categories`);
  }
};
