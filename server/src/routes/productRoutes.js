const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController.js");

// Rutas para manejar productos

// GET /api/products - Obtener todos los productos
router.get("/", getAllProducts);

//// GET /api/products/:id - Obtener un producto por ID
router.get("/:id", getProductById);
//
//// POST /api/products - Crear un nuevo producto
router.post("/", createProduct);
//
//// PUT /api/products/:id - Actualizar un producto
router.put("/:id", updateProduct);
//
//// DELETE /api/products/:id - Eliminar un producto
router.delete("/:id", deleteProduct);

module.exports = router;
