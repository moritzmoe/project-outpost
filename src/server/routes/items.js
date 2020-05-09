/* eslint-disable radix */
const express = require('express');

const router = express.Router();

const Item = require('../models/item');
const Packaging = require('../models/packaging');
const SubCategory = require('../models/subCategory');
const Origin = require('../models/origin');
const User = require('../models/user');

const withAdmin = require('../middleware/admin');


router.get('/', withAdmin, (req, res) => {
  Item.findAll({
    order: [
      ['updatedAt', 'DESC'],
    ],
    limit: req.query.limit,
    offset: req.query.offset,
    include: [Packaging, SubCategory, Origin]
  }).then((items) => {
    res.send(items);
  }).catch(err => console.log(err));
});

router.get('/:id', withAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  Item.findAll({
    where: {
      id
    },
    // attributes: ['id', 'name', 'barcode', 'origin', 'score'],
    include: [
      { model: Packaging, attributes: ['name'] },
      { model: SubCategory, attributes: ['name', 'id', 'parentCat'] },
      { model: Origin, attributes: ['name'] },
      { model: User, as: 'created', attributes: ['email'] },
      { model: User, as: 'lastUpdated', attributes: ['email'] }]
  }).then(item => res.send(item));
});


router.post('/', withAdmin, (req, res) => {
  const {
    name, weight, categoryId, barcode, packaging, origin
  } = req.body;
  if (!name || !weight || !categoryId || !barcode || !packaging || !origin) {
    res.status(400).json({ error: 'Please provide all neccessary information needed to create an item' });
    return;
  }
  Item.findOne({
    where: {
      barcode
    }
  }).then((item) => {
    if (item) {
      res.status(409).json({ error: 'Item already exists' });
    } else {
      SubCategory.findOne({
        where: {
          id: categoryId
        }
      }).then((categoryVal) => {
        if (!categoryVal) {
          res.status(404).json({ error: 'category not found' });
          return;
        }
        Packaging.findOne({
          where: {
            id: packaging
          }
        }).then((packagingVal) => {
          if (!packagingVal) {
            res.status(404).json({ error: 'packaging not found' });
            return;
          }
          Origin.findOne({
            where: {
              id: origin
            }
          }).then((originVal) => {
            if (!originVal) {
              res.status(404).json({ error: 'origin not found' });
              return;
            }
            const score = Math.floor(packagingVal.co2
              + originVal.co2 + (weight * (categoryVal.co2 / 1000)));
            Item.create({
              name,
              weight,
              categoryId,
              barcode,
              packaging,
              origin,
              score,
              createdBy: req.userId,
              lastUpdatedBy: req.userId,
            }).then((createdItem) => {
              res.send(createdItem);
            }).catch((err) => {
              console.log(`Internal error while creating new item:\n${err}`);
              res.sendStatus(500);
            });
          }).catch((err) => {
            console.log(`Internal error while retriving origin:\n${err}`);
            res.sendStatus(500);
          });
        }).catch((err) => {
          console.log(`Internal error while retriving packaging:\n${err}`);
          res.sendStatus(500);
        });
      }).catch((err) => {
        console.log(`Internal error while retriving subcategory:\n${err}`);
        res.sendStatus(500);
      });
    }
  }).catch((err) => {
    console.log(`Internal error while checking if an item already exists:\n${err}`);
    res.sendStatus(500);
  });
});


router.delete('/:id', withAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  Item.destroy({
    where: {
      id
    }
  });
  res.sendStatus(200);
});


router.put('/:id', withAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const {
    name, subCategoryId, barcode, packaging, origin, score
  } = req.body;
  Item.update({
    name,
    categoryId: subCategoryId,
    barcode,
    packaging,
    origin,
    score,
    lastUpdatedBy: req.userId,
  }, {
    where: {
      id
    }
  });
  res.sendStatus(200);
});
module.exports = router;
