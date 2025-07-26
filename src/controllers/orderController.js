// ดึงรายการ order items ตาม orderId
exports.getOrderItems = async (req, res) => {
  try {
    const orderItemRepo = require('../db').getRepository('OrderItem');
    const orderId = Number(req.params.id);
    if (!orderId) {
      return res.sendResponse({
        status: 'error',
        code: 400,
        message: 'Invalid order id',
        data: null,
        error: 'Invalid order id'
      });
    }
    const items = await orderItemRepo.findBy({ orderId });
    res.sendResponse({
      code: 200,
      message: 'Fetched order items successfully',
      data: { items },
      error: null
    });
  } catch (err) {
    res.sendResponse({
      status: 'error',
      code: 500,
      message: 'Failed to fetch order items',
      data: null,
      error: err.message
    });
  }
};

const AppDataSource = require('../db');
const Order = require('../entity/Order');

exports.createOrder = async (req, res) => {
  try {
    const { storeId, items, deliveryAddress, paymentMethod, slipUrl, customerName, phone, note } = req.body;
    if (!storeId || !Array.isArray(items) || items.length === 0) {
      return res.sendResponse({
        status: 'error',
        code: 400,
        message: 'storeId and items are required',
        data: null,
        error: 'storeId and items are required'
      });
    }
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderRepo = AppDataSource.getRepository('Order');
    const orderItemRepo = AppDataSource.getRepository('OrderItem');
    const order = orderRepo.create({
      storeId,
      customerName,
      phone,
      note,
      totalPrice,
      status: 'pending',
      deliveryAddress: deliveryAddress || '',
      createdAt: new Date(),
      paymentMethod: paymentMethod || null,
      slipUrl: slipUrl || '',
      paymentStatus: null,
      paidAt: null
    });
    await orderRepo.save(order);
    // Add order items
    const orderItems = items.map(menuItem => orderItemRepo.create({
      orderId: order.id,
      menuId: menuItem.menuId,
      quantity: menuItem.quantity,
      selectedMeatOption: menuItem.selectedMeatOption || null,
      selectedLevelOption: menuItem.selectedLevelOption || null,
      price: menuItem.price
    }));
    await orderItemRepo.save(orderItems);
    res.sendResponse({
      code: 201,
      message: 'Order created successfully',
      data: { order },
      error: null
    });
  } catch (err) {
    res.sendResponse({
      status: 'error',
      code: 500,
      message: 'Failed to create order',
      data: null,
      error: err.message
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const orderRepo = AppDataSource.getRepository('Order');
    const order = await orderRepo.findOneBy({ id: Number(req.params.id) });
    if (!order) {
      return res.sendResponse({
        status: 'error',
        code: 404,
        message: 'Order not found',
        data: null,
        error: 'Order not found'
      });
    }
    res.sendResponse({
      code: 200,
      message: 'Fetched order successfully',
      data: { order },
      error: null
    });
  } catch (err) {
    res.sendResponse({
      status: 'error',
      code: 500,
      message: 'Failed to fetch order',
      data: null,
      error: err.message
    });
  }
};


