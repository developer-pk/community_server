const httpStatus = require('http-status');
const { omit } = require('lodash');
const College = require('../../models/admin/college.model');

/**
 * Create new College
 * @public 
 */
 exports.create = async (req, res, next) => {
     
    try {
      const college = new College(Object.assign({ createdBy: req.user._id },req.body));
      const savedcollege = await college.save();
      res.status(httpStatus.CREATED);
      res.json(savedcollege.transform());
    } catch (error) {
      next(College.checkDuplicateHobby(error));
    }
  };

  /**
 * Get College list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const college = await College.list(req.query);
    const transformedcollege = college.map((college) => college.transform());
    res.json(transformedcollege);
  } catch (error) {
    next(error);
  } 
};
/**
 * Delete college
 * @public
 */
 exports.remove = async (req, res, next) => {
   try {
   const college = await College.findByIdAndDelete(req.params.collegeId);
   res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  } 
};