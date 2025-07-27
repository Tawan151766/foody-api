const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateOrderItemTable20250727 {
  name = 'CreateOrderItemTable20250727'

  async up(queryRunner) {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      orderId INTEGER REFERENCES orders(id),
      menuId INTEGER REFERENCES menus(id),
      quantity INTEGER,
      price FLOAT
    )`);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE IF EXISTS order_items`);
  }
};
