/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const boom = require('boom');
const User = require('../models/user');

const checkuser = async (body) => {
  const user = await User.find(body);
  if (!user) throw boom.notFound('missing data');
  return user;
};
const authenticate = (req, res, next) => {
  const token = req.headers['x-auth'] || req.headers.authorization; // Express headers are auto converted to lowercase

  if (token) {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        throw boom.unauthorized(err);
      }
      req.decoded = decoded;
      const user = checkuser(req.decoded);
      if (!user) throw boom.unauthorized(err);
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
