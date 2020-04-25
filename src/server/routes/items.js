/* eslint-disable radix */
const express = require('express');

const router = express.Router();

const Item = require('../models/item');

const withAdmin = require('../middleware/admin');


router.get('/', withAdmin, (req, res) => {
  Item.findAll({
    order: [
      ['updatedAt', 'DESC'],
    ],
    limit: req.query.limit,
    offset: req.query.offset,
  }).then((items) => {
    res.send(items);
  }).catch(err => console.log(err));
});

router.get('/:id', withAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  Item.findAll({
    where: {
      id
    }
  }).then(item => res.send(item));
});

router.post('/', withAdmin, (req, res) => {
  const {
    name, category, barcode, packtype, packmat, origin, score
  } = req.body;
  Item.create({
    name,
    category,
    barcode,
    packtype,
    packmat,
    origin,
    score
  });
  res.sendStatus(200);
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
    name, category, barcode, packtype, packmat, origin, score
  } = req.body;
  Item.update({
    name,
    category,
    barcode,
    packtype,
    packmat,
    origin,
    score
  }, {
    where: {
      id
    }
  });
  res.sendStatus(200);
});
module.exports = router;
