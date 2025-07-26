const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'MenuCategory',
  tableName: 'menu_categories',
  columns: {
    id: { type: Number, primary: true, generated: true },
    name: { type: String }
  }
});
