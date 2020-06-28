const express = require('express');

const router = express.Router();

const { Op } = require('sequelize');
const models = require('../models');

const withAuth = require('../middleware/auth');

const withAdmin = require('../middleware/admin');

router.get('/', withAuth, (req, res) => {
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

module.exports = router;
