const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Menu',
  tableName: 'menus',
  columns: {
    id: { type: Number, primary: true, generated: true },
    name: { type: String },
    price: { type: 'float' },
    categoryId: { type: Number },
    storeId: { type: Number },
    meatOptions: { type: 'json', nullable: true },
    levelOptions: { type: 'json', nullable: true }
  }
});
