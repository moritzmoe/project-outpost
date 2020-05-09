const express = require('express');

const router = express.Router();

const Origin = require('../models/origin');

const withAuth = require('../middleware/auth');

router.get('/', withAuth, (req, res) => {
  Origin.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'co2'] }
  }).then(origins => res.send(origins));
});


module.exports = router;
