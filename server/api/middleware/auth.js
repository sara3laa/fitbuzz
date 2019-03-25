/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers['x-auth'] || req.headers.authorization; // Express headers are auto converted to lowercase

  if (token) {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid',
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied',
    });
  }
};
module.exports = { authenticate };
