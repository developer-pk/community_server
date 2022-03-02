const httpStatus = require('http-status');
const { omit } = require('lodash');
const ServiceNeed = require('../../models/admin/serviceNeed.model');

/**
 * Create new ServiceNeed
 * @public 
 */
 exports.create = async (req, res, next) => {
     
    try {
      const serviceNeed = new ServiceNeed(Object.assign({ createdBy: req.user._id },req.body));
      const savedserviceNeed = await serviceNeed.save();
      res.status(httpStatus.CREATED);
      res.json(savedserviceNeed.transform());
    } catch (error) {
      next(ServiceNeed.checkDuplicateHobby(error));
    }
  };

  /**
 * Get ServiceNeed list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const serviceNeed = await ServiceNeed.list(req.query);
    const transformedserviceNeed = serviceNeed.map((serviceNeed) => serviceNeed.transform());
    res.json(transformedserviceNeed);
  } catch (error) {
    next(error);
  } 
};
/**
 * Delete ServiceNeed
 * @public
 */
 exports.remove = async (req, res, next) => {
   try {
   const serviceNeed = await ServiceNeed.findByIdAndDelete(req.params.serviceNeedId);
   res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  } 
};