const express = require('express');

const router = express.Router();

const Purchase = require('../models/purchase');
const Item = require('../models/item');
const Packmat = require('../models/packMat');
const Packtype = require('../models/packType');
const SubCategory = require('../models/subCategory');

const withAuth = require('../middleware/auth');


router.delete('/:id', withAuth, (req, res) => {
  const purchaseId = parseInt(req.params.id, 10);
  Purchase.destroy({
    where: {
      id: purchaseId,
      userId: req.userId
    }
  }).then((sequelizeResponse) => {
    if (sequelizeResponse === 0) {
      res.status(400).json({ error: 'Purchase not found' });
    } else {
      res.sendStatus(200);
    }
  }).catch((err) => {
    console.log(`Internal error while trying to delete a purchase:\n${err}`);
    res.sendStatus(500);
  });
});

// endpoint to create a new purchase
// purchase gets created for the user that sends the request
// returns the purchase
router.post('/', withAuth, (req, res) => {
  Purchase.create({
    userId: req.userId,
  }).then(purchase => res.send(purchase))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// endpoint to add an item to a purchase
// purchaseId is required as request param
// barcode of item is required in body
// returns entire purchase on success
router.post('/item/:id', withAuth, (req, res) => {
  const purchaseId = parseInt(req.params.id, 10);
  const { barcode } = req.body;
  if (!barcode) {
    res.status(400).json({ error: 'Please provide a barcode' });
    return;
  }
  Item.findOne({
    where: {
      barcode
    }
  }).then((item) => {
    if (!item) {
      res.status(400).json({ error: 'Item not found' });
      return;
    }
    Purchase.findOne({
      where: {
        id: purchaseId,
        userId: req.userId
      }
    }).then((purchase) => {
      if (!purchase) {
        res.status(400).json({ error: 'Purchase not found' });
        return;
      }
      purchase.addItem(item).then(() => {
        Purchase.findOne({
          where: { id: purchaseId },
          include: [{
            model: Item,
            attributes: ['id', 'name', 'barcode', 'origin'],
            include: [
              { model: Packmat, attributes: ['name'] },
              { model: Packtype, attributes: ['name'] },
              { model: SubCategory, attributes: ['name', 'id', 'parentCat'] }
            ]
          }]
        }).then((purchaseWithNewItem) => {
          if (!purchaseWithNewItem) {
            res.status(400).json({ error: 'Purchase with new item could not be retrieved.' });
            return;
          }
          // This Response gets send on success
          res.send(purchaseWithNewItem);
        }).catch((err) => {
          console.log(`Internal error while retriving purchase with new item:\n${err}`);
          res.sendStatus(500);
        });
      }).catch((err) => {
        console.log(`Internal error while adding item to purchase:\n${err}`);
        res.sendStatus(500);
      });
    }).catch((err) => {
      console.log(`Internal error while retriving purchase:\n${err}`);
      res.sendStatus(500);
    });
  }).catch((err) => {
    console.log(`Internal error while retriving item:\n${err}`);
    res.sendStatus(500);
  });
});


module.exports = router;
