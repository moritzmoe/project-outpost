const express = require('express');

const router = express.Router();

const withOwner = require('../middleware/owner');
const withAuth = require('../middleware/auth');

const controller = require('../controller/constants.controller');

router.get('/', withAuth, controller.getConstants);

router.put('/updateConstant', withOwner, controller.updateConstant);

module.exports = router;
