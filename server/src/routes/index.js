const express = require('express');
const menuRoutes = require('./menuRoutes.js');
const imageRoutes = require('./imageRoutes.js');

const router = express.Router();

router.use('/menu', menuRoutes);
router.use('/images', imageRoutes);  // Nueva ruta para imágenes

module.exports = router;