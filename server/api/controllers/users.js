/* eslint-disable no-underscore-dangle */
/* eslint-disable space-in-parens */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const boom = require('boom');
const asyncRoute = require('route-async');
const { validateUserdata } = require('./validtors');
const User = require('../models/user');

const userSignup = async (req, res) => {
  // const checkuser = await User.find({ email: req.body.email });
  // if (checkuser) throw boom.badData('email is already exist');

  const userbody = {
    email: req.body.email, password: req.body.password, name: req.body.name,
  };

  const validate = validateUserdata(userbody);
  if (validate.error) throw boom.boomify(validate.error, { statusCode: 400 });
  userbody.password = await bcrypt.hash(userbody.password, 10);


  const user = new User(userbody);
  // eslint-disable-next-line no-shadow
  await user.save((err, user) => {
    if (err) throw boom.badRequest(err);
    res.status(201).json({
      message: `welcome to our store ${user.name} login to use it`,
    });
  });
};
const userlogin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw boom.notFound('email not found you can signup');
  const isPasswordMAtch = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordMAtch) throw boom.unauthorized('forget psassword ?');
  const token = jwt.sign(
    {
      email: user.email,
      userId: user._id,
    },
    'secret',
  );
  await user.update({ token });
  res.header('x-auth', token).send('logged in');
  res.header('userId', user._id );
};
const userlogout = async (req, res) => {
  const user = await User.findById(req.header('userId'));
  res.header('userId', '');
  await user.update({ token: '' });
  res.header('x-auth', '').send('loggedout');
};
module.exports = {
  userSignup: asyncRoute(userSignup),
  userlogin: asyncRoute(userlogin),
  userlogout: asyncRoute(userlogout),
};
