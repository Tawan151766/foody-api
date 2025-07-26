// Rate limit
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100, 
  message: {
    status: 'error',
    code: 429,
    message: 'Too many requests, please try again later.',
    data: null,
    error: 'Too many requests'
  }
});

// Response helper
function sendResponse(res, { status = 'success', code = 200, message = '', data = null, error = null }) {
  res.status(code).json({ status, code, message, data, error });
}

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(limiter);
app.use(express.json());

// Use relative path to src for Vercel
const AppDataSource = require('../src/db');
const Store = require('../src/entity/Store');
const Menu = require('../src/entity/Menu');
const MenuCategory = require('../src/entity/MenuCategory');

// Import routes
const storeRoutes = require('../src/routes/store');
const menuRoutes = require('../src/routes/menu');
const categoryRoutes = require('../src/routes/category');
const orderRoutes = require('../src/routes/order');
const paymentRoutes = require('../src/routes/payment');

// Inject response helper to req
app.use((req, res, next) => {
  res.sendResponse = (payload) => sendResponse(res, payload);
  next();
});


// Health check or root path
app.get('/', (req, res) => {
  res.send('Server running');
});

app.use('/stores', storeRoutes);
app.use('/menus', menuRoutes);
app.use('/categories', categoryRoutes);
app.use('/orders', orderRoutes);
app.use('/payments', paymentRoutes);

// Vercel: export as handler
module.exports = app;
