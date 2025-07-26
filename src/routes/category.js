const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const menuController = require('../controllers/menuController');

router.get('/', categoryController.getAllCategories);
router.get('/:id/menus', menuController.getMenusByCategory);

module.exports = router;
