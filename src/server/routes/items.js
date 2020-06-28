/* eslint-disable radix */
const express = require('express');

const router = express.Router();

const { Op } = require('sequelize');
const models = require('../models');

const withAdmin = require('../middleware/admin');


router.get('/', withAdmin, (req, res) => {
  if (req.query.q) {
    models.Item.findAll({
      order: [
        ['updatedAt', 'DESC'],
      ],
      limit: req.query.limit,
      offset: req.query.offset,
      include: [models.Packaging, models.SubCategory, models.Origin],
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${req.query.q}%`
            }
          },
          {
            barcode: {
              [Op.like]: `%${req.query.q}%`
            }
          },
        ]
      },
      // attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    }).then(items => res.send(items))
      .catch(err => console.log(err));
  } else {
    models.Item.findAll({
      order: [
        ['updatedAt', 'DESC'],
      ],
      limit: req.query.limit,
      offset: req.query.offset,
      include: [models.Packaging, models.SubCategory, models.Origin]
      // attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    }).then((items) => {
      res.send(items);
    }).catch(err => console.log(err));
  }

  /*
  models.Item.findAll({
    order: [
      ['updatedAt', 'DESC'],
    ],
    limit: req.query.limit,
    offset: req.query.offset,
    include: [models.Packaging, models.SubCategory, models.Origin]
  }).then((items) => {
    res.send(items);
  }).catch(err => console.log(err));
*/
});

router.get('/:id', withAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  models.Item.findAll({
    where: {
      id
    },
    // attributes: ['id', 'name', 'barcode', 'origin', 'score'],
    include: [
      { model: models.Packaging, attributes: ['name'] },
      { model: models.SubCategory, attributes: ['name', 'id', 'parentCat'] },
      { model: models.Origin, attributes: ['name'] },
      { model: models.User, as: 'created', attributes: ['email'] },
      { model: models.User, as: 'lastUpdated', attributes: ['email'] }]
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
  models.Item.findOne({
    where: {
      barcode
    }
  }).then((item) => {
    if (item) {
      res.status(409).json({ error: 'Item already exists' });
    } else {
      models.SubCategory.findOne({
        where: {
          id: categoryId
        }
      }).then((categoryVal) => {
        if (!categoryVal) {
          res.status(404).json({ error: 'category not found' });
          return;
        }
        models.Packaging.findOne({
          where: {
            id: packaging
          }
        }).then((packagingVal) => {
          if (!packagingVal) {
            res.status(404).json({ error: 'packaging not found' });
            return;
          }
          models.Origin.findOne({
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
            models.Item.create({
              name,
              weight,
              categoryId,
              barcode,
              packaging,
              origin,
              score,
              approved: 1,
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
  models.Item.destroy({
    where: {
      id
    }
  });
  res.sendStatus(200);
});


router.put('/:id', withAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const {
    name, weight, subCategoryId, packagingId, originId, barcode
  } = req.body;
  models.SubCategory.findOne({
    where: {
      id: subCategoryId
    }
  }).then((categoryVal) => {
    if (!categoryVal) {
      res.status(404).json({ error: 'category not found' });
      return;
    }
    models.Packaging.findOne({
      where: {
        id: packagingId
      }
    }).then((packagingVal) => {
      if (!packagingVal) {
        res.status(404).json({ error: 'packaging not found' });
        return;
      }
      models.Origin.findOne({
        where: {
          id: originId
        }
      }).then((originVal) => {
        if (!originVal) {
          res.status(404).json({ error: 'origin not found' });
          return;
        }
        const score = Math.floor(packagingVal.co2
          + originVal.co2 + (weight * (categoryVal.co2 / 1000)));
        models.Item.update({
          name,
          weight,
          categoryId: subCategoryId,
          packaging: packagingId,
          origin: originId,
          score,
          barcode,
          lastUpdatedBy: req.userId,
        }, {
          where: {
            id
          }
        }).then((updatedItem) => {
          res.send(updatedItem);
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
});

module.exports = router;
