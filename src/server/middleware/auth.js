/* eslint-disable func-names */
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || 'pro_out_secret';
const withAuth = function (req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.userId = decoded.id;
        req.role = decoded.role;
        next();
      }
    });
  }
};

module.exports = withAuth;
