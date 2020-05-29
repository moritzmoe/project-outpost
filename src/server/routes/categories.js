const express = require('express');

const router = express.Router();

const models = require('../models');

const withAuth = require('../middleware/auth');

/**
 * @api {get} /auth/categories Get Categories
 * @apiGroup Categories
 * @apiPermission user
 * @apiSuccess (200) {Object[]} categories List of categories.
 * @apiSuccess (200) {Number} categories.id Id of category.
 * @apiSuccess (200) {String} categories.name Name of category.
 */
router.get('/', withAuth, (req, res) => {
  models.Category.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }).then(categories => res.send(categories));
});

/**
 * @api {get} /auth/subCats/:id Subcategories
 * @apiGroup Categories
 * @apiPermission user
 * @apiSuccess (200) {Object[]} categories List of categories.
 * @apiSuccess (200) {Number} categories.id Id of category.
 * @apiSuccess (200) {String} categories.name Name of category.
 */
router.get('/subCats/:id', withAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.SubCategory.findAll({
    where: {
      parentCat: id
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }).then(subCategories => res.send(subCategories));
});

const withAdmin = require('../middleware/admin');

router.post('/', withAdmin, (req, res) => {
  const {
    name
  } = req.body;
  if (!name) {
    res.status(400).json({ error: 'Please provide all neccessary information needed to create an item' });
    return;
  }
  models.Category.create({
    name
  }).then((createdCategory) => {
    res.send(createdCategory);
  });
});

router.delete('/:id', withAdmin, (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.Category.destroy({
    where: {
      id
    }
  });
  res.sendStatus(200);
});

router.put('/:id', withAdmin, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const {
    name
  } = req.body;
  models.Category.update({
    name
  }, {
    where: {
      id
    }
  });
  res.sendStatus(200);
});

module.exports = router;
