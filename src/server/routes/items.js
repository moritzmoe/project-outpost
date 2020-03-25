const express = require('express');

const router = express.Router();

const Item = require('../models/item');

const withAuth = require('../middleware');


router.get('/', withAuth, (req, res) => Item.findAll().then((items) => {
  console.log(items);
  res.send(items).sendStatus(200);
}).catch(err => console.log(err)));


router.post('/', withAuth, (req, res) => {
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
module.exports = router;
