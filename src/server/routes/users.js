const express = require('express');

const router = express.Router();

const User = require('../models/user');
const withAdmin = require('../middleware/admin');

router.get('/', withAdmin, (req, res) => {
  User.findAll({
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
  }).then(users => res.send(users))
    .catch(err => console.log(err));
});

module.exports = router;
