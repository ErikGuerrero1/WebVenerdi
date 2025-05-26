const express = require('express');
const menuRoutes = require('./menuRoutes.js');
const imageRoutes = require('./imageRoutes.js');
const userRoutes = require('./userRoutes.js');

const router = express.Router();

router.use('/menu', menuRoutes);
router.use('/images', imageRoutes);  // Nueva ruta para imágenes
router.use('/users', userRoutes);   // Nueva ruta para usuarios

module.exports = router;