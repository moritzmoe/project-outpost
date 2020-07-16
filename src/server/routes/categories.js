const express = require('express');

const router = express.Router();

const withAuth = require('../middleware/auth');
const withAdmin = require('../middleware/admin');

const controller = require('../controller/categories.controller');

router.get('/', withAuth, controller.getCategories);

router.post('/', withAdmin, controller.createCategory);

router.delete('/:id', withAdmin, controller.deleteCategory);

router.put('/:id', withAdmin, controller.updateCategory);

router.get('/subCats/:id', withAuth, controller.getSubCatsOfCat);

router.post('/subCats', withAdmin, controller.createSubCat);

router.delete('/subCats/:id', withAdmin, controller.deleteSubCat);

router.put('/subCats/:id', withAdmin, controller.updateSubCat);

module.exports = router;
