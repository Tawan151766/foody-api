const AppDataSource = require('../db');

exports.getAllCategories = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository('MenuCategory');
    const categories = await repo.find();
    res.sendResponse({
      code: 200,
      message: 'Fetched categories successfully',
      data: { categories },
      error: null
    });
  } catch (err) {
    res.sendResponse({
      status: 'error',
      code: 500,
      message: 'Failed to fetch categories',
      data: null,
      error: err.message
    });
  }
};
