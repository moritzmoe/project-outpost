const express = require('express');

const router = express.Router();

const Category = require('../models/category');
const SubCategory = require('../models/subCategory');

const withAuth = require('../middleware/auth');

router.get('/', withAuth, (req, res) => {
  Category.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }).then(categories => res.send(categories));
});

router.get('/subCats/:id', withAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  SubCategory.findAll({
    where: {
      parentCat: id
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }).then(subCategories => res.send(subCategories));
});


module.exports = router;
