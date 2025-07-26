const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'OrderItem',
  tableName: 'order_items',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    orderId: {
      type: 'int',
    },
    menuId: {
      type: 'int',
    },
    quantity: {
      type: 'int',
    },
    price: {
      type: 'float',
    },
    selectedMeatOption: {
      type: 'varchar',
      nullable: true,
    },
    selectedLevelOption: {
      type: 'varchar',
      nullable: true,
    },
  },
});
