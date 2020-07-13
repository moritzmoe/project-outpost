const express = require('express');

const router = express.Router();

const withAuth = require('../middleware/auth');

const controller = require('../controller/purchases.controller');

// endpoint to create a new purchase
// purchase gets created for the user that sends the request
// returns the purchase
router.post('/', withAuth, controller.createPurchase);

// endpoint to retrieve a purchase
// purchase can only be retrieved by the user who created it
// return the purchase including all items in it.
router.get('/:id', withAuth, controller.getPurchase);

// endpoint to retrieve all purchases of a user between now and a date that is parsed
// user can only retrieve his own purchases
// return the purchase including all items in it.
router.get('/', withAuth, controller.getPurchases);

// endpoint to delete a purchase
// purchase can only be deleted by user that created it
// returns 200 if delete was successful and 404 if the purchase requested to delete was not found
router.delete('/:id', withAuth, controller.deletePurchase);

// endpoint to add an item to a purchase
// purchaseId is required as request param
// barcode of item is required in body
// returns entire purchase on success
router.post('/item/:id', withAuth, controller.addItemToPurchase);

module.exports = router;
