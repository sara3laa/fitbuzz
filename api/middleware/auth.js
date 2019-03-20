const jwt = require('jsonwebtoken');
const boom = require('boom');
const asyncRoute = require('route-async');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
  const token = req.header('x-auth');
  const decoded = jwt.verify(token, 'secret');
  const user = await User.find(decoded);
  if (!user) throw boom.unauthorized('unotherized');
  req.userdata = decoded;
  next();
};
module.exports = { authenticate: asyncRoute(authenticate) };
