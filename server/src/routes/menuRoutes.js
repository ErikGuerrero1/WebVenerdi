const express = require('express');
const router = express.Router();

const {
    getAllProducts,
    getProductsByCategory,
    getProductById,
    searchProducts,
    getFullMenu
} = require('../controllers/menuController.js');

// Rutas para productos
router.get('/products', getAllProducts);

// GET /api/menu/products/search?search=durazno - Para buscar por una cadena, por si se llega a ocupar
router.get('/products/search', searchProducts);

router.get('/products/:productId', getProductById);

// Rutas para productos por categoría
router.get('/categories/:categoryId/products', getProductsByCategory);

// Ruta para obtener el menú completo organizado
router.get('/', getFullMenu);

module.exports = router;