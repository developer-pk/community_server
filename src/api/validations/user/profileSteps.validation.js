const Joi = require('joi');
const User = require('../../models/user.model');


module.exports = {

    // GET /v1/users
    // listUsers: {
    //   query: {
    //     page: Joi.number().min(1),
    //     perPage: Joi.number().min(1).max(100),
    //     name: Joi.string(),
    //     email: Joi.string(),
    //     role: Joi.string().valid(User.roles),
    //   },
    // },
  
    // POST /v1/users createUserSetp4
     createUserSetp3: {
       body: {
        jobtitleId: Joi.string().required(),
        industryId: Joi.string().required(),
        businessOwner: Joi.string().required(),
        linkedIn: Joi.string().uri(),
        companyId: Joi.string().required(),
       },
     },

     createUserSetp4: {
      body: {
        hobbiesId: Joi.string().required(),
        serviceNeedId: Joi.string().required(),
        serviceOfferingId: Joi.string().required(),
      },
    }, 

    createUserSetp5: {
      body: {
        collegeId: Joi.string().required(),
        hiring: Joi.string().required(),
        newCareer: Joi.string().required(),
      },
    },
    createUserSetp6: {
      body: {
        meetJobTitleId: Joi.string().required(),
        meetIndustryId: Joi.string().required(),
        meetCompanyId: Joi.string().required(),
        meetLocationId: Joi.string().required(),
      },
    },
  
    // PUT /v1/users/:userId
    // replaceUser: {
    //   body: {
    //     email: Joi.string().email().required(),
    //     password: Joi.string().min(6).max(128).required(),
    //     name: Joi.string().max(128),
    //     role: Joi.string().valid(User.roles),
    //   },
    //   params: {
    //     userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    //   },
    // },
  
    // PATCH /v1/users/:userId
    // updateUser: {
    //   body: {
    //     email: Joi.string().email(),
    //     password: Joi.string().min(6).max(128),
    //     name: Joi.string().max(128),
    //     role: Joi.string().valid(User.roles),
    //   },
    //   params: {
    //     userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    //   },
    // },
  };
  