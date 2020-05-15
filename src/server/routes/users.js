const express = require('express');
const { Op } = require('sequelize');

const router = express.Router();

const models = require('../models');
const withAdmin = require('../middleware/admin');

router.get('/', withAdmin, (req, res) => {
  if (req.query.q) {
    models.User.findAll({
      order: [
        ['id', 'ASC'],
      ],
      limit: req.query.limit,
      offset: req.query.offset,
      where: {
        [Op.or]: [
          {
            email: {
              [Op.like]: `%${req.query.q}%`
            }
          },
          {
            lastname: {
              [Op.like]: `%${req.query.q}%`
            }
          }
        ]
      },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    }).then(users => res.send(users))
      .catch(err => console.log(err));
  } else {
    models.User.findAll({
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
    models.User.count({
      where: {
        [Op.or]: [
          {
            email: {
              [Op.like]: `%${req.query.q}%`
            }
          },
          {
            lastname: {
              [Op.like]: `%${req.query.q}%`
            }
          }
        ]
      }
    })
      .then(result => res.send(result.toString()))
      .catch(err => console.log(err));
  } else {
    res.send('no query provided');
  }
});

router.get('/totalUserCount', withAdmin, (req, res) => {
  models.User.count().then((result) => {
    res.send(result.toString());
  }).catch(err => console.log(err));
});

router.post('/changeAdmin', withAdmin, (req, res) => {
  const { id } = req.body;
  models.User.findOne({
    where: {
      id
    },
    attributes: ['isAdmin']
  }).then((user) => {
    const { isAdmin } = user.dataValues;
    models.User.update({
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
