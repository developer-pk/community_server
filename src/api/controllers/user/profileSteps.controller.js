const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../../models/user.model');
const Profile = require('../../models/user/profile.model');

exports.step2 = async (req, res, next) => {
    console.log(req);
    // try {
    //   const country = await Country.list(req.query);
  
    //   console.log(country);
    //   const transformedcountry = country.map((country) => country.transform());
    //   res.json(transformedcountry);
    // } catch (error) {
    //   next(error);
    // }
  };
  