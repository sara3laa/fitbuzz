/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const boom = require('boom');
const asyncRoute = require('route-async');
const User = require('../models/user');

/* const authenticate = async (req, res, next) => {
  const token = req.header('x-auth');
  const decoded = jwt.verify(token, 'secret');
  const user = await User.find(decoded);
  if (!user) throw boom.unauthorized('unotherized');
  req.userdata = decoded;
  return next();
}; */
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
