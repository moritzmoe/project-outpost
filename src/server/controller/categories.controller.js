const models = require('../models');

exports.getCategories = (req, res) => {
  models.Category.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }).then(categories => res.send(categories))
    .catch((err) => {
      console.log(`Internal Error while retrieving categories: ${err}`);
      res.sendStatus(500);
    });
};

exports.getSubCatsOfCat = (req, res) => {
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
};

exports.createSubCat = (req, res) => {
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
};

exports.deleteSubCat = (req, res) => {
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
};

exports.updateSubCat = (req, res) => {
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
};

exports.createCategory = (req, res) => {
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
};

exports.deleteCategory = (req, res) => {
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
};

exports.updateCategory = (req, res) => {
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
};
