const express = require('express');
const router = express.Router();
const {
    getProductIngredients,
    getProductsByIngredient,
    assignIngredientsToProduct,
    addIngredientToProduct,
    removeIngredientFromProduct,
    getAllProductIngredients
} = require('../controllers/productIngredientController');

// GET /api/product-ingredients - Obtener todas las relaciones producto-ingrediente
router.get('/', getAllProductIngredients);

// GET /api/product-ingredients/product/:productId - Obtener ingredientes de un producto
router.get('/product/:productId', getProductIngredients);

// GET /api/product-ingredients/ingredient/:ingredientId - Obtener productos que contienen un ingrediente
router.get('/ingredient/:ingredientId', getProductsByIngredient);

// POST /api/product-ingredients/product/:productId/assign - Asignar ingredientes a un producto (en lote)
router.post('/product/:productId/assign', assignIngredientsToProduct);

// POST /api/product-ingredients/product/:productId/ingredient/:ingredientId - Agregar un ingrediente a un producto
router.post('/product/:productId/ingredient/:ingredientId', addIngredientToProduct);

// DELETE /api/product-ingredients/product/:productId/ingredient/:ingredientId - Remover un ingrediente de un producto
router.delete('/product/:productId/ingredient/:ingredientId', removeIngredientFromProduct);

module.exports = router;