/* eslint-disable no-useless-escape */
const jwt = require('jsonwebtoken');
const models = require('../models');

const secret = process.env.SECRET || 'pro_out_secret';

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


exports.login = (req, res) => {
  const { email, password } = req.body;
  models.User.findOne({
    where: { email },
    include: [
      { model: models.Role, attributes: ['name'] }
    ]
  }).then((user) => {
    if (user === null || !user.validPassword(password)) {
      res.status(401).json({ error: 'Invalid' });
    } else {
      const payload = { id: user.id, role: user.Role.name };
      const token = jwt.sign(payload, secret, {
        expiresIn: 3600,
      });
      res.cookie('token', token, { httpOnly: true }).sendStatus(200);
    }
  });
};


exports.register = (req, res) => {
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
  models.Role.findOne({
    where: { name: 'User' }
  }).then((fetchedRole) => {
    models.User.create({
      email,
      firstname,
      lastname,
      password,
      role: fetchedRole.id
    })
      .then((user) => {
        res.status(200).json({
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
        });
      })
      .catch((err) => {
        console.log(`Error while registering user:${err}`);
        if (err.name === 'SequelizeUniqueConstraintError') {
          res.status(400).json({ error: 'E-Mail already taken!' });
        } else {
          res.status(400).json({ error: 'Registration failed!' });
        }
      });
  });
};

exports.getUser = (req, res) => {
  models.User.findOne({
    include: [
      { model: models.Role, attributes: ['name'] }
    ],
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt', 'role']
    },
    where: { id: req.userId },
  }).then(user => res.json(user));
};

exports.changePassword = (req, res) => {
  const reqPassword = req.body.password;
  models.User.findOne({
    where: {
      id: req.userId,
    },
  }).then((user) => {
    user.password = reqPassword;
    user.save().then((dbResponse) => {
      res.send(dbResponse);
    });
  });
};
