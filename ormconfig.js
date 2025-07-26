module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: process.env.DB_USER || 'foody',
  password: process.env.DB_PASS || 'foody123',
  database: process.env.DB_NAME || 'foodydb',
  synchronize: true, // สำหรับ dev เท่านั้น
  logging: false,
  entities: [__dirname + '/src/entity/**/*.js'],
};
