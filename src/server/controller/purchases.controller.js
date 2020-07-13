const { Op } = require('sequelize');
const models = require('../models');
const purchaseitem = require('../models/purchaseitem');


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


exports.createPurchase = (req, res) => {
  models.Purchase.create({
    userId: req.userId,
  }).then(purchase => res.send(purchase))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};


exports.getPurchase = (req, res) => {
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
      console.log(`Internal error while retrieving purchase:\n${err}`);
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
      console.log(`Internal error while retrieving purchase:\n${err}`);
    });
  }
};


exports.getPurchases = (req, res) => {
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
      console.log(`Internal error while retrieving purchases:\n${err}`);
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
      console.log(`Internal error while retrieving purchase:\n${err}`);
    });
  }
};


exports.deletePurchase = (req, res) => {
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
};

exports.addItemToPurchase = (req, res) => {
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
      let itemCount;
      models.PurchaseItem.findOne({
        where: {
          PurchaseId: purchaseId,
          ItemId: item.id
        }
      }).then((purchaseItem) => {
        if (!purchaseItem) {
          itemCount = 0;
        } else {
          itemCount = purchaseItem.quantity;
        }


        purchase.addItem(item, { through: { quantity: (itemCount + 1) } }).then(() => {
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
                { model: models.SubCategory, attributes: ['name', 'id', 'parentCat'] },
              ],
              purchaseItem
            }, // { model: models.PurchaseItem, attributes: ['quantity'] }
            ]
          }).then((purchaseWithNewItem) => {
            if (!purchaseWithNewItem) {
              res.status(404).json({ error: 'Purchase with new item could not be retrieved.' });
              return;
            }
            // This Response gets send on success
            res.send(purchaseWithNewItem);
          }).catch((err) => {
            console.log(`Internal error while retrieving purchase with new item:\n${err}`);
            res.sendStatus(500);
          });
        }).catch((err) => {
          console.log(`Internal error while adding item to purchase:\n${err}`);
          res.sendStatus(500);
        });
      });
    }).catch((err) => {
      console.log(`Internal error while retrieving purchase:\n${err}`);
      res.sendStatus(500);
    });
  }).catch((err) => {
    console.log(`Internal error while retrieving item:\n${err}`);
    res.sendStatus(500);
  });
};
