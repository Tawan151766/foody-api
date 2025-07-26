require("dotenv").config();
const { DataSource } = require("typeorm");

const Store = require("./entity/Store");
const Menu = require("./entity/Menu");
const MenuCategory = require("./entity/MenuCategory");
const Order = require("./entity/Order");
const OrderItem = require("./entity/OrderItem");

const AppDataSource = new DataSource({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: process.env.TYPEORM_SYNC === "true" || true,
  logging: process.env.TYPEORM_LOGGING === "true" || false,
  entities: [Store, Menu, MenuCategory, Order, OrderItem],
  ssl: { rejectUnauthorized: false },
});

module.exports = AppDataSource;
