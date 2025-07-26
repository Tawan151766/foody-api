const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Store',
  tableName: 'stores',
  columns: {
    id: { type: Number, primary: true, generated: true },
    name: { type: String },
    address: { type: String },
    rating: { type: 'float' },
    image: { type: String },
    lat: { type: 'float' },
    lng: { type: 'float' },
    category: { type: String },
    nationality: { type: String },
    openingHours: { type: String }
  }
});
