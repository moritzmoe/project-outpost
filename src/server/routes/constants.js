const express = require('express');

const router = express.Router();

const { Op } = require('sequelize');
const models = require('../models');

const withOwner = require('../middleware/owner');

const withAdmin = require('../middleware/admin');

router.get('/', (req, res) => {
  const id = parseInt(req.query.id, 10);
  if (!id) {
    res.status(400).json({ error: 'Please provide an id' });
  }
  models.Constant.findOne({
    where: {
      id
    },
    // attributes: ['id', 'name', 'barcode', 'origin', 'score'],
  }).then(item => res.send(item));
});

router.post('/changeCo2Convert', withOwner, (req, res) => {
  const { id, content } = req.query;
  console.log(id, content);
  models.Constant.update({
    value: content
  }, {
    where: {
      id
    }
  }).then(res.sendStatus(200))
    .catch(err => res.send(err));
});

module.exports = router;
