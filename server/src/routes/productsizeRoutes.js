const express = require('express');
const router = express.Router();
const {
    getAllProductSizes,
    getProductSizesByProductId,
    getProductSizeById,
    createProductSize,
    updateProductSize,
    deleteProductSize
} = require('../controllers/productsizeController.js');

// GET /api/productsizes - Obtener todos los tamaños de productos
router.get('/', getAllProductSizes);

// GET /api/productsizes/product/:productId - Obtener tamaños por ProductID
router.get('/product/:productId', getProductSizesByProductId);

// GET /api/productsizes/:id - Obtener un tamaño específico por ID
router.get('/:id', getProductSizeById);

// POST /api/productsizes - Crear un nuevo tamaño de producto
router.post('/', createProductSize);

// PUT /api/productsizes/:id - Actualizar un tamaño de producto
router.put('/:id', updateProductSize);

// DELETE /api/productsizes/:id - Eliminar un tamaño de producto
router.delete('/:id', deleteProductSize);

module.exports = router;