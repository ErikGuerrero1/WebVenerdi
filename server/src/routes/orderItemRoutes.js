const express = require('express');
const orderItemController = require('../controllers/orderItemController');

const router = express.Router();

router.get('/', orderItemController.getAllOrderItems);
router.get('/:orderItemId', orderItemController.getOrderItemById);

module.exports = router;