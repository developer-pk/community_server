const httpStatus = require('http-status');
const { omit } = require('lodash');
const JobTitle = require('../../models/admin/jobTitle.model');

/**
 * Create new Industry
 * @public
 */
 exports.create = async (req, res, next) => {
    try {
      const jobTitle = new JobTitle(Object.assign({ createdBy: req.user._id },req.body));
      const savedJobTitle = await jobTitle.save();
      res.status(httpStatus.CREATED);
      res.json(savedJobTitle.transform());
    } catch (error) {
      next(JobTitle.checkDuplicateJobtitle(error));
    }
  };

  /**
 * Get Industry list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const jobTitle = await JobTitle.list(req.query);
    const transformedjobTitle = jobTitle.map((jobTitle) => jobTitle.transform());
    res.json(transformedjobTitle);
  } catch (error) {
    next(error);
  }
};
/**
 * Delete Industry
 * @public
 */
 exports.remove = async (req, res, next) => {
   console.log(req.params.jobtitleId);
   try {
   const jobtitleId = await JobTitle.findByIdAndDelete(req.params.jobtitleId);
   res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  } 
};