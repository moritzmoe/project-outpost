const express = require('express');

const router = express.Router();

const withAdmin = require('../middleware/admin');
const withOwner = require('../middleware/owner');
const withAuth = require('../middleware/auth');

const controller = require('../controller/users.controller');

router.get('/', withAdmin, controller.getUsers);

router.get('/totalQueryCount', withAdmin, controller.userCountOfQuery);

router.get('/totalUserCount', withAdmin, controller.totalUserCount);

router.put('/role/:id', withOwner, controller.changeRole);

router.put('/firstname', withAuth, controller.changeFirstname);

router.put('/lastname', withAuth, controller.changeLastname);

router.put('/email', withAuth, controller.changeEmail);

module.exports = router;
