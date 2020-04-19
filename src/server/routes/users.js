const express = require('express');

const router = express.Router();

const User = require('../models/user');
const withAdmin = require('../middleware/admin');

router.get('/', withAdmin, (req, res) => {
  User.findAll({
    order: [
      ['createdAt', 'DESC'],
    ],
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
  }).then(users => res.send(users))
    .catch(err => console.log(err));
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
