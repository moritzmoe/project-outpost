const express = require('express');

const router = express.Router();

const models = require('../models');
const withAdmin = require('../middleware/admin');
const withOwner = require('../middleware/owner');
const withAuth = require('../middleware/auth');

const controller = require('../controller/users.controller');

router.get('/', withAdmin, controller.getUsers);

router.get('/totalQueryCount', withAdmin, controller.userCountOfQuery);

router.get('/totalUserCount', withAdmin, controller.totalUserCount);

router.post('/changeRole', withOwner, controller.changeRole);

router.post('/changeFirstname', withAuth, controller.changeFirstname);

router.post('/changeLastname', withAuth, controller.changeLastname);

router.post('/changeEmail', withAuth, controller.changeEmail);

module.exports = router;
