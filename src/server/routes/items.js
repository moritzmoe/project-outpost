const express = require('express');

const router = express.Router();

const controller = require('../controller/items.controller');

const withAdmin = require('../middleware/admin');
const withAuth = require('../middleware/auth');


router.get('/', withAdmin, controller.getItems);

router.get('/notApproved/', withAdmin, controller.getNotApprovedItems);

router.get('/:id', withAdmin, controller.getOneItem);

router.post('/', withAuth, controller.createItem);

router.delete('/:id', withAdmin, controller.deleteItem);

router.put('/:id', withAdmin, controller.updateItem);

module.exports = router;
