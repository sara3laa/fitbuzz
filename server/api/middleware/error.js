const boom = require('boom');

const boomhandler = (err, req, res, next) => {
  if (!err) return next();
  return next(err.isBoom ? err : boom.boomify(err));
};
module.exports = {
  boomhandler,
};
