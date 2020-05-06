const express = require('express');

const router = express.Router();

const PackMat = require('../models/packMat');
const PackType = require('../models/packType');

const withAuth = require('../middleware/auth');

router.get('/packMat', withAuth, (req, res) => {
  PackMat.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }).then(packMats => res.send(packMats));
});

router.get('/packType', withAuth, (req, res) => {
  PackType.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }).then(packTypes => res.send(packTypes));
});


module.exports = router;
