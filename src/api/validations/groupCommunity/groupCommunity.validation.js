const Joi = require('joi');
const User = require('../../models/groupCommunity/groupCommunity.model');

module.exports = {

  // GET /v1/users
  listGroupCommunity: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      name: Joi.string(),
      status: Joi.string(),
    },
  },

  // POST /v1/users
  createGroupCommunity: {
    body: {
      name: Joi.string().required(),
      status: Joi.string().required(),
      type: Joi.string().required(),
      createdType: Joi.string().required(),
    },
  },
 
};
