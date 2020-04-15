/* eslint-disable no-useless-escape */
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/user');
const withAuth = require('../middleware');

const secret = process.env.SECRET || 'pro_out_secret';

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// @route POST /api/auth
// @desc User login/authentication with system
// @access public
router.post('/', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } }).then((user) => {
    if (user === null || !user.validPassword(password)) {
      res.status(401).json({ error: 'Invalid' });
    } else {
      const payload = { id: user.id };
      const token = jwt.sign(payload, secret, {
        expiresIn: 3600
      });
      res.cookie('token', token, { httpOnly: true }).sendStatus(200);
    }
  });
});

// @route POST /api/auth/register
// @desc User registration
// @access public
router.post('/register', (req, res) => {
  const {
    email, firstname, lastname, password
  } = req.body;
  if (!email || !firstname || !lastname || !password) {
    res.status(400).json({ error: 'Fill in all fields!' });
    return;
  }
  if (!validateEmail(email)) {
    res.status(400).json({ error: 'Invalid E-Mail!' });
    return;
  }
  User.create({
    email,
    firstname,
    lastname,
    password
  }).then((user) => {
    res.status(200).json({
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname
    });
  }).catch((err) => {
    console.log(`Error while registering user:${err}`);
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'E-Mail already taken!' });
    } else {
      res.status(400).json({ error: 'Registration failed!' });
    }
  });
});

// @route GET /api/auth/checkToken
// @desc Check if token is valid (returns 401 if no token is provided)
// @access private
router.get('/checkToken', withAuth, (req, res) => {
  res.sendStatus(200);
});

// @route GET /api/auth/user
// @desc get registered user
// @access private
router.get('/user', withAuth, (req, res) => {
  User.findOne({
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    where: { id: req.userId }
  }).then(user => res.json(user));
});

// @route GET /api/auth/logout
// @desc remove token
// @access private
router.get('/logout', withAuth, (req, res) => {
  res.clearCookie('token').sendStatus(200);
});

module.exports = router;
