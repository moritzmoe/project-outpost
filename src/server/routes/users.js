const express = require('express');
const { Op } = require('sequelize');

const router = express.Router();

const models = require('../models');
const withAdmin = require('../middleware/admin');
const withOwner = require('../middleware/owner');
const withAuth = require('../middleware/auth');

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

router.post('/changeRole', withOwner, (req, res) => {
  const { id, roleId } = req.body;
  console.log(roleId);
  models.User.update({
    role: roleId
  }, {
    where: {
      id
    }
  }).then(res.sendStatus(200))
    .catch(err => res.send(err));
});

router.post('/changeFirstname', withAuth, (req, res) => {
  const { id, content } = req.query;
  console.log(id, content);
  models.User.update({
    firstname: content
  }, {
    where: {
      id
    }
  }).then(res.sendStatus(200))
    .catch(err => res.send(err));
});

router.post('/changeLastname', withAuth, (req, res) => {
  const { id, content } = req.query;
  console.log(id, content);
  models.User.update({
    lastname: content
  }, {
    where: {
      id
    }
  }).then(res.sendStatus(200))
    .catch(err => res.send(err));
});

router.post('/changeEmail', withAuth, (req, res) => {
  const { id, content } = req.query;
  console.log(id, content);
  models.User.update({
    email: content
  }, {
    where: {
      id
    }
  }).then(res.sendStatus(200))
    .catch(err => res.send(err));
});

module.exports = router;
