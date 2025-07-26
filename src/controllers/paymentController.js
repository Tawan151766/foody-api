// Mock implementation (replace with DB logic as needed)
let payments = [];
let paymentIdCounter = 1;

exports.createPayment = (req, res) => {
  try {
    let { orderId, orderIds, paymentMethod, slipUrl } = req.body;
    if (!orderId && (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) || !paymentMethod) {
      return res.sendResponse({
        status: 'error',
        code: 400,
        message: 'orderId/orderIds and paymentMethod are required',
        data: null,
        error: 'orderId/orderIds and paymentMethod are required'
      });
    }
    // อัปเดต payment field ใน order (mock)
    let updatedOrders = [];
    const ids = orderIds && Array.isArray(orderIds) ? orderIds : [orderId];
    for (const oid of ids) {
      const order = require('./orderController').orders.find(o => o.id === Number(oid));
      if (order) {
        order.paymentMethod = paymentMethod;
        order.slipUrl = slipUrl || '';
        order.paymentStatus = 'pending';
        order.paidAt = new Date().toISOString();
        updatedOrders.push(order);
      }
    }
    res.sendResponse({
      code: 201,
      message: 'Payment info updated in order(s)',
      data: { orders: updatedOrders },
      error: null
    });
  } catch (err) {
    res.sendResponse({
      status: 'error',
      code: 500,
      message: 'Failed to update payment',
      data: null,
      error: err.message
    });
  }
};

exports.getPaymentById = (req, res) => {
  try {
    const payment = payments.find(p => p.id === Number(req.params.id));
    if (!payment) {
      return res.sendResponse({
        status: 'error',
        code: 404,
        message: 'Payment not found',
        data: null,
        error: 'Payment not found'
      });
    }
    res.sendResponse({
      code: 200,
      message: 'Fetched payment successfully',
      data: { payment },
      error: null
    });
  } catch (err) {
    res.sendResponse({
      status: 'error',
      code: 500,
      message: 'Failed to fetch payment',
      data: null,
      error: err.message
    });
  }
};
