const express = require('express');

const ctrl = require("../../controllers/contacts");

const {validateBody, isValidId, validateFavoriteStatus, authenticate} = require("../../middlewares");

const {schemas} = require("../../models/contact");

const router = express.Router();

router.get('/', authenticate, ctrl.getListContacts);

router.get('/:id', authenticate, isValidId, ctrl.getContactById);

router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:id', authenticate, isValidId, ctrl.removeContact);

router.put('/:id', authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch('/:id/favorite', authenticate, isValidId, validateFavoriteStatus, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

module.exports = router;
