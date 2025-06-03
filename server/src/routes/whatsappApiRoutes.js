const express = require('express');
const router = express.Router();

const whatsappController = require('../controllers/whatsappController.js');

// Endpoint para enviar plantilla hello_world
router.post('/send-template', whatsappController.sendTemplate);

module.exports = router