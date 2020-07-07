const { Op } = require('sequelize');
const models = require('../models');


exports.getUsers = (req, res) => {
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
};

exports.userCountOfQuery = (req, res) => {
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
};

exports.totalUserCount = (req, res) => {
  models.User.count().then((result) => {
    res.send(result.toString());
  }).catch(err => console.log(err));
};


exports.changeRole = (req, res) => {
  const { id, roleId } = req.body;
  models.User.update({
    role: roleId
  }, {
    where: {
      id
    }
  }).then(res.sendStatus(200))
    .catch(err => res.send(err));
};

exports.changeFirstname = (req, res) => {
  const { content } = req.query;
  models.User.update({
    firstname: content
  }, {
    where: {
      id: req.userId
    }
  }).then(res.sendStatus(200))
    .catch(err => res.send(err));
};

exports.changeLastname = (req, res) => {
  const { content } = req.query;
  models.User.update({
    lastname: content
  }, {
    where: {
      id: req.userId
    }
  }).then(res.sendStatus(200))
    .catch(err => res.send(err));
};


exports.changeEmail = (req, res) => {
  const { content } = req.query;
  models.User.update({
    email: content
  }, {
    where: {
      id: req.userId
    }
  }).then(res.sendStatus(200))
    .catch(err => res.send(err));
};
