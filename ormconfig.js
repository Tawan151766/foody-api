module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: process.env.TYPEORM_SYNC, // สำหรับ dev เท่านั้น
  logging: process.env.TYPEORM_LOGGING,
  entities: [__dirname + "/src/entity/**/*.js"],
};
