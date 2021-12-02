const Joi = require('joi');
const User = require('../../models/admin/serviceNeed.model');

module.exports = {

  // GET /v1/users
  listServiceNeed: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      name: Joi.string(),
      status: Joi.string(),
    },
  },

  // POST /v1/users
  createserviceNeed: {
    body: {
      name: Joi.string().required(),
      status: Joi.string().required(),
    },
  },
 
};
