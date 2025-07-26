const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Order',
  tableName: 'orders',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    storeId: {
      type: 'int',
    },
    customerName: {
      type: 'varchar',
      nullable: true,
    },
    phone: {
      type: 'varchar',
      nullable: true,
    },
    note: {
      type: 'varchar',
      nullable: true,
    },
    totalPrice: {
      type: 'float',
    },
    status: {
      type: 'varchar',
      default: 'pending',
    },
    deliveryAddress: {
      type: 'varchar',
      nullable: true,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
    paymentMethod: {
      type: 'varchar',
      nullable: true,
    },
    slipUrl: {
      type: 'varchar',
      nullable: true,
    },
    paymentStatus: {
      type: 'varchar',
      nullable: true,
    },
    paidAt: {
      type: 'timestamp',
      nullable: true,
    },
  },
});
