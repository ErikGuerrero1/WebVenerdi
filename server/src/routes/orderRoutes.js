const express = require('express');
const orderController = require('../controllers/orderController.js');

const router = express.Router();

// GET /api/orders - Obtener todas las órdenes
router.get('/', orderController.getAllOrders);

// GET /api/orders/:id - Obtener una orden por ID
router.get('/:id', orderController.getOrderById);

// POST /api/orders - Crear una nueva orden
router.post('/', orderController.createOrder);

// PUT /api/orders/:id - Actualizar una orden existente
router.put('/:id', orderController.updateOrder);

// DELETE /api/orders/:id - Eliminar una orden
router.delete('/:id', orderController.deleteOrder);

// GET /api/orders/user/:userId - Obtener órdenes por usuario
router.get('/user/:userId', orderController.getOrdersByUser);

// GET /api/orders/guest/:guestContactId - Obtener órdenes por invitado
router.get('/guest/:guestContactId', orderController.getOrdersByGuest);

// PUT /api/orders/:id/status - Actualizar solo el estado de una orden
router.put('/:id/status', orderController.updateOrderStatus);

module.exports = router;