const express = require('express');

const router = express.Router();

const { Op } = require('sequelize');
const models = require('../models');

const withAuth = require('../middleware/auth');


function buildIncludeObj(expand) {
  const includeObj = {
    model: models.Item,
    attributes: ['id', 'name', 'barcode', 'origin', 'score']
  };
  const subIncObjPackaging = {};
  const subIncObjSubCat = {};
  if (expand.includes('PACKAGING')) {
    subIncObjPackaging.model = models.Packaging;
    subIncObjPackaging.attributes = ['name'];
    includeObj.include = [subIncObjPackaging];
  }
  if (expand.includes('SUBCATEGORY')) {
    subIncObjSubCat.model = models.SubCategory;
    subIncObjSubCat.attributes = ['name', 'id', 'parentCat'];
    if (!includeObj.include) {
      includeObj.include = [subIncObjSubCat];
    } else {
      includeObj.include.push(subIncObjSubCat);
    }
  }
  return includeObj;
}

// endpoint to create a new purchase
// purchase gets created for the user that sends the request
// returns the purchase
router.post('/', withAuth, (req, res) => {
  models.Purchase.create({
    userId: req.userId,
  }).then(purchase => res.send(purchase))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// endpoint to retrieve a purchase
// purchase can only be retrieved by the user who created it
// return the purchase including all items in it.
router.get('/:id', withAuth, (req, res) => {
  const purchaseId = parseInt(req.params.id, 10);
  if (!purchaseId) {
    res.status(400).json({ error: 'Please provide a purchase id' });
    return;
  }
  if (req.query.expand && req.query.expand.includes('ITEMS')) {
    const includeObj = buildIncludeObj(req.query.expand);
    models.Purchase.findOne({
      where: {
        id: purchaseId,
        userId: req.userId
      },
      include: [includeObj]
    }).then((purchase) => {
      if (!purchase) {
        res.status(404).json({ error: 'Purchase not found' });
      } else {
        res.send(purchase);
      }
    }).catch((err) => {
      console.log(`Internal error while retriving purchase:\n${err}`);
      res.sendStatus(500);
    });
  } else {
    models.Purchase.findOne({
      where: {
        id: purchaseId,
        userId: req.userId
      }
    }).then((purchase) => {
      if (!purchase) {
        res.status(404).json({ error: 'Purchase not found' });
      } else {
        res.send(purchase);
      }
    }).catch((err) => {
      console.log(`Internal error while retriving purchase:\n${err}`);
    });
  }
});

// endpoint to retrieve all purchases of a user
// user can only retrive his own purchases
// return the purchase including all items in it.
// router.get('/', withAuth, (req, res) => {
//   if (req.query.expand && req.query.expand.includes('ITEMS')) {
//     const includeObj = buildIncludeObj(req.query.expand);
//     models.Purchase.findAll({
//       where: {
//         userId: req.userId
//       },
//       include: [includeObj]
//     }).then((purchases) => {
//       if (!purchases) {
//         res.status(404).json({ error: 'No Purchases found' });
//       } else {
//         res.send(purchases);
//       }
//     }).catch((err) => {
//       console.log(`Internal error while retriving purchases:\n${err}`);
//       res.sendStatus(500);
//     });
//   } else {
//     models.Purchase.findAll({
//       where: {
//         userId: req.userId
//       }
//     }).then((purchase) => {
//       if (!purchase) {
//         res.status(404).json({ error: 'Purchase not found' });
//       } else {
//         res.send(purchase);
//       }
//     }).catch((err) => {
//       console.log(`Internal error while retriving purchase:\n${err}`);
//     });
//   }
// });

// endpoint to retrieve all purchases of a user between now and a date that is parsed
// user can only retrive his own purchases
// return the purchase including all items in it.
router.get('/', withAuth, (req, res) => {
  let dateFrom = Date.parse(String(req.query.startDate));
  let dateUntil = Date.parse(String(req.query.endDate));
  if (!dateFrom) {
    dateFrom = new Date(new Date().setDate(new Date().getDate() - 28));
  }
  if (!dateUntil) {
    dateUntil = new Date();
  }
  if (!dateFrom && !dateUntil) {
    res.status(400).json({ error: 'Please provide a start and end date' });
    return;
  }
  if (req.query.expand && req.query.expand.includes('ITEMS')) {
    const includeObj = buildIncludeObj(req.query.expand);
    models.Purchase.findAll({
      where: {
        userId: req.userId,
        createdAt: {
          [Op.lte]: dateUntil,
          [Op.gte]: dateFrom
        },
      },
      include: [includeObj]
    }).then((purchases) => {
      if (!purchases) {
        res.status(404).json({ error: 'No Purchases found' });
      } else {
        res.send(purchases);
      }
    }).catch((err) => {
      console.log(`Internal error while retriving purchases:\n${err}`);
      res.sendStatus(500);
    });
  } else {
    models.Purchase.findAll({
      where: {
        userId: req.userId,
        createdAt: {
          [Op.lte]: dateUntil,
          [Op.gte]: dateFrom
        },
      }
    }).then((purchase) => {
      if (!purchase) {
        res.status(404).json({ error: 'Purchase not found' });
      } else {
        res.send(purchase);
      }
    }).catch((err) => {
      console.log(`Internal error while retriving purchase:\n${err}`);
    });
  }
});

// endpoint to delete a purchase
// purchase can only be deleted by user that created it
// returns 200 if delete was successful and 404 if the purchase requested to delete was not found
router.delete('/:id', withAuth, (req, res) => {
  const purchaseId = parseInt(req.params.id, 10);
  models.Purchase.destroy({
    where: {
      id: purchaseId,
      userId: req.userId
    }
  }).then((sequelizeResponse) => {
    if (sequelizeResponse === 0) {
      res.status(404).json({ error: 'Purchase not found' });
    } else {
      res.sendStatus(200);
    }
  }).catch((err) => {
    console.log(`Internal error while trying to delete a purchase:\n${err}`);
    res.sendStatus(500);
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
  models.Item.findOne({
    where: {
      barcode
    }
  }).then((item) => {
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    models.Purchase.findOne({
      where: {
        id: purchaseId,
        userId: req.userId
      }
    }).then((purchase) => {
      if (!purchase) {
        res.status(404).json({ error: 'Purchase not found' });
        return;
      }
      purchase.addItem(item).then(() => {
        models.Purchase.findOne({
          where: {
            id: purchaseId,
            userId: req.userId
          },
          include: [{
            model: models.Item,
            attributes: ['id', 'name', 'barcode', 'origin', 'score'],
            include: [
              { model: models.Packaging, attributes: ['name'] },
              { model: models.SubCategory, attributes: ['name', 'id', 'parentCat'] }
            ]
          }]
        }).then((purchaseWithNewItem) => {
          if (!purchaseWithNewItem) {
            res.status(404).json({ error: 'Purchase with new item could not be retrieved.' });
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
