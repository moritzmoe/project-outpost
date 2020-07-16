const express = require('express');

const router = express.Router();

const withOwner = require('../middleware/owner');

const controller = require('../controller/constants.controller');

router.get('/', controller.getConstants);

router.put('/:id', withOwner, controller.updateConstant);

module.exports = router;
