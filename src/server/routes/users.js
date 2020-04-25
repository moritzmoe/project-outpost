const express = require('express');
const { Op } = require('sequelize');

const router = express.Router();

const User = require('../models/user');
const withAdmin = require('../middleware/admin');

router.get('/', withAdmin, (req, res) => {
  if (req.query.q) {
    User.findAll({
      order: [
        ['id', 'ASC'],
      ],
      limit: req.query.limit,
      offset: req.query.offset,
      where: {
        email: {
          [Op.like]: `%${req.query.q}%`
        }
      },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    }).then(users => res.send(users))
      .catch(err => console.log(err));
  } else {
    User.findAll({
      order: [
        ['id', 'ASC'],
      ],
      limit: req.query.limit,
      offset: req.query.offset,
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    }).then(users => res.send(users))
      .catch(err => console.log(err));
  }
});

router.get('/totalQueryCount', withAdmin, (req, res) => {
  if (req.query.q) {
    User.count({
      where: {
        email: {
          [Op.like]: `%${req.query.q}%`
        }
      }
    })
      .then(result => res.send(result.toString()))
      .catch(err => console.log(err));
  } else {
    res.sendStatus(400);
  }
});

router.get('/totalUserCount', withAdmin, (req, res) => {
  User.count().then((result) => {
    res.send(result.toString());
  }).catch(err => console.log(err));
});

router.post('/changeAdmin', withAdmin, (req, res) => {
  const { id } = req.body;
  User.findOne({
    where: {
      id
    },
    attributes: ['isAdmin']
  }).then((user) => {
    const { isAdmin } = user.dataValues;
    User.update({
      isAdmin: !isAdmin
    }, {
      where: {
        id
      }
    }).then(res.sendStatus(200))
      .catch(err => res.send(err));
  }).catch(err => res.send(err));
});

module.exports = router;
