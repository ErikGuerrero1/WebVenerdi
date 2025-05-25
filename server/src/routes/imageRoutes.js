const express = require('express');
const imageController = require('../controllers/imageController.js');

const router = express.Router();

// POST /api/images/upload - Subir imagen de producto
router.post('/upload', 
  imageController.upload.single('image'), 
  imageController.uploadProductImage
);

module.exports = router;