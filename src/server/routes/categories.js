const express = require('express');

const router = express.Router();

const withAuth = require('../middleware/auth');
const withAdmin = require('../middleware/admin');

const controller = require('../controller/categories.controller');

/**
 * @api {get} /auth/categories Get Categories
 * @apiGroup Categories
 * @apiPermission user
 * @apiSuccess (200) {Object[]} categories List of categories.
 * @apiSuccess (200) {Number} categories.id Id of category.
 * @apiSuccess (200) {String} categories.name Name of category.
 */
router.get('/', withAuth, controller.getCategories);

/**
 * @api {get} /auth/subCats/:id Subcategories
 * @apiGroup Categories
 * @apiPermission user
 * @apiSuccess (200) {Object[]} categories List of categories.
 * @apiSuccess (200) {Number} categories.id Id of category.
 * @apiSuccess (200) {String} categories.name Name of category.
 */
router.get('/subCats/:id', withAuth, controller.getSubCatsOfCat);

router.post('/subCats', withAdmin, controller.createSubCat);

router.delete('/subCats/:id', withAdmin, controller.deleteSubCat);

router.put('/subCats/:id', withAdmin, controller.updateSubCat);

router.post('/', withAdmin, controller.createCategory);

router.delete('/:id', withAdmin, controller.deleteCategory);

router.put('/:id', withAdmin, controller.updateCategory);

module.exports = router;
