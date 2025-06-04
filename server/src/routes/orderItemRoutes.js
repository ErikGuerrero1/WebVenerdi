const express = require('express');
const orderItemController = require('../controllers/orderItemController');

const router = express.Router();

router.get('/', orderItemController.getAllOrderItems);
router.get('/:orderItemId', orderItemController.getOrderItemById);
router.get('/order/:orderId', orderItemController.getOrderItemByOrderId);
router.get('/product/:productId', orderItemController.getOrderItemByProductId);
router.post('/', orderItemController.createOrderItem);
router.put('/:orderItemId', orderItemController.updateOrderItem);
router.delete('/:orderItemId', orderItemController.deleteOrderItem);

module.exports = router;