// src/routes/menuRoutes.js
const express = require('express');
const menuController = require('../controllers/menuController');

const router = express.Router();

router.get('/', menuController.getAllProducts);
router.get('/category/:categoryId', menuController.getProductsByCategory);
router.get('/product/:productId', menuController.getProductById);

module.exports = router;