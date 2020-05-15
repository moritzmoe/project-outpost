const express = require('express');

const router = express.Router();

const models = require('../models');

const withAuth = require('../middleware/auth');

router.get('/', withAuth, (req, res) => {
  models.Packaging.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'co2'] }
  }).then(packMats => res.send(packMats));
});


module.exports = router;
