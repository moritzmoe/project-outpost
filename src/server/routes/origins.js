const express = require('express');

const router = express.Router();

const models = require('../models');

const withAuth = require('../middleware/auth');

router.get('/', withAuth, (req, res) => {
  models.Origin.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'co2'] }
  }).then(origins => res.send(origins));
});


module.exports = router;
