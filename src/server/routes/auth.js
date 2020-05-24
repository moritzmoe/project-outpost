/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-escape */
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const models = require('../models');
const withAuth = require('../middleware/auth');
const withAdmin = require('../middleware/admin');

const secret = process.env.SECRET || 'pro_out_secret';

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/**
  * @apiDefine 200Success
  * @apiSuccessExample {plain} Success-Response:
  *  HTTP/1.1 200 OK
  */

/**
 * @api {post} /auth Login
 * @apiDescription Login endpoint. Sets token if credentials are valid.
 * @apiPermission public
 * @apiGroup Authentication
 * @apiUse 200Success
 * @apiParamExample {json} Request-Example:
*    {
*     "email": "test@test.de",
*     "password": "secure"
*    }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Unauthorized
 *     {
 *       "error": "Invalid"
 *     }
 */
router.post('/', (req, res) => {
  const { email, password } = req.body;
  models.User.findOne({ where: { email } }).then((user) => {
    if (user === null || !user.validPassword(password)) {
      res.status(401).json({ error: 'Invalid' });
    } else {
      const payload = { id: user.id, isAdmin: user.isAdmin };
      const token = jwt.sign(payload, secret, {
        expiresIn: 3600,
      });
      res.cookie('token', token, { httpOnly: true }).sendStatus(200);
    }
  });
});

/**
 * @api {post} /auth/register Register
 * @apiDescription Registration Endpoint. Takes new Users Credentials and creates the User.
 * @apiPermission public
 * @apiGroup Authentication
 * @apiParamExample {json} Request-Example:
 *    {
 *     "email": "test@test.de",
 *     "firstname": "firstname",
 *     "lastname": "lastname",
 *     "password": "secure",
 *    }
 * @apiErrorExample {json} Fill-In-All-Fields:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Fill in all fields!"
 *     }
 * @apiErrorExample {json} Invalid-Mail:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Invalid E-Mail!"
 *     }
 * @apiErrorExample {json} Mail-Taken:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "E-Mail already taken!"
 *     }
 * @apiErrorExample {json} General-Fail:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Registration failed!"
 *     }
 */
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
  models.User.create({
    email,
    firstname,
    lastname,
    password,
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

/**
 * @api {get} /auth/checkToken Check Token
 * @apiPermission user
 * @apiGroup Authentication
 * @apiUse 200Success
 */
router.get('/checkToken', withAuth, (req, res) => {
  res.sendStatus(200);
});

/**
 * @api {get} /auth/checkAdmin Check Admin
 * @apiPermission admin
 * @apiGroup Authentication
 * @apiUse 200Success
 */
router.get('/checkAdmin', withAdmin, (req, res) => {
  res.sendStatus(200);
});

/**
 * @api {get} /auth/user Get User
 * @apiGroup Authentication
 * @apiPermission user
 * @apiSuccess (200) {Number} id ID of user.
 * @apiSuccess (200) {String} email Email of user.
 * @apiSuccess (200) {String} firstname Firstname of user.
 * @apiSuccess (200) {String} lastname Lastname of user.
 * @apiSuccess (200) {Boolean} isAdmin True if user is admin.
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "id": 4,
 *    "email": "test@test.de",
 *    "firstname": "test",
 *    "lastname": "test",
 *    "isAdmin": true
 *  }
 */
router.get('/user', withAuth, (req, res) => {
  models.User.findOne({
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    where: { id: req.userId },
  }).then(user => res.json(user));
});

/**
 * @api {get} /auth/logout Logout User
 * @apiGroup Authentication
 * @apiUse 200Success
 * @apiPermission user
 */
router.get('/logout', withAuth, (req, res) => {
  res.clearCookie('token').sendStatus(200);
});

router.post('/password', withAuth, (req, res) => {
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
});

module.exports = router;
