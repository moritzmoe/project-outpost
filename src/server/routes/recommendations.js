const express = require('express');

const router = express.Router();

const { Op } = require('sequelize');
const models = require('../models');

const withAuth = require('../middleware/auth');

const withAdmin = require('../middleware/admin');

router.get('/', withAuth, (req, res) => {
  const score = parseInt(req.query.score, 10);
  const subCategory = parseInt(req.query.subCategory, 10);
  if (!score) {
    res.status(400).json({ error: 'Please provide a score' });
  }
  if (!subCategory) {
    res.status(400).json({ error: 'Please provide a subCategory' });
  }
  if (!score && !subCategory) {
    res.status(400).json({ error: 'Please provide a score and a subCategory' });
    return;
  }
  models.Item.findAll({
    where: {
      // categoryId: req.subCategory,
      categoryId: subCategory,
      score: { [Op.lte]: score },
    },
    include: [
      { model: models.Packaging, attributes: ['name'] },
      { model: models.SubCategory, attributes: ['name', 'id', 'parentCat'] },
      { model: models.Origin, attributes: ['name'] },
      { model: models.User, as: 'created', attributes: ['email'] },
      { model: models.User, as: 'lastUpdated', attributes: ['email'] }]
  }).then((item) => {
    if (!item) {
      res.status(404).json({ error: 'No recommendations found' });
    } else {
      res.send(item);
    }
  }).catch((err) => {
    console.log(`Internal error while retriving recommendation:\n${err}`);
    res.sendStatus(500);
  });
});


module.exports = router;
