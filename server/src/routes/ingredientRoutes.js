const express = require('express');
const router = express.Router();
const {
    getAllIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient
} = require('../controllers/ingredientController');

// GET /api/ingredients - Obtener todos los ingredientes
router.get('/', getAllIngredients);

// GET /api/ingredients/:id - Obtener un ingrediente por ID
router.get('/:id', getIngredientById);

// POST /api/ingredients - Crear un nuevo ingrediente
router.post('/', createIngredient);

// PUT /api/ingredients/:id - Actualizar un ingrediente
router.put('/:id', updateIngredient);

// DELETE /api/ingredients/:id - Eliminar un ingrediente
router.delete('/:id', deleteIngredient);

module.exports = router;