const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/user');
const withAuth = require('../middleware');

const secret = 'mysecret';

router.post('/', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } }).then((user) => {
    if (user === null) {
      res.status(401).json({ error: 'Invalid username' });
    } else if (!user.validPassword(password)) {
      res.status(401).json({ error: 'Invalid password' });
    } else {
      const payload = { email };
      const token = jwt.sign(payload, secret, {
        expiresIn: '1h'
      });
      res.cookie('token', token, { httpOnly: true }).sendStatus(200);
    }
  });
});

router.post('/register', (req, res) => {
  const {
    email, firstname, lastname, password
  } = req.body;
  console.log(req.body);
  User.create({
    email,
    firstname,
    lastname,
    password
  });
  res.status(200).send('registered');
});

router.get('/checkToken', withAuth, (req, res) => {
  res.sendStatus(200);
});

router.get('/logout', withAuth, (req, res) => {
  res.clearCookie('token').sendStatus(200);
});

module.exports = router;
