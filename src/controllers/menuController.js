const e = require('express');
const AppDataSource = require('../db');

exports.getMenuById = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository('Menu');
    const menu = await repo.findOneBy({ id: Number(req.params.id) });
    if (!menu) {
      return res.sendResponse({
        status: 'error',
        code: 404,
        message: 'Menu not found',
        data: null,
        error: 'Menu not found'
      });
    }
    res.sendResponse({
      code: 200,
      message: 'Fetched menu successfully',
      data: { menu },
      error: null
    });
  } catch (err) {
    res.sendResponse({
      status: 'error',
      code: 500,
      message: 'Failed to fetch menu',
      data: null,
      error: err.message
    });
  }
};

exports.getMenusByStore = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository('Menu');
    const menus = await repo.find({ where: { storeId: Number(req.params.id) } });
    res.sendResponse({
      code: 200,
      message: 'Fetched menus by store successfully',
      data: { menus },
      error: null
    });
  } catch (err) {
    res.sendResponse({
      status: 'error',
      code: 500,
      message: 'Failed to fetch menus by store',
      data: null,
      error: err.message
    });
  }
};

exports.getMenusByCategory = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository('Menu');
    const menus = await repo.find({ where: { categoryId: Number(req.params.id) } });
    res.sendResponse({
      code: 200,
      message: 'Fetched menus by category successfully',
      data: { menus },
      error: null
    });
  } catch (err) {
    res.sendResponse({
      status: 'error',
      code: 500,
      message: 'Failed to fetch menus by category',
      data: null,
      error: err.message
    });
  }
};
exports.getAllMenus = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository('Menu');
    const menus = await repo.find();
    res.sendResponse({
      code: 200,
      message: 'Fetched all menus successfully',
      data: { menus },
      error: null
    });
  } catch (err) {
    res.sendResponse({
      status: 'error',
      code: 500,
      message: 'Failed to fetch menus',
      data: null,
      error: err.message
    });
  }
}