const boom = require('boom');

const boomhandler = (err, req, res, next) => {
  if (!err) return next();
  return next(err.isBoom ? err.message : boom.boomify(err).message);
};
module.exports = {
  boomhandler,
};
