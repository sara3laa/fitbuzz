const joi = require('joi');

function validateUserdata(user) {
  const schema = {
    name: joi.string(),
    email: joi.string().email({ minDomainAtoms: 2 }).required(),
    password: joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
  };
  return joi.validate(user, schema);
}
module.exports.validateUserdata = validateUserdata;
