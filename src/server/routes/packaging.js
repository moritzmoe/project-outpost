const express = require('express');

const router = express.Router();

const Packaging = require('../models/packaging');

const withAuth = require('../middleware/auth');

router.get('/', withAuth, (req, res) => {
  Packaging.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'co2'] }
  }).then(packMats => res.send(packMats));
});


module.exports = router;
