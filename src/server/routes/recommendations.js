const express = require('express');

const router = express.Router();

const withAuth = require('../middleware/auth');

const controller = require('../controller/recommendations.controller');


router.get('/', withAuth, controller.getRecommendations);


module.exports = router;
