/* eslint-disable func-names */
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || 'pro_out_secret';

const withAdmin = function (req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else if (decoded.role === 'Admin') {
        req.userId = decoded.id;
        next();
      } else {
        res.status(401).send('Unauthorized: Admin Role required');
      }
    });
  }
};


module.exports = withAdmin;
