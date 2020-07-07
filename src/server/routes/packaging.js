const express = require('express');

const router = express.Router();

const withAuth = require('../middleware/auth');

const controller = require('../controller/packaging.controller');

router.get('/', withAuth, controller.getPackaging);


module.exports = router;
