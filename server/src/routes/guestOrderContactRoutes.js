const express = require('express');
const guestOrderContactController = require('../controllers/guestOrderContactController');

const router = express.Router();

router.get('/', guestOrderContactController.getAllGuestOrderContacts);
router.get('/:guestContactId', guestOrderContactController.getGuestOrderContactById);
router.post('/', guestOrderContactController.createGuestOrderContact);

module.exports = router;