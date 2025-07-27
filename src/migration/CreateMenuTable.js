const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateMenuTable20250727 {
  name = 'CreateMenuTable20250727'

  async up(queryRunner) {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS menus (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price FLOAT NOT NULL,
      categoryId INTEGER REFERENCES menu_categories(id),
      storeId INTEGER REFERENCES stores(id),
      meatOptions JSON,
      levelOptions JSON
    )`);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE IF EXISTS menus`);
  }
};
