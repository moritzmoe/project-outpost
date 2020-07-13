const express = require('express');

const router = express.Router();

const withAuth = require('../middleware/auth');
const withAdmin = require('../middleware/admin');

const controller = require('../controller/auth.controller');

router.post('/', controller.login);

router.post('/register', controller.register);

router.get('/checkToken', withAuth, (req, res) => {
  res.sendStatus(200);
});

router.get('/checkAdmin', withAdmin, (req, res) => {
  res.sendStatus(200);
});

router.get('/user', withAuth, controller.getUser);

router.get('/logout', withAuth, (req, res) => {
  res.clearCookie('token').sendStatus(200);
});

router.post('/password', withAuth, controller.changePassword);

module.exports = router;
