const express = require('express');

const router = express.Router();

const controller = require('../controller/origins.controller');

const withAuth = require('../middleware/auth');

router.get('/', withAuth, controller.getOrigins);

module.exports = router;
