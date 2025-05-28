const express = require('express');
const guestOrderContactController = require('../controllers/guestOrderContactController');

const router = express.Router();

router.get('/', guestOrderContactController.getAllGuestOrderContacts);
router.get('/:guestContactId', guestOrderContactController.getGuestOrderContactById);
router.post('/', guestOrderContactController.createGuestOrderContact);
router.put('/:guestContactId', guestOrderContactController.updateGuestOrderContact);
router.delete('/:guestContactId', guestOrderContactController.deleteGuestOrderContact);

module.exports = router;