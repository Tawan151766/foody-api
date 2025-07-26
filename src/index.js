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
const port = process.env.PORT || 4000;


app.use(cors());
app.use(limiter);
app.use(express.json());


const AppDataSource = require('./db');
const Store = require('./entity/Store');
const Menu = require('./entity/Menu');
const MenuCategory = require('./entity/MenuCategory');

// Import routes
const storeRoutes = require('./routes/store');
const menuRoutes = require('./routes/menu');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const paymentRoutes = require('./routes/payment');




// Inject response helper to req
app.use((req, res, next) => {
  res.sendResponse = (payload) => sendResponse(res, payload);
  next();
});

app.use('/stores', storeRoutes);
app.use('/menus', menuRoutes);
app.use('/categories', categoryRoutes);
app.use('/orders', orderRoutes);
app.use('/payments', paymentRoutes);







// Start DB and server
AppDataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log(`foody-api listening at http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('DB connection error:', err);
});
