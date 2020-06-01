const express = require('express');

const router = express.Router();

const models = require('../models');

const withAuth = require('../middleware/auth');

const withAdmin = require('../middleware/admin');

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
  }).then(categories => res.send(categories))
    .catch((err) => {
      console.log(`Internal Error while retrieving categories: ${err}`);
      res.sendStatus(500);
    });
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
  }).then(subCategories => res.send(subCategories))
    .catch((err) => {
      console.log(`Inter Error while retrieving subcategories for category${id}: ${err}`);
      res.sendStatus(500);
    });
});

router.post('/subCats', withAdmin, (req, res) => {
  const {
    parentCat, name, co2
  } = req.body;
  if (!name || !parentCat || !co2) {
    res.status(400).json({ error: 'Please provide all necessary information needed to create a new SubCategory' });
    return;
  }
  models.SubCategory.create({
    parentCat, name, co2
  }).then((createdSubCategory) => {
    res.send(createdSubCategory);
  }).catch((err) => {
    console.log(`Internal error while creating new category: ${err}`);
    res.sendStatus(500);
  });
});

router.delete('/subCats/:id', withAdmin, (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.SubCategory.destroy({
    where: {
      id
    }
  }).then(res.sendStatus(200))
    .catch((err) => {
      console.log(`Internal error while deleting category from database: ${err}`);
      res.sendStatus(500);
    });
});

router.put('/subCats/:id', withAdmin, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const {
    name, co2
  } = req.body;
  models.SubCategory.update({
    name, co2
  }, {
    where: {
      id
    }
  }).then((updatedSubCat) => {
    res.send(updatedSubCat);
  }).catch((err) => {
    console.log(`Internal error while updating category on database: ${err}`);
    res.sendStatus(500);
  });
});

router.post('/', withAdmin, (req, res) => {
  const {
    name
  } = req.body;
  if (!name) {
    res.status(400).json({ error: 'Please provide all necessary information needed to create a new Category' });
    return;
  }
  models.Category.create({
    name
  }).then((createdCategory) => {
    res.send(createdCategory);
  }).catch((err) => {
    console.log(`Internal error while creating new category: ${err}`);
    res.sendStatus(500);
  });
});

router.delete('/:id', withAdmin, (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.Category.destroy({
    where: {
      id
    }
  }).then(res.sendStatus(200))
    .catch((err) => {
      console.log(`Internal error while deleting category from database: ${err}`);
      res.sendStatus(500);
    });
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
  }).then((updatedCat) => {
    res.send(updatedCat);
  }).catch((err) => {
    console.log(`Internal error while updating category on database: ${err}`);
    res.sendStatus(500);
  });
});

module.exports = router;
