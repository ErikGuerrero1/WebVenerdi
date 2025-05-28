const express = require('express');
const menuRoutes = require('./menuRoutes.js');
const imageRoutes = require('./imageRoutes.js');
const categoryRoutes = require('./categoryRoutes.js');
const ingredientRoutes = require('./ingredientRoutes.js');
const productsizeRoutes = require('./productsizeRoutes.js');
const productIngredientRoutes = require('./productIngredientRoutes.js');
const orderRoutes = require('./orderRoutes.js');
const userRoutes = require('./userRoutes.js');
const guestOrderContactRoutes = require('./guestOrderContactRoutes.js');

const router = express.Router();

router.use('/menu', menuRoutes);
router.use('/images', imageRoutes);  // Nueva ruta para imágenes
router.use('/categories', categoryRoutes);
router.use('/ingredients', ingredientRoutes);
router.use('/productsizes', productsizeRoutes);
router.use('/product-ingredients', productIngredientRoutes);
router.use('/users', userRoutes);   // Nueva ruta para usuarios
router.use('/orders', orderRoutes);  // Nueva ruta para órdenes
router.use('/guest-order-contacts', guestOrderContactRoutes);

module.exports = router;