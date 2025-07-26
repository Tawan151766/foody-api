const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');


router.get('/', menuController.getAllMenus);
router.get('/:id', menuController.getMenuById);
router.get('/store/:id', menuController.getMenusByStore);
router.get('/category/:id', menuController.getMenusByCategory);


module.exports = router;
