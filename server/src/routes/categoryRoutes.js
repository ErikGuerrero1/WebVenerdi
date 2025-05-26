const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');

// GET /api/categories - Obtener todas las categorías
router.get('/', getAllCategories);

// GET /api/categories/:id - Obtener una categoría por ID
router.get('/:id', getCategoryById);

// POST /api/categories - Crear una nueva categoría
router.post('/', createCategory);

// PUT /api/categories/:id - Actualizar una categoría
router.put('/:id', updateCategory);

// DELETE /api/categories/:id - Eliminar una categoría
router.delete('/:id', deleteCategory);

module.exports = router;