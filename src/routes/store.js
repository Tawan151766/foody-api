const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

router.get('/', storeController.getAllStores);
router.get('/:id', storeController.getStoreById);

module.exports = router;
